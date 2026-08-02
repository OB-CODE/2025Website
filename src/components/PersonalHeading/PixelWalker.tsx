import { useEffect, useRef, useState, type ReactElement } from "react";
import {
  DOG_HEIGHT,
  DOG_SIT_FRAMES,
  DOG_WALK_FRAMES,
  DOG_WIDTH,
  MAN_HEIGHT,
  MAN_TYPE_FRAMES,
  MAN_WALK_FRAMES,
  MAN_WIDTH,
  frameToRuns,
} from "./pixelSprites";

const PIXEL = 3; // css pixels per sprite pixel
const WALK_SPEED = 26; // css px per second
const DOG_SPEED = WALK_SPEED * 1.3; // the dog can trot to catch up
const WALK_FPS = 7;
const TYPE_FPS = 5;
const WAG_FPS = 6;
const STOP_DISTANCE = 130; // px walked before pausing for a typing break
const TYPE_SECONDS = 3.4;
const DOG_GAP = DOG_WIDTH * PIXEL + 8; // px the dog trails behind the man

const MAN_PX_WIDTH = MAN_WIDTH * PIXEL;
const DOG_PX_WIDTH = DOG_WIDTH * PIXEL;

/** Pre-render each frame's <rect> runs once — the frames never change. */
const toRects = (frames: string[][]): ReactElement[][] =>
  frames.map((frame) =>
    frameToRuns(frame).map((run) => (
      <rect
        key={`${run.x}-${run.y}`}
        x={run.x}
        y={run.y}
        width={run.width}
        height={1}
        fill={run.fill}
      />
    ))
  );

const MAN_WALK_RECTS = toRects(MAN_WALK_FRAMES);
const MAN_TYPE_RECTS = toRects(MAN_TYPE_FRAMES);
const DOG_WALK_RECTS = toRects(DOG_WALK_FRAMES);
const DOG_SIT_RECTS = toRects(DOG_SIT_FRAMES);

interface SpriteProps {
  rects: ReactElement[];
  width: number;
  height: number;
  facingLeft: boolean;
}

const Sprite = ({ rects, width, height, facingLeft }: SpriteProps) => (
  <svg
    viewBox={`0 0 ${width} ${height}`}
    width={width * PIXEL}
    height={height * PIXEL}
    shapeRendering="crispEdges"
    style={{ transform: facingLeft ? "scaleX(-1)" : undefined }}
  >
    {rects}
  </svg>
);

interface Pose {
  typing: boolean;
  manFrame: number;
  facingLeft: boolean;
  sitting: boolean;
  dogFrame: number;
  dogFacingLeft: boolean;
}

const INITIAL_POSE: Pose = {
  typing: true,
  manFrame: 0,
  facingLeft: false,
  sitting: true,
  dogFrame: 0,
  dogFacingLeft: false,
};

const samePose = (a: Pose, b: Pose) =>
  a.typing === b.typing &&
  a.manFrame === b.manFrame &&
  a.facingLeft === b.facingLeft &&
  a.sitting === b.sitting &&
  a.dogFrame === b.dogFrame &&
  a.dogFacingLeft === b.dogFacingLeft;

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * A pixel-art developer pacing above the hero code card: he walks end to end,
 * stops to face the viewer and type on his laptop, then walks on. His groodle
 * follows — trotting while he walks, sitting and wagging while he types.
 *
 * Purely decorative, so it's hidden from assistive tech and freezes into a
 * standing pose when the visitor prefers reduced motion.
 */
