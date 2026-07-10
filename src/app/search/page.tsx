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
      <section className="bg-academic-surface border-b border-academic-border py-12 px-4 text-center relative overflow-hidden transition-colors duration-300">
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 relative z-10">
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
            <div className="w-8 h-8 bg-academic-surface-hover rounded-lg flex items-center justify-center text-academic-primary text-sm shadow-sm border border-academic-border-light">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
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
            <div className="flex justify-center mb-6">
              <svg className="w-12 h-12 text-academic-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
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