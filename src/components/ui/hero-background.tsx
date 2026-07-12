"use client";
import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/lib/theme-context";

export default function HeroBackground() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div 
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{
        maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
      }}
    >
      {/* Ambient gradient fading in from transparent at the top to seamlessly blend with the navbar */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-academic-accent/10 to-transparent dark:from-transparent dark:via-academic-accent/5" />

      {/* 3D Scene Container */}
      <div className="absolute inset-0 flex items-center justify-center [perspective:1000px] opacity-60 dark:opacity-80">

        {/* The Floor (Rotated to create isometric view) */}
        <div className="w-[150vw] h-[150vh] absolute top-[10%] [transform:rotateX(65deg)_rotateZ(25deg)] [transform-style:preserve-3d]">

          {/* Grid Background on Floor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-academic-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-academic-border)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30" />

          {/* Pillars representing academic data blocks */}
          <div className="absolute inset-0 [transform-style:preserve-3d]">
            <Pillar x={20} y={20} w={6} h={25} delay={0} />
            <Pillar x={40} y={15} w={8} h={40} delay={1} />
            <Pillar x={60} y={30} w={5} h={15} delay={2} />
            <Pillar x={30} y={50} w={7} h={30} delay={0.5} />
            <Pillar x={70} y={60} w={10} h={45} delay={1.5} />
            <Pillar x={80} y={20} w={6} h={20} delay={2.5} />
            <Pillar x={15} y={70} w={8} h={35} delay={0.8} />
            <Pillar x={50} y={80} w={5} h={18} delay={1.8} />
            <Pillar x={85} y={85} w={12} h={50} delay={0.3} />
          </div>

        </div>
      </div>

      {/* Animated dot-building constellation */}
      <DotField />
    </div>
  );
}

type RGB = { r: number; g: number; b: number };

