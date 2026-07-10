import Link from "next/link";
import { MOCK_RESEARCHERS } from "@/lib/constants";
import OrcidButton from "@/components/ui/orcid-button";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const researcher = MOCK_RESEARCHERS.find((r) => r.id === Number(id));
  return {
    title: researcher?.name || "Researcher Profile",
  };
}

export default async function ResearcherProfilePage({ params }: PageProps) {
  const { id } = await params;
  const researcher = MOCK_RESEARCHERS.find((r) => r.id === Number(id));

  if (!researcher) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-5xl mb-4">😕</div>
          <h1 className="text-2xl font-bold font-serif text-academic-primary mb-2">
            Researcher Not Found
          </h1>
          <p className="text-sm text-academic-muted mb-6">
            The researcher profile you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>
          <Link
            href="/search"
            className="btn-primary px-6 py-2.5 rounded-xl text-sm inline-flex items-center gap-2"
          >
            ← Back to Search
          </Link>
        </div>
      </div>
    );
  }

  const initials = researcher.initials;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Back link */}
      <Link
        href="/search"
        className="inline-flex items-center gap-1.5 text-sm text-academic-muted hover:text-academic-primary transition-colors mb-6"
      >
        ← Back to Search
      </Link>

      {/* ── Profile Card ── */}
      <div className="surface-card rounded-2xl shadow-sm overflow-hidden">
        {/* Accent bar */}
        <div className="h-2 bg-gradient-to-r from-academic-accent via-indigo-400 to-blue-400" />

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left: Avatar */}
            <div className="flex flex-col items-center text-center md:border-r md:border-academic-border md:pr-8">
              <div
                className={`w-28 h-28 rounded-full flex items-center justify-center text-3xl font-bold shadow-inner mb-4 ${researcher.avatarColor.replace('bg-', 'bg-').replace('text-', 'text-')} dark:bg-opacity-20`}
              >
                {initials}
              </div>
              <h1 className="text-xl font-bold text-academic-primary">
                {researcher.name}
              </h1>
              <p className="text-sm text-academic-muted mt-1">
                {researcher.institution}
              </p>
              <p className="text-xs text-academic-muted mt-0.5">
                {researcher.department}
              </p>

              {/* ORCID badge if available */}
              {researcher.orcidId && (
                <a
                  href={`https://orcid.org/${researcher.orcidId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 badge badge-green py-1.5 px-3"
                >
                  <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 256 256" fill="currentColor">
                    <path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" fill="#A6CE39" />
                  </svg>
                  ORCID Verified
                </a>
              )}

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-6 w-full">
                <div className="bg-academic-bg dark:bg-academic-surface-hover rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-academic-primary">
                    {researcher.publications}
                  </p>
                  <p className="text-[10px] text-academic-muted uppercase tracking-wider">
                    Publications
                  </p>
                </div>
                <div className="bg-academic-bg dark:bg-academic-surface-hover rounded-xl p-3 text-center">
                  <p className="text-lg font-bold text-academic-primary">
                    {researcher.hIndex || "—"}
                  </p>
                  <p className="text-[10px] text-academic-muted uppercase tracking-wider">
                    h-Index
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Details */}
            <div className="md:col-span-2 space-y-6">
              {/* Biography */}
              {researcher.biography && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-2">
                    Biography
                  </label>
                  <p className="text-sm text-academic-primary/80 leading-relaxed font-serif">
                    {researcher.biography}
                  </p>
                </div>
              )}

              {/* Research Fields */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-2">
                  Research Fields
                </label>
                <div className="flex flex-wrap gap-2">
                  {researcher.researchFields.map((field) => (
                    <span key={field} className="badge badge-indigo py-1 px-3">
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-2">
                  Location
                </label>
                <p className="text-sm text-academic-primary/80">
                  📍 {researcher.country}
                </p>
              </div>

              {/* Institution */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-2">
                  Institution
                </label>
                <p className="text-sm text-academic-primary/80">
                  🏛️ {researcher.institution} — {researcher.department}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Claim Profile CTA ── */}
      {!researcher.orcidId && (
        <div className="mt-8 bg-academic-primary rounded-2xl p-8 text-center shadow-3d shadow-inner-3d">
          <h3 className="text-lg font-bold text-academic-bg mb-2">
            Is this your profile?
          </h3>
          <p className="text-sm text-academic-bg/70 mb-6 max-w-md mx-auto">
            Claim this profile by signing in with your ORCID iD. Update your
            information and get verified.
          </p>
          <OrcidButton size="md" />
        </div>
      )}
    </div>
  );
}
