import { useEffect, useRef, useState } from "react";
import ReactConfetti from "react-confetti";

const Confetticomponent = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [countdown, setCountdown] = useState(5);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (showConfetti) {
      setCountdown(5);

      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setShowConfetti(false);
            return 5;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [showConfetti]);

  return (
    <>
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
        {showConfetti && (
          <span
            aria-live="polite"
            className="rounded-full border border-zinc-800 bg-zinc-950/90 px-2 py-1 font-mono text-xs text-zinc-400"
          >
            {countdown}s
          </span>
        )}
        <button
          onClick={() => setShowConfetti((prev) => !prev)}
          aria-label="You found it"
          data-testid="confetti-egg"
          className="group flex h-8 w-8 items-center justify-center"
        >
          {showConfetti ? (
            <span className="animate-egg-pop text-base">🎉</span>
          ) : (
            /* Disguised as one more dot from the hero's dot-grid; grows and
               brightens on hover as the only hint it's interactive. */
            <span className="h-[3px] w-[3px] rounded-full bg-white/20 transition-all duration-300 group-hover:h-2 group-hover:w-2 group-hover:bg-white/70" />
          )}
        </button>
      </div>

      {showConfetti && (
        <ReactConfetti
          width={dimensions.width}
          height={dimensions.height}
          gravity={0.3}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            pointerEvents: "none",
            zIndex: 9999,
          }}
        />
      )}
    </>
  );
};

export default Confetticomponent;
