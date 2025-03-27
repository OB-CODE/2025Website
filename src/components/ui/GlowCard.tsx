import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import React, { useRef, useCallback, useEffect, ReactNode } from "react";

const GlowCard = ({
  children,
  className,
  glowSize = 150,
  glowColor = "gray",
}: {
  children: ReactNode;
  className: unknown;
  glowSize: number;
  glowColor: string;
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const mouseX = useMotionValue(-glowSize);
  const mouseY = useMotionValue(-glowSize);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
      }
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(-glowSize);
    mouseY.set(-glowSize);
  }, [mouseX, mouseY, glowSize]);

  useEffect(() => {
    mouseX.set(-glowSize);
    mouseY.set(-glowSize);
  }, [glowSize, mouseX, mouseY]);

  return (
    <div
      ref={cardRef}
      className={`relative rounded-lg transition duration-300 h-full min-h-[40vh] bg-black border-[0.1px] border-purple-500 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      {/* Glow effect */}
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)
          `,
          opacity: 0.5,
          height: "100%",
        }}
      />

      {/* Content inside the card */}
      <div className="relative z-10 w-full min-h-[40vh] h-full text-white flex-grow flex flex-col">
        {children}
      </div>
    </div>
  );
};

export default GlowCard;
