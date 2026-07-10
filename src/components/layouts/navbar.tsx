"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchCurrentUser, type User } from "@/lib/auth";
import { useTheme } from "@/lib/theme-context";
import OrcidButton from "@/components/ui/orcid-button";
import { BACKEND_URL } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    fetchCurrentUser().then(setUser);
  }, []);

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
    <nav className="w-full glass-dark sticky top-0 z-50 shadow-lg shadow-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-academic-accent to-indigo-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
              R
            </div>
            <span className="font-bold text-lg text-white tracking-tight hidden sm:block">
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
                    ? "bg-white/15 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center gap-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
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
                  className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-academic-orcid/20 flex items-center justify-center text-academic-orcid text-xs font-bold ring-2 ring-academic-orcid/30">
                    {user.name?.split(" ").map((n) => n[0]).join("").slice(-2) || "?"}
                  </div>
                  <span className="text-sm text-white font-medium max-w-[120px] truncate">
                    {user.name}
                  </span>
                  <svg className={`w-4 h-4 text-white/60 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                      👤 My Profile
                    </Link>
                    <Link href="/profile/edit" className="block px-4 py-2.5 text-sm text-academic-primary hover:bg-academic-surface-hover transition-colors" onClick={() => setUserMenuOpen(false)}>
                      ✏️ Edit Profile
                    </Link>
                    <hr className="my-1 border-academic-border" />
                    <a href={`${BACKEND_URL}/auth/logout`} className="block px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                      🚪 Sign Out
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <OrcidButton size="sm" />
            )}
          </div>

          {/* Mobile Right */}
          <div className="flex md:hidden items-center gap-1">
            <button onClick={toggleTheme} className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70" aria-label="Toggle theme">
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
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="md:hidden border-t border-white/10 animate-fade-in">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                className={`block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${isActive(link.href) ? "bg-white/15 text-white" : "text-white/70 hover:text-white hover:bg-white/10"}`}>
                {link.label}
              </Link>
            ))}
            <hr className="border-white/10 my-2" />
            {user ? (
              <>
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10">
                  👤 My Profile
                </Link>
                <Link href="/profile/edit" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:text-white hover:bg-white/10">
                  ✏️ Edit Profile
                </Link>
                <a href={`${BACKEND_URL}/auth/logout`} className="block px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/10">
                  🚪 Sign Out
                </a>
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
