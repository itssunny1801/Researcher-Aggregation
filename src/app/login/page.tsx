import OrcidButton from "@/components/ui/orcid-button";
import Link from "next/link";
import type { Metadata } from "next";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TypingEffect from "@/components/ui/typing-effect";
import Ambient3D from "@/components/ui/ambient-3d";
import TiltCard from "@/components/ui/tilt-card";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="relative overflow-hidden min-h-[80vh] flex items-center justify-center px-4 py-16 transition-colors duration-300">
      <Ambient3D variant="a" />
      <div className="relative w-full max-w-md">
        {/* Card */}
        <ScrollReveal>
          <TiltCard max={4} className="rounded-3xl">
          <div className="surface-card rounded-3xl card-3d p-8 md:p-10">
            {/* Icon */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-academic-accent text-academic-bg shadow-lg flex-shrink-0">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                  </svg>
                </div>
                <TypingEffect as="h1" text="Welcome Back" className="text-2xl font-bold font-serif text-academic-primary" showCursor={false} />
              </div>
              <p className="text-sm text-academic-muted leading-relaxed">
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
          <div className="bg-academic-orcid/5 border border-academic-orcid/15 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-academic-orcid/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-academic-orcid" viewBox="0 0 256 256" fill="currentColor">
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
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", text: "Verified identity through ORCID authentication" },
              { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", text: "Manage and update your research profile" },
              { icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", text: "Appear in our global researcher directory" },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-3">
                <svg className="w-4 h-4 text-academic-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                <span className="text-xs text-academic-muted">{item.text}</span>
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
          </TiltCard>
        </ScrollReveal>

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
