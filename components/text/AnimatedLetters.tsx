"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

interface AnimatedLetterProps {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}

function AnimatedLetter({ char, progress, range }: AnimatedLetterProps) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

interface AnimatedLettersProps {
  text: string;
  className?: string;
}

/* Scroll-linked progressive reveal: each character fades 0.2 → 1
   as the paragraph moves through the viewport. */
export default function AnimatedLetters({ text, className = "" }: AnimatedLettersProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = Array.from(text);

  return (
    <p ref={ref} className={className}>
      {chars.map((char, i) => {
        const charProgress = i / chars.length;
        return (
          <AnimatedLetter
            key={i}
            char={char}
            progress={scrollYProgress}
            range={[Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)]}
          />
        );
      })}
    </p>
  );
}
