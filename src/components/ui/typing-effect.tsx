"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";

interface TypingEffectProps {
  text: string;
  /** Average milliseconds per character. */
  speed?: number;
  delay?: number;
  className?: string;
  as?: React.ElementType;
  showCursor?: boolean;
}

/** How long each character takes to blur-fade into place. */
const CHAR_IN_MS = 50;

const easeOutCubic = (p: number) => 1 - Math.pow(1 - p, 3);

/**
 * TypingEffect — buttery, time-based text reveal.
 *
 * A single rAF loop drives both the reveal schedule AND each character's
 * entrance (opacity / rise / blur written as inline styles per frame), so
 * the effect is immune to browser/OS motion settings.
 *
 * The caret lives OUTSIDE the text flow: an absolutely-positioned bar that
 * is re-anchored to the measured right edge of the last revealed character
 * on every reveal step. It can never wrap, drift, or run ahead — and a tiny
 * transform transition makes it glide between characters.
 */
export default function TypingEffect({
  text,
  speed = 30,
  delay = 0,
  className = "",
  as: Component = "span",
  showCursor = true,
}: TypingEffectProps) {
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [finished, setFinished] = useState(false);
  const [cursorGone, setCursorGone] = useState(false);
  const [fontReady, setFontReady] = useState(false);

  const hostRef = useRef<HTMLElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);

  // Cumulative reveal time per character: gentle deterministic variance,
  // plus a natural breath after punctuation.
  const schedule = useMemo(() => {
    let acc = 0;
    return text.split("").map((ch, i) => {
      const r = 0.65 + (Math.sin(i * 12.9898 + 4.1414) * 0.5 + 0.5) * 0.7;
      acc += speed * r;
      if (",.;:!?".includes(ch)) acc += speed * 1.8;
      return acc;
    });
  }, [text, speed]);

  const total = schedule.length > 0 ? schedule[schedule.length - 1] : 0;

  // Begin when the element scrolls into view.
  useEffect(() => {
    const el = hostRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { rootMargin: "80px", threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // The one clock: elapsed time since typing began.
  useEffect(() => {
    if (!started) return;
    let raf = 0;
    const t0 = performance.now() + delay;

    const tick = (now: number) => {
      const e = now - t0;
      setElapsed(e);
      if (e >= total + CHAR_IN_MS + 80) {
        setFinished(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [started, delay, total]);

  // Let the caret breathe once done, then fade it away.
  useEffect(() => {
    if (!finished) return;
    const t = setTimeout(() => setCursorGone(true), 2200);
    return () => clearTimeout(t);
  }, [finished]);

  // Re-anchor once the web font actually swaps in — next/font uses `swap`,
  // so glyph metrics can shift under the caret mid-type otherwise.
  useEffect(() => {
    if (typeof document === "undefined" || !("fonts" in document)) return;
    let alive = true;
    document.fonts.ready.then(() => {
      if (alive) setFontReady(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  const revealedCount = finished
    ? text.length
    : schedule.reduce((n, t) => (t <= elapsed ? n + 1 : n), 0);

  // Anchor the caret to the last revealed character's measured edge.
  // Measured every reveal step (and on font-swap / resize), so it can never
  // drift, wrap, or run ahead of the real text.
  useEffect(() => {
    if (!showCursor) return;

    const anchor = () => {
      const host = hostRef.current;
      const bar = caretRef.current;
      if (!host || !bar) return;

      const atStart = revealedCount === 0;
      const idx = atStart ? 0 : Math.min(revealedCount, text.length) - 1;
      const el = charRefs.current[idx];
      if (!el) return;

      const hb = host.getBoundingClientRect();
      const cb = el.getBoundingClientRect();
      const x = (atStart ? cb.left : cb.right) - hb.left + 2;
      const y = cb.top - hb.top + cb.height * 0.08;

      bar.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      bar.style.height = `${(cb.height * 0.84).toFixed(2)}px`;
      bar.style.opacity = !started || cursorGone ? "0" : "1";
    };

    anchor();
    window.addEventListener("resize", anchor);
    return () => window.removeEventListener("resize", anchor);
  }, [revealedCount, started, finished, cursorGone, showCursor, text, fontReady]);

  /** Inline style for character i at the current instant. */
  const styleFor = (i: number): React.CSSProperties => {
    if (finished) return { display: "inline-block" };
    const age = elapsed - schedule[i];
    if (age <= 0) {
      return { display: "inline-block", opacity: 0, transform: "translateY(0.16em)", filter: "blur(4px)" };
    }
    if (age >= CHAR_IN_MS) return { display: "inline-block" };
    const p = easeOutCubic(age / CHAR_IN_MS);
    return {
      display: "inline-block",
      opacity: p,
      transform: `translate3d(0, ${((1 - p) * 0.16).toFixed(3)}em, 0)`,
      filter: p > 0.95 ? undefined : `blur(${((1 - p) * 4).toFixed(2)}px)`,
    };
  };

  const words = text.split(" ");
  let ci = 0;

  return (
    <Component
      ref={hostRef}
      suppressHydrationWarning
      className={`${className} relative inline-block`}
      style={{ minHeight: "1em" }}
    >
      {/* Full text for screen readers; the animated copy is decorative. */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {words.map((word, wi) => {
          const isLastWord = wi === words.length - 1;

          const wordEl = (
            <span className="inline-block whitespace-nowrap">
              {word.split("").map((char) => {
                const i = ci++;
                return (
                  <span
                    key={i}
                    ref={(el) => { charRefs.current[i] = el; }}
                    style={styleFor(i)}
                  >
                    {char}
                  </span>
                );
              })}
            </span>
          );

          if (isLastWord) return <React.Fragment key={`w-${wi}`}>{wordEl}</React.Fragment>;

          // The space after this word owns a schedule slot too.
          const si = ci++;
          return (
            <React.Fragment key={`w-${wi}`}>
              {wordEl}
              <span
                ref={(el) => { charRefs.current[si] = el; }}
                style={{ opacity: finished || si < revealedCount ? 1 : 0 }}
              >
                {" "}
              </span>
            </React.Fragment>
          );
        })}
      </span>

      {/* Out-of-flow caret: anchored to measured character positions. */}
      {showCursor && (
        <span
          ref={caretRef}
          className={`absolute left-0 top-0 w-[3px] rounded-full bg-academic-accent pointer-events-none ${
            finished && !cursorGone ? "animate-pulse" : ""
          }`}
          style={{
            opacity: 0,
            transform: "translate3d(-99px, 0, 0)",
            transition: "transform 90ms cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease",
            willChange: "transform",
            boxShadow: "0 0 8px color-mix(in srgb, var(--color-academic-accent) 55%, transparent)",
          }}
        />
      )}
    </Component>
  );
}
