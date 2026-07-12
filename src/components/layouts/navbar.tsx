"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchCurrentUser, clearStoredToken, type User } from "@/lib/auth";
import { useTheme } from "@/lib/theme-context";
import OrcidButton from "@/components/ui/orcid-button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    fetchCurrentUser().then(setUser);
  }, []);

  function handleSignOut() {
    clearStoredToken();
    setUser(null);
    setUserMenuOpen(false);
    router.push("/");
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = () => setUserMenuOpen(false);
    if (userMenuOpen) {
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    }
  }, [userMenuOpen]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/search", label: "Directory" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="w-full bg-academic-bg relative z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-academic-accent flex items-center justify-center text-academic-bg text-sm font-bold shadow-md flex-shrink-0">
                R
              </div>
              <span className="font-bold text-base text-academic-primary tracking-normal hidden sm:block font-display">
                ResearchHub
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-academic-accent/10 text-academic-accent"
                      : "text-academic-muted hover:text-academic-primary hover:bg-academic-surface-hover"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-academic-surface-hover transition-colors text-academic-muted hover:text-academic-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Auth */}
            {user ? (
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setUserMenuOpen(!userMenuOpen);
                  }}
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-academic-surface-hover transition-colors"
                >
                  <div className="w-8 h-8 flex-shrink-0 rounded-full bg-academic-orcid/10 flex items-center justify-center text-academic-orcid text-xs font-bold ring-2 ring-academic-orcid/20">
                    {user.name?.split(" ").map((n) => n[0]).join("").slice(-2) || "?"}
                  </div>
                  <span className="text-sm text-academic-primary font-medium max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <svg className={`w-4 h-4 text-academic-muted transition-transform ${userMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-52 surface-card rounded-xl shadow-xl py-1.5 animate-fade-in z-50">
                    <div className="px-4 py-2 border-b border-academic-border">
                      <p className="text-xs text-academic-muted">Signed in as</p>
                      <p className="text-sm font-semibold text-academic-primary truncate">{user.name}</p>
                    </div>
                    <Link href="/account" className="block px-4 py-2.5 text-sm text-academic-primary hover:bg-academic-surface-hover transition-colors" onClick={() => setUserMenuOpen(false)}>
                      My Profile
                    </Link>
                    <Link href="/profile/edit" className="block px-4 py-2.5 text-sm text-academic-primary hover:bg-academic-surface-hover transition-colors" onClick={() => setUserMenuOpen(false)}>
                      Edit Profile
                    </Link>
                    <hr className="my-1 border-academic-border" />
                    <button onClick={handleSignOut} className="w-full text-left block px-4 py-2.5 text-sm text-red-500 hover:bg-red-500/10 transition-colors">
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <OrcidButton size="sm" />
            )}
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-1">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-academic-surface-hover transition-colors text-academic-muted hover:text-academic-primary" aria-label="Toggle theme">
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-academic-surface-hover transition-colors text-academic-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-academic-border animate-fade-in bg-academic-surface">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.href) ? "bg-academic-accent/10 text-academic-accent" : "text-academic-muted hover:text-academic-primary hover:bg-academic-surface-hover"}`}>
                {link.label}
              </Link>
            ))}
            <hr className="border-academic-border my-2" />
            {user ? (
              <>
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-academic-muted hover:text-academic-primary hover:bg-academic-surface-hover">
                  My Profile
                </Link>
                <Link href="/profile/edit" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-academic-muted hover:text-academic-primary hover:bg-academic-surface-hover">
                  Edit Profile
                </Link>
                <button onClick={handleSignOut} className="w-full text-left block px-4 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-500/10">
                  Sign Out
                </button>
              </>
            ) : (
              <div className="px-4 py-2">
                <OrcidButton size="sm" className="w-full justify-center" />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
