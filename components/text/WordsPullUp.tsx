"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  shiny?: boolean;
}

export default function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
  shiny = false,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={`relative inline-block${shiny ? " shiny-text" : ""}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
        >
          {word}
          {showAsterisk && i === words.length - 1 && (
            <span
              className="absolute top-[0.65em] -right-[0.3em] text-[0.31em]"
              style={{ color: "var(--accent)" }}
              aria-hidden
            >
              *
            </span>
          )}
          {i < words.length - 1 && " "}
        </motion.span>
      ))}
    </div>
  );
}
