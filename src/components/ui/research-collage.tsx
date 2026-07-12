"use client";
import React, { useEffect, useRef } from "react";
import ScrollReveal from "@/components/ui/scroll-reveal";

/**
 * ResearchCollage — a spatial, Muse-style collage of floating research
 * artefacts: dummy journal papers, a peer review, a professor post and a
 * usage-analytics card, orbiting a central headline that describes the
 * upcoming social/measurable research layer (profiles, posts, reviews,
 * likes, usage tracking).
 *
 * Depth illusion: every card lives on its own parallax layer (deeper cards
 * drift less with the mouse, lerped in a rAF loop for a buttery feel) and
 * bobs gently on an idle float. Hovering a card smoothly straightens its
 * collage rotation and zooms it in.
 */

/* ── Dummy data ── */

const PAPERS = [
  {
    journal: "Nature Physics",
    year: "2026",
    title: "Quantum Error Mitigation in Superconducting Qubit Arrays",
    authors: "S. Jenkins, R. Ahmed, L. Moretti",
    reads: "12.4k",
    cites: "342",
    likes: "1.2k",
  },
  {
    journal: "NeurIPS",
    year: "2025",
    title: "Attention-Free Language Models for Low-Resource Domains",
    authors: "E. Petrov, M. Chen",
    reads: "8.9k",
    cites: "218",
    likes: "864",
  },
  {
    journal: "Joule",
    year: "2026",
    title: "Perovskite Tandem Cells Beyond 34% Efficiency",
    authors: "A. Okafor, T. Nakamura",
    reads: "15.1k",
    cites: "496",
    likes: "2.3k",
  },
  {
    journal: "Science Robotics",
    year: "2025",
    title: "Closed-Loop Neural Interfaces for Motor Recovery",
    authors: "K. Tanaka, P. Ivanov",
    reads: "6.2k",
    cites: "174",
    likes: "531",
  },
];

/* ── Small SVG icons (site is emoji-free by design) ── */

const EyeIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CiteIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
  </svg>
);

