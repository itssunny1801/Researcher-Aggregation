"use client";
import React, { useEffect, useRef } from "react";
import { useTheme } from "@/lib/theme-context";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
}

export default function InteractiveParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let animationFrameId: number;

    const mouse = { x: -1000, y: -1000, radius: 150 };

    // Set canvas dimensions
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    // Initialize particles based on screen size (less dense for a cleaner look)
    const initParticles = () => {
      particles = [];
      const density = Math.floor((width * height) / 10000); // significantly reduced density
      for (let i = 0; i < density; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        particles.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: Math.random() * 1.5 + 1.0, // sizes between 1.0 and 2.5
        });
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const onMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    resize();

    // Determine particle color based on theme. Using sync with the primary theme accent.
    const isDark = document.documentElement.classList.contains("dark");
    // Minimalist grey/slate accent colors for dots, syncing perfectly with the academic theme
    const dotColor = isDark ? "rgba(156, 163, 175, 0.35)" : "rgba(55, 65, 81, 0.25)";
    const glowColor = isDark ? "rgba(156, 163, 175, 0.6)" : "rgba(55, 65, 81, 0.5)";

    let last = performance.now();
    const animate = (now: number) => {
      // Frame-rate-independent stepping (60 Hz base): the drift, repel and
      // ease-back feel identical at 60/120/144 Hz and never stutter under load.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const f = dt * 60;
      const friction = Math.pow(0.9, f);

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = dotColor;
      ctx.shadowColor = glowColor; // set once — colour never changes per dot

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Distance to mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let currentGlow = 0; // no baseline glow → cheap; only glow near cursor

        // Interaction logic
        if (dist < mouse.radius) {
          // Repel force - perfectly smooth outward movement
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          p.vx -= Math.cos(angle) * force * 1.2 * f;
          p.vy -= Math.sin(angle) * force * 1.2 * f;

          currentGlow = 2 + force * 5; // extra glow when hovered
        }

        // Return to base smoothly
        p.vx += (p.baseX - p.x) * 0.02 * f; // ultra smooth return
        p.vy += (p.baseY - p.y) * 0.02 * f;

        // Apply friction
        p.vx *= friction; // glide more
        p.vy *= friction;

        // Update position
        p.x += p.vx * f;
        p.y += p.vy * f;

        // Draw particle — canvas shadow blur is costly, so only the handful of
        // dots near the cursor pay for it; the rest render flat and fast.
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowBlur = currentGlow;
        ctx.fill();
      }

      // reset shadows to avoid artifacts
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%", zIndex: 0 }}
    />
  );
}
