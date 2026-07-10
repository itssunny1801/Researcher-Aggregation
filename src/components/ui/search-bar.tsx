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
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-academic-muted text-sm">
          🔍
        </span>
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
      className="bg-white border border-academic-border rounded-2xl p-5 shadow-sm"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
        {/* Name search */}
        <div className="relative md:col-span-1">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-academic-muted text-sm">
            🔍
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Name or keyword..."
            className="input-field w-full pl-9"
          />
        </div>

        {/* Department filter */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-academic-muted text-sm">
            🏛️
          </span>
          <select className="input-field w-full pl-9 pr-8 appearance-none cursor-pointer text-academic-muted">
            {DEPARTMENTS.map((dept) => (
              <option key={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Country filter */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-academic-muted text-sm">
            🌐
          </span>
          <select className="input-field w-full pl-9 pr-8 appearance-none cursor-pointer text-academic-muted">
            {COUNTRIES.map((country) => (
              <option key={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Search button */}
        <button
          type="submit"
          className="btn-primary px-6 py-2.5 rounded-xl text-sm flex items-center justify-center gap-2"
        >
          🔍 Search
        </button>
      </div>
    </form>
  );
}
