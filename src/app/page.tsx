import Link from "next/link";
import ResearcherCard from "@/components/ui/researcher-card";
import StatsCard from "@/components/ui/stats-card";
import OrcidButton from "@/components/ui/orcid-button";
import { MOCK_RESEARCHERS, PLATFORM_STATS, HOW_IT_WORKS, POPULAR_TAGS } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/50 to-blue-50 dark:from-[#0b0f1a] dark:via-[#0d1326] dark:to-[#0f172a] py-20 md:py-28">
        {/* Decorative blurs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -left-20 top-1/4 w-72 h-72 bg-indigo-300/20 dark:bg-indigo-500/10 rounded-full blur-3xl" />
          <div className="absolute -right-20 top-1/3 w-80 h-80 bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[600px] h-[600px] bg-academic-orcid/5 rounded-full blur-3xl" />
          <svg className="absolute inset-0 w-full h-full opacity-[0.03] dark:opacity-[0.02]">
            <defs>
              <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <div className="animate-fade-in opacity-0 delay-100 inline-flex items-center gap-2 bg-white/80 dark:bg-white/5 border border-academic-border rounded-full px-4 py-1.5 mb-6 shadow-sm">
            <span className="w-2 h-2 bg-academic-orcid rounded-full animate-pulse" />
            <span className="text-xs font-medium text-academic-muted">
              Verified by ORCID • Trusted by Institutions
            </span>
          </div>

          <h1 className="animate-fade-in opacity-0 delay-200 text-4xl md:text-6xl font-bold font-serif tracking-tight leading-[1.1] mb-5">
            <span className="gradient-text">Global Editorial</span>
            <br />
            <span className="text-academic-primary">Reviewer Directory</span>
          </h1>

          <p className="animate-fade-in opacity-0 delay-300 text-lg md:text-xl text-academic-muted max-w-2xl mx-auto mb-8 leading-relaxed">
            Search, verify, and connect with academic researchers worldwide. A
            trusted platform for discovering editorial reviewers across every discipline.
          </p>

          <div className="animate-fade-in opacity-0 delay-400 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/search" className="btn-primary btn-3d shadow-3d px-8 py-3.5 rounded-xl text-base flex items-center gap-2">
              🔍 Search Directory
            </Link>
            <OrcidButton size="lg" />
          </div>

          <div className="animate-fade-in opacity-0 delay-500 flex items-center justify-center gap-2 mt-8 flex-wrap">
            <span className="text-xs text-academic-muted font-medium">Popular:</span>
            {POPULAR_TAGS.map((tag) => (
              <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="badge badge-slate hover:bg-academic-surface-hover transition-colors cursor-pointer">
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 -mt-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {PLATFORM_STATS.map((stat, i) => (
            <StatsCard key={stat.label} {...stat} delay={i * 100 + 200} />
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold font-serif text-academic-primary mb-3">
            How It Works
          </h2>
          <p className="text-academic-muted text-sm max-w-lg mx-auto">
            Three simple steps to find and connect with verified researchers.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HOW_IT_WORKS.map((item, i) => (
            <div key={item.step} className="animate-slide-up opacity-0 relative surface-card rounded-2xl p-7 text-center card-hover group"
              style={{ animationDelay: `${i * 150 + 300}ms` }}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-academic-accent text-white text-xs font-bold px-3 py-0.5 rounded-full">
                Step {item.step}
              </div>
              <div className="text-4xl mb-4 mt-2 group-hover:animate-float">{item.icon}</div>
              <h3 className="text-lg font-bold text-academic-primary mb-2">{item.title}</h3>
              <p className="text-sm text-academic-muted leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ FEATURED RESEARCHERS ══ */}
      <section className="surface-card border-t border-b border-academic-border py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold font-serif text-academic-primary">Featured Researchers</h2>
              <p className="text-sm text-academic-muted mt-1">Discover leading experts across various fields</p>
            </div>
            <Link href="/search" className="text-sm text-academic-accent font-medium hover:underline flex items-center gap-1">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {MOCK_RESEARCHERS.slice(0, 6).map((researcher) => (
              <ResearcherCard key={researcher.id} researcher={researcher} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <div className="relative bg-gradient-to-br from-academic-primary to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-3xl p-10 md:p-14 text-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -right-10 -top-10 w-48 h-48 bg-academic-orcid/10 rounded-full blur-2xl" />
            <div className="absolute -left-10 -bottom-10 w-56 h-56 bg-indigo-500/10 rounded-full blur-2xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-2xl md:text-3xl font-bold font-serif text-white mb-3">Are You a Researcher?</h2>
            <p className="text-white/70 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
              Claim your profile, update your research information, and get verified through ORCID. Join thousands of researchers already on the platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <OrcidButton size="lg" />
              <Link href="/profile/edit" className="btn-secondary px-6 py-3 rounded-xl text-sm dark:text-white dark:border-white/20 dark:hover:bg-white/10">
                ✏️ Edit Your Profile
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}