"use client";

import { animate } from "motion";
import React, { useEffect, useRef } from "react";

const ShinyButton = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (buttonRef.current) {
      animate(
        buttonRef.current,
        { ["--border-x" as string]: ["80%", "100%", "120%", "80%"] },
        { duration: 2, repeat: Infinity, easing: "linear" }
      );
      animate(
        buttonRef.current,
        { scale: [1, 1.2, 1] },
        { duration: 1, repeat: Infinity }
      );
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      className="relative font-medium text-white bg-gray-900 overflow-hidden rounded-lg p-[1px]"
      style={
        {
          "--border-x": "0%",
          position: "relative",
        } as React.CSSProperties
      }>
      {/* Button Text */}
      <span className="relative z-10 text-sm uppercase tracking-wide">
        {children}
      </span>

      {/* Glowing Border Effect */}
      <span
        className="absolute inset-[1px] block p-px rounded-lg"
        style={{
          background: `linear-gradient(
            90deg,
            transparent calc(var(--border-x) - 10%),
            rgba(192,192,192,1) var(--border-x),
            transparent calc(var(--border-x) + 10%)
          )`,
          mask: "linear-gradient(rgb(0,0,0) 0 0) content-box, linear-gradient(rgb(0,0,0) 0 0)",
          maskComposite: "exclude",
        }}></span>
    </button>
  );
};

export default ShinyButton;
