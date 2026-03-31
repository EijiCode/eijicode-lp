"use client";

import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

interface MagicGlowGridProps {
  children: React.ReactNode;
  glowColor?: string;
  spotlightRadius?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Wrap a grid of cards. Each direct child with `.magic-glow-card` gets
 * a border glow that tracks the mouse, plus a floating spotlight overlay.
 */
export default function MagicGlowGrid({
  children,
  glowColor = "79, 142, 247",
  spotlightRadius = 300,
  className = "",
  style,
}: MagicGlowGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  const updateCardGlow = useCallback(
    (card: HTMLElement, mouseX: number, mouseY: number, intensity: number) => {
      const rect = card.getBoundingClientRect();
      const relX = ((mouseX - rect.left) / rect.width) * 100;
      const relY = ((mouseY - rect.top) / rect.height) * 100;
      card.style.setProperty("--glow-x", `${relX}%`);
      card.style.setProperty("--glow-y", `${relY}%`);
      card.style.setProperty("--glow-intensity", intensity.toString());
      card.style.setProperty("--glow-radius", `${spotlightRadius}px`);
      card.style.setProperty("--glow-rgb", glowColor);
    },
    [glowColor, spotlightRadius]
  );

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    // create spotlight element
    const spotlight = document.createElement("div");
    spotlight.style.cssText = `
      position: fixed;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.12) 0%,
        rgba(${glowColor}, 0.06) 20%,
        rgba(${glowColor}, 0.02) 40%,
        transparent 65%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const proximity = spotlightRadius * 0.5;
    const fadeDistance = spotlightRadius * 0.75;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = grid.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      const cards = grid.querySelectorAll<HTMLElement>(".magic-glow-card");

      if (!inside) {
        gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" });
        cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"));
        return;
      }

      let minDist = Infinity;

      cards.forEach((card) => {
        const cr = card.getBoundingClientRect();
        const cx = cr.left + cr.width / 2;
        const cy = cr.top + cr.height / 2;
        const dist = Math.max(
          0,
          Math.hypot(e.clientX - cx, e.clientY - cy) - Math.max(cr.width, cr.height) / 2
        );
        minDist = Math.min(minDist, dist);

        let intensity = 0;
        if (dist <= proximity) intensity = 1;
        else if (dist <= fadeDistance)
          intensity = (fadeDistance - dist) / (fadeDistance - proximity);

        updateCardGlow(card, e.clientX, e.clientY, intensity);
      });

      gsap.to(spotlight, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: "power2.out",
      });

      const targetOpacity =
        minDist <= proximity
          ? 0.7
          : minDist <= fadeDistance
            ? ((fadeDistance - minDist) / (fadeDistance - proximity)) * 0.7
            : 0;

      gsap.to(spotlight, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      const cards = grid.querySelectorAll<HTMLElement>(".magic-glow-card");
      cards.forEach((c) => c.style.setProperty("--glow-intensity", "0"));
      gsap.to(spotlight, { opacity: 0, duration: 0.3, ease: "power2.out" });
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      spotlight.parentNode?.removeChild(spotlight);
    };
  }, [glowColor, spotlightRadius, updateCardGlow]);

  return (
    <>
      <div ref={gridRef} className={className} style={style}>
        {children}
      </div>
      <style>{`
        .magic-glow-card {
          --glow-x: 50%;
          --glow-y: 50%;
          --glow-intensity: 0;
          --glow-radius: 200px;
          --glow-rgb: ${glowColor};
          position: relative;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .magic-glow-card:hover {
          transform: translateY(-2px);
          box-shadow:
            0 4px 20px rgba(${glowColor}, 0.15),
            0 0 30px rgba(${glowColor}, 0.08);
        }
        .magic-glow-card::after {
          content: '';
          position: absolute;
          inset: 0;
          padding: 4px;
          background: radial-gradient(
            var(--glow-radius) circle at var(--glow-x) var(--glow-y),
            rgba(var(--glow-rgb), calc(var(--glow-intensity) * 0.8)) 0%,
            rgba(var(--glow-rgb), calc(var(--glow-intensity) * 0.4)) 30%,
            transparent 60%
          );
          border-radius: inherit;
          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          mask-composite: exclude;
          pointer-events: none;
          z-index: 1;
        }
      `}</style>
    </>
  );
}
