import React from "react";

/**
 * Ambient3D — a whisper-quiet 3D texture layer for secondary pages.
 *
 * Small wireframe solids (a cube, a tumbling ring, glowing motes) drift and
 * rotate very slowly at low opacity. Pure CSS animations — no JS loop, no
 * mouse listeners — so it costs almost nothing and can live on every page.
 * Colours derive from the theme's CSS variables via color-mix, so the layer
 * follows light/dark mode automatically.
 *
 * Usage: place as the first child of a `relative` container; content that
 * should sit above it needs its own positioning (relative / transform),
 * which every card/section in this app already has.
 */

type Variant = "a" | "b" | "c";

const line = (pct: number) =>
  `color-mix(in srgb, var(--color-academic-accent) ${pct}%, transparent)`;

function WireCube({
  size,
  duration,
  delay = 0,
  className = "",
}: {
  size: number;
  duration: number;
  delay?: number;
  className?: string;
}) {
  const faces = [
    "rotateY(0deg)",
    "rotateY(90deg)",
    "rotateY(180deg)",
    "rotateY(270deg)",
    "rotateX(90deg)",
    "rotateX(-90deg)",
  ];
  return (
    <div
      className={`absolute animate-float-slow ${className}`}
      style={{ width: size, height: size, perspective: 600, animationDelay: `${delay}s` }}
    >
      <div
        className="relative w-full h-full animate-spin-3d"
        style={{ animationDuration: `${duration}s` }}
      >
        {faces.map((rot, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              transform: `${rot} translateZ(${size / 2}px)`,
              border: `1px solid ${line(45)}`,
              background: line(4),
            }}
          />
        ))}
      </div>
    </div>
  );
}

function WireRing({
  size,
  duration,
  delay = 0,
  className = "",
}: {
  size: number;
  duration: number;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute animate-float-slow ${className}`}
      style={{ width: size, height: size, perspective: 700, animationDelay: `${delay}s` }}
    >
      <div
        className="w-full h-full rounded-full animate-tumble-3d"
        style={{
          animationDuration: `${duration}s`,
          border: `1px solid ${line(40)}`,
          boxShadow: `0 0 18px ${line(12)}, inset 0 0 18px ${line(8)}`,
        }}
      />
    </div>
  );
}

function GlowDot({
  size = 5,
  delay = 0,
  className = "",
}: {
  size?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={`absolute rounded-full animate-pulse ${className}`}
      style={{
        width: size,
        height: size,
        animationDelay: `${delay}s`,
        background: line(75),
        boxShadow: `0 0 10px 2px ${line(30)}`,
      }}
    />
  );
}

export default function Ambient3D({ variant = "a" }: { variant?: Variant }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none hidden sm:block opacity-50 dark:opacity-60"
      aria-hidden="true"
    >
      {variant === "a" && (
        <>
          <WireCube size={64} duration={34} className="top-[14%] right-[7%]" />
          <WireRing size={130} duration={46} delay={1.5} className="bottom-[12%] left-[5%]" />
          <GlowDot className="top-[36%] left-[10%]" />
          <GlowDot size={4} delay={1.2} className="bottom-[30%] right-[12%]" />
        </>
      )}

      {variant === "b" && (
        <>
          <WireRing size={110} duration={50} className="top-[10%] right-[6%]" />
          <WireCube size={54} duration={30} delay={2} className="bottom-[16%] left-[6%]" />
          <GlowDot delay={0.8} className="top-[48%] left-[3%]" />
          <GlowDot size={4} delay={1.6} className="top-[22%] left-[16%]" />
        </>
      )}

      {variant === "c" && (
        <>
          <WireCube size={48} duration={38} className="top-[20%] left-[5%]" />
          <WireRing size={120} duration={54} delay={1} className="bottom-[10%] right-[5%]" />
          <GlowDot delay={0.5} className="top-[12%] right-[15%]" />
          <GlowDot size={4} delay={1.4} className="bottom-[34%] left-[12%]" />
        </>
      )}
    </div>
  );
}
