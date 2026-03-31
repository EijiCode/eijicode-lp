"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--navy)",
        padding: "3rem 1.5rem 2rem",
        position: "relative",
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

      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1.25rem",
        }}
      >
        {/* Logo */}
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "var(--text)",
            letterSpacing: "0.03em",
          }}
        >
          EijiCode
        </span>

        {/* X link */}
        <a
          href="https://x.com/ET_1202"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          style={{
            color: "var(--text3)",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#5bc8f5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text3)")}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        {/* Copyright */}
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.7rem",
            color: "var(--text3)",
            margin: 0,
            letterSpacing: "0.05em",
          }}
        >
          © 2026 EijiCode. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
