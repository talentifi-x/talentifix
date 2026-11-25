/**
 * The TalentiFi-X emblem as a real-time glass 3D model, in the logo's own
 * colours (the logo in the navigation bar): the T, the F and the upper frame in
 * blue glass, the lower frame and the F's foot in cyan glass, bright lines along
 * the rounded edges and no mirror glare on the flat faces.
 *
 * The canvas is transparent, so the hero's flowing backdrop shows around the
 * emblem; a soft white halo behind the glass gives it something to refract.
 *
 * The shapes are the nine polygons of the mark (logoPieces.ts), each extruded
 * into a thick beveled slab and merged into one mesh.
 *
 * This module touches no page elements: it is given a canvas and told its size,
 * when to animate and how far it has been dragged. That lets it run in a
 * background worker (scene.worker.ts), where loading three.js, building the
 * model, compiling shaders and drawing every frame cost the page nothing. On
 * browsers that cannot do that, mount.ts runs it on the page's own thread.
 */
import {
  BackSide,
  BoxGeometry,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshPhysicalMaterial,
  NoToneMapping,
  PerspectiveCamera,
  PlaneGeometry,
  PMREMGenerator,
  Scene,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  WebGLRenderer,
  WebGLRenderTarget,
} from "three";
import { LOGO_COLORS, LOGO_HEIGHT, LOGO_PIECES, LOGO_WIDTH, type LogoPiece } from "./logoPieces";

type Piece = LogoPiece & {
  /** Slab thickness. */
  depth: number;
  /** Width of the rounded edge. Smaller on the small pieces so they keep a flat face. */
  bevel: number;
};

const FRAME = 10;
const LETTER = 13;

/** How each piece of the mark is extruded, in the order of LOGO_PIECES. Letters stand proud of the frame. */
const SLABS: { depth: number; bevel: number }[] = [
  { depth: FRAME, bevel: 1.0 }, // frame: top left
  { depth: FRAME, bevel: 1.0 }, // frame: bottom
  { depth: FRAME, bevel: 1.0 }, // frame: right
  { depth: LETTER, bevel: 1.25 }, // T: bar
  { depth: LETTER, bevel: 1.25 }, // T: stem
  { depth: FRAME, bevel: 0.8 }, // T: serif
  { depth: LETTER, bevel: 1.25 }, // F: body
  { depth: LETTER, bevel: 0.85 }, // F: foot
  { depth: FRAME, bevel: 0.8 }, // F: serif
];
const PIECES: Piece[] = LOGO_PIECES.map((piece, i) => ({ ...piece, ...SLABS[i] }));

/**
 * What the glass looks through, in model units. Glass takes its colour from
 * what is behind it, and the canvas is transparent, so the emblem carries its
 * own backdrop: a pale disc out to HALO_SOLID, past the emblem's corners. Only
 * the glass sees it; it is not drawn on screen.
 */
const HALO_SOLID = 37;
/**
 * The glow the visitor sees round the emblem, in model units: an ellipse,
 * narrower than it is tall like the emblem, white out to GLOW_SOLID (just past
 * the emblem's edges, so nothing shows through its gaps) and fading to nothing
 * at GLOW_RADIUS. It is kept tight so that the streams, and the water moving
 * along them, run right up to the emblem.
 */
const GLOW_SOLID = 34;
const GLOW_RADIUS = 42;
/** Width of the glow as a share of its height. */
const GLOW_WIDTH = 0.84;
/** Resting pose: almost head-on, turned just enough to show the thickness of the glass. */
const REST = { x: -0.07, y: 0.15 };
/**
 * How far the visitor can turn the emblem by dragging, from the resting pose (radians).
 * Less to the left than to the right: turned far left, the flat faces mirror the
 * studio light on that side and flash white.
 */
const DRAG_LIMIT = { up: 0.26, left: 0.5, right: 0.72 };
/**
 * How far the emblem turns to face the cursor at the edge of the hero (radians).
 * Gentler than dragging, and again less to the left, where the faces would glare.
 */
