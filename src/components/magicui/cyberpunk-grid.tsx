import { useEffect, useRef } from "react";

interface GridBackgroundProps {
  color?: string;
  opacity?: number;
  spacing?: number;
  className?: string;
}

export const CyberpunkGrid = ({
  color = "#4c61ff",
  opacity = 0.3,
  spacing = 40,
  className = "",
}: GridBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      draw();
    };

    // Initial setup
    handleResize();
    window.addEventListener("resize", handleResize);

    // Drawing function
    function draw() {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Parse the color
      const rgbaColor = color.startsWith("#")
        ? hexToRgba(color, opacity)
        : color;

      // Draw horizontal lines
      ctx.beginPath();
      ctx.strokeStyle = rgbaColor;
      ctx.lineWidth = 1;

      // Horizontal lines
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
      }

      // Vertical lines
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
      }

      ctx.stroke();
    }

    // Helper function to convert hex to rgba
    function hexToRgba(hex: string, alpha: number): string {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [color, opacity, spacing]);

  return (
    <canvas
      ref={canvasRef}
      className={`flex  z-0 ${className}`}
      style={{ pointerEvents: "none" }}
    />
  );
};

export default CyberpunkGrid;