const HeartIcon = ({ filled = false }: { filled?: boolean }) => (
  <svg
    className="w-3 h-3"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={2}
    viewBox="0 0 24 24"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

const MessageIcon = () => (
  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
  </svg>
);

const StarIcon = ({ filled = true }: { filled?: boolean }) => (
  <svg
    className="w-3 h-3"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth={1.5}
    viewBox="0 0 24 24"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const UserIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ChartIcon = () => (
  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path d="M18 20V10M12 20V4M6 20v-6" />
  </svg>
);

/* ── Card bodies ── */

function Stars({ value }: { value: number }) {
  return (
    <span className="inline-flex gap-0.5 text-academic-accent">
      {[1, 2, 3, 4, 5].map((n) => (
        <StarIcon key={n} filled={n <= value} />
      ))}
    </span>
  );
}

function PaperCard({ paper }: { paper: (typeof PAPERS)[number] }) {
  return (
    <div className="surface-card rounded-xl p-4 shadow-3d transition-shadow duration-500 hover:shadow-xl hover:shadow-academic-accent/20 dark:hover:shadow-academic-accent/30">
      <div className="flex items-center justify-between mb-2.5">
        <span className="badge badge-accent">{paper.journal}</span>
        <span className="text-[10px] text-academic-muted font-mono">{paper.year}</span>
      </div>
      <h4 className="text-[13px] font-bold font-serif text-academic-primary leading-snug mb-1.5">
        {paper.title}
      </h4>
      <p className="text-[11px] text-academic-muted mb-3">{paper.authors}</p>
      <div className="flex items-center gap-3 pt-2.5 border-t border-academic-border-light text-[10px] text-academic-muted">
        <span className="inline-flex items-center gap-1"><EyeIcon /> {paper.reads}</span>
        <span className="inline-flex items-center gap-1"><CiteIcon /> {paper.cites}</span>
        <span className="inline-flex items-center gap-1"><HeartIcon /> {paper.likes}</span>
      </div>
    </div>
  );
}

function ReviewCard() {
  return (
    <div className="surface-card rounded-xl p-4 shadow-3d transition-shadow duration-500 hover:shadow-xl hover:shadow-academic-accent/20 dark:hover:shadow-academic-accent/30">
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-[10px] font-bold uppercase tracking-wider text-academic-muted">
          Peer Review
        </span>
        <Stars value={5} />
      </div>
      <p className="text-[11.5px] text-academic-primary/85 leading-relaxed font-serif italic mb-3">
        “Rigorous methodology and a genuinely reproducible benchmark.
        Recommended with minor revisions.”
      </p>
      <div className="flex items-center gap-2 pt-2.5 border-t border-academic-border-light">
        <span className="w-6 h-6 rounded-full bg-academic-accent/10 text-academic-accent flex items-center justify-center text-[9px] font-bold">
          MC
        </span>
        <div>
          <p className="text-[10.5px] font-semibold text-academic-primary leading-none">
            Prof. Michael Chen
          </p>
          <p className="text-[9px] text-academic-muted mt-0.5">Stanford University</p>
        </div>
      </div>
    </div>
  );
}

function PostCard() {
  return (
    <div className="surface-card rounded-xl p-4 shadow-3d transition-shadow duration-500 hover:shadow-xl hover:shadow-academic-accent/20 dark:hover:shadow-academic-accent/30">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-7 h-7 rounded-full bg-academic-primary text-academic-bg flex items-center justify-center text-[10px] font-bold">
          AV
        </span>
        <div>
          <p className="text-[11px] font-semibold text-academic-primary leading-none">
            Dr. Aris Vance
          </p>
          <p className="text-[9px] text-academic-muted mt-0.5">posted an update · 2h</p>
        </div>
      </div>
      <p className="text-[11.5px] text-academic-primary/85 leading-relaxed mb-3">
        Preprint of our distillation-column optimisation study is now live —
        peer feedback welcome.
      </p>
      <div className="flex items-center gap-3 pt-2.5 border-t border-academic-border-light text-[10px] text-academic-muted">
        <span className="inline-flex items-center gap-1 text-academic-accent"><HeartIcon filled /> 48</span>
        <span className="inline-flex items-center gap-1"><MessageIcon /> 12 reviews</span>
      </div>
    </div>
  );
}

function AnalyticsCard() {
  const bars = [34, 52, 40, 66, 58, 82, 74];
  return (
    <div className="surface-card rounded-xl p-4 shadow-3d transition-shadow duration-500 hover:shadow-xl hover:shadow-academic-accent/20 dark:hover:shadow-academic-accent/30">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-academic-muted">
          Paper Usage · 30d
        </span>
        <span className="badge badge-green">+23% reads</span>
      </div>
      <div className="flex items-end gap-1.5 h-14 mb-2">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm bg-academic-accent/70 ${i === bars.length - 1 ? "animate-pulse bg-academic-accent" : ""}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <p className="text-[10px] text-academic-muted">
        Reads, citations &amp; downloads — tracked per paper.
      </p>
    </div>
  );
}

function FeatureChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="surface-card rounded-full pl-2.5 pr-4 py-2 shadow-3d flex items-center gap-2 whitespace-nowrap transition-shadow duration-500 hover:shadow-xl hover:shadow-academic-accent/20 dark:hover:shadow-academic-accent/30">
      <span className="w-6 h-6 rounded-full bg-academic-accent/10 text-academic-accent flex items-center justify-center">
        {icon}
      </span>
      <span className="text-[11px] font-semibold text-academic-primary">{label}</span>
    </div>
  );
}

/* ── Collage layout ── */

interface Item {
  node: React.ReactNode;
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  width?: number;
  rot: number; // static collage rotation (deg)
  depth: number; // parallax depth factor
  floatDur: number;
  floatDelay: number;
}

const ITEMS: Item[] = [
  // Top-left cluster
  { node: <PaperCard paper={PAPERS[0]} />, top: "8%", left: "12%", width: 250, rot: -3, depth: 1.15, floatDur: 9, floatDelay: 0 },
  { node: <ReviewCard />, top: "18%", left: "6%", width: 245, rot: 4, depth: 0.65, floatDur: 9, floatDelay: 1.5 },
  { node: <FeatureChip icon={<StarIcon />} label="Peer Reviews" />, top: "34%", left: "15%", rot: -2, depth: 0.8, floatDur: 7, floatDelay: 0.2 },
  
  // Top-right cluster
  { node: <PaperCard paper={PAPERS[1]} />, top: "10%", right: "10%", width: 255, rot: 2.5, depth: 0.85, floatDur: 10, floatDelay: 0.7 },
  { node: <FeatureChip icon={<UserIcon />} label="Professor Profiles" />, top: "24%", right: "22%", rot: -4, depth: 0.7, floatDur: 8, floatDelay: 1.4 },

  // Bottom-left cluster
  { node: <AnalyticsCard />, bottom: "14%", left: "12%", width: 250, rot: -2.5, depth: 1.0, floatDur: 10.5, floatDelay: 0.9 },
  { node: <PaperCard paper={PAPERS[3]} />, bottom: "8%", left: "22%", width: 235, rot: 5, depth: 0.95, floatDur: 9.8, floatDelay: 2.4 },

  // Bottom-right cluster
  { node: <PostCard />, bottom: "25%", right: "8%", width: 270, rot: -2.2, depth: 1.05, floatDur: 9.5, floatDelay: 1.1 },
  { node: <PaperCard paper={PAPERS[2]} />, bottom: "10%", right: "15%", width: 245, rot: 3, depth: 0.75, floatDur: 8.5, floatDelay: 0.4 },
  { node: <FeatureChip icon={<ChartIcon />} label="Usage Tracking" />, bottom: "35%", right: "24%", rot: -6, depth: 0.6, floatDur: 7.5, floatDelay: 2.1 },
  { node: <FeatureChip icon={<HeartIcon filled />} label="Likes & Endorsements" />, bottom: "16%", right: "32%", rot: -1.5, depth: 0.9, floatDur: 8, floatDelay: 1.8 },
];