const FOLLOW_LIMIT = { pitch: 0.18, left: 0.3, right: 0.38 };
/** After a drag the emblem holds its pose this long, then settles back. */
const DRAG_HOLD_MS = 1200;
/** Far enough that the mark fills 73% of the canvas height. */
const CAMERA_DISTANCE = 180;

/**
 * Glass colours: the logo's own two, as in logo.svg and the navigation bar.
 * Each piece takes the colour it has in LOGO_PIECES.
 *
 * The cyan glass is tinted a touch greener and brighter than the logo's cyan,
 * and shaded less along its walls: light through it loses some green to the
 * pale halo behind and picks up blue from the reflections of the blue studio.
 * With the logo's value the cyan rendered #1cb1d4; with these it renders
 * #1edce1, against #00dde2 in the logo (the blue renders #1e34f8 for #0000ff).
 */
const GLASS = {
  blue: { face: new Color(LOGO_COLORS.blue), wall: 0.66 },
  cyan: { face: new Color("#00faea"), wall: 0.79 },
} as const;

const nextTask = () => new Promise<void>((resolve) => setTimeout(resolve, 0));

/**
 * The glass colour for each vertex of a piece. Glass takes its colour from what
 * it lets through, so the vertex colour is the colour of the light that passes.
 *
 * - Through its faces each piece is its logo colour, so seen face on the
 *   emblem reads as the logo in the navigation bar.
 * - Real glass is rich where you look along its depth. The renderer has no
 *   notion of path length, so that is painted in: the walls are a deeper shade
 *   of the same colour, and the rounded edges blend between the two, which is
 *   what draws the darker band inside each edge.
 */
function tint(normal: ArrayLike<number>, piece: Piece) {
  const colors = new Float32Array(normal.length);
  const { face, wall } = GLASS[piece.color];
  const shade = new Color();
  for (let i = 0; i < normal.length; i += 3) {
    // 1 on the front and back faces, 0 on the walls.
    const facing = Math.abs(normal[i + 2]);
    shade.copy(face).multiplyScalar(wall).lerp(face, facing * facing);
    colors[i] = shade.r;
    colors[i + 1] = shade.g;
    colors[i + 2] = shade.b;
  }
  return colors;
}

/** Extrudes every piece and joins them into one geometry, so the model is a single draw call. */
function buildLogoGeometry() {
  const parts: { position: ArrayLike<number>; normal: ArrayLike<number>; color: Float32Array }[] = [];
  let length = 0;
  for (const piece of PIECES) {
    const shape = new Shape();
    piece.points.forEach(([x, y], i) => {
      // SVG y runs down; centre the mark on the origin.
      const px = x - LOGO_WIDTH / 2;
      const py = LOGO_HEIGHT / 2 - y;
      if (i === 0) shape.moveTo(px, py);
      else shape.lineTo(px, py);
    });
    // Rounded edges; the bevel is inset by its own size so each slab keeps its outline.
    const extruded = new ExtrudeGeometry(shape, {
      depth: piece.depth,
      bevelEnabled: true,
      bevelThickness: piece.bevel,
      bevelSize: piece.bevel,
      bevelOffset: -piece.bevel,
      bevelSegments: 6,
      curveSegments: 1,
    });
    // Every piece shares one back plane; thicker pieces stand further forward.
    extruded.translate(0, 0, -FRAME / 2);
    const flat = extruded.index ? extruded.toNonIndexed() : extruded;
    const position = flat.getAttribute("position").array;
    const normal = flat.getAttribute("normal").array;
    parts.push({ position, normal, color: tint(normal, piece) });
    length += position.length;
    extruded.dispose();
    if (flat !== extruded) flat.dispose();
  }
  const position = new Float32Array(length);
  const normal = new Float32Array(length);
  const color = new Float32Array(length);
  let offset = 0;
  for (const part of parts) {
    position.set(part.position, offset);
    normal.set(part.normal, offset);
    color.set(part.color, offset);
    offset += part.position.length;
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(position, 3));
  geometry.setAttribute("normal", new BufferAttribute(normal, 3));
  geometry.setAttribute("color", new BufferAttribute(color, 3));
  return geometry;
}