function parseColor(raw: string): RGB | null {
  const v = raw.trim();
  const hex = v.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    let h = hex[1];
    if (h.length === 3) h = h.split("").map((c) => c + c).join("");
    return {
      r: parseInt(h.slice(0, 2), 16),
      g: parseInt(h.slice(2, 4), 16),
      b: parseInt(h.slice(4, 6), 16),
    };
  }
  const rgb = v.match(/rgba?\(\s*([\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)/i);
  if (rgb) {
    return { r: +rgb[1], g: +rgb[2], b: +rgb[3] };
  }
  return null;
}

interface Dot {
  x: number;
  y: number;
  ox: number; // origin (build start)
  oy: number;
  tx: number; // home / drift target
  ty: number;
  vx: number; // drift velocity
  vy: number;
  offX: number; // cursor-repulsion displacement (eases back to 0)
  offY: number;
  r: number;
  delay: number; // when this dot begins to appear (ms)
  born: number; // 0 → 1 build progress
}

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const accentRef = useRef<RGB>({ r: 37, g: 99, b: 235 });
  const { theme } = useTheme();

  // Keep the accent colour in sync with the active theme without
  // tearing down / restarting the animation.
  useEffect(() => {
    const parsed = parseColor(
      getComputedStyle(document.documentElement).getPropertyValue("--color-academic-accent")
    );
    if (parsed) accentRef.current = parsed;
  }, [theme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let dots: Dot[] = [];
    let raf = 0;
    const start = performance.now();

    const BUILD_EACH = 1400; // ms for a single dot to settle
    const BUILD_SPREAD = 4200; // ms across which dots start appearing
    const MAX_DIST = 130; // link distance
    const REPEL_R = 150; // cursor influence radius
    const REPEL_MAX = 60; // max push distance away from cursor
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    // Cursor position in canvas-local coordinates (for the soft "break" effect).
    const mouse = { x: -9999, y: -9999, active: false };

    const resize = (rebuild: boolean) => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const sx = width ? w / width : 1;
      const sy = height ? h / height : 1;
      width = w;
      height = h;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (rebuild || dots.length === 0) {
        const count = Math.min(90, Math.max(24, Math.floor((w * h) / 12000)));
        dots = Array.from({ length: count }, (_, i) => {
          const tx = Math.random() * w;
          const ty = Math.random() * h;
          const angle = Math.random() * Math.PI * 2;
          const dist = 40 + Math.random() * 120;
          // Constant slow speed in a random direction so every dot
          // is always gently gliding (none sit near-still).
          const dir = Math.random() * Math.PI * 2;
          const speed = 0.22 + Math.random() * 0.16;
          return {
            x: tx,
            y: ty,
            ox: tx + Math.cos(angle) * dist,
            oy: ty + Math.sin(angle) * dist,
            tx,
            ty,
            vx: Math.cos(dir) * speed,
            vy: Math.sin(dir) * speed,
            offX: 0,
            offY: 0,
            r: 1 + Math.random() * 1.6,
            delay: (i / count) * BUILD_SPREAD + Math.random() * 400,
            born: 0,
          };
        });
      } else {
        // Preserve the in-progress build; just rescale positions.
        for (const d of dots) {
          d.x *= sx;
          d.y *= sy;
          d.tx *= sx;
          d.ty *= sy;
          d.ox *= sx;
          d.oy *= sy;
        }
      }
    };

    resize(true);

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);
      const elapsed = now - start;

      for (const d of dots) {
        const local = (elapsed - d.delay) / BUILD_EACH;
        const p = local <= 0 ? 0 : local >= 1 ? 1 : easeOut(local);
        d.born = p;

        // Home position: drifts once settled, eases in while building.
        let hx: number;
        let hy: number;
        if (p >= 1) {
          d.tx += d.vx;
          d.ty += d.vy;
          if (d.tx < -20) d.tx = width + 20;
          if (d.tx > width + 20) d.tx = -20;
          if (d.ty < -20) d.ty = height + 20;
          if (d.ty > height + 20) d.ty = -20;
          hx = d.tx;
          hy = d.ty;
        } else {
          hx = d.ox + (d.tx - d.ox) * p;
          hy = d.oy + (d.ty - d.oy) * p;
        }

        // Soft "break": push dots away from the cursor, then ease them home.
        let tox = 0;
        let toy = 0;
        if (mouse.active) {
          const mdx = hx - mouse.x;
          const mdy = hy - mouse.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < REPEL_R && md > 0.01) {
            const f = 1 - md / REPEL_R;
            const s = f * f * REPEL_MAX; // eased falloff
            tox = (mdx / md) * s;
            toy = (mdy / md) * s;
          }
        }
        // Ease toward the push target (or back to 0) for a smooth, soft feel.
        d.offX += (tox - d.offX) * 0.12;
        d.offY += (toy - d.offY) * 0.12;

        d.x = hx + d.offX;
        d.y = hy + d.offY;
      }

      const { r, g, b } = accentRef.current;

      // Constellation links.
      for (let i = 0; i < dots.length; i++) {
        const a = dots[i];
        if (a.born <= 0) continue;
        for (let j = i + 1; j < dots.length; j++) {
          const c = dots[j];
          if (c.born <= 0) continue;
          const dx = a.x - c.x;
          const dy = a.y - c.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST * MAX_DIST) {
            const dist = Math.sqrt(d2);
            const alpha = (1 - dist / MAX_DIST) * 0.45 * a.born * c.born;
            ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(c.x, c.y);
            ctx.stroke();
          }
        }
      }

      // Dots (with a soft glow).
      for (const d of dots) {
        if (d.born <= 0) continue;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.09 * d.born})`;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${0.9 * d.born})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize(false);
        if (raf === 0) raf = requestAnimationFrame(render);
      }, 150);
    };
    window.addEventListener("resize", onResize);

    // Track the cursor globally (the canvas itself is pointer-events-none and
    // sits behind the content), mapping to canvas-local coordinates.
    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };
    const onPointerLeave = () => {
      mouse.active = false;
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerleave", onPointerLeave);
      clearTimeout(resizeTimer);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

function Pillar({ x, y, w, h, delay }: { x: number; y: number; w: number; h: number; delay: number }) {
  // Convert abstract grid units to REMs (1 unit = 1rem = 16px)
  const widthStr = `${w}rem`;
  const heightStr = `${h}rem`;

  return (
    <div
      className="absolute [transform-style:preserve-3d] transition-transform duration-1000"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        width: widthStr,
        height: widthStr,
      }}
    >
      {/* Top Face */}
      <div
        className="absolute inset-0 bg-academic-accent/20 border border-academic-accent/50 shadow-[0_0_30px_var(--color-academic-accent)] backdrop-blur-sm"
        style={{ transform: `translateZ(${heightStr})` }}
      />

      {/* Front Face (Bottom Edge) */}
      <div
        className="absolute bottom-0 bg-academic-surface/80 border border-academic-border/50 origin-bottom"
        style={{ width: widthStr, height: heightStr, transform: `rotateX(-90deg)` }}
      />

      {/* Back Face (Top Edge) */}
      <div
        className="absolute top-0 bg-academic-surface/40 border border-academic-border/50 origin-top"
        style={{ width: widthStr, height: heightStr, transform: `rotateX(90deg)` }}
      />

      {/* Left Face (Left Edge) */}
      <div
        className="absolute left-0 bg-academic-surface/90 border border-academic-border/50 origin-left"
        style={{ width: heightStr, height: widthStr, transform: `rotateY(-90deg)` }}
      />

      {/* Right Face (Right Edge) */}
      <div
        className="absolute right-0 bg-academic-surface/50 border border-academic-border/50 origin-right"
        style={{ width: heightStr, height: widthStr, transform: `rotateY(90deg)` }}
      />
    </div>
  );
}
