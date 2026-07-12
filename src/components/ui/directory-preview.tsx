"use client";

import { useEffect, useRef, useState } from "react";
import ResearcherCard from "./researcher-card";
import { MOCK_RESEARCHERS } from "@/lib/constants";
import TypingEffect from "./typing-effect";

const CONIC =
  "conic-gradient(from 0deg, #ff595e, #ffca3a, #8ac926, #1982c4, #6a4c93, #ff595e)";

export default function DirectoryPreview() {
  const [mounted, setMounted] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const MAX_TILT = 7; // degrees

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 .. 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    // Write straight to the DOM node — no re-render of the card list.
    el.style.transform = `rotateX(${-py * 2 * MAX_TILT}deg) rotateY(${px * 2 * MAX_TILT}deg)`;
  };

  const handleLeave = () => {
    const el = tiltRef.current;
    if (el) el.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  return (
    // Idle float wrapper (translateY) — kept separate so it never fights the tilt transform.
    <div className="animate-float w-full">
      <div className="[perspective:1600px] w-full">
        <div
          ref={tiltRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="relative transition-transform duration-500 ease-out [transform-style:preserve-3d] w-full"
        >
          {/* Ambient rainbow glow halo — pushed back for parallax depth */}
          <div
            className="absolute -inset-2 rounded-[1.9rem] overflow-hidden blur-2xl opacity-60 dark:opacity-70 pointer-events-none"
            style={{ transform: "translateZ(-60px)" }}
          >
            <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite]" style={{ background: CONIC }} />
          </div>

          {/* Gradient border ring — the spinning conic shows through a 1.5px padding */}
          <div className="relative rounded-2xl p-[1.5px] overflow-hidden shadow-2xl [transform-style:preserve-3d] w-full">
            <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite]" style={{ background: CONIC }} />

            {/* The actual browser window (sits above the ring, popped forward in 3D) */}
            <div
              className="relative rounded-[15px] border border-academic-border/60 bg-academic-surface overflow-hidden flex flex-col h-[75vh] min-h-[500px] max-h-[850px] w-full"
              style={{ transform: "translateZ(30px)" }}
            >
              {/* Browser Header */}
              <div className="h-12 bg-academic-bg border-b border-academic-border/50 flex items-center px-4 gap-4 flex-shrink-0">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex-1 max-w-sm mx-auto bg-academic-surface border border-academic-border/30 rounded-md px-3 py-1.5 text-xs text-academic-muted flex items-center justify-center gap-2">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  directory.researchhub.com
                </div>
              </div>

              {/* Browser Content - Mimicking the actual Search Directory page */}
              <div className="flex-1 bg-academic-bg relative overflow-y-auto overflow-x-hidden p-6">
                
                {/* Mock Directory Hero Section */}
                <div className="text-center max-w-2xl mx-auto mb-10 pt-4">
                  <h2 className="text-3xl font-bold font-display text-academic-primary mb-3">Search Directory</h2>
                  <p className="text-sm text-academic-muted mb-8">Find editorial reviewers by name, institution, department, or research field</p>
                  
                  {/* Mock Search Bar */}
                  <div className="w-full max-w-xl mx-auto bg-academic-surface border border-academic-border/50 shadow-[0_4px_20px_rgba(37,99,235,0.05)] rounded-2xl px-5 py-4 flex items-center gap-3">
                    <svg className="w-5 h-5 text-academic-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    <TypingEffect
                      text="Quantum Computing"
                      speed={60}
                      delay={800}
                      className="text-[15px] text-academic-primary w-full text-left"
                    />
                  </div>

                  {/* Mock Popular Tags */}
                  <div className="flex items-center gap-2 mt-6 flex-wrap justify-center opacity-80">
                    <span className="text-xs text-academic-muted font-medium">Popular:</span>
                    {['Machine Learning', 'Physics', 'Biology'].map((tag) => (
                      <span key={tag} className="badge badge-slate px-2.5 py-1 text-[10px]">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Mock Results Grid (Mimicking search/page.tsx) */}
                <div className="max-w-4xl mx-auto">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-academic-primary flex items-center gap-2">
                      <div className="w-6 h-6 rounded-md bg-academic-accent/10 text-academic-accent flex items-center justify-center">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                      </div>
                      Search Results
                    </h3>
                  </div>

                  {/* Animated scrolling grid of mock cards */}
                  <div className="relative h-[400px] overflow-hidden -mx-2 px-2">
                    <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-academic-bg to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-academic-bg to-transparent z-10 pointer-events-none" />
                    
                    <div className="absolute top-0 left-0 right-0 grid grid-cols-2 gap-4 animate-marquee-y">
                      {[...MOCK_RESEARCHERS, ...MOCK_RESEARCHERS, ...MOCK_RESEARCHERS].map((researcher, i) => (
                        <div key={`${researcher.id}-${i}`} className="opacity-90 pointer-events-none scale-[0.95] origin-top">
                          <ResearcherCard researcher={researcher} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
