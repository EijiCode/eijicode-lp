"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import WordsPullUpMultiStyle from "../text/WordsPullUpMultiStyle";
import { Check } from "../icons";

const EASE = [0.22, 1, 0.36, 1] as const;

type ServiceCard = {
  number: string;
  title: string;
  items: string[];
};

const SERVICE_CARDS: ServiceCard[] = [
  {
    number: "01",
    title: "Web制作",
    items: [
      "コーポレートサイト・LP",
      "CMS構築・運用保守",
      "SEO・表示速度の最適化",
      "公開後の改善サポート",
    ],
  },
  {
    number: "02",
    title: "Webアプリ開発",
    items: [
      "SaaS・業務システム",
      "勤怠・在庫・顧客管理",
      "API・外部サービス連携",
    ],
  },
  {
    number: "03",
    title: "スマホアプリ開発",
    items: [
      "iOS / Androidアプリ",
      "クロスプラットフォーム開発",
      "ストア申請・公開サポート",
    ],
  },
  {
    number: "04",
    title: "AI活用支援",
    items: ["業務フローの自動化", "AI導入支援", "導入後の定着まで伴走"],
  },
];

function FeatureCard({ card, index }: { card: ServiceCard; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.15, duration: 0.7, ease: EASE }}
      className="flex flex-col rounded-xl bg-[var(--navy3)] p-5 sm:p-6"
    >
      <span className="text-sm" style={{ color: "var(--text3)" }}>
        ({card.number})
      </span>
      <h3 className="mt-4 text-lg text-primary sm:text-xl">{card.title}</h3>
      <ul className="mt-5 flex flex-col gap-3">
        {card.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2.5 text-sm text-gray-400"
          >
            <Check className="mt-0.5 shrink-0" size={15} />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      className="relative bg-[var(--navy)] px-4 py-20 md:px-6 md:py-28"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-8 text-[10px] uppercase tracking-[0.25em] text-primary sm:text-xs">
            Services
          </p>
          <WordsPullUpMultiStyle
            className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[{ text: "事業内容", className: "text-primary" }]}
          />
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:gap-2 md:mt-16 md:grid-cols-2 md:gap-1 lg:grid-cols-4">
          {SERVICE_CARDS.map((card, i) => (
            <FeatureCard key={card.number} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
