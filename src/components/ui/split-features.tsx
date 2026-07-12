import React from "react";
import Link from "next/link";
import ScrollReveal from "@/components/ui/scroll-reveal";
import IconWave from "@/components/ui/icon-wave";

export default function SplitFeatures() {
  return (
    <section className="relative py-8 md:py-8">
      {/* Dotted Background Pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle at 2px 2px, currentColor 1.5px, transparent 0)",
          backgroundSize: "32px 32px",
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 80%, transparent 100%)'
        }}
      />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          
          {/* Feature 1: Directory */}
          <ScrollReveal direction="up" delay={0}>
            <div className="flex flex-col items-center text-center px-4 md:px-12 py-4 md:py-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-academic-border bg-academic-surface text-xs font-medium text-academic-muted mb-3 shadow-sm">
                Available to everyone
              </span>
              <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-academic-primary mb-2">
                Our Directory
              </h2>
              <p className="text-lg md:text-lg text-academic-muted mb-4 tracking-tight">
                Discover researchers worldwide
              </p>
              <Link 
                href="/search" 
                className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-academic-primary text-academic-surface font-medium hover:scale-105 hover:shadow-lg transition-all duration-300"
              >
                Explore Directory
              </Link>
            </div>
          </ScrollReveal>

          {/* Feature 2: ORCID */}
          <ScrollReveal direction="up" delay={100}>
            <div className="flex flex-col items-center text-center px-4 md:px-12 py-4 md:py-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full border border-academic-border bg-academic-surface text-xs font-medium text-academic-muted mb-3 shadow-sm">
                Secure Access
              </span>
              <h2 className="text-3xl md:text-3xl font-bold tracking-tight text-academic-primary mb-2">
                ORCID Sign-in
              </h2>
              <p className="text-lg md:text-lg text-academic-muted mb-4 tracking-tight">
                Claim and edit your profile
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center justify-center px-8 py-2.5 rounded-full bg-academic-surface border border-academic-border text-academic-primary font-medium hover:scale-105 hover:shadow-md hover:border-academic-primary/30 transition-all duration-300"
              >
                Sign in with ORCID
              </Link>
            </div>
          </ScrollReveal>

        </div>
      </div>

      {/* ── ACADEMIC DISCIPLINES WAVE ── */}
      <div className="mt-4 md:mt-4">
        <IconWave />
      </div>
    </section>
  );
}
