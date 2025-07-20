"use client";

import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface CosmicBackgroundProps {
  className?: string;
  starCount?: number;
  nebulaColors?: string[];
  speed?: number;
}

export function CosmicBackground({
  className = "",
  starCount = 100,
  nebulaColors = ["#9c40ff", "#864cff", "#667eea", "#764ba2"],
  speed = 1,
}: CosmicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const starsRef = useRef<
    { x: number; y: number; size: number; opacity: number; pulse: number }[]
  >([]);
  const galaxyNoiseRef = useRef<
    { x: number; y: number; size: number; color: string; offset: number }[]
  >([]);
  const timeRef = useRef<number>(0);

  // Initialize canvas and draw the cosmic background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Setup canvas
    ctxRef.current = canvas.getContext("2d", { alpha: true });
    const ctx = ctxRef.current;
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 2; // Make it taller for scrolling
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Generate stars
    const generateStars = () => {
      starsRef.current = [];
      for (let i = 0; i < starCount; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.8 + 0.2,
          pulse: Math.random() * 0.1,
        });
      }
    };

    // Generate galaxy noise points
    const generateGalaxyNoise = () => {
      galaxyNoiseRef.current = [];
      const galaxyCount = 5;
      for (let i = 0; i < galaxyCount; i++) {
        galaxyNoiseRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 200 + 200,
          color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
          offset: Math.random() * 100,
        });
      }
    };

    generateStars();
    generateGalaxyNoise();

    // Animation loop
    let animationFrame: number;

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      timeRef.current += 0.005 * speed;

      // Draw deep space gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#01020e");
      gradient.addColorStop(0.5, "#050b18");
      gradient.addColorStop(1, "#01040f");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw galaxy noise/nebula effect
      galaxyNoiseRef.current.forEach((galaxy) => {
        const glow = ctx.createRadialGradient(
          galaxy.x + Math.sin(timeRef.current + galaxy.offset) * 20,
          galaxy.y + Math.cos(timeRef.current + galaxy.offset) * 20,
          0,
          galaxy.x + Math.sin(timeRef.current + galaxy.offset) * 20,
          galaxy.y + Math.cos(timeRef.current + galaxy.offset) * 20,
          galaxy.size
        );

        glow.addColorStop(0, `${galaxy.color}30`);
        glow.addColorStop(0.5, `${galaxy.color}10`);
        glow.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(
          galaxy.x + Math.sin(timeRef.current + galaxy.offset) * 20,
          galaxy.y + Math.cos(timeRef.current + galaxy.offset) * 20,
          galaxy.size,
          0,
          Math.PI * 2
        );
        ctx.fill();
      });

      // Draw stars with pulsing effect
      starsRef.current.forEach((star) => {
        const pulseFactor =
          1 + Math.sin(timeRef.current * 3 + star.pulse) * 0.2;

        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * pulseFactor})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * pulseFactor, 0, Math.PI * 2);
        ctx.fill();

        // Add glow to larger stars
        if (star.size > 1) {
          ctx.shadowBlur = 10;
          ctx.shadowColor = "rgba(255, 255, 255, 0.5)";
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // Draw occasional shooting star
      if (Math.random() < 0.01) {
        const shootingStar = {
          x: Math.random() * canvas.width,
          y: (Math.random() * canvas.height) / 3,
          length: Math.random() * 150 + 50,
          angle: Math.PI / 4 + (Math.random() * Math.PI) / 8,
        };

        ctx.strokeStyle = "rgba(255, 255, 255, 0.8)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(shootingStar.x, shootingStar.y);
        ctx.lineTo(
          shootingStar.x + Math.cos(shootingStar.angle) * shootingStar.length,
          shootingStar.y + Math.sin(shootingStar.angle) * shootingStar.length
        );
        ctx.stroke();

        // Add glow to shooting star
        ctx.shadowBlur = 10;
        ctx.shadowColor = "white";
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, [starCount, nebulaColors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "fixed top-0 left-0 w-full h-full pointer-events-none",
        className
      )}
      style={{ zIndex: 0 }}
    />
  );
}
