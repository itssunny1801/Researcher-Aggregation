import Link from "next/link";
import type { Researcher } from "@/lib/constants";

interface ResearcherCardProps {
  researcher: Researcher;
}

export default function ResearcherCard({ researcher }: ResearcherCardProps) {
  return (
    <Link 
      href={`/researcher/${researcher.id}`}
      className="block surface-card rounded-2xl p-5 md:p-6 card-hover shadow-3d shadow-inner-3d group relative overflow-hidden"
    >
      <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-academic-accent/30 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />

        <div className="flex items-start gap-4">
          {/* Avatar */}
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 ${researcher.avatarColor} ring-2 ring-white shadow-sm`}
          >
            {researcher.initials}
          </div>

          <div className="flex-1 min-w-0">
            {/* Name & Institution */}
            <h3 className="text-[15px] font-semibold text-academic-primary group-hover:text-academic-accent transition-colors">
              {researcher.name}
            </h3>
            <p className="text-xs text-academic-muted mt-0.5">
              {researcher.department} • {researcher.institution}
            </p>

            {/* Research Tags */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {researcher.researchFields.map((field) => (
                <span key={field} className="badge badge-indigo">
                  {field}
                </span>
              ))}
            </div>

            {/* Location & Stats */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-academic-border-light text-[11px] font-medium text-academic-muted">
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              {researcher.country}
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
              {researcher.publications} publications
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
              h-index: {researcher.hIndex || "—"}
            </span>
          </div>
          </div>
        </div>
    </Link>
  );
}
