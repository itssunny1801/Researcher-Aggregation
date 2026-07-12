import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";
import { ThemeProvider } from "@/lib/theme-context";
import PageTransition from "@/components/ui/page-transition";
import InteractiveParticles from "@/components/ui/interactive-particles";

import { Space_Grotesk, Silkscreen, JetBrains_Mono, Fraunces } from "next/font/google";

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space",
  display: "swap" 
});

const pixelFont = Silkscreen({ 
  weight: ["400", "700"],
  subsets: ["latin"], 
  variable: "--font-pixel",
  display: "swap" 
});

const jetbrains = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  display: "swap" 
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap"
});

export const metadata: Metadata = {
  title: {
    default: "ResearchHub — Global Editorial Reviewer Directory",
    template: "%s | ResearchHub",
  },
  description:
    "Search, verify, and connect with academic researchers worldwide. Verified through ORCID authentication.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        {/* Prevent flash of wrong theme */}
        <Script
          id="theme-script"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('theme');
                  if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${pixelFont.variable} ${jetbrains.variable} ${fraunces.variable} font-sans min-h-screen flex flex-col antialiased bg-academic-bg text-academic-primary transition-colors duration-300`}>
        <ThemeProvider>
          <InteractiveParticles />
          <Navbar />
          <main className="grow">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}