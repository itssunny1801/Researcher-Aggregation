"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";

/**
 * VectorLattice — a 3D lattice of glowing data nodes inside a faint wireframe
 * cube, with a luminous "query plane" slowly scanning through the volume.
 * A direct visual metaphor for the platform's vector-embedding similarity
 * search: data points living in a vector space, being swept by a query.
 *
 * Pure CSS 3D transforms (no WebGL, no deps). Colours are read from the
 * site's CSS custom properties so it stays in sync with light/dark themes.
 */

const SIZE = 400; // container px (square)
const STEP = 62; // node spacing
const COORDS = [-STEP, 0, STEP];
const HALF = STEP; // lattice half-extent
const CUBE = STEP * 2 + 34; // bounding wireframe cube size

type Vec3 = [number, number, number];

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

// Precompute nodes and grid lines (module scope — computed once).
const NODES: Vec3[] = [];
for (const x of COORDS) for (const y of COORDS) for (const z of COORDS) NODES.push([x, y, z]);

const LINES: { from: Vec3; to: Vec3 }[] = [];
for (const a of COORDS)
  for (const b of COORDS) {
    LINES.push({ from: [-HALF, a, b], to: [HALF, a, b] }); // X lines
    LINES.push({ from: [a, -HALF, b], to: [a, HALF, b] }); // Y lines
    LINES.push({ from: [a, b, -HALF], to: [a, b, HALF] }); // Z lines
  }

// Bounding cube faces: rotate → push outward.
const FACES = [
  "rotateY(0deg)",
  "rotateY(90deg)",
  "rotateY(180deg)",
  "rotateY(270deg)",
  "rotateX(90deg)",
  "rotateX(-90deg)",
];

export default function VectorLattice() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [accent, setAccent] = useState("156, 163, 175"); // fallback gray-400
  const [muted, setMuted] = useState("139, 147, 165");

  const tiltRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);

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

    // Gentle mouse-driven tilt around an isometric base pose.
    let targetX = -24;
    let targetY = 0;
    let curX = -24;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetY = (e.clientX / innerWidth - 0.5) * 24;
      targetX = -24 - (e.clientY / innerHeight - 0.5) * 16;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let last = performance.now();
    const animate = (now: number) => {
      // Frame-rate-independent timing (60 Hz base) + exponential smoothing.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const f = dt * 60;
      const k = 1 - Math.exp(-3.0 * dt);

      spin += 0.16 * f; // slow, stately rotation
      t += 0.006 * f;

      const bob = Math.sin(t * 0.8) * 5; // gentle vertical float
      curX += (targetX + Math.sin(t) * 2 - curX) * k;
      curY += (targetY + Math.sin(t * 0.6) * 3 - curY) * k;

      if (tiltRef.current)
        tiltRef.current.style.transform = `translateY(${bob}px) rotateX(${curX}deg) rotateY(${curY}deg)`;
      if (spinRef.current) spinRef.current.style.transform = `rotateY(${spin}deg)`;
      // Query plane sweeps the volume top ↔ bottom.
      if (planeRef.current)
        planeRef.current.style.transform = `translateY(${Math.sin(t) * (HALF + 8)}px) rotateX(90deg)`;

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
      style={{ width: SIZE, height: SIZE, perspective: 1100, maxWidth: "100%" }}
      aria-hidden="true"
    >
      {/* ── Ambient glow ── */}
      <div
        className="absolute rounded-full"
        style={{
          width: 260,
          height: 260,
          background: `radial-gradient(circle, rgba(${accent}, 0.20), transparent 70%)`,
          filter: "blur(48px)",
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
          transform: "rotateX(-24deg)",
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {/* ── Spin wrapper (the lattice frame) ── */}
        <div
          ref={spinRef}
          className="relative flex items-center justify-center"
          style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        >
          {/* Bounding wireframe cube */}
          {FACES.map((rot, i) => (
            <div
              key={`face-${i}`}
              className="absolute left-1/2 top-1/2"
              style={{
                width: CUBE,
                height: CUBE,
                marginLeft: -CUBE / 2,
                marginTop: -CUBE / 2,
                transform: `${rot} translateZ(${CUBE / 2}px)`,
                border: `1px solid rgba(${accent}, 0.22)`,
                background: `rgba(${accent}, 0.02)`,
              }}
            />
          ))}

          {/* Grid lines */}
          {LINES.map((l, i) => (
            <Line3D
              key={`line-${i}`}
              from={l.from}
              to={l.to}
              color={`rgba(${accent}, 0.28)`}
            />
          ))}

          {/* Data nodes */}
          {NODES.map(([x, y, z], i) => {
            const isCenter = x === 0 && y === 0 && z === 0;
            const s = isCenter ? 12 : 8;
            return (
              <div
                key={`node-${i}`}
                className="absolute left-1/2 top-1/2 rounded-full animate-pulse"
                style={{
                  width: s,
                  height: s,
                  animationDelay: `${(i % 9) * 260}ms`,
                  transform: `translate3d(${x - s / 2}px, ${y - s / 2}px, ${z}px)`,
                  background: `radial-gradient(circle, rgba(${accent}, ${isCenter ? 1 : 0.9}), rgba(${accent}, 0.35) 75%)`,
                  boxShadow: `0 0 ${isCenter ? 22 : 12}px ${isCenter ? 5 : 2}px rgba(${accent}, ${isCenter ? 0.55 : 0.38})`,
                }}
              />
            );
          })}

          {/* Scanning query plane */}
          <div
            ref={planeRef}
            className="absolute left-1/2 top-1/2"
            style={{
              width: CUBE + 22,
              height: CUBE + 22,
              marginLeft: -(CUBE + 22) / 2,
              marginTop: -(CUBE + 22) / 2,
              transform: "rotateX(90deg)",
              background: `rgba(${accent}, 0.07)`,
              border: `1.5px solid rgba(${accent}, 0.5)`,
              boxShadow: `0 0 24px rgba(${accent}, 0.28), inset 0 0 24px rgba(${accent}, 0.12)`,
            }}
          />
        </div>
      </div>

      {/* ── HUD label ── */}
      <span
        className="absolute font-mono uppercase"
        style={{
          bottom: 8,
          left: 14,
          fontSize: 9,
          letterSpacing: "0.18em",
          color: `rgba(${muted}, 0.7)`,
        }}
      >
        VECTOR SPACE · dim 1536
      </span>
    </div>
  );
}
