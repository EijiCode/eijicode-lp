"use client";

import React from "react";
import { motion } from "motion/react";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: AnimatedButtonProps) {
  const style: React.CSSProperties = {
    padding: "14px 36px",
    minWidth: "200px",
    borderRadius: "12px",
    fontSize: "1rem",
    fontWeight: 700,
    fontFamily: "var(--font-sans), sans-serif",
    letterSpacing: "0.04em",
    cursor: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    textDecoration: "none",
    position: "relative",
    overflow: "hidden",
    background: "rgba(8, 13, 26, 0.5)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    color: "var(--text)",
    border: "1px dashed rgba(232, 234, 240, 0.3)",
    textTransform: "uppercase",
  };

  const props = {
    className,
    style,
    whileHover: {
      color: "#5bc8f5",
      borderColor: "rgba(91, 200, 245, 0.6)",
    },
    whileTap: { scale: 0.97 as const },
    transition: { duration: 0.2 },
  };

  if (href) {
    return (
      <motion.a href={href} {...props}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={onClick} {...props}>
      {children}
    </motion.button>
  );
}
