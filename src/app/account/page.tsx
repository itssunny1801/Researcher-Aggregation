"use client";

import { useState, useEffect } from "react";
import { fetchCurrentUser, type User } from "@/lib/auth";
import OrcidButton from "@/components/ui/orcid-button";
import { ProfileSkeleton } from "@/components/ui/loading-skeleton";

// Template profile data — will be replaced by API data completely later
const TEMPLATE_PROFILE = {
  name: "Dr. Aris Vance",
  institution: "IIT Kanpur",
  orcidId: "0000-0002-1825-0097",
  biography:
    "Research focusing on optimizing continuous multi-component distillation sequences and examining thermodynamic fluid behavior at near-critical points.",
  researchFields: ["Chemical Engineering", "Thermodynamics"],
  publications: [
    {
      title: "Optimized Distillation Sequences for Multi-component Mixtures",
      journal: "Chemical Engineering Science",
      year: 2024,
      doi: "10.1016/j.ces.2024.001",
    },
    {
      title: "Near-critical Fluid Thermodynamics: A Review",
      journal: "Journal of Thermophysics",
      year: 2023,
      doi: "10.1016/j.jtp.2023.042",
    },
  ],
};

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ProfileSkeleton />;

  // If not logged in, show prompt
  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md animate-fade-in">
          <div className="text-5xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold font-serif text-academic-primary mb-3">
            Authentication Required
          </h1>
          <p className="text-sm text-academic-muted mb-6 leading-relaxed">
            Sign in with your ORCID iD to view and manage your researcher
            profile.
          </p>
          <OrcidButton size="lg" />
        </div>
      </div>
    );
  }

  // Use real user name if available, otherwise template
  const profile = {
    ...TEMPLATE_PROFILE,
    name: user.name || TEMPLATE_PROFILE.name,
    orcidId: user.orcid_id || TEMPLATE_PROFILE.orcidId,
  };

  const initials = profile.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(-2);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* ── ORCID Verification Banner ── */}
      <div className="bg-academic-orcid/10 border border-academic-orcid/25 rounded-2xl p-4 flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 bg-academic-orcid rounded-full animate-pulse-glow" />
          <div>
            <p className="text-sm font-semibold text-academic-primary">
              Connected via ORCID iD
            </p>
            <p className="text-xs text-academic-muted font-mono">
              {profile.orcidId}
            </p>
          </div>
        </div>
        <span className="badge badge-green font-bold uppercase text-[10px] tracking-wider">
          Verified
        </span>
      </div>

      {/* ── Profile Card ── */}
      <div className="surface-card rounded-2xl shadow-sm overflow-hidden">
        {/* Accent header bar */}
        <div className="h-2 bg-academic-accent" />

        <div className="p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ── Left: Avatar & Basic Info ── */}
            <div className="flex flex-col items-center text-center md:border-r md:border-academic-border md:pr-8">
              <div className="w-28 h-28 bg-academic-surface-hover rounded-full flex items-center justify-center text-academic-primary font-bold text-3xl tracking-wider shadow-inner mb-4">
                {initials}
              </div>
              <h2 className="text-xl font-bold text-academic-primary">
                {profile.name}
              </h2>
              <p className="text-sm text-academic-muted mt-1">
                {profile.institution}
              </p>

              {/* ORCID link */}
              <a
                href={`https://orcid.org/${profile.orcidId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs text-academic-orcid/90 hover:text-academic-orcid transition-colors font-medium"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" fill="#A6CE39" />
                </svg>
                View ORCID Profile ↗
              </a>

              <a
                href="/profile/edit"
                className="mt-6 w-full btn-secondary px-4 py-2 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                ✏️ Edit Profile
              </a>
            </div>

            {/* ── Right: Profile Details ── */}
            <div className="md:col-span-2 space-y-6">
              {/* Biography */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-2">
                  Biography
                </label>
                <p className="text-sm text-academic-primary/80 leading-relaxed font-serif">
                  {profile.biography}
                </p>
              </div>

              {/* Research Fields */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-2">
                  Research Fields
                </label>
                <div className="flex flex-wrap gap-2">
                  {profile.researchFields.map((field, i) => (
                    <span key={i} className="badge badge-indigo py-1 px-3">
                      {field}
                    </span>
                  ))}
                </div>
              </div>

              {/* Institution */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-academic-muted mb-2">
                  Institution
                </label>
                <p className="text-sm text-academic-primary/80">
                  {profile.institution}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Publications ── */}
      <div className="mt-8 surface-card rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold font-serif text-academic-primary">
              Publications
            </h3>
            <span className="badge badge-slate">
              {profile.publications.length} papers
            </span>
          </div>

          <div className="space-y-4">
            {profile.publications.map((pub, i) => (
              <div
                key={i}
                className="p-4 bg-academic-bg dark:bg-academic-surface-hover rounded-xl border border-academic-border hover:border-academic-accent/30 transition-colors group"
              >
                <h4 className="text-sm font-semibold text-academic-primary group-hover:text-academic-accent transition-colors">
                  {pub.title}
                </h4>
                <div className="flex items-center gap-3 mt-2 text-xs text-academic-muted">
                  <span>📖 {pub.journal}</span>
                  <span>📅 {pub.year}</span>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-academic-accent hover:underline"
                  >
                    DOI ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}