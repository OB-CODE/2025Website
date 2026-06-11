import React from "react";
import { cn } from "../../lib/utils";

interface CyberButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
}

const variants = {
  primary:
    "border-nebula/50 bg-nebula/15 hover:bg-nebula/30 hover:border-nebula hover:shadow-[0_0_18px_rgba(76,97,255,0.45)]",
  ghost:
    "border-aurora/40 bg-transparent hover:bg-aurora/15 hover:border-aurora hover:shadow-[0_0_18px_rgba(186,113,255,0.35)]",
  danger:
    "border-red-500/50 bg-red-500/15 hover:bg-red-500/30 hover:border-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.45)]",
};

/** Shared space-themed button: glassy with a neon border glow on hover. */
const CyberButton = ({
  variant = "primary",
  className,
  children,
  ...props
}: CyberButtonProps) => {
  return (
    <button
      className={cn(
        "relative rounded-lg border px-5 py-2 text-sm font-medium uppercase tracking-wider text-white backdrop-blur-sm transition-all duration-200 active:scale-95",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default CyberButton;
