import { useEffect, useRef } from "react";

interface RadarScanProps {
  size?: number;
  color?: string;
  className?: string;
}

export const RadarScan = ({
  size = 300,
  color = "#4c61ff",
  className = "",
}: RadarScanProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = size;
    canvas.height = size;

    // Center point
    const centerX = size / 2;
    const centerY = size / 2;

    // Radar radius
    const radius = size / 2 - 10;

    // Radar scan angle
    let angle = 0;

    // Radar points (simulated detected objects)
    const points: { x: number; y: number; opacity: number; size: number }[] =
      [];

    // Generate some random points
    for (let i = 0; i < 8; i++) {
      const randomAngle = Math.random() * Math.PI * 2;
      const randomRadius = Math.random() * radius * 0.8;

      points.push({
        x: centerX + Math.cos(randomAngle) * randomRadius,
        y: centerY + Math.sin(randomAngle) * randomRadius,
        opacity: 0,
        size: Math.random() * 4 + 2,
      });
    }

    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, size, size);

      // Draw radar background (dark circle)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      ctx.fill();

      // Draw radar grid lines
      ctx.beginPath();
      for (let i = 1; i <= 3; i++) {
        ctx.arc(centerX, centerY, (radius / 3) * i, 0, Math.PI * 2);
      }

      // Draw crosshairs
      ctx.moveTo(centerX - radius, centerY);
      ctx.lineTo(centerX + radius, centerY);
      ctx.moveTo(centerX, centerY - radius);
      ctx.lineTo(centerX, centerY + radius);

      ctx.strokeStyle = `${color}40`; // 25% opacity
      ctx.stroke();

      // Draw radar scan line
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );

      // Create gradient for scan line
      const gradient = ctx.createLinearGradient(
        centerX,
        centerY,
        centerX + Math.cos(angle) * radius,
        centerY + Math.sin(angle) * radius
      );

      gradient.addColorStop(0, `${color}ff`); // 100% opacity
      gradient.addColorStop(1, `${color}00`); // 0% opacity

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw radar sweep (a fading trail behind the scan line)
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, angle - 0.2, angle);
      ctx.lineTo(centerX, centerY);
      ctx.fillStyle = `${color}30`; // 19% opacity
      ctx.fill();

      // Draw points (detected objects)
      points.forEach((point) => {
        // Calculate angle to the point from center
        const pointAngle = Math.atan2(point.y - centerY, point.x - centerX);

        // Normalize angles for comparison (both in 0-2π range)
        const normalizedScanAngle = angle % (Math.PI * 2);
        const normalizedPointAngle = (pointAngle + Math.PI * 2) % (Math.PI * 2);

        // Check if scan line has passed this point recently
        const angleDiff =
          (normalizedScanAngle - normalizedPointAngle + Math.PI * 2) %
          (Math.PI * 2);

        if (angleDiff < 0.5) {
          // Point was just scanned, make it visible
          point.opacity = 1;
        } else {
          // Point gradually fades
          point.opacity = Math.max(0, point.opacity - 0.005);
        }

        // Only draw points that have some opacity
        if (point.opacity > 0) {
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
          ctx.fillStyle =
            color +
            Math.floor(point.opacity * 255)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();

          // Add a glow effect
          ctx.beginPath();
          ctx.arc(point.x, point.y, point.size + 4, 0, Math.PI * 2);
          ctx.fillStyle =
            color +
            Math.floor(point.opacity * 60)
              .toString(16)
              .padStart(2, "0");
          ctx.fill();
        }
      });

      // Update scan angle for next frame
      angle += 0.01;
      if (angle > Math.PI * 2) {
        angle = 0;
      }

      // Request next frame
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup function
    return () => {
      // Nothing to clean up in this case
    };
  }, [size, color]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={`radar-scan ${className}`}
    />
  );
};

export default RadarScan;
