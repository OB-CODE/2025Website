"use client";

import React, { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

interface DataGridProps {
  className?: string;
  columns?: number;
  rows?: number;
  cellSize?: number;
  color?: string;
  speed?: number;
  density?: number;
  interactive?: boolean;
}

export function DataGrid({
  className = "",
  columns = 20,
  rows = 10,
  cellSize = 20,
  color = "#4c61ff",
  speed = 1,
  density = 0.2,
  interactive = true,
}: DataGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gridRef = useRef<{
    cells: {
      active: boolean;
      value: string;
      opacity: number;
      lifetime: number;
    }[][];
    hoverCell: { x: number; y: number } | null;
  }>({
    cells: [],
    hoverCell: null,
  });

  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: -1,
    y: -1,
  });

  // Initialize and animate the grid
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas dimensions
    const updateCanvasSize = () => {
      canvas.width = columns * cellSize;
      canvas.height = rows * cellSize;
    };
    updateCanvasSize();

    // Initialize grid
    const initGrid = () => {
      const cells = Array(rows)
        .fill(0)
        .map(() =>
          Array(columns)
            .fill(0)
            .map(() => ({
              active: Math.random() < density,
              value:
                Math.random() > 0.8
                  ? Math.random().toString(36).substring(2, 3)
                  : Math.random() > 0.5
                  ? "1"
                  : "0",
              opacity: Math.random() * 0.5 + 0.2,
              lifetime: Math.random() * 100 + 10,
            }))
        );

      gridRef.current = { cells, hoverCell: null };
    };
    initGrid();

    // Animation loop
    let animationId: number;
    let frameCount = 0;

    const animate = () => {
      frameCount++;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw cells
      gridRef.current.cells.forEach((row, y) => {
        row.forEach((cell, x) => {
          if (!cell.active && Math.random() < 0.002 * speed) {
            // Randomly activate cells
            gridRef.current.cells[y][x].active = true;
            gridRef.current.cells[y][x].lifetime = Math.random() * 100 + 20;
          }

          if (cell.active) {
            // Update lifetime and potentially deactivate
            gridRef.current.cells[y][x].lifetime -= 0.5 * speed;
            if (gridRef.current.cells[y][x].lifetime <= 0) {
              gridRef.current.cells[y][x].active = false;
            }

            // Change values randomly
            if (frameCount % 15 === 0 && Math.random() < 0.3) {
              gridRef.current.cells[y][x].value =
                Math.random() > 0.8
                  ? Math.random().toString(36).substring(2, 3)
                  : Math.random() > 0.5
                  ? "1"
                  : "0";
            }

            // Draw active cell
            const hoverEffect =
              gridRef.current.hoverCell &&
              gridRef.current.hoverCell.x === x &&
              gridRef.current.hoverCell.y === y;

            let cellOpacity = cell.opacity;
            let cellColor = color;

            if (hoverEffect) {
              cellOpacity = 1;
              cellColor = "#ba71ff";
            }

            // Draw background
            ctx.fillStyle = `${cellColor}${Math.floor(
              cellOpacity * 20
            ).toString(16)}`;
            ctx.fillRect(
              x * cellSize + 1,
              y * cellSize + 1,
              cellSize - 2,
              cellSize - 2
            );

            // Draw text
            ctx.fillStyle = `${cellColor}${Math.floor(
              cellOpacity * 255
            ).toString(16)}`;
            ctx.font = `${cellSize * 0.6}px monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(
              cell.value,
              x * cellSize + cellSize / 2,
              y * cellSize + cellSize / 2
            );
          }
        });
      });

      // Interactive effect - ripple around mouse position
      if (interactive && mousePos.x >= 0 && mousePos.y >= 0) {
        const cellX = Math.floor(mousePos.x / cellSize);
        const cellY = Math.floor(mousePos.y / cellSize);

        // Update hover cell
        gridRef.current.hoverCell = { x: cellX, y: cellY };

        // Activate cells in a radius around mouse
        const radius = 2;
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            const nx = cellX + dx;
            const ny = cellY + dy;

            if (nx >= 0 && nx < columns && ny >= 0 && ny < rows) {
              const distance = Math.sqrt(dx * dx + dy * dy);
              if (distance <= radius && !gridRef.current.cells[ny][nx].active) {
                gridRef.current.cells[ny][nx].active = true;
                gridRef.current.cells[ny][nx].lifetime =
                  Math.random() * 50 + 50;
              }
            }
          }
        }
      } else {
        gridRef.current.hoverCell = null;
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [
    cellSize,
    color,
    columns,
    density,
    rows,
    speed,
    interactive,
    mousePos.x,
    mousePos.y,
  ]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!interactive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1, y: -1 });
  };

  return (
    <canvas
      ref={canvasRef}
      className={cn("rounded-lg", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ cursor: interactive ? "crosshair" : "default" }}
    />
  );
}
