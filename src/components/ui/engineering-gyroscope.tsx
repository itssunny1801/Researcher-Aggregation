"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";

/**
 * EngineeringGyroscope — a sophisticated, interactive 3D gyroscope / gimbal
 * instrument built entirely with CSS 3D transforms (no WebGL, no deps).
 *
 * Design intent: echo the blocky "reactor torus" reference aesthetic via a
 * segmented outer cage, then nest thin circular gimbal rings spinning on
 * orthogonal axes around a glowing rotor core — reading as a precision
 * engineering-science instrument.
 *
 * All colours are read from the site's CSS custom properties so the element
 * stays perfectly in sync with the academic theme in both light and dark mode.
 */

const SIZE = 420; // container px (square)
const SEGMENTS = 24; // blocky outer-ring segments (torus echo)
const TICKS = 36; // fine measurement ticks on the primary gimbal
const RING_RADIUS = 158; // radius of the blocky outer ring
const SEG_W = 26;
const SEG_H = 40;
const SEG_DEPTH = 16;
const BASE_TILT_X = 52; // isometric-ish base tilt (echoes the reference view)

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

export default function EngineeringGyroscope() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [accent, setAccent] = useState("156, 163, 175"); // fallback gray-400
  const [muted, setMuted] = useState("139, 147, 165");

  // Refs for the independently-animated layers.
  const tiltRef = useRef<HTMLDivElement>(null);
  const cageRef = useRef<HTMLDivElement>(null);
  const gimbalARef = useRef<HTMLDivElement>(null);
  const gimbalBRef = useRef<HTMLDivElement>(null);
  const rotorRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Keep colours synced with the active theme.
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
    let cage = 0;
    let gA = 0;
    let gB = 0;
    let rotor = 0;
    let orbit = 0;
    let t = 0; // drives a gentle autonomous sway so it stays alive when idle

    // Smooth mouse-driven gyroscopic tilt (heavy, eased glide).
    let targetX = BASE_TILT_X;
    let targetY = -12;
    let curX = BASE_TILT_X;
    let curY = -12;

    const onMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetY = -12 + (e.clientX / innerWidth - 0.5) * 40;
      targetX = BASE_TILT_X - (e.clientY / innerHeight - 0.5) * 26;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let last = performance.now();
    const animate = (now: number) => {
      // Frame-rate-independent timing: identical motion at 60/120/144 Hz and
      // through frame drops. `f` normalises per-frame steps to a 60 Hz base;
      // the lerp uses exponential smoothing so the glide never varies by rate.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const f = dt * 60;

      // Slow, smooth, continuous rotation on every axis.
      cage += 0.1 * f; // outer reactor cage — very slow & stately
      gA += 0.26 * f; // primary gimbal
      gB -= 0.19 * f; // secondary gimbal — counter-rotating
      rotor += 0.5 * f; // rotor flywheel — the "fastest", still gentle
      orbit += 0.2 * f; // orbiting satellites
      t += 0.004 * f;

      // Gentle breathing sway keeps it alive with no mouse input.
      const desiredX = targetX + Math.sin(t) * 2.5;
      const desiredY = targetY + Math.sin(t * 0.7) * 4;
      const k = 1 - Math.exp(-3.0 * dt);
      curX += (desiredX - curX) * k;
      curY += (desiredY - curY) * k;

      if (tiltRef.current)
        tiltRef.current.style.transform = `rotateX(${curX}deg) rotateY(${curY}deg)`;
      if (cageRef.current) cageRef.current.style.transform = `rotateZ(${cage}deg)`;
      if (gimbalARef.current) gimbalARef.current.style.transform = `rotateY(${gA}deg)`;
      if (gimbalBRef.current) gimbalBRef.current.style.transform = `rotateX(${gB}deg)`;
      if (rotorRef.current)
        rotorRef.current.style.transform = `rotateX(90deg) rotateZ(${rotor}deg)`;
      if (orbitRef.current)
        orbitRef.current.style.transform = `rotateX(74deg) rotateZ(${orbit}deg)`;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [mounted]);

  if (!mounted) return null;

  const segments = Array.from({ length: SEGMENTS });
  const ticks = Array.from({ length: TICKS });

  return (
    <div
      className="relative flex items-center justify-center pointer-events-none select-none"
      style={{ width: SIZE, height: SIZE, perspective: 1200, maxWidth: "100%" }}
      aria-hidden="true"
    >
      {/* ── Ambient energy glow ── */}
      <div
        className="absolute rounded-full animate-pulse"
        style={{
          width: 300,
          height: 300,
          background: `radial-gradient(circle, rgba(${accent}, 0.28), transparent 68%)`,
          filter: "blur(46px)",
        }}
      />

      {/* ── Tilt wrapper (mouse-reactive gyroscopic glide) ── */}
      <div
        ref={tiltRef}
        className="relative flex items-center justify-center"
        style={{
          width: "100%",
          height: "100%",
          transformStyle: "preserve-3d",
          transform: `rotateX(${BASE_TILT_X}deg) rotateY(-12deg)`,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
      >
        {/* ── Outer static mount ring ── */}
        <div
          className="absolute rounded-full"
          style={{
            width: RING_RADIUS * 2 + 44,
            height: RING_RADIUS * 2 + 44,
            border: `1px solid rgba(${accent}, 0.18)`,
            boxShadow: `0 0 30px rgba(${accent}, 0.08), inset 0 0 30px rgba(${accent}, 0.05)`,
          }}
        />

        {/* ── Blocky reactor cage (torus echo) — spins on Z ── */}
        <div
          ref={cageRef}
          className="absolute flex items-center justify-center"
          style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        >
          {segments.map((_, i) => {
            const rot = (360 / SEGMENTS) * i;
            return (
              <div
                key={`seg-${i}`}
                className="absolute"
                style={{
                  width: SEG_W,
                  height: SEG_H,
                  transformStyle: "preserve-3d",
                  transform: `rotateZ(${rot}deg) translateY(${RING_RADIUS}px) rotateX(90deg)`,
                  background: `rgba(${accent}, 0.10)`,
                  border: `1px solid rgba(${accent}, 0.38)`,
                  boxShadow: `inset 0 0 14px rgba(${accent}, 0.22)`,
                }}
              >
                {/* Inner face → block depth */}
                <div
                  className="absolute inset-0"
                  style={{
                    transform: `translateZ(-${SEG_DEPTH}px)`,
                    background: `rgba(${accent}, 0.16)`,
                    border: `1px solid rgba(${accent}, 0.30)`,
                  }}
                />
                {/* Side faces → true 3D geometry */}
                <div
                  className="absolute top-0 bottom-0 left-0 origin-left"
                  style={{
                    width: SEG_DEPTH,
                    transform: "rotateY(-90deg)",
                    background: `rgba(${accent}, 0.20)`,
                    borderLeft: `1px solid rgba(${accent}, 0.30)`,
                  }}
                />
                <div
                  className="absolute top-0 bottom-0 right-0 origin-right"
                  style={{
                    width: SEG_DEPTH,
                    transform: "rotateY(90deg)",
                    background: `rgba(${accent}, 0.14)`,
                    borderRight: `1px solid rgba(${accent}, 0.30)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* ── Primary gimbal ring (circular) — spins on Y ── */}
        <div
          ref={gimbalARef}
          className="absolute flex items-center justify-center"
          style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 264,
              height: 264,
              border: `2px solid rgba(${accent}, 0.55)`,
              boxShadow: `0 0 22px rgba(${accent}, 0.25), inset 0 0 22px rgba(${accent}, 0.12)`,
            }}
          >
            {/* Fine measurement ticks around the gimbal */}
            {ticks.map((_, i) => {
              const isMajor = i % 3 === 0;
              return (
                <div
                  key={`tick-${i}`}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    width: 1,
                    height: isMajor ? 9 : 5,
                    marginLeft: -0.5,
                    background: `rgba(${accent}, ${isMajor ? 0.7 : 0.4})`,
                    transformOrigin: "center -132px",
                    transform: `rotate(${(360 / TICKS) * i}deg) translateY(-132px)`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* ── Secondary gimbal ring (circular) — spins on X ── */}
        <div
          ref={gimbalBRef}
          className="absolute flex items-center justify-center"
          style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        >
          <div
            className="absolute rounded-full"
            style={{
              width: 212,
              height: 212,
              border: `2px solid rgba(${accent}, 0.45)`,
              boxShadow: `0 0 18px rgba(${accent}, 0.2), inset 0 0 18px rgba(${accent}, 0.1)`,
            }}
          />
        </div>

        {/* ── Orbiting satellite nodes — sweep on a tilted plane ── */}
        <div
          ref={orbitRef}
          className="absolute flex items-center justify-center"
          style={{ width: "100%", height: "100%", transformStyle: "preserve-3d" }}
        >
          {[0, 120, 240].map((deg) => (
            <div
              key={`sat-${deg}`}
              className="absolute left-1/2 top-1/2 rounded-full"
              style={{
                width: 8,
                height: 8,
                marginLeft: -4,
                marginTop: -4,
                background: `rgba(${accent}, 0.9)`,
                boxShadow: `0 0 12px 2px rgba(${accent}, 0.55)`,
                transform: `rotate(${deg}deg) translateX(122px)`,
              }}
            />
          ))}
        </div>

        {/* ── Rotor flywheel — fast-spinning disc, lies flat ── */}
        <div
          ref={rotorRef}
          className="absolute rounded-full"
          style={{
            width: 96,
            height: 96,
            transformStyle: "preserve-3d",
            transform: "rotateX(90deg)",
            border: `2px solid rgba(${accent}, 0.5)`,
            background: `rgba(${accent}, 0.08)`,
            boxShadow: `0 0 24px rgba(${accent}, 0.22), inset 0 0 20px rgba(${accent}, 0.14)`,
          }}
        >
          {/* Flywheel spokes */}
          <div
            className="absolute top-1/2 left-0 right-0"
            style={{ height: 1, background: `rgba(${accent}, 0.45)` }}
          />
          <div
            className="absolute left-1/2 top-0 bottom-0"
            style={{ width: 1, background: `rgba(${accent}, 0.45)` }}
          />
        </div>

        {/* ── Glowing rotor core ── */}
        <div
          className="absolute rounded-full animate-pulse"
          style={{
            width: 26,
            height: 26,
            background: `radial-gradient(circle, rgba(${accent}, 0.85), rgba(${accent}, 0.15) 70%)`,
            boxShadow: `0 0 40px 10px rgba(${accent}, 0.35)`,
          }}
        />
      </div>

      {/* ── HUD overlay: instrument labels (2D, stays crisp) ── */}
      <div className="absolute inset-0">
        <span
          className="absolute font-mono uppercase"
          style={{
            top: 10,
            left: 12,
            fontSize: 9,
            letterSpacing: "0.18em",
            color: `rgba(${muted}, 0.7)`,
          }}
        >
          GYRO · ω 3.14
        </span>
        <span
          className="absolute font-mono uppercase"
          style={{
            bottom: 10,
            right: 12,
            fontSize: 9,
            letterSpacing: "0.18em",
            color: `rgba(${muted}, 0.7)`,
          }}
        >
          AXIS-Z · θ 42.0°
        </span>
      </div>
    </div>
  );
}
