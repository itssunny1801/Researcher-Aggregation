"use client";

import { useState, useRef, useEffect } from "react";
import { DEPARTMENTS, COUNTRIES, CITIES, INSTITUTIONS } from "@/lib/constants";

interface SearchBarProps {
  compact?: boolean;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  compact = false,
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ctrl+K to focus
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="relative">
        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-[18px] h-[18px] text-academic-muted pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search researchers…"
          className="input-field w-full pl-11 pr-4 py-3 rounded-xl text-sm"
        />
      </form>
    );
  }

  return (
    <div className="space-y-3">
      {/* ── Main AI-style search input ── */}
      <form onSubmit={handleSubmit} className="relative group">
        <div className="relative surface-card rounded-2xl shadow-3d overflow-hidden transition-all duration-200 focus-within:border-academic-accent focus-within:ring-2 focus-within:ring-academic-accent/15">
          {/* Sparkle icon */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-academic-accent" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L13.09 8.26L18 6L14.74 10.91L21 12L14.74 13.09L18 18L13.09 15.74L12 22L10.91 15.74L6 18L9.26 13.09L3 12L9.26 10.91L6 6L10.91 8.26L12 2Z" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, research field, institution, or keyword…"
            className="w-full bg-transparent pl-13 pr-36 py-4 text-[15px] text-academic-primary placeholder:text-academic-muted outline-none"
            style={{ paddingLeft: "3.25rem" }}
          />

          {/* Right side: filter toggle + search button */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                showFilters
                  ? "bg-academic-accent/10 text-academic-accent"
                  : "text-academic-muted hover:text-academic-primary hover:bg-academic-surface-hover"
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
              Filters
            </button>
            <button
              type="submit"
              className="btn-primary px-5 py-2 rounded-xl text-sm flex items-center gap-1.5"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Search
            </button>
          </div>
        </div>

        {/* Keyboard shortcut hint - hidden when filters are open to prevent overlap */}
        {!showFilters && (
          <div className="absolute -bottom-6 left-0 right-0 flex items-center justify-center">
            <span className="text-[10px] text-academic-muted/60 font-medium">
              Press <kbd className="px-1.5 py-0.5 rounded bg-academic-surface-hover border border-academic-border text-[10px] font-mono mx-0.5">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 rounded bg-academic-surface-hover border border-academic-border text-[10px] font-mono mx-0.5">K</kbd> to search
            </span>
          </div>
        )}
      </form>

      {/* ── Expanded Filter Row ── */}
      {showFilters && (
        <div className="animate-fade-in grid grid-cols-2 md:grid-cols-4 gap-3 pt-4">
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-academic-muted mb-1.5 ml-1">Country</label>
            <select className="input-field w-full py-2.5 px-3 appearance-none cursor-pointer text-sm bg-academic-surface">
              {COUNTRIES.map((country) => (
                <option key={country}>{country}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-academic-muted mb-1.5 ml-1">City</label>
            <select className="input-field w-full py-2.5 px-3 appearance-none cursor-pointer text-sm bg-academic-surface">
              {CITIES.map((city) => (
                <option key={city}>{city}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-academic-muted mb-1.5 ml-1">College/Institution</label>
            <select className="input-field w-full py-2.5 px-3 appearance-none cursor-pointer text-sm bg-academic-surface">
              {INSTITUTIONS.map((inst) => (
                <option key={inst}>{inst}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-semibold uppercase tracking-wider text-academic-muted mb-1.5 ml-1">Department</label>
            <select className="input-field w-full py-2.5 px-3 appearance-none cursor-pointer text-sm bg-academic-surface">
              {DEPARTMENTS.map((dept) => (
                <option key={dept}>{dept}</option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
