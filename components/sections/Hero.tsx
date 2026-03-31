"use client";

import { motion, type Easing } from "motion/react";
import { Galaxy } from "../backgrounds";
import { GlitchText } from "../text";
import { BlurText } from "../text";
import { AnimatedButton } from "../effects";

const EASE_OUT: Easing = "easeOut";

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: EASE_OUT },
});

export default function Hero() {
  return (
    <section
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        background: "var(--navy)",
      }}
    >
      {/* Galaxy background */}
      <Galaxy
        hueShift={220}
        speed={0.8}
        density={1.2}
        saturation={0.3}
        glowIntensity={0.4}
        twinkleIntensity={0.4}
        rotationSpeed={0.05}
        mouseRepulsion
        repulsionStrength={1.5}
        transparent
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Radial glow overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(79,142,247,0.07) 0%, transparent 70%)",
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          textAlign: "center",
          maxWidth: "56rem",
          padding: "0 clamp(1rem, 5vw, 2rem)",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.5rem",
        }}
      >
        {/* Sub-copy 1 */}
        <BlurText
          text="テクノロジーで、"
          delay={200}
          className="hero-sub"
        />

        {/* Main headline */}
        <motion.h1
          {...fadeUp(0.5)}
          style={{
            fontSize: "clamp(2rem, 8vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            margin: 0,
          }}
        >
          <GlitchText speed={1}>未来を実装する</GlitchText>
        </motion.h1>

        {/* Sub-copy 2 */}
        <BlurText
          text="アプリ開発・システム構築・AI導入支援。"
          delay={400}
          className="hero-desc"
        />

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "easeOut" }}
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "0.5rem",
          }}
        >
          <AnimatedButton href="#contact" variant="primary" className="cursor-target">
            無料相談する
          </AnimatedButton>
          <AnimatedButton href="#services" variant="secondary" className="cursor-target">
            サービスを見る
          </AnimatedButton>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.65rem",
            color: "var(--text2)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "1px",
            height: "2rem",
            background: "linear-gradient(to bottom, var(--accent), transparent)",
          }}
        />
      </motion.div>

      <style>{`
        .hero-sub {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(1.1rem, 3vw, 1.5rem);
          font-weight: 600;
          color: var(--text2);
          margin: 0;
          line-height: 1.5;
        }
        .hero-desc {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(0.95rem, 2.5vw, 1.15rem);
          font-weight: 600;
          color: var(--text2);
          margin: 0;
          line-height: 1.7;
        }
        @media (max-width: 768px) {
          .hero-sub { font-size: clamp(1rem, 4vw, 1.2rem); }
          .hero-desc { font-size: 0.95rem; }
        }
        @media (max-width: 480px) {
          .hero-sub { font-size: 0.95rem; }
          .hero-desc { font-size: 0.875rem; }
        }
      `}</style>
    </section>
  );
}
