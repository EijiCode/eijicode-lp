"use client";

import { motion } from "motion/react";

export default function Statement() {
  return (
    <section className="statement">
      <motion.div
        className="statement-inner"
        initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <p className="statement-eyebrow">Web / Mobile / AI — From Gifu, Japan</p>
        <h2 className="statement-title">EijiCode</h2>
        <p className="statement-copy">小さな会社の、技術パートナー。</p>
      </motion.div>

      <style>{`
        .statement {
          position: relative;
          min-height: 90svh;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding: 0 clamp(1rem, 5vw, 2rem) clamp(6rem, 14vh, 9rem);
        }
        .statement-inner {
          text-align: center;
        }
        .statement-eyebrow {
          font-family: var(--font-mono), monospace;
          font-size: 0.75rem;
          color: var(--text2);
          letter-spacing: 0.22em;
          text-transform: uppercase;
          margin: 0 0 1.25rem;
        }
        .statement-title {
          font-family: var(--font-mono), monospace;
          font-size: clamp(3rem, 11vw, 7rem);
          font-weight: 700;
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0;
          background: linear-gradient(180deg, #ffffff 20%, rgba(232, 234, 240, 0.45) 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .statement-copy {
          font-size: clamp(0.9rem, 2.2vw, 1.05rem);
          color: var(--text2);
          line-height: 1.8;
          margin: 1.5rem 0 0;
        }
      `}</style>
    </section>
  );
}
