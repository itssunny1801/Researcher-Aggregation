"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";

/**
 * MoleculeStructure — an octahedral molecule rendered in pure CSS 3D:
 * a bright nucleus bonded to six atoms along ±X/±Y/±Z, wrapped in a faint
 * geometric cage connecting the outer atoms. Slow full-3D rotation with a
 * gentle sway — a clean, minimalist science motif with real depth.
 *
 * Colours are read from the site's CSS custom properties so the element
 * stays in sync with the academic theme in both light and dark mode.
 */

const SIZE = 340; // container px (square)
const R = 92; // bond length (centre → outer atom)

type Vec3 = [number, number, number];

const OUTER: Vec3[] = [
  [R, 0, 0],
  [-R, 0, 0],
  [0, R, 0],
  [0, -R, 0],
  [0, 0, R],
  [0, 0, -R],
];

// Cage edges: every pair of perpendicular outer atoms (12 edges).
const CAGE: [Vec3, Vec3][] = [];
for (let i = 0; i < OUTER.length; i++) {
  for (let j = i + 1; j < OUTER.length; j++) {
    const dot =
      OUTER[i][0] * OUTER[j][0] + OUTER[i][1] * OUTER[j][1] + OUTER[i][2] * OUTER[j][2];
    if (dot === 0) CAGE.push([OUTER[i], OUTER[j]]);
  }
}

function hexToRgb(hex: string): string | null {
  const h = hex.replace("#", "").trim();
  if (h.length === 6) {
    return `${parseInt(h.slice(0, 2), 16)}, ${parseInt(h.slice(2, 4), 16)}, ${parseInt(h.slice(4, 6), 16)}`;
  }
  if (h.length === 3) {
    return `${parseInt(h[0] + h[0], 16)}, ${parseInt(h[1] + h[1], 16)}, ${parseInt(h[2] + h[2], 16)}`;
  }
  return null;
}

/** Thin bar oriented from p1 → p2 in 3D space. */
function Line3D({
  from,
  to,
  color,
  thickness = 1,
}: {
  from: Vec3;
  to: Vec3;
  color: string;
  thickness?: number;
}) {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const dz = to[2] - from[2];
  const len = Math.sqrt(dx * dx + dy * dy + dz * dz);
  const rotY = (Math.atan2(-dz, dx) * 180) / Math.PI;
  const rotZ = (Math.asin(dy / len) * 180) / Math.PI;

  return (
    <div
      className="absolute left-1/2 top-1/2"
      style={{
        width: len,
        height: thickness,
        marginTop: -thickness / 2,
        background: color,
        transformOrigin: "0 50%",
        transform: `translate3d(${from[0]}px, ${from[1]}px, ${from[2]}px) rotateY(${rotY}deg) rotateZ(${rotZ}deg)`,
      }}
    />
  );
}

export default function MoleculeStructure() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [accent, setAccent] = useState("156, 163, 175"); // fallback gray-400
  const [muted, setMuted] = useState("139, 147, 165");

  const tiltRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!mounted) return;
    const root = getComputedStyle(document.documentElement);
    const a = hexToRgb(root.getPropertyValue("--color-academic-accent"));
    const m = hexToRgb(root.getPropertyValue("--color-academic-muted"));
    if (a) setAccent(a);
    if (m) setMuted(m);
  }, [mounted, theme]);

  useEffect(() => {
    if (!mounted) return;

    let raf = 0;
    let spin = 0;
    let t = 0;

    // Light mouse influence around a slightly tipped base pose.
    let targetX = -16;
    let targetY = 0;
    let curX = -16;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetY = (e.clientX / innerWidth - 0.5) * 20;
      targetX = -16 - (e.clientY / innerHeight - 0.5) * 14;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let last = performance.now();
    const animate = (now: number) => {
      // Frame-rate-independent timing (60 Hz base) + exponential smoothing.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const f = dt * 60;
      const k = 1 - Math.exp(-3.0 * dt);

      spin += 0.22 * f; // continuous molecular rotation
      t += 0.005 * f;

      const bob = Math.sin(t * 0.9) * 6; // gentle float
      curX += (targetX + Math.sin(t) * 2.5 - curX) * k;
      curY += (targetY + Math.sin(t * 0.65) * 3 - curY) * k;

      if (tiltRef.current)
        tiltRef.current.style.transform = `translateY(${bob}px) rotateX(${curX}deg) rotateZ(${Math.sin(t * 0.5) * 4}deg) rotateY(${curY}deg)`;
      if (spinRef.current) spinRef.current.style.transform = `rotateY(${spin}deg)`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{ width: SIZE, height: SIZE, perspective: 1000, maxWidth: "100%" }}
      aria-hidden="true"
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: 220,
          height: 220,
          background: `radial-gradient(circle, rgba(${accent}, 0.2), transparent 70%)`,
          filter: "blur(42px)",
        }}
      />

      {/* ── Tilt wrapper ── */}
      <div
        ref={tiltRef}
        className="relative flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: "rotateX(-16deg)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {/* ── Spin wrapper (the molecule) ── */}
        <div
          ref={spinRef}
          className="relative flex items-center justify-center"
          style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        >
          {/* Bonds: nucleus → outer atoms */}
          {OUTER.map((p, i) => (
            <Line3D
              key={`bond-${i}`}
              from={[0, 0, 0]}
              to={p}
              color={`rgba(${accent}, 0.5)`}
              thickness={2}
            />
          ))}

          {/* Geometric cage between outer atoms */}
          {CAGE.map(([a, b], i) => (
            <Line3D key={`cage-${i}`} from={a} to={b} color={`rgba(${accent}, 0.2)`} />
          ))}

          {/* Outer atoms */}
          {OUTER.map(([x, y, z], i) => (
            <div
              key={`atom-${i}`}
              className="absolute left-1/2 top-1/2 rounded-full animate-pulse"
              style={{
                width: 13,
                height: 13,
                animationDelay: `${i * 350}ms`,
                transform: `translate3d(${x - 6.5}px, ${y - 6.5}px, ${z}px)`,
                background: `radial-gradient(circle, rgba(${accent}, 0.95), rgba(${accent}, 0.35) 75%)`,
                boxShadow: `0 0 14px 3px rgba(${accent}, 0.42)`,
              }}
            />
          ))}

          {/* Nucleus */}
          <div
            className="absolute rounded-full animate-pulse"
            style={{
              width: 22,
              height: 22,
              background: `radial-gradient(circle, rgba(${accent}, 1), rgba(${accent}, 0.25) 75%)`,
              boxShadow: `0 0 30px 8px rgba(${accent}, 0.45)`,
            }}
          />
        </div>
      </div>

      {/* ── HUD label ── */}
      <span
        className="absolute font-mono uppercase"
        style={{
          bottom: 8,
          right: 14,
          fontSize: 9,
          letterSpacing: "0.18em",
          color: `rgba(${muted}, 0.7)`,
        }}
      >
        OCTAHEDRAL · sp³d²
      </span>
    </div>
  );
}
