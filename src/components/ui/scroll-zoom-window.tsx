"use client";
import React, { useEffect, useRef } from "react";

export default function ScrollZoomWindow({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  const state = useRef({
    target: 0,
    current: 0
  });

  useEffect(() => {
    let animationFrameId: number;
    
    const easeOutCubic = (x: number): number => 1 - Math.pow(1 - x, 3);

    const updateTarget = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Drastically reduced vertical space to 110vh per your request.
      // This leaves almost zero empty space on the page.
      const totalDistance = windowHeight * 1.1; 
      const scrolled = windowHeight - rect.top;
      
      const rawProgress = scrolled / totalDistance;
      state.current.target = Math.max(0, Math.min(1, rawProgress));
    };

    const render = () => {
      // Increased the smoothing effect by 4x (from 0.12 down to 0.03).
      // A lower number mathematically increases the "butter" effect, causing 
      // the animation to glide heavily and smoothly even if you scroll very fast.
      state.current.current += (state.current.target - state.current.current) * 0.03;

      if (contentRef.current) {
        const eased = easeOutCubic(state.current.current);

        const scale = 0.2 + (eased * 0.8);
        const rotateX = 45 - (eased * 45);
        const translateY = 400 - (eased * 400);

        contentRef.current.style.transform = `translate3d(0, ${translateY}px, 0) rotateX(${rotateX}deg) scale(${scale})`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const onScroll = () => {
      updateTarget();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    
    updateTarget();
    state.current.current = state.current.target;
    render();
    
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    // Reduced to 110vh
    <div ref={containerRef} className="relative w-full h-[110vh] mt-8">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center perspective-1000">
        <div
          ref={contentRef}
          className="w-full max-w-6xl mx-auto drop-shadow-2xl [transform-style:preserve-3d] will-change-transform"
          style={{
            transform: "translate3d(0, 400px, 0) rotateX(45deg) scale(0.2)",
            opacity: 1
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

