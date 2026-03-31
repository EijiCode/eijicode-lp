"use client";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

export default function ShinyText({ text, className = "", speed = 3 }: ShinyTextProps) {
  return (
    <>
      <style>{`
        .shiny-text-ui {
          background: linear-gradient(
            90deg,
            var(--text2) 0%,
            var(--text2) 30%,
            #5bc8f5 50%,
            var(--text2) 70%,
            var(--text2) 100%
          );
          background-size: 200% auto;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shiny-slide ${speed}s linear infinite;
        }
        @keyframes shiny-slide {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
      `}</style>
      <span className={`shiny-text-ui ${className}`}>{text}</span>
    </>
  );
}
