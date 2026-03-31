"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { ElectricBorder } from "../effects";
import { TextType } from "../text";

type FormStatus = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, company, message }),
      });
      if (res.ok) setStatus("sent");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
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
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(79,142,247,0.05) 0%, transparent 70%)",
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
            Get in Touch
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
              text="Contact"
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
            お問い合わせ
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          style={{
            maxWidth: "40rem",
            margin: "0 auto",
          }}
        >
          <ElectricBorder
            color="#7df9ff"
            speed={0.5}
            chaos={0.05}
            borderRadius={12}
          >
          {status === "sent" ? (
            <div className="contact-success">
              <div style={{ marginBottom: "1rem", display: "flex", justifyContent: "center" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#5bc8f5"
                  width="32"
                  height="32"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <p
                style={{
                  color: "var(--text)",
                  fontSize: "1.05rem",
                  fontWeight: 600,
                  margin: "0 0 0.5rem 0",
                }}
              >
                お送りいただきありがとうございます。
              </p>
              <p
                style={{
                  color: "var(--text2)",
                  fontSize: "0.9rem",
                  margin: 0,
                  lineHeight: 1.7,
                }}
              >
                内容を確認のうえ、2営業日以内にご連絡いたします。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form" noValidate>
              {/* Name */}
              <div className="contact-field">
                <label htmlFor="contact-name" className="contact-label">
                  お名前
                  <span className="contact-required" aria-label="必須">
                    *
                  </span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="山田 太郎"
                  className="contact-input"
                  disabled={status === "sending"}
                />
              </div>

              {/* Email */}
              <div className="contact-field">
                <label htmlFor="contact-email" className="contact-label">
                  メールアドレス
                  <span className="contact-required" aria-label="必須">
                    *
                  </span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="contact-input"
                  disabled={status === "sending"}
                />
              </div>

              {/* Company */}
              <div className="contact-field">
                <label htmlFor="contact-company" className="contact-label">
                  会社名
                  <span className="contact-optional">任意</span>
                </label>
                <input
                  id="contact-company"
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="株式会社〇〇"
                  className="contact-input"
                  disabled={status === "sending"}
                />
              </div>

              {/* Message */}
              <div className="contact-field">
                <label htmlFor="contact-message" className="contact-label">
                  お問い合わせ内容
                  <span className="contact-required" aria-label="必須">
                    *
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="ご相談内容をご記入ください"
                  className="contact-input contact-textarea"
                  disabled={status === "sending"}
                />
              </div>

              {/* Error state */}
              {status === "error" && (
                <p className="contact-error">
                  送信に失敗しました。時間をおいて再度お試しください。
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={status === "sending" || !name.trim() || !email.trim() || !message.trim()}
                className="contact-submit cursor-target"
              >
                {status === "sending" ? (
                  <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                    <span className="contact-spinner" aria-hidden="true" />
                    送信中…
                  </span>
                ) : (
                  "送信する"
                )}
              </button>
            </form>
          )}
          </ElectricBorder>
        </motion.div>
      </div>

      <style>{`
        .contact-form {
          background: rgba(13, 21, 38, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(125, 249, 255, 0.2);
          border-radius: 12px;
          padding: clamp(1.75rem, 4vw, 2.5rem);
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .contact-success {
          background: rgba(13, 21, 38, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(125, 249, 255, 0.2);
          border-radius: 12px;
          padding: clamp(2rem, 5vw, 3rem);
          text-align: center;
        }
        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .contact-label {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(0.85rem, 1.5vw, 1rem);
          font-weight: 400;
          color: var(--text);
          letter-spacing: 0.02em;
          text-transform: none;
          display: flex;
          align-items: center;
          gap: 0.4rem;
        }
        .contact-required {
          color: var(--accent);
          font-size: 0.8rem;
        }
        .contact-optional {
          font-size: 0.65rem;
          color: var(--text3);
          font-family: var(--font-sans), sans-serif;
          text-transform: none;
          letter-spacing: 0;
          background: rgba(79, 142, 247, 0.08);
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 0.1rem 0.4rem;
        }
        .contact-input {
          background: var(--navy3);
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-family: var(--font-sans), sans-serif;
          font-size: 0.95rem;
          color: var(--text);
          outline: none;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
          box-sizing: border-box;
        }
        .contact-input::placeholder {
          color: var(--text3);
        }
        .contact-input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(79, 142, 247, 0.12);
        }
        .contact-input:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .contact-textarea {
          resize: vertical;
          min-height: 7rem;
          line-height: 1.6;
        }
        .contact-error {
          font-size: 0.85rem;
          color: #f87171;
          margin: 0;
          padding: 0.6rem 0.9rem;
          background: rgba(248, 113, 113, 0.08);
          border: 1px solid rgba(248, 113, 113, 0.25);
          border-radius: 6px;
        }
        .contact-submit {
          background: transparent;
          border: 1px dashed rgba(232, 234, 240, 0.3);
          border-radius: 8px;
          color: var(--text);
          font-family: var(--font-mono), monospace;
          font-size: clamp(0.9rem, 2vw, 1.125rem);
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 0.85rem 1.5rem;
          min-width: 200px;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease;
          align-self: center;
        }
        .contact-submit:hover:not(:disabled) {
          color: #5bc8f5;
          border-color: rgba(91, 200, 245, 0.6);
        }
        .contact-submit:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
        .contact-spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(79, 142, 247, 0.3);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: contact-spin 0.7s linear infinite;
        }
        @keyframes contact-spin {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 768px) {
          .contact-submit {
            min-width: 150px;
          }
        }
      `}</style>
    </section>
  );
}
