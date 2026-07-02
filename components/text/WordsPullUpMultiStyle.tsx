"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

export interface StyledSegment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: StyledSegment[];
  className?: string;
}

type Token = {
  content: string;
  className?: string;
};

/* Latin segments split by spaces; Japanese (spaceless) segments split per
   character so long runs can wrap. A no-break space joins segment boundaries. */
function tokenize(segments: StyledSegment[]): Token[] {
  const tokens: Token[] = [];
  segments.forEach((segment, si) => {
    if (segment.text.includes(" ")) {
      const words = segment.text.split(" ").filter(Boolean);
      words.forEach((word, wi) => {
        const isLast = wi === words.length - 1;
        tokens.push({ content: isLast ? word : `${word} `, className: segment.className });
      });
    } else {
      Array.from(segment.text).forEach((char) => {
        tokens.push({ content: char, className: segment.className });
      });
    }
    if (si < segments.length - 1) {
      tokens.push({ content: " ", className: segment.className });
    }
  });
  return tokens;
}

export default function WordsPullUpMultiStyle({ segments, className = "" }: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const tokens = tokenize(segments);

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          className={`inline-block ${token.className ?? ""}`}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: i * 0.02, duration: 0.6, ease: EASE }}
        >
          {token.content}
        </motion.span>
      ))}
    </div>
  );
}
