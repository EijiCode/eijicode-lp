"use client";

import { motion } from "motion/react";
import { TextType } from "../text";
import { MagicGlowGrid } from "../effects";

type FlowStep = {
  number: string;
  title: string;
  description: string;
};

const STEPS: FlowStep[] = [
  {
    number: "01",
    title: "無料相談",
    description: "ヒアリング・課題整理",
  },
  {
    number: "02",
    title: "ご提案",
    description: "要件定義・お見積り",
  },
  {
    number: "03",
    title: "開発",
    description: "設計・実装・テスト",
  },
  {
    number: "04",
    title: "納品・運用",
    description: "リリース・保守サポート",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Flow() {
  return (
    <section
      id="flow"
      style={{
        background: "var(--navy)",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 2rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Top border */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: "1px",
          background:
            "linear-gradient(to right, transparent, var(--border), transparent)",
        }}
      />

      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 50% 40% at 50% 100%, rgba(124,92,252,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "72rem",
          margin: "0 auto",
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ marginBottom: "clamp(2.5rem, 6vw, 4rem)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.75rem",
              color: "#5bc8f5",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: "0.75rem",
            }}
          >
            How It Works
          </span>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 5vw, 3rem)",
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: "0.05em",
              margin: 0,
              color: "var(--text)",
            }}
          >
            <TextType
              text="Flow"
              typingSpeed={80}
              loop
              pauseDuration={4000}
              showCursor={false}
              startOnVisible
            />
          </h2>
          <p
            style={{
              marginTop: "1rem",
              fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
              color: "var(--text2)",
              maxWidth: "36rem",
              lineHeight: 1.7,
            }}
          >
            ご相談の流れ
          </p>
        </motion.div>

        {/* Steps */}
        <MagicGlowGrid
          glowColor="91, 200, 245"
          spotlightRadius={300}
        >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flow-steps"
        >
          {STEPS.map((step, index) => (
            <div key={step.number} className="flow-step-wrapper">
              {/* Step card */}
              <motion.div variants={itemVariants} className="flow-step-card magic-glow-card">
                {/* Number */}
                <div
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "2.5rem",
                    fontWeight: 700,
                    lineHeight: 1,
                    color: "#5bc8f5",
                    opacity: 0.25,
                    marginBottom: "1.25rem",
                    letterSpacing: "-0.02em",
                  }}
                >
                  {step.number}
                </div>

                {/* Accent line */}
                <div
                  style={{
                    width: "2rem",
                    height: "2px",
                    background: "#5bc8f5",
                    marginBottom: "1rem",
                    borderRadius: "1px",
                  }}
                />

                {/* Title */}
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    margin: "0 0 0.5rem 0",
                    lineHeight: 1.3,
                  }}
                >
                  {step.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--text2)",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {step.description}
                </p>
              </motion.div>

              {/* Line between steps (not after last) */}
              {index < STEPS.length - 1 && (
                <div className="flow-connector" />
              )}
            </div>
          ))}
        </motion.div>
        </MagicGlowGrid>
      </div>

      <style>{`
        .flow-steps {
          display: flex;
          flex-direction: row;
          align-items: stretch;
          gap: 0;
        }
        .flow-step-wrapper {
          display: flex;
          flex-direction: row;
          align-items: center;
          flex: 1;
          min-width: 0;
        }
        .flow-step-card {
          flex: 1;
          min-width: 0;
          background: var(--navy2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: clamp(1.25rem, 3vw, 1.75rem);
        }
        .flow-connector {
          flex-shrink: 0;
          width: clamp(1.5rem, 3vw, 3rem);
          display: flex;
          align-items: center;
          padding: 0 0.4rem;
        }
        .flow-connector::after {
          content: '';
          flex: 1;
          height: 2px;
          background: #5bc8f5;
          opacity: 0.3;
        }

        /* Mobile: vertical layout */
        @media (max-width: 768px) {
          .flow-steps {
            flex-direction: column;
            gap: 0;
          }
          .flow-step-wrapper {
            flex-direction: column;
            align-items: stretch;
          }
          .flow-connector {
            width: auto;
            height: 1.5rem;
            padding: 0.3rem 0;
            justify-content: center;
          }
          .flow-connector::after {
            width: 2px;
            height: 100%;
            flex: none;
          }
        }
      `}</style>
    </section>
  );
}
