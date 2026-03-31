"use client";

import { motion } from "motion/react";
import { TextType } from "../text";
import { MagicGlowGrid } from "../effects";

type ServiceItem = {
  title: string;
  description: string;
};

type ServiceCategory = {
  number: string;
  name: string;
  tagline: string;
  accentColor: string;
  glowColor: string;
  items: ServiceItem[];
};

const SERVICES: ServiceCategory[] = [
  {
    number: "01",
    name: "アプリ開発",
    tagline: "App Development",
    accentColor: "#5bc8f5",
    glowColor: "rgba(91, 200, 245, 0.2)",
    items: [
      {
        title: "Webアプリケーション開発",
        description: "SaaS・業務アプリ・ポータルサイト",
      },
      {
        title: "モバイル対応アプリ",
        description: "レスポンシブ・PWAによるスマホ対応",
      },
      {
        title: "Webサイト構築",
        description: "LP・コーポレートサイトの構築・実装",
      },
      {
        title: "チーム参画・開発支援",
        description: "既存プロジェクトへの業務委託参画",
      },
    ],
  },
  {
    number: "02",
    name: "システム構築",
    tagline: "System Integration",
    accentColor: "#5bc8f5",
    glowColor: "rgba(91, 200, 245, 0.2)",
    items: [
      {
        title: "勤怠管理システム",
        description: "出退勤・シフト管理・給与連携",
      },
      {
        title: "在庫・受発注管理",
        description: "リアルタイム在庫把握・発注自動化",
      },
      {
        title: "顧客管理（CRM）",
        description: "顧客情報の一元管理・営業支援",
      },
    ],
  },
  {
    number: "03",
    name: "AI導入支援",
    tagline: "AI Integration",
    accentColor: "#5bc8f5",
    glowColor: "rgba(91, 200, 245, 0.2)",
    items: [
      {
        title: "業務チャットボット構築",
        description: "社内FAQ・顧客対応の自動化",
      },
      {
        title: "データ分析・レポート自動化",
        description: "売上データの集計・可視化",
      },
      {
        title: "メール・問い合わせ対応支援",
        description: "返信文案の自動生成・分類",
      },
      {
        title: "AI業務フロー設計コンサル",
        description: "どの業務にAIを導入すべきかの診断",
      },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function Services() {
  return (
    <section
      id="services"
      style={{
        background: "var(--navy)",
        padding: "clamp(4rem, 10vw, 8rem) clamp(1rem, 5vw, 2rem)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle top border */}
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
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(79,142,247,0.04) 0%, transparent 70%)",
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
            What We Do
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
              text="Services"
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
            テクノロジーを活用し、貴社の課題を解決いたいます。
          </p>
        </motion.div>

        {/* Cards grid */}
        <MagicGlowGrid
          glowColor="91, 200, 245"
          spotlightRadius={350}
          className="services-grid-wrapper"
        >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="services-grid"
        >
          {SERVICES.map((category) => (
            <motion.div
              key={category.number}
              variants={cardVariants}
              className="service-card magic-glow-card"
              style={
                {
                  "--card-glow": category.glowColor,
                  "--card-accent": category.accentColor,
                } as React.CSSProperties
              }
            >

              {/* Category tagline */}
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.65rem",
                  color: "var(--card-accent)",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                {category.tagline}
              </span>

              {/* Category name */}
              <h3
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 700,
                  color: "var(--text)",
                  margin: "0 0 1.5rem 0",
                  lineHeight: 1.3,
                }}
              >
                {category.name}
              </h3>

              {/* Divider */}
              <div
                style={{
                  height: "1px",
                  background: "var(--border)",
                  marginBottom: "1.5rem",
                }}
              />

              {/* Service items */}
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                {category.items.map((item) => (
                  <li key={item.title}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "0.6rem",
                      }}
                    >
                      <span
                        style={{
                          color: "var(--card-accent)",
                          fontSize: "0.6rem",
                          marginTop: "0.35rem",
                          flexShrink: 0,
                        }}
                      >
                        ▸
                      </span>
                      <div>
                        <div
                          style={{
                            fontSize: "0.9rem",
                            fontWeight: 600,
                            color: "var(--text)",
                            lineHeight: 1.4,
                          }}
                        >
                          {item.title}
                        </div>
                        <div
                          style={{
                            fontSize: "0.78rem",
                            fontWeight: 500,
                            color: "var(--text2)",
                            lineHeight: 1.5,
                            marginTop: "0.15rem",
                          }}
                        >
                          {item.description}
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
        </MagicGlowGrid>
      </div>

      <style>{`
        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }
        .service-card {
          background: var(--navy2);
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: clamp(1.5rem, 3vw, 2rem);
          cursor: default;
        }
        @media (max-width: 1024px) {
          .services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
