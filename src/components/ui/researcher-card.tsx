import Link from "next/link";
import type { Researcher } from "@/lib/constants";

interface ResearcherCardProps {
  researcher: Researcher;
}

export default function ResearcherCard({ researcher }: ResearcherCardProps) {
  return (
    <Link 
      href={`/researcher/${researcher.id}`}
      className="block surface-card rounded-2xl p-5 card-hover shadow-3d group relative overflow-hidden"
    >
      {/* Hover accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-academic-accent rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />

        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div className="w-11 h-11 rounded-xl bg-academic-accent/10 text-academic-accent flex items-center justify-center text-sm font-bold flex-shrink-0">
            {researcher.initials}
          </div>

          <div className="flex-1 min-w-0">
            {/* Name & Institution */}
            <h3 className="text-[15px] font-semibold text-academic-primary group-hover:text-academic-accent transition-colors leading-snug">
              {researcher.name}
            </h3>
            <p className="text-xs text-academic-muted mt-0.5 truncate">
              {researcher.department} · {researcher.institution}
            </p>

            {/* Research Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {researcher.researchFields.map((field) => (
                <span key={field} className="badge badge-accent">
                  {field}
                </span>
              ))}
            </div>

            {/* Location & Stats */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3 pt-3 border-t border-academic-border text-[11px] font-medium text-academic-muted">
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                {researcher.country}
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                {researcher.publications} pubs
              </span>
              {researcher.hIndex && (
                <span className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                  h-index: {researcher.hIndex}
                </span>
              )}
            </div>
          </div>
        </div>
    </Link>
  );
}
