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
      className={`relative overflow-hidden rounded-lg p-4 transition duration-300 bg-black border-[0.1px] border-purple-500 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}>
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background: useMotionTemplate`
            radial-gradient(${glowSize}px circle at ${mouseX}px ${mouseY}px, ${glowColor}, transparent 80%)
          `,
          opacity: 0.5,
        }}
      />
      <div className="relative z-10 text-white">{children}</div>
    </div>
  );
};

export default GlowCard;
