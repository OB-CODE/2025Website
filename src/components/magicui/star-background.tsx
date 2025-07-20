"use client";

import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface StarBackgroundProps {
  className?: string;
  density?: number;
  color?: string;
}

export function StarBackground({
  className = "",
  density = 0.0003,
  color = "rgba(186, 113, 255, 0.5)",
}: StarBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      drawStars();
    };

    // Draw stars
    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(20, 21, 22, 0.9)");
      gradient.addColorStop(1, "rgba(8, 9, 10, 0.9)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Stars
      const totalStars = Math.floor(canvas.width * canvas.height * density);

      for (let i = 0; i < totalStars; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 1.5;
        const opacity = Math.random() * 0.8 + 0.2;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(")", `, ${opacity})`);
        ctx.fill();

        // Add glow to some stars
        if (Math.random() > 0.8) {
          ctx.beginPath();
          ctx.arc(x, y, radius + 1, 0, Math.PI * 2);
          ctx.fillStyle = color.replace(")", ", 0.2)");
          ctx.fill();
        }
      }

      // Add a subtle purple nebula effect
      for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 100 + 50;

        const glow = ctx.createRadialGradient(x, y, 0, x, y, radius);
        glow.addColorStop(0, "rgba(186, 113, 255, 0.1)");
        glow.addColorStop(0.5, "rgba(76, 97, 255, 0.05)");
        glow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [density, color]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 -z-10 ", className)}
      style={{ opacity: 0.9 }} // Ensure we can see content on top
    />
  );
}