/**
 * What the glass reflects: a small studio drawn in code, so no image is
 * downloaded. A blue dome keeps every reflection in the brand blues (a stock
 * room environment adds grey walls and a grey floor), and four bright panels
 * make the sharp highlights along the rounded edges.
 *
 * The panels sit where only a tilted surface can mirror them: high overhead,
 * far out to the left, behind on the right, and below. The model turns to the
 * right, so a flat face never points a panel at the viewer, and the faces stay
 * clean.
 */
function studio() {
  const room = new Scene();
  const dome = new SphereGeometry(100, 32, 16);
  const position = dome.getAttribute("position");
  const colors = new Float32Array(position.count * 3);
  // Clear blues, so the walls (seen edge-on, where glass mirrors most) pick up
  // blue sky rather than grey. The panels below are the highlights.
  const top = new Color("#b4c8ff");
  const middle = new Color("#5a88ee");
  const bottom = new Color("#52cbe4");
  // The streams light the emblem from the sides: the far left of the room is the
  // blue of the data stream, the far right the coral of the silk, so the walls
  // and rounded edges that face a stream mirror its colour. Straight ahead (what
  // the faces mirror) is unchanged, so the faces keep the logo's colours.
  const streamBlue = new Color("#2f8ff0");
  const streamCoral = new Color("#f27b6c");
  const color = new Color();
  for (let i = 0; i < position.count; i++) {
    const h = position.getY(i) / 100;
    if (h >= 0) color.copy(middle).lerp(top, h);
    else color.copy(middle).lerp(bottom, -h);
    const side = position.getX(i) / 100; // -1 far left, 1 far right
    const reach = Math.min(1, Math.max(0, (Math.abs(side) - 0.25) / 0.6));
    color.lerp(side < 0 ? streamBlue : streamCoral, reach * reach * (3 - 2 * reach) * 0.85);
    colors.set([color.r, color.g, color.b], i * 3);
  }
  dome.setAttribute("color", new BufferAttribute(colors, 3));
  const domeMaterial = new MeshBasicMaterial({ vertexColors: true, side: BackSide });
  room.add(new Mesh(dome, domeMaterial));

  // Light panels: brighter than white so their reflections read as highlights.
  const panel = new BoxGeometry(1, 1, 1);
  const panelMaterial = new MeshBasicMaterial({ color: new Color(18, 18, 18) });
  const coolMaterial = new MeshBasicMaterial({ color: new Color(6, 12, 15) });
  const warmMaterial = new MeshBasicMaterial({ color: new Color(16, 8, 7) });
  const add = (material: MeshBasicMaterial, x: number, y: number, z: number, w: number, h: number, d: number) => {
    const mesh = new Mesh(panel, material);
    mesh.position.set(x, y, z);
    mesh.scale.set(w, h, d);
    room.add(mesh);
  };
  add(panelMaterial, -10, 88, 22, 70, 4, 34); // overhead
  add(panelMaterial, -88, 14, 26, 4, 60, 30); // far left
  add(warmMaterial, 78, -6, -52, 4, 64, 30); // behind, right: a coral rim on the far edges, from the silk
  add(coolMaterial, -20, -88, 16, 60, 4, 30); // below: turquoise bounce on the lower edges
  const dispose = () => {
    dome.dispose();
    panel.dispose();
    domeMaterial.dispose();
    panelMaterial.dispose();
    coolMaterial.dispose();
    warmMaterial.dispose();
  };
  return { room, dispose };
}

/** A square 2D drawing surface: off-screen where the browser has one (always, in a worker). */
function canvas2d(size: number) {
  if (typeof OffscreenCanvas !== "undefined") {
    const canvas = new OffscreenCanvas(size, size);
    return { canvas, ctx: canvas.getContext("2d")! };
  }
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  return { canvas, ctx: canvas.getContext("2d")! };
}

