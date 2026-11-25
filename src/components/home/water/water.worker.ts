/**
 * Draws the moving water of the hero's streams (HeroWater) off the page's main
 * thread. HeroWater hands over a canvas the size of the streams drawing and then
 * only sends its size and whether it is on screen.
 *
 * One fragment shader does all of it. It knows the shapes of the streams (the
 * same formulas as HeroStreams.tsx, which draws them), works out for every pixel
 * where it lies across its stream, and draws light on moving water there:
 * crests that wind and break like light on a current, and slow swells under
 * them, all carried towards the emblem: the blue stream left to right, the silk
 * right to left. Across the stream the pattern is measured from edge to edge, so
 * as a stream narrows into the emblem the water narrows and speeds up with it.
 *
 * Nothing is drawn outside the streams, and the canvas is transparent: the SVG
 * drawing underneath stays as it is, the water moves over it.
 */

export type ToWater =
  | { type: "init"; canvas: OffscreenCanvas; width: number; height: number }
  | { type: "resize"; width: number; height: number }
  | { type: "active"; active: boolean };

export type FromWater = { type: "ready" } | { type: "unavailable" };

// The project's TypeScript settings describe a page, not a worker, so name the things used here.
const scope = self as unknown as {
  postMessage(message: FromWater): void;
  addEventListener(type: "message", listener: (event: MessageEvent<ToWater>) => void): void;
  requestAnimationFrame?: (callback: (now: number) => void) => number;
  cancelAnimationFrame?: (handle: number) => void;
};

