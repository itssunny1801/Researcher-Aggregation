import OrcidButton from "@/components/ui/orcid-button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-blue-50 dark:from-[#0b0f1a] dark:via-[#0d1326] dark:to-[#0f172a] transition-colors duration-300">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/4 top-1/3 w-72 h-72 bg-academic-orcid/5 dark:bg-academic-orcid/10 rounded-full blur-3xl" />
        <div className="absolute right-1/4 bottom-1/3 w-80 h-80 bg-indigo-200/10 dark:bg-indigo-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md animate-fade-in">
        {/* Card */}
        <div className="surface-card rounded-3xl shadow-xl shadow-black/5 dark:shadow-black/40 p-8 md:p-10">
          {/* Icon */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-academic-primary to-slate-700 dark:from-slate-700 dark:to-slate-800 text-white text-2xl mb-4 shadow-lg">
              🎓
            </div>
            <h1 className="text-2xl font-bold font-serif text-academic-primary">
              Welcome Back
            </h1>
            <p className="text-sm text-academic-muted mt-2 leading-relaxed">
              Sign in with your ORCID iD to access your researcher profile and
              manage your academic information.
            </p>
          </div>

          {/* ORCID Login Button */}
          <div className="mb-6">
            <OrcidButton size="lg" className="w-full justify-center" />
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-academic-border" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-academic-surface px-3 text-academic-muted">
                What is ORCID?
              </span>
            </div>
          </div>

          {/* ORCID Explanation */}
          <div className="bg-academic-orcid/5 dark:bg-academic-orcid/10 border border-academic-orcid/20 dark:border-academic-orcid/30 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-academic-orcid/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg
                  className="w-4 h-4 text-academic-orcid"
                  viewBox="0 0 256 256"
                  fill="currentColor"
                >
                  <path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-academic-primary font-semibold mb-1">
                  ORCID provides a persistent digital identifier
                </p>
                <p className="text-xs text-academic-muted leading-relaxed">
                  It distinguishes you from every other researcher. Your ORCID
                  iD ensures your work is recognized and properly attributed, no
                  matter how common your name is.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-3 mb-6">
            {[
              {
                icon: "✅",
                text: "Verified identity through ORCID authentication",
              },
              { icon: "📝", text: "Manage and update your research profile" },
              {
                icon: "🔍",
                text: "Appear in our global researcher directory",
              },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs text-academic-muted">
                  {item.text}
                </span>
              </div>
            ))}
          </div>

          {/* Footer link */}
          <div className="text-center pt-4 border-t border-academic-border">
            <p className="text-xs text-academic-muted">
              Don&apos;t have an ORCID iD?{" "}
              <a
                href="https://orcid.org/register"
                target="_blank"
                rel="noopener noreferrer"
                className="text-academic-accent font-medium hover:underline"
              >
                Register for free ↗
              </a>
            </p>
          </div>
        </div>

        {/* Back link */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="text-sm text-academic-muted hover:text-academic-primary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
