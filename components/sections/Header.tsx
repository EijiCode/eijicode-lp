"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Flow", href: "#flow" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-nav${scrolled ? " scrolled" : ""}`}>
      <div className="site-nav-left">
        <a href="#top" className="site-logo">
          eijicode
        </a>
        <nav className="site-links" aria-label="メインナビゲーション">
          {LINKS.map((link) => (
            <a key={link.label} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="site-nav-right">
        <a
          href="https://x.com/ET_1202"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="site-x"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a href="#contact" className="site-cta">
          無料相談 <span aria-hidden>&rarr;</span>
        </a>
      </div>

      <style>{`
        .site-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.1rem clamp(1.25rem, 4vw, 2.5rem);
          border-bottom: 1px solid transparent;
          transition: background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease;
        }
        .site-nav.scrolled {
          background: rgba(8, 13, 26, 0.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom-color: var(--border);
        }
        .site-nav-left {
          display: flex;
          align-items: center;
          gap: 2.25rem;
        }
        .site-logo {
          font-family: var(--font-mono), monospace;
          font-size: 1.15rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--text);
          text-decoration: none;
        }
        .site-links {
          display: flex;
          align-items: center;
          gap: 1.75rem;
        }
        .site-links a {
          font-size: 0.875rem;
          color: var(--text2);
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .site-links a:hover {
          color: var(--text);
        }
        .site-nav-right {
          display: flex;
          align-items: center;
          gap: 1.1rem;
        }
        .site-x {
          display: flex;
          color: var(--text2);
          transition: color 0.2s ease;
        }
        .site-x:hover {
          color: var(--text);
        }
        .site-cta {
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--text);
          text-decoration: none;
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 0.5rem 1rem;
          transition: border-color 0.2s ease, background 0.2s ease;
        }
        .site-cta:hover {
          border-color: rgba(79, 142, 247, 0.55);
          background: rgba(79, 142, 247, 0.1);
        }
        @media (max-width: 768px) {
          .site-nav {
            padding: 0.9rem 1.25rem;
          }
          .site-links {
            display: none;
          }
        }
      `}</style>
    </header>
  );
}
