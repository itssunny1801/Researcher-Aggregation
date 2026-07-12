"use client";
import React, { useEffect, useRef } from "react";

export default function CyberTorus() {
  const outerRingRef = useRef<HTMLDivElement>(null);
  const innerRingRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 24 blocks for the outer ring, 16 for the inner ring
  const segments = Array.from({ length: 24 });
  const innerSegments = Array.from({ length: 16 });

  useEffect(() => {
    let raf: number;
    let angleOuter = 0;
    let angleInner = 0;
    
    // Smooth mouse tracking physics
    let targetX = 60; // Default isometric tilt
    let targetY = 0;
    let currentX = 60;
    let currentY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Mouse X dictates Y rotation (twist)
      const x = (e.clientX / innerWidth - 0.5) * 60; 
      // Mouse Y dictates X rotation (tilt)
      const y = (e.clientY / innerHeight - 0.5) * 60; 
      
      targetY = x;
      targetX = 60 - y; 
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      // Spin the rings in opposite directions
      angleOuter += 0.3;
      angleInner -= 0.5;
      
      // Interpolate for smooth, heavy glide
      currentX += (targetX - currentX) * 0.03;
      currentY += (targetY - currentY) * 0.03;

      if (wrapperRef.current) {
        wrapperRef.current.style.transform = `rotateX(${currentX}deg) rotateY(${currentY}deg)`;
      }
      if (outerRingRef.current) {
        outerRingRef.current.style.transform = `rotateZ(${angleOuter}deg)`;
      }
      if (innerRingRef.current) {
        innerRingRef.current.style.transform = `rotateZ(${angleInner}deg)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center [perspective:1200px] pointer-events-none">
      
      {/* 3D Wrapper that handles the mouse tilt */}
      <div 
        ref={wrapperRef}
        className="relative w-full h-full flex items-center justify-center [transform-style:preserve-3d]"
      >
        
        {/* Core Glowing Energy Source */}
        <div className="absolute w-12 h-12 rounded-full bg-indigo-500/30 shadow-[0_0_80px_40px_rgba(79,70,229,0.4)] animate-pulse" />

        {/* Outer Ring */}
        <div ref={outerRingRef} className="absolute w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {segments.map((_, i) => {
            const rotate = (360 / 24) * i;
            return (
              <div 
                key={`outer-${i}`}
                className="absolute w-16 h-20 bg-indigo-600/10 border border-indigo-400/30 backdrop-blur-sm [transform-style:preserve-3d]"
                style={{
                  // Position radially outward, then flip to form a ring segment
                  transform: `rotateZ(${rotate}deg) translateY(150px) rotateX(90deg)`,
                  boxShadow: "inset 0 0 15px rgba(79,70,229,0.2)"
                }}
              >
                {/* Inner Face to create block depth */}
                <div 
                   className="absolute inset-0 bg-slate-600/20 border border-slate-400/30"
                   style={{ transform: "translateZ(-20px)" }}
                />
                {/* Side faces for true 3D geometry */}
                <div 
                   className="absolute top-0 bottom-0 left-0 w-[20px] bg-indigo-500/20 border-l border-indigo-400/30 origin-left"
                   style={{ transform: "rotateY(-90deg)" }}
                />
                <div 
                   className="absolute top-0 bottom-0 right-0 w-[20px] bg-indigo-500/20 border-r border-indigo-400/30 origin-right"
                   style={{ transform: "rotateY(90deg)" }}
                />
              </div>
            )
          })}
        </div>

        {/* Inner Ring (Spins faster, opposite direction) */}
        <div ref={innerRingRef} className="absolute w-full h-full flex items-center justify-center [transform-style:preserve-3d]">
          {innerSegments.map((_, i) => {
            const rotate = (360 / 16) * i;
            return (
              <div 
                key={`inner-${i}`}
                className="absolute w-12 h-16 bg-purple-600/10 border border-purple-400/30 backdrop-blur-md [transform-style:preserve-3d]"
                style={{
                  transform: `rotateZ(${rotate}deg) translateY(90px) rotateX(90deg)`,
                  boxShadow: "inset 0 0 15px rgba(168,85,247,0.2)"
                }}
              >
                <div 
                   className="absolute inset-0 bg-fuchsia-600/20 border border-fuchsia-400/30"
                   style={{ transform: "translateZ(-15px)" }}
                />
                <div 
                   className="absolute top-0 bottom-0 left-0 w-[15px] bg-purple-500/20 border-l border-purple-400/30 origin-left"
                   style={{ transform: "rotateY(-90deg)" }}
                />
                <div 
                   className="absolute top-0 bottom-0 right-0 w-[15px] bg-purple-500/20 border-r border-purple-400/30 origin-right"
                   style={{ transform: "rotateY(90deg)" }}
                />
              </div>
            )
          })}
        </div>

      </div>
    </div>
  );
}
