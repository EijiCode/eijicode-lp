"use client";

import { motion } from "motion/react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /* Set false when visibility is driven externally (e.g. scroll-linked opacity) */
  animate?: boolean;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  animate = true,
}: SectionHeaderProps) {
  const inner = (
    <>
      <span
        style={{
          fontSize: "0.72rem",
          color: "var(--text)",
          letterSpacing: "0.25em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "0.85rem",
        }}
      >
        {eyebrow}
      </span>
      <h2
        style={{
          fontSize: "clamp(1.9rem, 4.5vw, 2.9rem)",
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
          margin: 0,
          color: "var(--text)",
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            marginTop: "1rem",
            fontSize: "clamp(0.9rem, 2vw, 1.02rem)",
            color: "var(--text2)",
            maxWidth: "36rem",
            lineHeight: 1.7,
            margin: "1rem 0 0",
          }}
        >
          {description}
        </p>
      )}
    </>
  );

  if (!animate) {
    return <div>{inner}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {inner}
    </motion.div>
  );
}
