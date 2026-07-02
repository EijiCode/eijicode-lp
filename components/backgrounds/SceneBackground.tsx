"use client";

import { motion, useScroll, useTransform } from "motion/react";
import Galaxy from "./Galaxy";

export default function SceneBackground() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.14]);
  const dim = useTransform(scrollYProgress, [0, 0.35, 1], [0.15, 0.4, 0.62]);

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {/* inset is oversized so the scroll-linked zoom never exposes edges */}
      <motion.div style={{ position: "absolute", inset: "-7%", scale }}>
        <Galaxy
          hueShift={220}
          speed={0.5}
          density={1}
          saturation={0.3}
          glowIntensity={0.35}
          twinkleIntensity={0.35}
          rotationSpeed={0.04}
          transparent
          style={{ position: "absolute", inset: 0 }}
        />
      </motion.div>

      {/* Scroll-deepening dim layer */}
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--navy)",
          opacity: dim,
        }}
      />

      {/* Static vignette for text readability */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 90% 70% at 50% 30%, transparent 0%, rgba(8, 13, 26, 0.55) 100%)",
        }}
      />
    </div>
  );
}
