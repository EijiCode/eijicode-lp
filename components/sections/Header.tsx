"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ShinyText } from "../text";
import { GlassSurface } from "../effects";

interface NavCard {
  label: string;
  href: string;
  bgColor: string;
  textColor: string;
  description: string;
}

const NAV_CARDS: NavCard[] = [
  {
    label: "Services",
    href: "#services",
    bgColor: "rgba(255, 255, 255, 0.06)",
    textColor: "var(--text)",
    description: "アプリ開発・システム構築・AI導入支援",
  },
  {
    label: "Flow",
    href: "#flow",
    bgColor: "rgba(255, 255, 255, 0.06)",
    textColor: "var(--text)",
    description: "無料相談からの流れ",
  },
  {
    label: "Contact",
    href: "#contact",
    bgColor: "rgba(255, 255, 255, 0.06)",
    textColor: "var(--text)",
    description: "お問い合わせ・無料相談",
  },
];

export default function Header() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) {
      const contentEl = navEl.querySelector(".card-nav-content") as HTMLElement | null;
      if (contentEl) {
        const wasVisibility = contentEl.style.visibility;
        const wasPointerEvents = contentEl.style.pointerEvents;
        const wasPosition = contentEl.style.position;
        const wasHeight = contentEl.style.height;

        contentEl.style.visibility = "visible";
        contentEl.style.pointerEvents = "auto";
        contentEl.style.position = "static";
        contentEl.style.height = "auto";

        void contentEl.offsetHeight;

        const topBar = 60;
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisibility;
        contentEl.style.pointerEvents = wasPointerEvents;
        contentEl.style.position = wasPosition;
        contentEl.style.height = wasHeight;

        return topBar + contentHeight + padding;
      }
    }
    return 145;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const cards = cardsRef.current.filter(Boolean);

    gsap.set(navEl, { height: 60, overflow: "hidden" });
    gsap.set(cards, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease: "power3.out",
    });

    tl.to(cards, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out", stagger: 0.08 }, "-=0.1");

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isExpanded) {
        const newHeight = calculateHeight();
        gsap.set(navRef.current, { height: newHeight });

        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          newTl.progress(1);
          tlRef.current = newTl;
        }
      } else {
        tlRef.current.kill();
        const newTl = createTimeline();
        if (newTl) {
          tlRef.current = newTl;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isExpanded]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isExpanded) {
      setIsHamburgerOpen(true);
      setIsExpanded(true);
      tl.play(0);
    } else {
      setIsHamburgerOpen(false);
      tl.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tl.reverse();
    }
  };

  const handleLinkClick = () => {
    if (isExpanded) {
      setIsHamburgerOpen(false);
      tlRef.current?.eventCallback("onReverseComplete", () => setIsExpanded(false));
      tlRef.current?.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLAnchorElement | null) => {
    cardsRef.current[i] = el;
  };

  return (
    <div className="card-nav-container">
      <GlassSurface
        width="100%"
        height="auto"
        borderRadius={12}
        brightness={30}
        opacity={0.85}
        blur={14}
        backgroundOpacity={0.3}
        saturation={1.2}
        distortionScale={-120}
      >
      <nav
        ref={navRef}
        className={`card-nav ${isExpanded ? "open" : ""}`}
      >
        <div className="card-nav-top">
          <div
            className={`hamburger-menu ${isHamburgerOpen ? "open" : ""}`}
            onClick={toggleMenu}
            role="button"
            aria-label={isExpanded ? "Close menu" : "Open menu"}
            tabIndex={0}
          >
            <div className="hamburger-line" />
            <div className="hamburger-line" />
          </div>

          <a href="#" className="logo-text" onClick={handleLinkClick}>
            <ShinyText text="EijiCode" speed={4} className="logo-shiny" />
          </a>

        </div>

        <div className="card-nav-content" aria-hidden={!isExpanded}>
          {NAV_CARDS.map((card, idx) => (
            <a
              key={card.label}
              className="nav-card cursor-target"
              ref={setCardRef(idx)}
              href={card.href}
              onClick={handleLinkClick}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
              }}
              style={{ backgroundColor: card.bgColor, color: card.textColor }}
            >
              <div className="nav-card-label">{card.label}</div>
              <div className="nav-card-desc">{card.description}</div>
            </a>
          ))}
        </div>
      </nav>
      </GlassSurface>

      <style>{`
        .card-nav-container {
          position: fixed;
          top: 1.5rem;
          left: 50%;
          transform: translateX(-50%);
          width: 90%;
          max-width: 800px;
          z-index: 100;
          box-sizing: border-box;
        }
        .card-nav {
          display: block;
          height: 60px;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 0.75rem;
          position: relative;
          overflow: hidden;
          will-change: height;
        }
        .card-nav-top {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.5rem 0.5rem 0.5rem 1.1rem;
          z-index: 2;
        }
        .hamburger-menu {
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          gap: 6px;
          color: var(--text);
        }
        .hamburger-menu:hover .hamburger-line {
          opacity: 0.75;
        }
        .hamburger-line {
          width: 24px;
          height: 2px;
          background-color: currentColor;
          transition: transform 0.25s ease, opacity 0.2s ease;
          transform-origin: 50% 50%;
        }
        .hamburger-menu.open .hamburger-line:first-child {
          transform: translateY(4px) rotate(45deg);
        }
        .hamburger-menu.open .hamburger-line:last-child {
          transform: translateY(-4px) rotate(-45deg);
        }
        .logo-text {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          text-decoration: none;
        }
        .logo-shiny {
          font-family: var(--font-mono), monospace;
          font-size: clamp(1.1rem, 2.5vw, 1.4rem);
          font-weight: 700;
          letter-spacing: 0.03em;
        }
        .card-nav-content {
          position: absolute;
          left: 0;
          right: 0;
          top: 60px;
          bottom: 0;
          padding: 0 0.5rem 0.5rem;
          display: flex;
          align-items: flex-end;
          gap: 10px;
          visibility: hidden;
          pointer-events: none;
          z-index: 1;
        }
        .card-nav.open .card-nav-content {
          visibility: visible;
          pointer-events: auto;
        }
        .nav-card {
          height: 100%;
          flex: 1 1 0;
          min-width: 0;
          border-radius: calc(0.75rem - 0.2rem);
          position: relative;
          display: flex;
          flex-direction: column;
          padding: 8px 12px;
          gap: 4px;
          user-select: none;
          border: 1px solid var(--border);
          text-decoration: none;
          cursor: pointer;
          transition: border-color 0.2s, box-shadow 0.2s;
          overflow: hidden;
          --mouse-x: 50%;
          --mouse-y: 50%;
        }
        .nav-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--mouse-x) var(--mouse-y),
            rgba(91, 200, 245, 0.15),
            transparent 80%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .nav-card:hover::before {
          opacity: 1;
        }
        .nav-card:hover {
          border-color: rgba(91, 200, 245, 0.4);
          box-shadow: 0 0 16px rgba(91, 200, 245, 0.1);
        }
        .nav-card-label {
          font-family: var(--font-mono), monospace;
          font-weight: 600;
          font-size: 1rem;
          letter-spacing: 0.02em;
        }
        .nav-card-desc {
          font-family: var(--font-sans), sans-serif;
          font-size: 0.75rem;
          opacity: 0.7;
          line-height: 1.4;
          margin-top: auto;
        }
        @media (max-width: 768px) {
          .card-nav-container {
            width: 92%;
            top: 1rem;
          }
          .card-nav-top {
            padding: 0.5rem 1rem;
          }
          .hamburger-menu {
            order: 2;
          }
          .logo-text {
            position: static;
            transform: none;
            order: 1;
          }
          .card-nav-cta {
            display: none;
          }
          .card-nav-content {
            flex-direction: column;
            align-items: stretch;
            gap: 8px;
            padding: 0.5rem;
            justify-content: flex-start;
          }
          .nav-card {
            height: auto;
            min-height: 50px;
            flex: 1 1 auto;
            background: rgba(13, 21, 38, 0.9) !important;
            backdrop-filter: blur(8px);
          }
          .nav-card-label {
            font-size: 0.9rem;
          }
          .nav-card-desc {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}
