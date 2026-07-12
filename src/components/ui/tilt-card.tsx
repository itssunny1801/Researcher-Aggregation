"use client";

import { useRef } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Maximum tilt in degrees on each axis. */
  max?: number;
  /** Pointer-tracked light sheen across the surface. */
  glare?: boolean;
}

/**
 * Wraps content in a soft, pointer-driven 3D tilt with a light glare that
 * follows the cursor. Transforms are written straight to the DOM node so
 * hovering never triggers a React re-render. Pass the card's `rounded-*`
 * class via `className` so the glare clips to the same corners.
 */
export default function TiltCard({ children, className = "", max = 6, glare = true }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const reset = "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0px)";

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5; // -0.5 .. 0.5
    const py = y / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-py * 2 * max}deg) rotateY(${px * 2 * max}deg) translateZ(8px)`;
    const g = glareRef.current;
    if (g) {
      g.style.opacity = "1";
      g.style.background = `radial-gradient(280px circle at ${x}px ${y}px, var(--tilt-glare), transparent 65%)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = reset;
    if (glareRef.current) glareRef.current.style.opacity = "0";
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      className={`relative h-full transition-transform duration-300 ease-out will-change-transform [transform-style:preserve-3d] rounded-2xl ${className}`}
      style={{ transform: reset }}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-500"
        />
      )}
    </div>
  );
}
