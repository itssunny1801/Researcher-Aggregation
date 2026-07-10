"use client";

import { useState, useEffect } from "react";
import { fetchCurrentUser, clearStoredToken, type User } from "@/lib/auth";
import OrcidButton from "@/components/ui/orcid-button";
import { ProfileSkeleton } from "@/components/ui/loading-skeleton";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ProfileSkeleton />;

  // Not logged in — show clean sign-in prompt
  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md animate-fade-in">
          <div className="surface-card rounded-3xl p-10 shadow-3d text-center">
            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-academic-primary flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-academic-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold font-serif text-academic-primary mb-3">
              Welcome to ResearchHub
            </h1>
            <p className="text-sm text-academic-muted mb-8 leading-relaxed">
              Sign in with your ORCID iD to access and manage your researcher profile.
            </p>
            <OrcidButton size="lg" className="w-full justify-center" />
            <p className="text-xs text-academic-muted mt-6">
              Don&apos;t have an ORCID?{" "}
              <a href="https://orcid.org/register" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-academic-primary transition-colors">
                Register for free ↗
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Compute initials from the user's real name
  const initials = (user.name || "?")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  function handleSignOut() {
    clearStoredToken();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">

      {/* ── ORCID Verified Banner ── */}
      <div className="flex items-center justify-between bg-academic-orcid/8 border border-academic-orcid/20 rounded-2xl px-5 py-3.5 mb-8">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 bg-academic-orcid rounded-full flex-shrink-0" />
          <div>
            <p className="text-sm font-semibold text-academic-primary leading-none">Connected via ORCID iD</p>
            <p className="text-xs text-academic-muted font-mono mt-0.5">{user.orcid_id}</p>
          </div>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-academic-orcid bg-academic-orcid/10 px-2.5 py-1 rounded-full">
          Verified
        </span>
      </div>

      {/* ── Profile Card ── */}
      <div className="surface-card rounded-2xl shadow-3d overflow-hidden mb-6">
        {/* Top accent bar */}
        <div className="h-1.5 bg-academic-primary" />

        <div className="p-6 md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 flex-shrink-0 rounded-2xl bg-academic-primary flex items-center justify-center text-academic-bg font-bold text-2xl tracking-wider shadow-inner-3d">
              {initials}
            </div>

            {/* Name & ORCID */}
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl font-bold font-serif text-academic-primary">
                {user.name || "Researcher"}
              </h1>
              <a
                href={`https://orcid.org/${user.orcid_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-1.5 text-xs text-academic-orcid hover:opacity-80 transition-opacity font-medium"
              >
                <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" fill="#A6CE39" />
                  <path d="M86.3 186.2H70.9V79.1h15.4v107.1zM78.6 52.3c-5.4 0-9.9 4.4-9.9 9.9 0 5.4 4.4 9.9 9.9 9.9 5.4 0 9.9-4.4 9.9-9.9-.1-5.5-4.5-9.9-9.9-9.9zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 106 176 92.7 148.7 92.7h-24.4v79.7z" fill="#fff" />
                </svg>
                orcid.org/{user.orcid_id} ↗
              </a>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-shrink-0">
              <Link
                href="/profile/edit"
                className="btn-primary px-5 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-3d btn-3d"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="btn-secondary px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 border border-academic-border"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Profile Sections ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* About */}
        <div className="surface-card rounded-2xl shadow-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-academic-muted">About</h2>
            <Link href="/profile/edit" className="text-xs text-academic-muted hover:text-academic-primary transition-colors">Edit ↗</Link>
          </div>
          <div className="space-y-3">
            <EmptyField label="Institution" hint="e.g. MIT, IIT Kanpur, ETH Zurich" />
            <EmptyField label="Department" hint="e.g. Computer Science, Physics" />
            <EmptyField label="Country" hint="e.g. India, United States" />
          </div>
        </div>

        {/* Bio */}
        <div className="surface-card rounded-2xl shadow-3d p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-academic-muted">Biography</h2>
            <Link href="/profile/edit" className="text-xs text-academic-muted hover:text-academic-primary transition-colors">Edit ↗</Link>
          </div>
          <div className="h-24 flex items-center justify-center border-2 border-dashed border-academic-border rounded-xl">
            <p className="text-xs text-academic-muted text-center px-4">
              Add a short bio to help others learn about your research
            </p>
          </div>
        </div>
      </div>

      {/* Research Fields */}
      <div className="surface-card rounded-2xl shadow-3d p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-academic-muted">Research Fields</h2>
          <Link href="/profile/edit" className="text-xs text-academic-muted hover:text-academic-primary transition-colors">Edit ↗</Link>
        </div>
        <div className="h-14 flex items-center justify-center border-2 border-dashed border-academic-border rounded-xl">
          <p className="text-xs text-academic-muted">No research fields added yet. Edit your profile to add them.</p>
        </div>
      </div>

      {/* Publications */}
      <div className="surface-card rounded-2xl shadow-3d p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-academic-muted">Publications</h2>
          <span className="text-xs text-academic-muted">Via OpenAlex · coming soon</span>
        </div>
        <div className="h-24 flex flex-col items-center justify-center border-2 border-dashed border-academic-border rounded-xl gap-2">
          <svg className="w-6 h-6 text-academic-border" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <p className="text-xs text-academic-muted">Publications will be auto-fetched from OpenAlex once available</p>
        </div>
      </div>

      {/* Complete Profile CTA */}
      <div className="mt-6 bg-academic-primary rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-3d">
        <div>
          <h3 className="text-base font-bold text-academic-bg mb-1">Complete your profile</h3>
          <p className="text-xs text-academic-bg/60">Add your institution, department, bio and research fields to appear in the directory.</p>
        </div>
        <Link
          href="/profile/edit"
          className="flex-shrink-0 bg-academic-bg text-academic-primary px-5 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

// ── Helper: Empty field placeholder ──
function EmptyField({ label, hint }: { label: string; hint: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-academic-muted mb-1">{label}</p>
      <p className="text-sm text-academic-border italic">{hint}</p>
    </div>
  );
}