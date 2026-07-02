"use client";

import { motion } from "motion/react";
import { useState } from "react";
import WordsPullUpMultiStyle from "../text/WordsPullUpMultiStyle";
import { ArrowRight } from "../icons";

type FormStatus = "idle" | "sending" | "sent" | "error";

const INPUT_CLASS =
  "w-full rounded-lg bg-[var(--navy3)] px-4 py-3 text-sm text-primary outline-none transition placeholder:text-[var(--text3)] focus:ring-2 focus:ring-[var(--accent)]/40 disabled:cursor-not-allowed disabled:opacity-50";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const FALLBACK_ERROR = "送信に失敗しました。時間をおいて再度お試しください。";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        let message = FALLBACK_ERROR;
        try {
          const data: { error?: string } = await res.json();
          if (data.error) message = data.error;
        } catch {
          /* non-JSON error response — keep fallback */
        }
        setErrorMessage(message);
        setStatus("error");
      }
    } catch {
      setErrorMessage(FALLBACK_ERROR);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="relative bg-[var(--navy)] px-4 py-20 md:px-6 md:py-28">
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="text-center">
          <p className="mb-8 text-[10px] uppercase tracking-[0.25em] text-primary sm:text-xs">
            Contact
          </p>
          <WordsPullUpMultiStyle
            className="text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[{ text: "まずは、無料相談から。", className: "text-primary" }]}
          />
          <WordsPullUpMultiStyle
            className="mt-1 text-xl font-normal sm:text-2xl md:text-3xl lg:text-4xl"
            segments={[{ text: "2営業日以内にご返信します。", className: "text-gray-500" }]}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-12 max-w-2xl md:mt-16"
        >
          {status === "sent" ? (
            <div className="rounded-2xl bg-[var(--navy2)] px-6 py-14 text-center md:rounded-[2rem] md:px-12">
              <div className="mb-4 flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="var(--accent)"
                  width="32"
                  height="32"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <p className="text-base font-medium text-primary">
                お送りいただきありがとうございます。
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-400">
                内容を確認のうえ、2営業日以内にご連絡いたします。
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-6 rounded-2xl bg-[var(--navy2)] p-7 md:rounded-[2rem] md:p-12"
            >
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="flex items-center gap-1.5 text-sm text-primary/80">
                  お名前
                  <span aria-label="必須" style={{ color: "var(--accent)" }}>*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="山田 太郎"
                  className={INPUT_CLASS}
                  disabled={status === "sending"}
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="flex items-center gap-1.5 text-sm text-primary/80">
                  メールアドレス
                  <span aria-label="必須" style={{ color: "var(--accent)" }}>*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className={INPUT_CLASS}
                  disabled={status === "sending"}
                />
              </div>

              {/* Company */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-company" className="flex items-center gap-2 text-sm text-primary/80">
                  会社名
                  <span className="rounded bg-white/5 px-1.5 py-0.5 text-[10px]" style={{ color: "var(--text3)" }}>
                    任意
                  </span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="株式会社〇〇"
                  className={INPUT_CLASS}
                  disabled={status === "sending"}
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className="flex items-center gap-1.5 text-sm text-primary/80">
                  お問い合わせ内容
                  <span aria-label="必須" style={{ color: "var(--accent)" }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="ご相談内容をご記入ください"
                  className={`${INPUT_CLASS} min-h-28 resize-y leading-relaxed`}
                  disabled={status === "sending"}
                />
              </div>

              {/* Error state */}
              {status === "error" && (
                <p className="rounded-lg border border-red-400/25 bg-red-400/10 px-4 py-2.5 text-sm text-red-300">
                  {errorMessage ?? FALLBACK_ERROR}
                </p>
              )}

              {/* Submit — same pill style as the hero CTA */}
              <button
                type="submit"
                disabled={status === "sending" || !name.trim() || !email.trim() || !message.trim()}
                className="group mx-auto flex items-center gap-2 rounded-full bg-primary py-1.5 pl-6 pr-1.5 text-sm font-medium text-[var(--navy)] transition-all hover:gap-3 disabled:cursor-not-allowed disabled:opacity-40 sm:text-base"
              >
                {status === "sending" ? (
                  <span className="flex items-center gap-2.5 py-1.5 pr-4">
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-[rgba(8,13,26,0.25)]"
                      style={{ borderTopColor: "var(--navy)" }}
                      aria-hidden
                    />
                    送信中…
                  </span>
                ) : (
                  <>
                    送信する
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--navy)] transition-transform group-hover:scale-110 sm:h-10 sm:w-10">
                      <ArrowRight className="text-primary" size={18} />
                    </span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