const VERTEX = `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

/*
  Coordinates are the drawing's own (1536 x 1024, y down), so the stream
  formulas read exactly as in HeroStreams.tsx.
*/
const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uResolution;
uniform float uTime;

const float W = 1536.0;
const float H = 1024.0;
const float CX = 775.4;
const float CY = 496.0;
const float BLUE_END = 706.0;
const float RED_START = 846.0;
const float TAU = 6.2831853;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

/* Smooth gradient noise, about -0.7 to 0.7. */
float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
  float a = hash(i) * TAU;
  float b = hash(i + vec2(1.0, 0.0)) * TAU;
  float c = hash(i + vec2(0.0, 1.0)) * TAU;
  float d = hash(i + vec2(1.0, 1.0)) * TAU;
  float na = dot(vec2(cos(a), sin(a)), f);
  float nb = dot(vec2(cos(b), sin(b)), f - vec2(1.0, 0.0));
  float nc = dot(vec2(cos(c), sin(c)), f - vec2(0.0, 1.0));
  float nd = dot(vec2(cos(d), sin(d)), f - vec2(1.0, 1.0));
  return mix(mix(na, nb, u.x), mix(nc, nd, u.x), u.y);
}

/* Thin bright lines where the noise crosses zero: light on the crests of moving water. */
float crest(vec2 p, float sharpness) {
  return pow(1.0 - min(1.0, abs(noise(p)) * 2.4), sharpness);
}

/* 1 inside a band from 0 to 1, fading over the given width at each side. */
float inside(float u, float soft) {
  return smoothstep(-soft, soft, u) * (1.0 - smoothstep(1.0 - soft, 1.0 + soft, u));
}

/* ---------------- Blue: data streams (streamPoint in HeroStreams.tsx) ---------------- */

float gather(float t) {
  return 1.0 - pow(1.0 - t, 2.05);
}

float ripple(float wobble, float seed, float t) {
  return wobble * sin(seed + t * 6.2) * (1.0 - t) * min(1.0, t * 5.0);
}

vec4 blueWater(vec2 p) {
  float t = clamp((p.x + 14.0) / (BLUE_END + 14.0), 0.0, 1.0);
  float g = gather(t);
  float top = mix(326.0, CY - 42.0, g) + ripple(18.0, 0.9, t);
  float bottom = mix(756.0, CY + 50.0, g) + ripple(12.0, 3.4, t);
  // Past the end of the drawn stream it narrows into the emblem.
  float into = smoothstep(BLUE_END - 40.0, CX, p.x);
  top = mix(top, CY - 14.0, into);
  bottom = mix(bottom, CY + 18.0, into);
  float u = (p.y - top) / (bottom - top);
  float band = inside(u, 0.07);
  if (band <= 0.0) return vec4(0.0);

  float time = uTime;
  float a = p.x / 64.0;
  // The pattern is stretched along the stream, so the crests read as currents, and a
  // slow warp, carried along with them, makes them wind.
  vec2 warp = vec2(noise(vec2(a * 0.55 - time * 0.42, u * 2.6)), noise(vec2(a * 0.5 - time * 0.36 + 9.1, u * 2.2 + 4.0)));
  float fine = crest(vec2(a * 0.8 - time * 0.9, u * 11.0) + warp * 1.5, 9.0);
  float wide = crest(vec2(a * 0.42 - time * 0.55 + 3.7, u * 5.5) + warp * 1.1, 6.0);
  float light = max(fine, wide * 0.8);
  // Slow swells: broad brighter water that rolls along under the crests.
  float swell = smoothstep(-0.15, 0.45, noise(vec2(a * 0.3 - time * 0.33, u * 1.5 + 7.0)));

  // Fades in from the screen edge, and is strongest where the stream pours into the emblem.
  float strength = band * smoothstep(-14.0, 150.0, p.x) * (0.72 + 0.4 * smoothstep(380.0, 720.0, p.x));
  float glow = (light * (0.5 + 0.55 * swell) + swell * 0.14) * strength;
  // Deeper water in the troughs, on the wide outer part of the stream only.
  float depth = (1.0 - swell) * 0.16 * band * (1.0 - smoothstep(330.0, 560.0, p.x)) * smoothstep(-14.0, 120.0, p.x);

  vec3 shine = mix(vec3(0.74, 0.93, 1.0), vec3(1.0), light);
  vec3 deep = vec3(0.04, 0.25, 0.62);
  float alpha = clamp(glow, 0.0, 0.92);
  vec3 color = shine * alpha + deep * depth * (1.0 - alpha);
  return vec4(color, alpha + depth * (1.0 - alpha));
}

/* ---------------- Red: silk waves (wavePoint in HeroStreams.tsx) ---------------- */

float wave(float edge, float amp, float freq, float phase, float s) {
  float base = mix(CY + 30.0 + (edge - 520.0) * 0.3, edge, pow(s, 1.15));
  return base + amp * pow(s, 0.85) * sin(phase + freq * s * TAU);
}

vec4 redWater(vec2 p) {
  float s = clamp((p.x - RED_START) / (W + 16.0 - RED_START), 0.0, 1.0);
  // The silk lies between the top ribbon and the bottom one.
  float top = wave(388.0, 30.0, 1.25, 0.9, s) - mix(6.0, 28.0, s);
  float bottom = wave(630.0, 32.0, 1.2, 0.2, s) + mix(6.0, 24.0, s);
  float into = 1.0 - smoothstep(CX, RED_START + 40.0, p.x);
  top = mix(top, CY + 4.0, into);
  bottom = mix(bottom, CY + 40.0, into);
  float v = (p.y - top) / (bottom - top);
  float band = inside(v, 0.08);
  if (band <= 0.0) return vec4(0.0);

  float time = uTime;
  float a = p.x / 80.0;
  // Carried right to left, towards the emblem. Silk is smoother than the data stream: longer, softer sheens.
  vec2 warp = vec2(noise(vec2(a * 0.5 + time * 0.36, v * 2.4)), noise(vec2(a * 0.45 + time * 0.3 + 5.3, v * 2.0 + 2.0)));
  float sheen = crest(vec2(a * 0.6 + time * 0.7, v * 9.0) + warp * 1.3, 5.0);
  float wide = crest(vec2(a * 0.33 + time * 0.42 + 1.9, v * 4.6) + warp * 1.0, 3.5);
  float light = max(sheen, wide * 0.75);
  float swell = smoothstep(-0.15, 0.45, noise(vec2(a * 0.28 + time * 0.3, v * 1.4 + 3.0)));

  float strength = band * (1.0 - smoothstep(W - 150.0, W + 14.0, p.x)) * (0.7 + 0.4 * (1.0 - smoothstep(RED_START, 1240.0, p.x)));
  float glow = (light * (0.42 + 0.5 * swell) + swell * 0.12) * strength;
  float depth = (1.0 - swell) * 0.13 * band * smoothstep(1000.0, 1250.0, p.x) * (1.0 - smoothstep(W - 120.0, W + 14.0, p.x));

  vec3 shine = mix(vec3(1.0, 0.9, 0.87), vec3(1.0, 0.98, 0.97), light);
  vec3 deep = vec3(0.82, 0.3, 0.25);
  float alpha = clamp(glow, 0.0, 0.85);
  vec3 color = shine * alpha + deep * depth * (1.0 - alpha);
  return vec4(color, alpha + depth * (1.0 - alpha));
}

void main() {
  vec2 p = vec2(gl_FragCoord.x / uResolution.x * W, (1.0 - gl_FragCoord.y / uResolution.y) * H);
  // Colour is premultiplied by alpha, as the page expects of a transparent canvas.
  gl_FragColor = p.x < CX ? blueWater(p) : redWater(p);
}
`;

