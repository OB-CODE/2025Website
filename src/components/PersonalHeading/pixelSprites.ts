/**
 * Pixel-art sprite data for the hero walker (see PixelWalker.tsx).
 *
 * Each frame is an array of equal-length rows; every character maps to a
 * colour in PALETTE, and "." is transparent. Sprites are drawn facing right —
 * the component mirrors them with scaleX(-1) to walk the other way.
 */

export const PALETTE: Record<string, string> = {
  s: "#f1c9a5", // skin
  e: "#27272a", // eye / facial detail
  t: "#6b7280", // shirt
  T: "#4b5563", // shirt shadow
  p: "#3f4a63", // jeans (near leg)
  P: "#2f3a4f", // jeans (far leg)
  b: "#52525b", // shoe (near)
  B: "#3f3f46", // shoe (far)
  l: "#a1a1aa", // laptop shell
  L: "#71717a", // laptop underside
  g: "#6ee7b7", // laptop screen glow — matches the code card's emerald
  d: "#a0714a", // dog fur
  D: "#7d5535", // dog fur shadow
  n: "#27272a", // dog nose
  y: "#1f1f22", // dog eye
};

export const MAN_WIDTH = 14;
export const MAN_HEIGHT = 18;
export const DOG_WIDTH = 16;
export const DOG_HEIGHT = 14;

/**
 * Head-to-waist rows shared by every side-on walking frame: bald head facing
 * right, near arm hanging down, laptop carried at the hip.
 */
const MAN_SIDE_UPPER = [
  "....ssss......",
  "...ssssss.....",
  "...ssssss.....",
  "...sssses.....",
  "...ssssss.....",
  "....ssss......",
  ".....ss.......",
  "..tttttttt....",
  "..Ttttttttll..",
  "..Tttttttsgl..",
  "..Tttttttsll..",
  "...pppppp.LL..",
];

/** Legs mid-stride, near leg leading. */
const MAN_LEGS_STRIDE_A = [
  "...PP.pp......",
  "..PP...pp.....",
  "..PP....pp....",
  ".PP.....pp....",
  ".PP......pp...",
  "BBB......bb...",
];

/** Legs passing under the body. */
const MAN_LEGS_PASS = [
  "...pppp.......",
  "...pppp.......",
  "...pppp.......",
  "...pp.PP......",
  "...pp.PP......",
  "..bbb.BB......",
];

/** Legs mid-stride, far leg leading. */
const MAN_LEGS_STRIDE_B = [
  "...pp.PP......",
  "..pp...PP.....",
  "..pp....PP....",
  ".pp.....PP....",
  ".pp......PP...",
  "bbb......BB...",
];

/** Four-step walk cycle: stride, pass, opposite stride, pass. */
export const MAN_WALK_FRAMES = [
  [...MAN_SIDE_UPPER, ...MAN_LEGS_STRIDE_A],
  [...MAN_SIDE_UPPER, ...MAN_LEGS_PASS],
  [...MAN_SIDE_UPPER, ...MAN_LEGS_STRIDE_B],
  [...MAN_SIDE_UPPER, ...MAN_LEGS_PASS],
];

/** Facing the viewer, laptop open — head down to the shirt. */
const MAN_FRONT_UPPER = [
  "....ssss......",
  "...ssssss.....",
  "...ssssss.....",
  "...sesses.....",
  "...ssssss.....",
  "....sees......",
  ".....ss.......",
  "..tttttttt....",
  "..TttttttT....",
];

/** Standing legs, shared by both typing frames. */
const MAN_FRONT_LEGS = [
  "...pppppp.....",
  "...pp..pp.....",
  "...pp..pp.....",
  "...pp..pp.....",
  "...pp..pp.....",
  "..bbb..bbb....",
];

/** Typing: hands alternate between the keyboard and mid-air. */
export const MAN_TYPE_FRAMES = [
  [
    ...MAN_FRONT_UPPER,
    "...llllllll...",
    "...lggggggl...",
    "..slllllllls..",
    ...MAN_FRONT_LEGS,
  ],
  [
    ...MAN_FRONT_UPPER,
    "...llllllll...",
    "..slggggggl...",
    "...lllllllls..",
    ...MAN_FRONT_LEGS,
  ],
];

/**
 * Head, back and tail shared by the walking dog — a shaggy brown groodle with
 * a floppy ear (the darker column behind the muzzle) and a tail held high.
 */
const DOG_WALK_UPPER = [
  "...........ddd..",
  "..........ddddd.",
  "d.........Ddddd.",
  "dd........Dddyd.",
  ".dd.......Dddddn",
  ".dddddddddddddd.",
  "..ddddddddddd...",
  "..dddddddddd....",
  "..DDDDDDDDDD....",
  "...dd....dd.....",
];

export const DOG_WALK_FRAMES = [
  [
    ...DOG_WALK_UPPER,
    "..dd......dd....",
    "..dd......dd....",
    ".dd........dd...",
    "ddd........ddd..",
  ],
  [
    ...DOG_WALK_UPPER,
    "....dd..dd......",
    "....dd..dd......",
    "....dd..dd......",
    "...ddd..ddd.....",
  ],
];

/** Head and chest shared by the sitting dog. */
const DOG_SIT_HEAD = [
  "...........ddd..",
  "..........ddddd.",
  "..........Ddddd.",
  "..........Dddyd.",
  "..........Dddddn",
  "........ddddddd.",
  ".......dddddd...",
];

/** Haunches on the ground, front legs straight — shared by both wag frames. */
const DOG_SIT_BASE = [
  "..DDDDDDD.dd....",
  "..DDDDDD..dd....",
  "..dddddd..ddd...",
];

/** Sitting: the tail sweeps between the two frames to read as a wag. */
export const DOG_SIT_FRAMES = [
  [
    ...DOG_SIT_HEAD,
    "d....dddddddd...",
    "d..dddddddd.....",
    "..dddddddddd....",
    "..dddddddddd....",
    ...DOG_SIT_BASE,
  ],
  [
    ...DOG_SIT_HEAD,
    ".....dddddddd...",
    "...dddddddd.....",
    "d.dddddddddd....",
    "d.dddddddddd....",
    ...DOG_SIT_BASE,
  ],
];

export interface PixelRun {
  x: number;
  y: number;
  width: number;
  fill: string;
}

/**
 * Collapse a frame into horizontal runs of same-coloured pixels so each row
 * costs a handful of <rect>s instead of one per pixel.
 */
export const frameToRuns = (rows: string[]): PixelRun[] => {
  const runs: PixelRun[] = [];

  rows.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const char = row[x];
      if (char === ".") {
        x += 1;
        continue;
      }
      let width = 1;
      while (row[x + width] === char) width += 1;
      runs.push({ x, y, width, fill: PALETTE[char] });
      x += width;
    }
  });

  return runs;
};
