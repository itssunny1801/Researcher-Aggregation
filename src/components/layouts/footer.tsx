import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-academic-bg border-t border-academic-border mt-auto transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-gradient-to-br from-academic-accent to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                R
              </div>
              <span className="font-bold text-academic-primary text-lg tracking-tight">
                ResearchHub
              </span>
            </div>
            <p className="text-sm text-academic-muted leading-relaxed">
              A global directory for academic researchers. Search, verify, and
              connect with verified editorial reviewers worldwide.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-academic-primary mb-4">
              Platform
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm text-academic-muted hover:text-academic-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/search" className="text-sm text-academic-muted hover:text-academic-accent transition-colors">
                  Search Directory
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-sm text-academic-muted hover:text-academic-accent transition-colors">
                  Sign In with ORCID
                </Link>
              </li>
              <li>
                <Link href="/profile/edit" className="text-sm text-academic-muted hover:text-academic-accent transition-colors">
                  Edit Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-academic-primary mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://orcid.org/" target="_blank" rel="noopener noreferrer" className="text-sm text-academic-muted hover:text-academic-accent transition-colors">
                  ORCID ↗
                </a>
              </li>
              <li>
                <a href="https://github.com/Aditya-Singh0001/Researcher-Aggregation" target="_blank" rel="noopener noreferrer" className="text-sm text-academic-muted hover:text-academic-accent transition-colors">
                  GitHub Repository ↗
                </a>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-academic-primary mb-4">
              About
            </h4>
            <p className="text-sm text-academic-muted leading-relaxed">
              Built with Next.js & FastAPI. Researcher identities are verified
              through ORCID authentication for trust and accuracy.
            </p>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 bg-academic-orcid rounded-full animate-pulse" />
              <span className="text-xs text-academic-muted font-medium">
                ORCID Verified Platform
              </span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-academic-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-academic-muted">
            © {new Date().getFullYear()} ResearchHub. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-academic-muted font-medium">
            <span>Identity verified via ORCID</span>
          </div>
        </div>
      </div>
    </footer>
  );
}