type GL = WebGLRenderingContext | WebGL2RenderingContext;

let gl: GL | null = null;
let canvas: OffscreenCanvas | null = null;
let timeUniform: WebGLUniformLocation | null = null;
let resolutionUniform: WebGLUniformLocation | null = null;
let active = true;
let frame = 0;
let started = 0;
let ready = false;

const nextFrame = (callback: (now: number) => void) =>
  scope.requestAnimationFrame ? scope.requestAnimationFrame(callback) : (setTimeout(() => callback(performance.now()), 16) as unknown as number);
const cancelFrame = (handle: number) => (scope.cancelAnimationFrame ? scope.cancelAnimationFrame(handle) : clearTimeout(handle));

function compile(context: GL, type: number, source: string) {
  const shader = context.createShader(type);
  if (!shader) return null;
  context.shaderSource(shader, source);
  context.compileShader(shader);
  return context.getShaderParameter(shader, context.COMPILE_STATUS) ? shader : null;
}

function setUp(target: OffscreenCanvas): GL | null {
  const options = { alpha: true, premultipliedAlpha: true, antialias: false, depth: false, stencil: false, powerPreference: "low-power" as const };
  const context = (target.getContext("webgl2", options) ?? target.getContext("webgl", options)) as GL | null;
  if (!context) return null;
  const vertex = compile(context, context.VERTEX_SHADER, VERTEX);
  const fragment = compile(context, context.FRAGMENT_SHADER, FRAGMENT);
  const program = context.createProgram();
  if (!vertex || !fragment || !program) return null;
  context.attachShader(program, vertex);
  context.attachShader(program, fragment);
  context.linkProgram(program);
  if (!context.getProgramParameter(program, context.LINK_STATUS)) return null;
  context.useProgram(program);
  // One triangle that covers the whole canvas.
  const buffer = context.createBuffer();
  context.bindBuffer(context.ARRAY_BUFFER, buffer);
  context.bufferData(context.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), context.STATIC_DRAW);
  const position = context.getAttribLocation(program, "aPosition");
  context.enableVertexAttribArray(position);
  context.vertexAttribPointer(position, 2, context.FLOAT, false, 0, 0);
  timeUniform = context.getUniformLocation(program, "uTime");
  resolutionUniform = context.getUniformLocation(program, "uResolution");
  context.clearColor(0, 0, 0, 0);
  return context;
}

function draw(now: number) {
  frame = 0;
  if (!gl || !canvas) return;
  if (!started) started = now;
  gl.viewport(0, 0, canvas.width, canvas.height);
  gl.uniform2f(resolutionUniform, canvas.width, canvas.height);
  gl.uniform1f(timeUniform, (now - started) / 1000);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  if (!ready) {
    ready = true;
    scope.postMessage({ type: "ready" });
  }
  if (active) frame = nextFrame(draw);
}

function resize(width: number, height: number) {
  if (!canvas || !width || !height) return;
  canvas.width = Math.max(1, Math.round(width));
  canvas.height = Math.max(1, Math.round(height));
  if (gl && !frame) frame = nextFrame(draw);
}

scope.addEventListener("message", ({ data }) => {
  switch (data.type) {
    case "init":
      canvas = data.canvas;
      try {
        gl = setUp(canvas);
      } catch {
        gl = null;
      }
      if (!gl) {
        scope.postMessage({ type: "unavailable" });
        return;
      }
      canvas.addEventListener("webglcontextlost", () => {
        gl = null;
        scope.postMessage({ type: "unavailable" });
      });
      resize(data.width, data.height);
      break;
    case "resize":
      resize(data.width, data.height);
      break;
    case "active":
      active = data.active;
      if (active && !frame) frame = nextFrame(draw);
      if (!active && frame) {
        cancelFrame(frame);
        frame = 0;
      }
      break;
  }
});
