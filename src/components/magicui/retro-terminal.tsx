import { useState, useEffect, ReactNode } from "react";
import { prefersReducedMotion } from "../../lib/utils";

interface TerminalTextProps {
  children: string;
  typingSpeed?: number;
  startDelay?: number;
  className?: string;
}

export const RetroTerminal = ({
  children,
  typingSpeed = 30,
  startDelay = 300,
  className = "",
}: TerminalTextProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    // Skip the typing animation entirely for users who prefer reduced motion
    if (prefersReducedMotion()) {
      setDisplayedText(children.toString());
      setShowCursor(false);
      return;
    }

    // Start typing after the specified delay
    const timeout = setTimeout(() => {
      setIsTyping(true);

      let currentIndex = 0;
      const textContent = children.toString();

      const typingInterval = setInterval(() => {
        if (currentIndex < textContent.length) {
          setDisplayedText(textContent.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, typingSpeed);

      return () => {
        clearInterval(typingInterval);
      };
    }, startDelay);

    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);

    return () => {
      clearTimeout(timeout);
      clearInterval(cursorInterval);
    };
  }, [children, typingSpeed, startDelay]);

  return (
    <div
      className={`overflow-hidden rounded-lg border border-zinc-800 bg-zinc-950 font-mono text-sm ${className}`}
    >
      <div className="flex items-center gap-1.5 border-b border-zinc-800 bg-zinc-900/60 px-4 py-2.5">
        <div className="h-2.5 w-2.5 rounded-full bg-red-500/80"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/80"></div>
        <div className="h-2.5 w-2.5 rounded-full bg-green-500/80"></div>
        <div className="ml-auto text-xs text-zinc-500">terminal@user:~</div>
      </div>
      <div className="whitespace-pre-wrap p-4 text-left text-zinc-300">
        <span className="text-emerald-400">$ </span>
        {displayedText}
        {(isTyping || showCursor) && <span className="animate-pulse">|</span>}
      </div>
    </div>
  );
};

interface TerminalWindowProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

export const TerminalWindow = ({
  children,
  title = "terminal@user:~",
  className = "",
}: TerminalWindowProps) => {
  return (
    <div
      className={`font-mono rounded bg-black/80 border border-[#4c61ff] overflow-hidden ${className}`}
    >
      <div className="flex items-center px-4 py-2 bg-black border-b border-[#4c61ff]/30">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-auto text-xs text-[#4c61ff]">{title}</div>
      </div>
      <div className="p-4 text-[#4c61ff] overflow-auto max-h-[80vh]">
        {children}
      </div>
    </div>
  );
};

export default RetroTerminal;
