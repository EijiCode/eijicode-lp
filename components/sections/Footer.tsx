"use client";

export default function Footer() {
  return (
    <footer className="bg-[var(--navy)] px-4 pb-8 pt-10 md:px-6">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5">
        <span className="text-xl tracking-[-0.02em] text-primary">EijiCode</span>

        <p className="text-[11px] tracking-wide text-gray-500">
          © 2026 EijiCode. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
