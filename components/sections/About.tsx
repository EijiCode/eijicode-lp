"use client";

import WordsPullUpMultiStyle from "../text/WordsPullUpMultiStyle";
import AnimatedLetters from "../text/AnimatedLetters";

const BIO_TEXT =
  "Web制作、Webアプリ、スマホアプリの開発から、AIを使った業務効率化の伴走支援まで。企画・設計から実装、公開後の運用改善までをひとりで完結できるのが強みです。小回りの利く体制だからこそ、意思決定の速い開発で、成果まで最短距離で進みます。";

export default function About() {
  return (
    <section id="about" className="bg-[var(--navy)] px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl rounded-2xl bg-[var(--navy2)] px-6 py-20 text-center md:rounded-[2rem] md:px-12 md:py-28">
        <p className="mb-8 text-[10px] uppercase tracking-[0.25em] text-primary sm:text-xs">
          About
        </p>

        <WordsPullUpMultiStyle
          className="mx-auto max-w-3xl text-3xl leading-[1.2] sm:text-4xl sm:leading-[1.15] md:text-5xl lg:text-6xl xl:text-7xl"
          segments={[
            { text: "Eiji Tachikawa", className: "italic font-serif text-primary" },
          ]}
        />

        <AnimatedLetters
          text={BIO_TEXT}
          className="mx-auto mt-10 max-w-2xl text-left text-xs leading-loose text-primary sm:text-center sm:text-sm md:mt-14 md:text-base"
        />
      </div>
    </section>
  );
}