export default function ResearchCollage() {
  const wrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Buttery mouse parallax: deeper layers drift more, everything lerped.
  useEffect(() => {
    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;

    const onMove = (e: PointerEvent) => {
      const { innerWidth, innerHeight } = window;
      tx = e.clientX / innerWidth - 0.5;
      ty = e.clientY / innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let last = performance.now();
    const loop = (now: number) => {
      // Frame-rate-independent exponential smoothing → identical buttery
      // parallax at any refresh rate, no stutter under frame drops.
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const k = 1 - Math.exp(-2.8 * dt);
      cx += (tx - cx) * k;
      cy += (ty - cy) * k;
      wrapRefs.current.forEach((w, i) => {
        if (!w) return;
        const d = ITEMS[i].depth;
        w.style.transform = `translate3d(${(-cx * 34 * d).toFixed(2)}px, ${(-cy * 24 * d).toFixed(2)}px, 0)`;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const onEnter = (i: number) => {
    const w = wrapRefs.current[i];
    const c = cardRefs.current[i];
    if (w) w.style.zIndex = "50";
    if (c) c.style.transform = "rotate(0deg) scale(1.05)";
  };

  const onLeave = (i: number) => {
    const w = wrapRefs.current[i];
    const c = cardRefs.current[i];
    if (w) w.style.zIndex = "1";
    if (c) c.style.transform = `rotate(${ITEMS[i].rot}deg) scale(1)`;
  };

  return (
    <section className="relative pt-14 pb-16">
      {/* Soft glow behind the headline */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[560px] h-[380px] bg-academic-accent/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="relative lg:h-[820px]">
        {/* ── Floating collage (desktop) ── */}
        {ITEMS.map((item, i) => (
          <div
            key={i}
            ref={(el) => { wrapRefs.current[i] = el; }}
            className="absolute hidden lg:block"
            style={{
              top: item.top,
              bottom: item.bottom,
              left: item.left,
              right: item.right,
              width: item.width,
              zIndex: 1,
              willChange: "transform",
            }}
          >
            <div
              className="animate-float-slow"
              style={{ animationDuration: `${item.floatDur}s`, animationDelay: `${item.floatDelay}s` }}
            >
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                onPointerEnter={() => onEnter(i)}
                onPointerLeave={() => onLeave(i)}
                className="will-change-transform cursor-pointer transition-all duration-[650ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:drop-shadow-[0_0_15px_rgba(14,165,233,0.3)]"
                style={{ transform: `rotate(${item.rot}deg)` }}
              >
                {item.node}
              </div>
            </div>
          </div>
        ))}

        {/* ── Central headline ── */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center max-w-xl mx-auto px-4 py-10 lg:py-0 pointer-events-none">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-academic-primary mb-6 leading-[1.1] pointer-events-auto">
              Research, made social &amp; measurable
            </h2>
            <p className="text-academic-muted text-base md:text-lg leading-relaxed pointer-events-auto">
              Verified professors get living profile pages — post updates,
              collect peer reviews, likes and endorsements, and watch how the
              community reads, cites and reuses every paper.
            </p>
          </ScrollReveal>
        </div>

        {/* ── Compact grid (mobile / tablet) ── */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-4 mt-12 max-w-2xl mx-auto px-4">
          <PaperCard paper={PAPERS[0]} />
          <PostCard />
          <ReviewCard />
          <AnalyticsCard />
        </div>
      </div>
    </section>
  );
}
