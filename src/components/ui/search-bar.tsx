"use client";

import { useState } from "react";
import { DEPARTMENTS, COUNTRIES } from "@/lib/constants";

interface SearchBarProps {
  compact?: boolean;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  compact = false,
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(query);
  };

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="relative">
        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-academic-muted flex items-center justify-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search researchers by name or keyword..."
          className="input-field w-full pl-10 pr-4 py-3 rounded-xl text-sm"
        />
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="surface-card rounded-2xl p-5 shadow-3d shadow-inner-3d"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        {/* Name search */}
        <div className="relative md:col-span-1">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-academic-muted flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name or keyword..."
            className="input-field w-full pl-10"
          />
        </div>

        {/* Department filter */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-academic-muted flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
          </div>
          <select className="input-field w-full pl-10 pr-8 appearance-none cursor-pointer text-academic-muted">
            {DEPARTMENTS.map((dept) => (
              <option key={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Country filter */}
        <div className="relative">
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-academic-muted flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          </div>
          <select className="input-field w-full pl-10 pr-8 appearance-none cursor-pointer text-academic-muted">
            {COUNTRIES.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="btn-primary btn-3d shadow-3d px-6 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          Search
        </button>
      </div>
    </form>
  );
}
