"use client";

import { motion } from "motion/react";
import WordsPullUp from "../text/WordsPullUp";
import Noise from "../effects/Noise";
import { ArrowRight } from "../icons";

const EASE = [0.16, 1, 0.3, 1] as const;

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Flow", href: "#flow" },
  { label: "Contact", href: "#contact" },
];

export default function Hero() {
  return (
    <section className="relative h-screen p-4 md:p-6">
      {/* Hanging navbar pill — bg matches page bg so it reads as one piece with the inset gap */}
      <nav className="absolute top-0 left-1/2 -translate-x-1/2 z-20">
        <div className="flex items-center gap-3 sm:gap-6 md:gap-12 lg:gap-14 rounded-b-2xl md:rounded-b-3xl bg-[var(--navy)] px-4 py-2 md:px-8 md:py-3">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="whitespace-nowrap py-1 text-xs transition-colors sm:text-sm"
              style={{ color: "rgba(232, 234, 240, 0.8)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e8eaf0")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(232, 234, 240, 0.8)")}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem]">
        {/* Background video */}
        <video
          src={HERO_VIDEO}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Cool grade toward the navy palette */}
        <div className="pointer-events-none absolute inset-0 bg-[#0a1428]/30 mix-blend-multiply" />

        {/* 動くグレイン + gradient overlays（静的な .noise-overlay から差し替え） */}
        <Noise
          className="opacity-[0.7] mix-blend-overlay"
          patternAlpha={255}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

        {/* Bottom-aligned content */}
        <div className="absolute bottom-0 left-0 right-0 z-10 grid grid-cols-12 items-end gap-4 p-5 sm:p-7 md:p-10">
          {/* pb clears the descender overflow from leading-[0.85] when columns stack */}
          <div className="col-span-12 pb-[4vw] lg:col-span-8 lg:pb-0">
            <WordsPullUp
              text="EijiCode"
              shiny
              className="text-[26vw] sm:text-[24vw] md:text-[22vw] lg:text-[18vw] xl:text-[17vw] 2xl:text-[18vw] font-normal leading-[0.85] tracking-[-0.07em] text-primary"
            />
          </div>

          <div className="col-span-12 flex flex-col items-start gap-5 sm:gap-6 lg:col-span-4 lg:pb-[2.5vw]">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
              className="text-primary/70 text-xs sm:text-sm md:text-base"
              style={{ lineHeight: 1.6 }}
            >
              Web制作・Webアプリ・スマホアプリ・AI活用支援を、ひとりのエンジニアが設計から運用まで担当します。
            </motion.p>

            <motion.a
              href="#contact"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8, ease: EASE }}
              className="group flex items-center gap-2 rounded-full bg-primary py-1.5 pl-5 pr-1.5 text-sm font-medium text-[var(--navy)] transition-all hover:gap-3 sm:text-base"
            >
              無料相談する
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--navy)] transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                <ArrowRight className="text-primary" size={18} />
              </span>
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
