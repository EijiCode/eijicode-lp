"use client";

import { useEffect, useRef } from "react";

// React Bits の Noise（https://reactbits.dev/animations/noise）を移植。
// 変更点: ウィンドウではなく親要素のサイズに追従・rAF のクリーンアップを追加・className を受け取る
type NoiseProps = {
  className?: string;
  patternSize?: number;
  patternScaleX?: number;
  patternScaleY?: number;
  patternRefreshInterval?: number;
  patternAlpha?: number;
};

export default function Noise({
  className = "",
  patternSize = 250,
  patternScaleX = 1,
  patternScaleY = 1,
  patternRefreshInterval = 1,
  patternAlpha = 0,
}: NoiseProps) {
  const grainRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = grainRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let animationId = 0;

    const patternCanvas = document.createElement("canvas");
    patternCanvas.width = patternSize;
    patternCanvas.height = patternSize;
    const patternCtx = patternCanvas.getContext("2d");
    if (!patternCtx) return;
    const patternData = patternCtx.createImageData(patternSize, patternSize);
    const patternPixelDataLength = patternSize * patternSize * 4;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(patternScaleX, 0, 0, patternScaleY, 0, 0);
    };

    const updatePattern = () => {
      for (let i = 0; i < patternPixelDataLength; i += 4) {
        const value = Math.random() * 255;
        patternData.data[i] = value;
        patternData.data[i + 1] = value;
        patternData.data[i + 2] = value;
        patternData.data[i + 3] = patternAlpha;
      }
      patternCtx.putImageData(patternData, 0, 0);
    };

    const drawGrain = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pattern = ctx.createPattern(patternCanvas, "repeat");
      if (!pattern) return;
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const loop = () => {
      if (frame % patternRefreshInterval === 0) {
        updatePattern();
        drawGrain();
      }
      frame++;
      animationId = window.requestAnimationFrame(loop);
    };

    window.addEventListener("resize", resize);
    resize();
    loop();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [
    patternSize,
    patternScaleX,
    patternScaleY,
    patternRefreshInterval,
    patternAlpha,
  ]);

  return (
    <canvas
      ref={grainRef}
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={{ imageRendering: "pixelated" }}
    />
  );
}
