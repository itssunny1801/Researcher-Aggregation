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

            {/* Meta Row */}
            <div className="flex items-center gap-4 mt-3 text-[11px] text-academic-muted">
              <span className="flex items-center gap-1">
                📍 {researcher.country}
              </span>
              <span className="flex items-center gap-1">
                📄 {researcher.publications} publications
              </span>
              {researcher.hIndex && (
                <span className="flex items-center gap-1">
                  📊 h-index: {researcher.hIndex}
                </span>
              )}
            </div>
          </div>
        </div>
    </Link>
  );
}
