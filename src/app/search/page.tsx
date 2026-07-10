"use client";

import { useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/ui/search-bar";
import ResearcherCard from "@/components/ui/researcher-card";
import { MOCK_RESEARCHERS, POPULAR_TAGS } from "@/lib/constants";
import type { Researcher } from "@/lib/constants";

export default function SearchPage() {
  const [results, setResults] = useState<Researcher[]>(MOCK_RESEARCHERS);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearch = (query: string) => {
    setSearchPerformed(true);
    if (!query.trim()) {
      setResults(MOCK_RESEARCHERS);
      return;
    }
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
    <div className="min-h-screen bg-academic-bg transition-colors duration-300">
      {/* ── Hero Header ── */}
      <section className="bg-gradient-to-br from-indigo-50 via-sky-50/50 to-blue-50 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] py-12 px-4 text-center relative overflow-hidden transition-colors duration-300">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-20 top-0 w-64 h-64 bg-indigo-200/15 dark:bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute -right-20 bottom-0 w-72 h-72 bg-blue-200/15 dark:bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold font-serif text-academic-primary mb-2">
            Search Directory
          </h1>
          <p className="text-sm text-academic-muted mb-6">
            Find editorial reviewers by name, institution, department, or research field
          </p>
        </div>
      </section>

      {/* ── Search Bar ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 -mt-4 relative z-10">
        <SearchBar onSearch={handleSearch} />

        {/* Popular tags */}
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <span className="text-xs text-academic-muted font-medium">
            Popular:
          </span>
          {POPULAR_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => handleSearch(tag)}
              className="badge badge-slate hover:bg-academic-surface-hover transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* ── Results ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Results header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-violet-100 dark:bg-violet-900/30 rounded-lg flex items-center justify-center text-violet-700 dark:text-violet-300 text-sm">
              👥
            </div>
            <div>
              <h2 className="text-[15px] font-semibold text-academic-primary">
                {searchPerformed ? "Search Results" : "All Researchers"}
              </h2>
              <p className="text-xs text-academic-muted mt-0.5">
                {results.length} researcher{results.length !== 1 ? "s" : ""}{" "}
                found
              </p>
            </div>
          </div>
          <Link
            href="/"
            className="text-sm text-academic-muted hover:text-academic-primary transition-colors flex items-center gap-1"
          >
            ← Back to Home
          </Link>
        </div>

        {/* Results grid */}
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {results.map((researcher, i) => (
              <div
                key={researcher.id}
                className="animate-fade-in opacity-0"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <ResearcherCard researcher={researcher} />
              </div>
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-academic-primary mb-2">
              No researchers found
            </h3>
            <p className="text-sm text-academic-muted max-w-md mx-auto mb-6">
              Try adjusting your search terms or filters. You can also browse all
              researchers by clearing the search.
            </p>
            <button
              onClick={() => {
                setResults(MOCK_RESEARCHERS);
                setSearchPerformed(false);
              }}
              className="btn-primary px-6 py-2.5 rounded-xl text-sm"
            >
              Show All Researchers
            </button>
          </div>
        )}

        {/* Pagination template */}
        {results.length > 0 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            <button
              disabled
              className="px-3 py-1.5 text-sm text-academic-muted surface-card rounded-lg opacity-50 cursor-not-allowed"
            >
              ← Previous
            </button>
            <button className="px-3 py-1.5 text-sm bg-academic-accent text-white rounded-lg font-medium">
              1
            </button>
            <button className="px-3 py-1.5 text-sm text-academic-muted surface-card rounded-lg hover:bg-academic-surface-hover transition-colors">
              2
            </button>
            <button className="px-3 py-1.5 text-sm text-academic-muted surface-card rounded-lg hover:bg-academic-surface-hover transition-colors">
              3
            </button>
            <button className="px-3 py-1.5 text-sm text-academic-muted surface-card rounded-lg hover:bg-academic-surface-hover transition-colors">
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}