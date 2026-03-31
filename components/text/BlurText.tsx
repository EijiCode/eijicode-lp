"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

interface BlurTextProps {
  text: string;
  className?: string;
  delay?: number;
  animateBy?: "words" | "characters";
}

export default function BlurText({
  text,
  className = "",
  delay = 0,
  animateBy = "words",
}: BlurTextProps) {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const tokens = animateBy === "words" ? text.split(" ") : text.split("");

  return (
    <motion.p
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            delayChildren: delay / 1000,
            staggerChildren: 0.05,
          },
        },
      }}
    >
      {tokens.map((token, i) => (
        <motion.span
          key={i}
          style={{ display: "inline-block", marginRight: animateBy === "words" ? "0.35em" : "0" }}
          variants={{
            hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
            visible: {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              transition: { duration: 0.5, ease: "easeOut" },
            },
          }}
        >
          {token}
        </motion.span>
      ))}
    </motion.p>
  );
}
