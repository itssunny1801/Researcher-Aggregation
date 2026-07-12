"use client";
import { ReactNode, useEffect, useState } from "react";

/**
 * PageTransition — smooth two-phase route transitions.
 *
 * Exit: the old page quickly fades, lifts and softly blurs (220ms).
 * Enter: the new page plays the `page-enter` animation (fade + rise +
 * unblur, 550ms with a gentle spring curve) — keyed so it replays on
 * every navigation, including the very first load.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [exiting, setExiting] = useState(false);
  const [enterKey, setEnterKey] = useState(0);

  useEffect(() => {
    if (children !== displayChildren) {
      setExiting(true);
      const timer = setTimeout(() => {
        setDisplayChildren(children);
        setExiting(false);
        setEnterKey((k) => k + 1);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [children, displayChildren]);

  return (
    <div
      key={enterKey}
      className={exiting ? "" : "page-enter"}
      style={
        exiting
          ? {
              opacity: 0,
              transform: "translateY(-10px) scale(0.995)",
              filter: "blur(4px)",
              transition:
                "opacity 0.22s ease-in, transform 0.22s ease-in, filter 0.22s ease-in",
            }
          : undefined
      }
    >
      {displayChildren}
    </div>
  );
}
