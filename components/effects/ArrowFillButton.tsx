"use client";

import React from "react";
import { ArrowRight } from "../icons";
import "./ArrowFillButton.css";

interface ArrowFillButtonProps {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** 送信中。矢印をスピナーに差し替え、hover 演出も止める */
  loading?: boolean;
  className?: string;
  onClick?: () => void;
}

export default function ArrowFillButton({
  children,
  href,
  type = "button",
  disabled = false,
  loading = false,
  className = "",
  onClick,
}: ArrowFillButtonProps) {
  const inner = (
    <>
      <span className="arrow-fill-btn__label">{children}</span>

      <span className="arrow-fill-btn__fill" aria-hidden="true">
        <span className="arrow-fill-btn__label">{children}</span>
        <span className="arrow-fill-btn__icon">
          {loading ? (
            <span className="arrow-fill-btn__spinner" />
          ) : (
            <>
              <ArrowRight className="arrow-fill-btn__arrow arrow-fill-btn__arrow--in" />
              <ArrowRight className="arrow-fill-btn__arrow arrow-fill-btn__arrow--out" />
            </>
          )}
        </span>
      </span>
    </>
  );

  const classes = `arrow-fill-btn ${className}`.trim();

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} onClick={onClick}>
      {inner}
    </button>
  );
}
