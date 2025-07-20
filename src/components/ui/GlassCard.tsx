"use client";

import { cn } from "../../lib/utils";
import React, { useRef, useState } from "react";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "dark" | "light";
  glowColor?: string;
  borderHighlight?: boolean;
  className?: string;
  interactive?: boolean;
  glowIntensity?: number;
}

export function GlassCard({
  children,
  variant = "primary",
  glowColor = "rgba(186, 113, 255, 0.5)",
  borderHighlight = true,
  className,
  interactive = true,
  glowIntensity = 0.15,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive || !cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    // Calculate relative position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });
  };

  const variants = {
    primary: "bg-black/40 border-purple-500/30 backdrop-blur-md",
    secondary: "bg-gray-900/30 border-blue-500/30 backdrop-blur-md",
    dark: "bg-black/60 border-gray-700/40 backdrop-blur-lg",
    light: "bg-white/10 border-white/30 backdrop-blur-md",
  };

  const handleMouseEnter = () => {
    if (!interactive) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    if (!interactive) return;
    setIsHovering(false);
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl border overflow-hidden transition-all duration-200",
        variants[variant],
        interactive && "transform perspective-1000",
        interactive && isHovering && "shadow-lg scale-[1.01]",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform:
          interactive && isHovering && cardRef.current
            ? `perspective(1000px) rotateX(${
                (position.y - (cardRef.current?.offsetHeight || 0) / 2) / 30
              }deg) rotateY(${
                -(position.x - (cardRef.current?.offsetWidth || 0) / 2) / 30
              }deg)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
        transition: "transform 0.1s ease",
      }}
      {...props}
    >
      {/* Subtle inner glow effect */}
      {interactive && isHovering && (
        <div
          className="absolute inset-0 pointer-events-none opacity-50 mix-blend-soft-light"
          style={{
            background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${glowColor}, transparent 40%)`,
            opacity: glowIntensity,
          }}
        />
      )}

      {/* Shiny edge highlight effect */}
      {borderHighlight && (
        <div className="absolute inset-0 rounded-2xl pointer-events-none overflow-hidden">
          <div
            className="w-full h-full opacity-0 absolute top-0 transition-opacity duration-300"
            style={{
              opacity: isHovering ? 0.3 : 0,
              background: `linear-gradient(45deg, transparent, ${glowColor}, transparent)`,
              backgroundSize: "200% 200%",
              animation: isHovering ? "shine 3s linear infinite" : "none",
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