/**
 * The soft halo: white in the middle, a breath of ice blue further out, solid
 * as far as the emblem reaches and then fading to fully transparent.
 */
function haloTexture() {
  const size = 512;
  const { canvas, ctx } = canvas2d(size);
  const solid = GLOW_SOLID / GLOW_RADIUS;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255, 255, 255, 1)");
  g.addColorStop(solid * 0.7, "rgba(244, 249, 255, 1)");
  g.addColorStop(solid, "rgba(236, 245, 255, 1)");
  g.addColorStop(solid + (1 - solid) * 0.5, "rgba(236, 245, 255, 0.38)");
  g.addColorStop(1, "rgba(236, 245, 255, 0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  // The hero's streams run in from each side, and the glow carries their
  // colours on into the emblem: the blue stream's light blue on the left, the
  // silk's light coral on the right, meeting in white only behind the middle of
  // the mark. So the streams flow into the emblem instead of stopping at a white
  // edge, and its gaps glow with their light. The tint is painted on its own
  // canvas (colour across, fading out above and below the height of the streams)
  // and laid over the halo in one pass; building it up in many faint passes left
  // visible stripes.
  const { canvas: tintCanvas, ctx: tctx } = canvas2d(size);
  const sides = tctx.createLinearGradient(0, 0, size, 0);
  sides.addColorStop(0.02, "rgba(108, 196, 243, 1)");
  sides.addColorStop(0.2, "rgba(150, 214, 248, 0.92)");
  sides.addColorStop(0.36, "rgba(200, 234, 252, 0.6)");
  sides.addColorStop(0.47, "rgba(255, 255, 255, 0)");
  sides.addColorStop(0.53, "rgba(255, 255, 255, 0)");
  sides.addColorStop(0.64, "rgba(252, 222, 216, 0.6)");
  sides.addColorStop(0.8, "rgba(248, 186, 176, 0.92)");
  sides.addColorStop(0.98, "rgba(242, 150, 138, 1)");
  tctx.fillStyle = sides;
  tctx.fillRect(0, 0, size, size);
  const band = tctx.createLinearGradient(0, 0, 0, size);
  band.addColorStop(0.1, "rgba(0, 0, 0, 0)");
  band.addColorStop(0.34, "rgba(0, 0, 0, 1)");
  band.addColorStop(0.68, "rgba(0, 0, 0, 1)");
  band.addColorStop(0.9, "rgba(0, 0, 0, 0)");
  tctx.globalCompositeOperation = "destination-in";
  tctx.fillStyle = band;
  tctx.fillRect(0, 0, size, size);
  ctx.globalCompositeOperation = "source-atop";
  ctx.drawImage(tintCanvas, 0, 0);
  ctx.globalCompositeOperation = "source-over";
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

export type LogoSceneOptions = {
  /** Size of the canvas on the page in CSS pixels, and the pixel ratio to draw at. */
  width: number;
  height: number;
  pixelRatio: number;
  /** Draw the resting pose and never animate. */
  reducedMotion?: boolean;
  /** Called once, after the first frame has been drawn. */
  onReady?: () => void;
  /** Called if WebGL is unavailable or the context is lost. */
  onUnavailable?: () => void;
};

export type LogoScene = {
  resize(width: number, height: number, pixelRatio: number): void;
  /** Animate only while this is true: the emblem is on screen and the tab is visible. */
  setActive(active: boolean): void;
  /** The visitor has taken hold of the emblem. */
  grab(): void;
  /** The visitor has dragged it by this many CSS pixels since the last call. */
  turnBy(dx: number, dy: number): void;
  /** The visitor has let go; after a moment the emblem settles back. */
  release(): void;
  /** The cursor is over the hero, at -1 to 1 from the emblem's centre to the hero's edge (y down). */
  lookAt(x: number, y: number): void;
  /** The cursor has left the hero. */
  lookAway(): void;
  /** Stops the animation and frees every GPU resource. */
  dispose(): void;
};

const NO_SCENE: LogoScene = { resize() {}, setActive() {}, grab() {}, turnBy() {}, release() {}, lookAt() {}, lookAway() {}, dispose() {} };

/** Draws the model into `canvas`. */
export function createLogoScene(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  { width, height, pixelRatio, reducedMotion = false, onReady, onUnavailable }: LogoSceneOptions,
): LogoScene {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    onUnavailable?.();
    return NO_SCENE;
  }
  renderer.outputColorSpace = SRGBColorSpace;
  // No tone mapping: filmic and neutral curves both wash saturated brand blue
  // towards lilac. The lights below are set so nothing needs compressing.
  renderer.toneMapping = NoToneMapping;
  // What is seen through the glass is drawn from a three-quarter-size copy of
  // the scene: no visible difference, and close to half the pixels.
  renderer.transmissionResolutionScale = 0.75;
  // Transparent wherever nothing is drawn, so the page shows through.
  renderer.setClearColor(0x000000, 0);

  const scene = new Scene();

  const camera = new PerspectiveCamera(26, 1, 10, 600);
  camera.position.set(0, 0, CAMERA_DISTANCE);

  /*
    On clear glass a light adds nothing but its mirror highlight, so both lights
    are placed well off to the side: they sparkle on the rounded edges and can
    never line up with a flat face (a straight-on light would wash a whole face
    white each time the model swung to face the viewer).
  */
  const key = new DirectionalLight("#ffffff", 2.6);
  key.position.set(-150, 130, 60);
  scene.add(key);
  // Coral light from behind on the right, the silk's colour, picks out the edges
  // facing away from the key; blue light from the left, the data stream's, the
  // edges facing it. The streams seem to light the emblem they flow into.
  const rim = new DirectionalLight("#ffab9e", 2.2);
  rim.position.set(120, -70, -60);
  scene.add(rim);
  const streamLight = new DirectionalLight("#7cc8ff", 1.6);
  streamLight.position.set(-160, -10, -40);
  scene.add(streamLight);

  /*
    The halo is two layers. The see-through pass draws only solid objects, so a
    solid disc gives the glass its backdrop; it is drawn only in that pass. On
    screen the visitor sees the soft glow instead, a tighter ellipse that lets
    the streams come right up to the emblem.
  */
  // The streams' light in the glass: the disc it looks through is light blue
  // towards the left (the data stream) and light coral towards the right (the silk).
  const backdropGeometry = new CircleGeometry(HALO_SOLID - 1.5, 64);
  {
    const position = backdropGeometry.getAttribute("position");
    const tints = new Float32Array(position.count * 3);
    const centre = new Color("#fbfdff");
    const left = new Color("#d6eaff");
    const right = new Color("#ffded8");
    const shade = new Color();
    for (let i = 0; i < position.count; i++) {
      const x = position.getX(i) / (HALO_SOLID - 1.5); // -1 at the left rim, 1 at the right
      shade.copy(centre).lerp(x < 0 ? left : right, Math.abs(x));
      tints.set([shade.r, shade.g, shade.b], i * 3);
    }
    backdropGeometry.setAttribute("color", new BufferAttribute(tints, 3));
  }
  const backdropMaterial = new MeshBasicMaterial({ vertexColors: true });
  const backdrop = new Mesh(backdropGeometry, backdropMaterial);
  backdrop.position.set(0, 0, -30);
  // The see-through pass draws into a render target; the screen has none. The
  // disc writes colour only in the first.
  backdrop.onBeforeRender = (target) => {
    const seeThrough = target.getRenderTarget() !== null;
    backdropMaterial.colorWrite = seeThrough;
    backdropMaterial.depthWrite = seeThrough;
  };
  scene.add(backdrop);
  const glowMap = haloTexture();
  const glowMaterial = new MeshBasicMaterial({ map: glowMap, transparent: true, depthWrite: false });
  const glow = new Mesh(new PlaneGeometry(GLOW_RADIUS * 2 * GLOW_WIDTH, GLOW_RADIUS * 2), glowMaterial);
  glow.position.set(0, 0, -29.5);
  scene.add(glow);

  /*
    Clear glass. Everything is transmitted, tinted by the vertex colours; the
    thickness bends what is seen through it, and both sides are drawn so the far
    edges of each slab show through its face, which is what reads as solid glass.
  */
  const glass = new MeshPhysicalMaterial({
    color: new Color("#ffffff"),
    vertexColors: true,
    transmission: 1,
    thickness: 9,
    ior: 1.5,
    roughness: 0.05,
    metalness: 0,
    clearcoat: 1,
    clearcoatRoughness: 0.04,
    envMapIntensity: 1.5,
    specularIntensity: 1,
    // A faint light of its own keeps the glass luminous on the pale background.
    emissive: new Color("#2f7bff"),
    emissiveIntensity: 0.04,
    iridescence: 0.35,
    iridescenceIOR: 1.3,
    side: DoubleSide,
  });

  const geometry = buildLogoGeometry();
  const logo = new Mesh(geometry, glass);
  scene.add(logo);

  /*
    Drag to turn. The visitor grabs the emblem and turns it, within DRAG_LIMIT so
    the mark is never seen from behind (where it would read mirrored). On release
    it holds for a moment, then settles back to the resting pose.
  */
  const turn = { x: 0, y: 0 }; // where the visitor has turned it
  const eased = { x: 0, y: 0 }; // what is drawn, catching up smoothly
  let dragging = false;
  let releasedAt = 0;
  /*
    Follow the cursor. While the mouse is over the hero the emblem turns to face
    it, within FOLLOW_LIMIT; when the mouse leaves it settles back. A drag takes
    over while the button is down, and following resumes after the usual hold.
  */
  const gaze = { x: 0, y: 0 }; // the cursor, -1 to 1 from the emblem's centre to the hero's edge
  let following = false;
  /** 1 while the idle sway runs, easing to 0 while the visitor has hold of the emblem. */
  let idle = 1;

  let frame = 0;
  let running = false;
  let ready = false;
  let active = true;
  let disposed = false;
  let started = 0;
  let lastTime = 0;
  let environment: WebGLRenderTarget | undefined;

  function draw(now: number) {
    lastTime = now;
    // Motion eases in from the resting pose.
    const t = reducedMotion ? 0 : (now - started) / 1000;
    const ramp = Math.min(1, t / 1.6);
    // Once the visitor has let go for a moment: face the cursor if it is over the
    // hero, otherwise settle back to the resting pose.
    if (!dragging && now - releasedAt > DRAG_HOLD_MS) {
      const targetX = following ? gaze.y * FOLLOW_LIMIT.pitch : 0;
      const targetY = following ? gaze.x * (gaze.x < 0 ? FOLLOW_LIMIT.left : FOLLOW_LIMIT.right) : 0;
      const rate = following ? 0.07 : 0.045;
      turn.x += (targetX - turn.x) * rate;
      turn.y += (targetY - turn.y) * rate;
    }
    eased.x += (turn.x - eased.x) * 0.2;
    eased.y += (turn.y - eased.y) * 0.2;
    const held = dragging || Math.abs(turn.x) + Math.abs(turn.y) > 0.02;
    idle += ((held ? 0 : 1) - idle) * 0.05;
    // The idle sway is slight (about 3 degrees each way), so the mark stays close to its front view.
    const sway = ramp * idle;
    logo.rotation.y = REST.y + sway * Math.sin(t * 0.5) * 0.055 + eased.y;
    logo.rotation.x = REST.x + sway * Math.sin(t * 0.38) * 0.022 + eased.x;
    logo.position.y = sway * Math.sin(t * 0.85) * 0.8;
    renderer.render(scene, camera);
  }

  const applySize = () => {
    if (!width || !height) return;
    renderer.setPixelRatio(pixelRatio);
    // false: the canvas is laid out by the page's CSS, and has no style in a worker.
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    // Keep the whole mark in frame on a canvas narrower than it is tall.
    camera.position.z = camera.aspect < 0.95 ? CAMERA_DISTANCE / camera.aspect : CAMERA_DISTANCE;
    camera.updateProjectionMatrix();
    if (ready && !running) draw(lastTime);
  };

  const loop = (now: number) => {
    draw(now);
    frame = requestAnimationFrame(loop);
  };
  const start = () => {
    if (running || reducedMotion) return;
    running = true;
    // Resume where the animation paused instead of jumping.
    started = performance.now() - (lastTime - started);
    frame = requestAnimationFrame(loop);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
  };
  const sync = () => (ready && active ? start() : stop());

  const onContextLost = (event: Event) => {
    event.preventDefault();
    ready = false;
    stop();
    onUnavailable?.();
  };
  (canvas as EventTarget).addEventListener("webglcontextlost", onContextLost);

  /*
    Start-up, one step per task:
    1. the studio the glass reflects,
    2. the shaders, compiled in the background where the browser allows it
       (both for the screen and for the see-through pass, which draws the back
       of the glass into an off-screen buffer),
    3. the first frame.
  */
  const init = async () => {
    await nextTask();
    if (disposed) return;
    const pmrem = new PMREMGenerator(renderer);
    const { room, dispose: disposeStudio } = studio();
    environment = pmrem.fromScene(room, 0.03);
    disposeStudio();
    pmrem.dispose();
    scene.environment = environment.texture;

    await nextTask();
    if (disposed) return;
    applySize();
    try {
      const offscreen = new WebGLRenderTarget(4, 4);
      glass.side = BackSide;
      glass.needsUpdate = true;
      renderer.setRenderTarget(offscreen);
      await renderer.compileAsync(scene, camera);
      renderer.setRenderTarget(null);
      offscreen.dispose();
      glass.side = DoubleSide;
      glass.needsUpdate = true;
      await renderer.compileAsync(scene, camera);
    } catch {
      // Without background compiling the first frame compiles the shaders itself.
      renderer.setRenderTarget(null);
      glass.side = DoubleSide;
      glass.needsUpdate = true;
    }
    if (disposed) return;

    ready = true;
    started = performance.now();
    lastTime = started;
    draw(started);
    onReady?.();
    sync();
  };
  init().catch(() => {
    if (!disposed) onUnavailable?.();
  });

  return {
    resize(nextWidth, nextHeight, nextRatio) {
      width = nextWidth;
      height = nextHeight;
      pixelRatio = nextRatio;
      if (!disposed) applySize();
    },
    setActive(next) {
      active = next;
      if (!disposed) sync();
    },
    grab() {
      if (!reducedMotion) dragging = true;
    },
    turnBy(dx, dy) {
      if (!dragging) return;
      // About 30 degrees for every 100px dragged sideways.
      turn.y = Math.max(-DRAG_LIMIT.left, Math.min(DRAG_LIMIT.right, turn.y + dx * 0.0052));
      turn.x = Math.max(-DRAG_LIMIT.up, Math.min(DRAG_LIMIT.up, turn.x + dy * 0.004));
    },
    release() {
      if (!dragging) return;
      dragging = false;
      releasedAt = performance.now();
    },
    lookAt(x, y) {
      if (reducedMotion) return;
      following = true;
      gaze.x = Math.max(-1, Math.min(1, x));
      gaze.y = Math.max(-1, Math.min(1, y));
    },
    lookAway() {
      following = false;
    },
    dispose() {
      disposed = true;
      stop();
      (canvas as EventTarget).removeEventListener("webglcontextlost", onContextLost);
      geometry.dispose();
      glass.dispose();
      backdrop.geometry.dispose();
      backdropMaterial.dispose();
      glow.geometry.dispose();
      glowMaterial.dispose();
      glowMap.dispose();
      environment?.dispose();
      renderer.dispose();
    },
  };
}
