"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/ui/search-bar";
import ResearcherCard from "@/components/ui/researcher-card";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TypingEffect from "@/components/ui/typing-effect";
import TiltCard from "@/components/ui/tilt-card";
import { DotField } from "@/components/ui/hero-background";
import Ambient3D from "@/components/ui/ambient-3d";
import { MOCK_RESEARCHERS, POPULAR_TAGS } from "@/lib/constants";
import type { Researcher } from "@/lib/constants";

export default function SearchPage() {
  const [results, setResults] = useState<Researcher[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (query: string) => {
    if (!query.trim()) {
      setSearchPerformed(false);
      setResults([]);
      return;
    }
    
    setSearchPerformed(true);
    const q = query.toLowerCase();
    const filtered = MOCK_RESEARCHERS.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.institution.toLowerCase().includes(q) ||
        r.researchFields.some((f) => f.toLowerCase().includes(q)) ||
        r.country.toLowerCase().includes(q)
    );
    setResults(filtered);
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-academic-bg transition-colors duration-300 flex flex-col">
      <Ambient3D variant="c" />
      
      {/* ── Search Section ── */}
      <section 
        className={`relative overflow-hidden px-4 transition-all duration-700 ease-out flex-shrink-0 ${
          searchPerformed ? 'py-10' : 'grow flex flex-col justify-center pb-32'
        }`}
      >
        {/* Animated constellation backdrop */}
        <div 
          className="absolute inset-0 opacity-60 dark:opacity-80 pointer-events-none"
          style={{
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
          }}
        >
          <DotField />
        </div>

        <div className="max-w-3xl mx-auto relative z-10 w-full">
          <div className="mb-8 text-center h-20">
            <TypingEffect
              as="h1"
              text="Search Directory"
              className="text-3xl md:text-5xl font-bold font-display text-academic-primary mb-3 inline-block"
              showCursor={false}
              speed={40}
            />
            <div className="h-6 mt-2">
              <TypingEffect
                as="p"
                text="Find editorial reviewers by name, institution, department, or research field"
                className="text-sm md:text-base text-academic-muted"
                showCursor={false}
                delay={500}
                speed={20}
              />
            </div>
          </div>

          <div className="animate-expand-width delay-300 opacity-0 relative mt-4">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Popular tags */}
          <div className="flex items-center gap-2 mt-10 flex-wrap justify-center animate-slide-up delay-500 opacity-0">
            <span className="text-xs text-academic-muted font-medium">
              Popular:
            </span>
            {POPULAR_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => handleSearch(tag)}
                className="badge badge-slate hover:bg-academic-accent/10 hover:text-academic-accent hover:border-academic-accent/20 transition-colors cursor-pointer"
              >
                {tag}
              </button>
            ))}
          </div>
          

        </div>
      </section>

      {/* ── Results ── */}
      {searchPerformed && (
        <section className="flex-1 w-full relative z-10 pb-20">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 w-full animate-fade-in">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-academic-accent/10 text-academic-accent flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                </div>
                <div>
                  <h2 className="text-[15px] font-semibold text-academic-primary font-display">
                    Search Results
                  </h2>
                  <p className="text-xs text-academic-muted mt-0.5">
                    {results.length} researcher{results.length !== 1 ? "s" : ""}{" "}
                    found
                  </p>
                </div>
              </div>
            <Link
              href="/"
              className="text-sm text-academic-muted hover:text-academic-accent transition-colors flex items-center gap-1"
            >
              ← Back to Home
            </Link>
          </div>

          {/* Results grid */}
          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {results.map((researcher, i) => (
                <ScrollReveal key={researcher.id} delay={i * 80} direction="up">
                  <TiltCard>
                    <ResearcherCard researcher={researcher} />
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            /* Empty state */
            <div className="text-center py-20">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-academic-accent/10 text-academic-accent flex items-center justify-center mb-6">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-academic-primary mb-2 font-display">
                No researchers found
              </h3>
              <p className="text-sm text-academic-muted max-w-md mx-auto mb-6">
                Try adjusting your search terms or filters.
              </p>
              <button
                onClick={() => {
                  setSearchPerformed(false);
                  setResults([]);
                }}
                className="btn-primary px-6 py-2.5 rounded-xl text-sm"
              >
                Clear Search
              </button>
            </div>
          )}

          {/* Pagination */}
          {results.length > 0 && (
            <div className="flex items-center justify-center gap-1 mt-10">
              <button
                disabled
                className="px-3 py-1.5 text-sm text-academic-muted rounded-lg opacity-40 cursor-not-allowed"
              >
                ← Prev
              </button>
              <button className="px-3 py-1.5 text-sm bg-academic-accent text-academic-bg rounded-lg font-medium">
                1
              </button>
              <button className="px-3 py-1.5 text-sm text-academic-muted rounded-lg hover:bg-academic-surface-hover transition-colors">
                Next →
              </button>
            </div>
          )}
        </div>
        </section>
      )}
    </div>
  );
}