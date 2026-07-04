import React from "react";
import { cn } from "../../lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "destructive";
  size?: "default" | "sm" | "lg";
}

const variants = {
  default:
    "bg-zinc-50 text-zinc-900 hover:bg-zinc-200 border border-transparent",
  outline:
    "border border-zinc-800 bg-transparent text-zinc-100 hover:bg-zinc-900 hover:border-zinc-700",
  ghost: "border border-transparent text-zinc-300 hover:bg-zinc-900 hover:text-zinc-50",
  destructive:
    "border border-transparent bg-red-900/60 text-red-100 hover:bg-red-900",
};

const sizes = {
  default: "h-9 px-4 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-10 px-6 text-sm",
};

/** Minimal shadcn-style button. */
const Button = ({
  variant = "default",
  size = "default",
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-500 disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
