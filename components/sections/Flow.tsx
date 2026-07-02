"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import WordsPullUpMultiStyle from "../text/WordsPullUpMultiStyle";

const EASE = [0.22, 1, 0.36, 1] as const;

type FlowStep = {
  number: string;
  title: string;
  description: string;
};

const STEPS: FlowStep[] = [
  { number: "01", title: "無料相談", description: "現状の課題やお困りごとをヒアリング。この時点で費用は一切かかりません。" },
  { number: "02", title: "ご提案", description: "課題を整理し、要件定義とお見積りをご提示。つくらない選択肢も含めて提案します。" },
  { number: "03", title: "開発", description: "設計・実装・テスト。進捗は随時共有し、途中の方向転換にも柔軟に対応します。" },
  { number: "04", title: "納品・運用", description: "リリースして終わりではなく、保守・改善まで継続して伴走します。" },
];

function StepCard({ step, index }: { step: FlowStep; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: EASE }}
      className="flex flex-col rounded-xl bg-[var(--navy3)] p-5 sm:p-6"
    >
      <span className="text-sm" style={{ color: "var(--text3)" }}>
        ({step.number})
      </span>
      <h3 className="mt-4 text-lg text-primary sm:text-xl">{step.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-gray-400">{step.description}</p>
    </motion.li>
  );
}

export default function Flow() {
  return (
    <section id="flow" className="bg-[var(--navy)] px-4 py-20 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-8 text-[10px] uppercase tracking-[0.25em] text-primary sm:text-xs">
            Flow
          </p>
          <WordsPullUpMultiStyle
            className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[{ text: "ご相談から納品まで、4つのステップ。", className: "text-primary" }]}
          />
          <WordsPullUpMultiStyle
            className="mt-1 text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[{ text: "まずは課題の整理からで大丈夫です。", className: "text-gray-500" }]}
          />
        </div>

        <ol className="mt-12 grid grid-cols-1 gap-3 sm:gap-2 md:mt-16 md:grid-cols-2 md:gap-1 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </ol>
      </div>
    </section>
  );
}
