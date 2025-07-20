import { useState, useEffect, ReactNode } from "react";

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
      className={`font-mono p-4 rounded bg-black/80 border border-[#4c61ff] ${className}`}
    >
      <div className="flex items-center mb-2 border-b border-[#4c61ff]/30 pb-1">
        <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <div className="ml-auto text-xs text-[#4c61ff]">terminal@user:~</div>
      </div>
      <div className="text-[#4c61ff]">
        <span className="text-[#ba71ff]">$ </span>
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
