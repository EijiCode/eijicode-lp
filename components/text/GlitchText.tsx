"use client";

import React from "react";
import "./GlitchText.css";

interface GlitchTextProps {
  children: string;
  speed?: number;
  enableShadows?: boolean;
  enableOnHover?: boolean;
  className?: string;
}

export const GlitchText = ({
  children,
  speed = 1,
  enableShadows = true,
  enableOnHover = false,
  className = "",
}: GlitchTextProps) => {
  const inlineStyles = {
    "--after-duration": `${speed * 3}s`,
    "--before-duration": `${speed * 2}s`,
    "--after-shadow": enableShadows ? "-5px 0 #5bc8f5" : "none",
    "--before-shadow": enableShadows ? "5px 0 var(--accent2)" : "none",
  } as React.CSSProperties;

  return (
    <div
      className={`glitch ${enableOnHover ? "enable-on-hover" : ""} ${className}`}
      style={inlineStyles}
      data-text={children}
    >
      {children}
    </div>
  );
};

export default GlitchText; // keep for backwards compat
