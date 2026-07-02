"use client";

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] px-4 pb-8 pt-10 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5">
        <span className="text-xl tracking-[-0.02em] text-primary">EijiCode</span>

        <a
          href="https://x.com/ET_1202"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (Twitter)"
          className="text-gray-500 transition-colors hover:text-primary"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>

        <p className="text-[11px] tracking-wide text-gray-500">
          © 2026 EijiCode. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