const PixelWalker = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const manRef = useRef<HTMLDivElement>(null);
  const dogRef = useRef<HTMLDivElement>(null);
  const [pose, setPose] = useState<Pose>(INITIAL_POSE);

  useEffect(() => {
    const track = trackRef.current;
    const man = manRef.current;
    const dog = dogRef.current;
    if (!track || !man || !dog) return;

    let trackWidth = track.clientWidth;
    const manLimit = () => Math.max(trackWidth - MAN_PX_WIDTH, 0);
    const dogLimit = () => Math.max(trackWidth - DOG_PX_WIDTH, 0);

    const walker = {
      x: Math.min(trackWidth * 0.2, manLimit()),
      dir: 1,
      typing: true,
      timer: TYPE_SECONDS,
      walked: 0,
      dogX: 0,
      dogDir: 1,
      clock: 0,
    };
    walker.dogX = clamp(walker.x - DOG_GAP, 0, dogLimit());

    const draw = () => {
      man.style.transform = `translate3d(${walker.x}px, 0, 0)`;
      dog.style.transform = `translate3d(${walker.dogX}px, 0, 0)`;
    };
    draw();

    // Guarded so the component still renders under jsdom / non-DOM runtimes.
    const observer =
      typeof ResizeObserver === "undefined"
        ? null
        : new ResizeObserver(() => {
            trackWidth = track.clientWidth;
            walker.x = clamp(walker.x, 0, manLimit());
            walker.dogX = clamp(walker.dogX, 0, dogLimit());
            draw();
          });
    observer?.observe(track);

    const stillness = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (stillness?.matches) return () => observer?.disconnect();

    let frame = 0;
    let previous = performance.now();
    let committed = INITIAL_POSE;

    const tick = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05); // ignore tab-away gaps
      previous = now;
      walker.clock += dt;

      if (walker.typing) {
        walker.timer -= dt;
        if (walker.timer <= 0) {
          walker.typing = false;
          walker.walked = 0;
        }
      } else {
        const step = WALK_SPEED * dt;
        walker.x += walker.dir * step;
        walker.walked += step;

        if (walker.x >= manLimit()) {
          walker.x = manLimit();
          walker.dir = -1;
          walker.typing = true;
          walker.timer = TYPE_SECONDS;
        } else if (walker.x <= 0) {
          walker.x = 0;
          walker.dir = 1;
          walker.typing = true;
          walker.timer = TYPE_SECONDS;
        } else if (walker.walked >= STOP_DISTANCE) {
          walker.typing = true;
          walker.timer = TYPE_SECONDS;
        }
      }

      // The dog aims for a spot just behind whichever way the man is heading —
      // or, when he's backed against an end of the track, just in front of him
      // so the two never end up clamped onto the same spot.
      const behind = walker.x - walker.dir * DOG_GAP;
      const fitsBehind = behind >= 0 && behind <= dogLimit();
      const target = clamp(
        fitsBehind ? behind : walker.x + walker.dir * DOG_GAP,
        0,
        dogLimit()
      );
      const gap = target - walker.dogX;
      const move = clamp(gap, -DOG_SPEED * dt, DOG_SPEED * dt);
      walker.dogX += move;
      const dogMoving = Math.abs(move) > 0.15;
      if (dogMoving) walker.dogDir = Math.sign(move);

      draw();

      const next: Pose = {
        typing: walker.typing,
        manFrame: walker.typing
          ? Math.floor(walker.clock * TYPE_FPS) % MAN_TYPE_RECTS.length
          : Math.floor(walker.clock * WALK_FPS) % MAN_WALK_RECTS.length,
        facingLeft: walker.typing ? false : walker.dir < 0,
        sitting: !dogMoving && walker.typing,
        dogFrame:
          !dogMoving && walker.typing
            ? Math.floor(walker.clock * WAG_FPS) % DOG_SIT_RECTS.length
            : Math.floor(walker.clock * WALK_FPS) % DOG_WALK_RECTS.length,
        dogFacingLeft: walker.dogDir < 0,
      };

      if (!samePose(next, committed)) {
        committed = next;
        setPose(next);
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      data-testid="pixelWalker"
      ref={trackRef}
      className="relative w-full overflow-hidden"
      style={{ height: MAN_HEIGHT * PIXEL }}
    >
      <div ref={dogRef} className="absolute bottom-0 left-0 will-change-transform">
        <Sprite
          rects={pose.sitting ? DOG_SIT_RECTS[pose.dogFrame] : DOG_WALK_RECTS[pose.dogFrame]}
          width={DOG_WIDTH}
          height={DOG_HEIGHT}
          facingLeft={pose.dogFacingLeft}
        />
      </div>

      <div ref={manRef} className="absolute bottom-0 left-0 will-change-transform">
        <Sprite
          rects={pose.typing ? MAN_TYPE_RECTS[pose.manFrame] : MAN_WALK_RECTS[pose.manFrame]}
          width={MAN_WIDTH}
          height={MAN_HEIGHT}
          facingLeft={pose.facingLeft}
        />
      </div>
    </div>
  );
};

export default PixelWalker;
