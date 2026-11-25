"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/** The static artwork and the globe circle inside it, in the image's own pixels. */
const ART = { src: "/banner-home/Next.webp", width: 3104, height: 1376 };
const GLOBE = { cx: 1556, cy: 2734, r: 2248 };
/** Size of one halftone cell in image pixels, matching the printed dots in the artwork. */
const DOT_PITCH = 8;
/** The map that is wrapped onto the sphere (equirectangular, 2:1, grayscale). */
const MAP_SRC = "/assets/home/earth-map.webp";
/** Seconds for one full turn. */
const TURN_SECONDS = 140;
/** Tilts the north pole away from the viewer so the band in view is about 10-55 degrees north. */
const TILT = (35 * Math.PI) / 180;

const VERTEX = `
attribute vec2 p;
void main() { gl_Position = vec4(p, 0.0, 1.0); }
`;

// Orthographic sphere in screen space, shaded as black halftone dots on white.
const FRAGMENT = `
precision highp float;
uniform sampler2D map;
uniform vec3 circle;   // centre x, centre y (from the bottom), radius; device pixels
uniform float pitch;   // halftone cell size, device pixels
uniform float spin;    // radians
uniform float tilt;    // radians
const float PI = 3.14159265;

void main() {
  vec2 d = (gl_FragCoord.xy - circle.xy) / circle.z;
  float rr = dot(d, d);
  float edge = sqrt(rr);
  // Halftone dot on a 45-degree screen grid.
  vec2 q = mat2(0.7071, -0.7071, 0.7071, 0.7071) * gl_FragCoord.xy / pitch;
  float dist = length(fract(q) - 0.5) * pitch;
  if (edge > 1.012) { gl_FragColor = vec4(0.0); return; }
  if (edge >= 1.0) {
    // Thin halo of sparse dots just outside the limb, as in the print.
    float halo = 0.2 * smoothstep(1.012, 1.0, edge);
    float hr = sqrt(halo) * pitch * 0.62;
    gl_FragColor = vec4(0.0, 0.0, 0.0, (1.0 - smoothstep(hr - 0.75, hr + 0.75, dist)) * 0.9);
    return;
  }
  vec3 n = vec3(d, sqrt(1.0 - rr));

  // Into globe space: tilt about x, then read latitude and longitude.
  float c = cos(tilt), s = sin(tilt);
  vec3 g = vec3(n.x, n.y * c - n.z * s, n.y * s + n.z * c);
  float lat = asin(clamp(g.y, -1.0, 1.0));
  float lon = atan(g.x, g.z) + spin;
  vec2 uv = vec2(fract(lon / (2.0 * PI) + 0.5), 0.5 - lat / PI);
  float lum = texture2D(map, uv).r;

  // Ink: dark oceans and land print as dots, clouds stay white; a darker band
  // runs inside the limb, and the very edge fades out like the printed artwork.
  float ink = smoothstep(0.2, 1.0, 1.0 - lum) * 0.4;
  ink *= 1.0 - 0.5 * smoothstep(0.3, 0.9, n.z);              // lighter towards the middle
  ink += smoothstep(0.6, 0.12, n.z) * smoothstep(0.0, 0.12, n.z) * 0.24; // dark band inside the limb
  ink = mix(ink, 0.35, smoothstep(0.985, 1.0, edge));          // soft rim
  ink = clamp(ink, 0.0, 1.0);

  float radius = sqrt(ink) * pitch * 0.62;
  float cover = 1.0 - smoothstep(radius - 0.75, radius + 0.75, dist);
  gl_FragColor = vec4(0.0, 0.0, 0.0, cover * 0.9);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  return gl.getShaderParameter(shader, gl.COMPILE_STATUS) ? shader : null;
}

/**
 * The Next Step backdrop: the printed globe artwork, replaced by the same globe
 * drawn live in WebGL and turning slowly once the map has loaded. The sphere is
 * fitted to the artwork's circle at every size, so the same top of the Earth
 * stays in view. Without WebGL, or with reduced motion, the static artwork stays.
 */
export function GlobeBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vs || !fs) return;
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(program, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const u = (name: string) => gl.getUniformLocation(program, name);
    const uCircle = u("circle");
    const uPitch = u("pitch");
    const uSpin = u("spin");
    gl.uniform1f(u("tilt"), TILT);
    gl.uniform1i(u("map"), 0);

    let frame = 0;
    let visible = false;
    let ready = false;
    let disposed = false;
    const start = performance.now();

    // Match the canvas to its box and the sphere to the artwork's circle
    // (the artwork is drawn object-cover, anchored to the top).
    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
      const scale = Math.max(w / ART.width, h / ART.height);
      const left = (w - ART.width * scale) / 2;
      const cx = (left + GLOBE.cx * scale) * dpr;
      const cyFromTop = GLOBE.cy * scale * dpr;
      gl.uniform3f(uCircle, cx, canvas.height - cyFromTop, GLOBE.r * scale * dpr);
      gl.uniform1f(uPitch, Math.max(3, DOT_PITCH * scale * dpr));
    };

    const draw = (now: number) => {
      frame = 0;
      if (disposed || !ready) return;
      gl.uniform1f(uSpin, ((now - start) / 1000 / TURN_SECONDS) * Math.PI * 2);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (visible && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const resume = () => {
      if (!frame && visible && ready && !document.hidden) frame = requestAnimationFrame(draw);
    };

    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      if (disposed) return;
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE, gl.LUMINANCE, gl.UNSIGNED_BYTE, image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      ready = true;
      fit();
      draw(performance.now());
      setLive(true);
      resume();
    };

    // Load the map and start turning only when the section comes near the screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !image.src) image.src = MAP_SRC;
        resume();
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(canvas);
    const ro = new ResizeObserver(() => {
      fit();
      if (ready && !frame) draw(performance.now());
    });
    ro.observe(canvas);
    document.addEventListener("visibilitychange", resume);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", resume);
    };
  }, []);

  return (
    // Phones and tablets: the globe starts lower, so its dark rim clears the tagline.
    <div aria-hidden="true" className="absolute inset-x-0 bottom-0 top-[96px] z-0 md:top-[40px] lg:top-0">
      <Image
        src={ART.src}
        alt=""
        fill
        sizes="100vw"
        className={`object-cover object-top transition-opacity duration-700 ${live ? "opacity-0" : "opacity-100"}`}
        quality={100}
      />
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${live ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
