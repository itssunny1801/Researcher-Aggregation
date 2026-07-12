import Link from "next/link";
import ResearcherCard from "@/components/ui/researcher-card";
import StatsCard from "@/components/ui/stats-card";
import TypingEffect from "@/components/ui/typing-effect";
import ScrollReveal from "@/components/ui/scroll-reveal";
import TiltCard from "@/components/ui/tilt-card";
import DirectoryPreview from "@/components/ui/directory-preview";
import HeroBackground from "@/components/ui/hero-background";
import SplitFeatures from "@/components/ui/split-features";
import ScrollZoomWindow from "@/components/ui/scroll-zoom-window";
import VectorLattice from "@/components/ui/vector-lattice";
import MoleculeStructure from "@/components/ui/molecule-structure";
import EngineeringGyroscope from "@/components/ui/engineering-gyroscope";
import ResearchCollage from "@/components/ui/research-collage";
import { MOCK_RESEARCHERS, PLATFORM_STATS, HOW_IT_WORKS } from "@/lib/constants";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ══ HERO ══ */}
      <section className="relative min-h-[72vh] flex flex-col justify-center py-16 md:py-20">
        <HeroBackground />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center relative z-10 w-full">
          <div className="mb-8 min-h-[140px] md:min-h-[180px] flex items-center justify-center">
            <TypingEffect
              as="h1"
              text="Discover the world's leading academic researchers"
              speed={40}
              delay={300}
              className="text-5xl md:text-7xl font-bold font-display tracking-tight leading-[1.1] bg-gradient-to-br from-black to-gray-500 dark:from-white dark:to-gray-400 bg-clip-text text-transparent justify-center"
            />
          </div>

          <div className="animate-fade-in opacity-0 delay-1000 flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
            <Link 
              href="/search" 
              className="px-8 py-3.5 rounded-full text-base font-medium border border-transparent text-academic-bg bg-academic-primary hover:shadow-[0_0_30px_rgba(0,0,0,0.4)] dark:hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              Search Directory
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </Link>
            <Link 
              href="/login" 
              className="px-8 py-3.5 rounded-full text-base font-medium border border-academic-border text-academic-primary bg-academic-surface hover:bg-academic-surface-hover hover:shadow-[0_0_30px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_30px_rgba(0,0,0,0.8)] transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              Sign In (ORCID)
            </Link>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {PLATFORM_STATS.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 100} direction="up" className="h-full">
              <TiltCard max={8} className="rounded-2xl">
                <div className="bg-academic-surface border border-academic-border rounded-2xl card-3d p-6 h-full flex flex-col items-center justify-center text-center group [transform-style:preserve-3d]">
                  <div className={`w-14 h-14 rounded-2xl ${stat.iconBg} ${stat.iconColor} flex items-center justify-center mb-5 [&>svg]:w-6 [&>svg]:h-6 group-hover:scale-110 transition-transform duration-300 [transform:translateZ(28px)]`} dangerouslySetInnerHTML={{ __html: stat.icon }} />
                  <p className="text-3xl md:text-4xl font-bold text-academic-primary tracking-tight mb-2 [transform:translateZ(20px)]">{stat.value}</p>
                  <p className="text-sm font-medium text-academic-muted [transform:translateZ(12px)]">{stat.label}</p>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ══ HOW IT WORKS ══ */}
      <section className="pt-28 md:pt-32 pb-14 md:pb-16 relative">
        {/* 3D Molecule – ambient science accent (left of heading) */}
        <div className="absolute left-[2%] -top-12 opacity-60 dark:opacity-75 hidden lg:block z-20 origin-top-left scale-90 cursor-pointer transition-all duration-700 hover:scale-105 hover:opacity-100 hover:-translate-y-2 group">
          <div className="absolute inset-0 bg-academic-accent/0 group-hover:bg-academic-accent/10 rounded-full blur-3xl transition-colors duration-700 pointer-events-none" />
          <MoleculeStructure />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <TypingEffect
                as="h2"
                text="How It Works"
                speed={40}
                showCursor={false}
                className="text-4xl md:text-5xl font-bold font-serif text-academic-primary mb-4 tracking-tight"
              />
              <p className="text-academic-muted text-base max-w-xl mx-auto mt-4">
                Three simple steps to find and connect with verified researchers.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8 pt-4">
            {HOW_IT_WORKS.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 150} direction="up" className="h-full">
                <TiltCard max={9} className="rounded-3xl mt-4">
                  <div className="bg-academic-surface border border-academic-border rounded-3xl card-3d p-8 relative h-full flex flex-col items-center text-center group [transform-style:preserve-3d]">
                    {/* Step Badge — floats above the card surface */}
                    <div className="absolute -top-4 left-1/2 bg-academic-surface border border-academic-border rounded-full px-5 py-1.5 text-xs font-bold text-academic-primary shadow-sm whitespace-nowrap [transform:translateX(-50%)_translateZ(40px)]">
                      Step {step.step}
                    </div>

                    {/* Icon — deepest pop-out layer, gently floating */}
                    <div className="mb-6 mt-2 [transform:translateZ(36px)]">
                      <div
                        className="text-academic-muted [&>svg]:w-8 [&>svg]:h-8 animate-float group-hover:text-academic-accent group-hover:scale-110 transition-[color,scale] duration-500"
                        style={{ animationDelay: `${i * 400}ms` }}
                        dangerouslySetInnerHTML={{ __html: step.icon }}
                      />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-academic-primary mb-3 [transform:translateZ(24px)]">{step.title}</h3>
                    <p className="text-sm text-academic-muted leading-relaxed [transform:translateZ(14px)]">
                      {step.description}
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CORE CAPABILITIES ══ */}
      <section className="pt-28 md:pt-32 pb-14 md:pb-16 relative">
        {/* 3D Vector Lattice – embeddings in vector space (right of heading) */}
        <div className="absolute right-[2%] -top-16 opacity-70 dark:opacity-80 hidden lg:block z-20 origin-top-right scale-90 cursor-pointer transition-all duration-700 hover:scale-105 hover:opacity-100 hover:-translate-y-2 group">
          <div className="absolute inset-0 bg-academic-accent/0 group-hover:bg-academic-accent/10 rounded-full blur-3xl transition-colors duration-700 pointer-events-none" />
          <VectorLattice />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <TypingEffect
                as="h2"
                text="Core Capabilities"
                speed={40}
                showCursor={false}
                className="text-3xl md:text-4xl font-bold text-academic-primary mb-4"
              />
              <p className="text-academic-muted text-base max-w-xl mx-auto mt-4">
                A seamless integration of global discovery and verified identity.
              </p>
            </div>
          </ScrollReveal>

          <div className="space-y-14 md:space-y-16">
            
            {/* Discovery vs Profiles */}
            <ScrollReveal direction="up">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Two Seamless Experiences</h3>
                  <p className="text-academic-muted leading-relaxed mb-6">
                    Our platform is built on a dual-architecture foundation. The <strong>Public Discovery</strong> layer fetches data from the OpenAlex API, providing instant, view-only access to millions of researchers worldwide without any login required.
                  </p>
                  <p className="text-academic-muted leading-relaxed">
                    The <strong>Professor Profiles</strong> layer allows verified researchers to claim their presence, creating a single source of truth editable directly through our secure database.
                  </p>
                </div>
                <TiltCard max={7} className="rounded-2xl">
                <div className="bg-academic-bg border border-academic-border rounded-2xl card-3d p-8 relative overflow-hidden h-full">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-academic-accent/10 rounded-full blur-3xl" />
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-academic-surface rounded-xl shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-slate-500/10 text-slate-500 flex items-center justify-center">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Public Discovery</h4>
                        <p className="text-xs text-academic-muted">Global OpenAlex database</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-academic-surface rounded-xl shadow-sm border border-academic-accent/30">
                      <div className="w-10 h-10 rounded-full bg-academic-orcid/10 text-academic-orcid flex items-center justify-center">
                        <svg className="w-5 h-5" viewBox="0 0 256 256" fill="currentColor"><path d="M256 128c0 70.7-57.3 128-128 128S0 198.7 0 128 57.3 0 128 0s128 57.3 128 128z" fill="#A6CE39" /><path d="M86.3 186.2H70.9V79.1h15.4v107.1zM78.6 52.3c-5.4 0-9.9 4.4-9.9 9.9 0 5.4 4.4 9.9 9.9 9.9 5.4 0 9.9-4.4 9.9-9.9-.1-5.5-4.5-9.9-9.9-9.9zM108.9 79.1h41.6c39.6 0 57 28.3 57 53.6 0 27.5-21.5 53.6-56.8 53.6h-41.8V79.1zm15.4 93.3h24.5c34.9 0 42.9-26.5 42.9-39.7C191.7 106 176 92.7 148.7 92.7h-24.4v79.7z" fill="#fff" /></svg>
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">Verified Profiles</h4>
                        <p className="text-xs text-academic-muted">Directly editable & ORCID linked</p>
                      </div>
                    </div>
                  </div>
                </div>
                </TiltCard>
              </div>
            </ScrollReveal>

            {/* AI Search & DB */}
            <ScrollReveal direction="up">
              <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
                <div className="md:order-2">
                  <h3 className="text-2xl font-bold mb-4">Semantic AI Search</h3>
                  <p className="text-academic-muted leading-relaxed mb-6">
                    Normal keyword search fails if a researcher doesn't use the exact word. Our platform understands <em>meaning</em>.
                  </p>
                  <p className="text-academic-muted leading-relaxed">
                    By converting researcher biographies and publications into vector embeddings via OpenAI, we store semantic meaning directly in our <strong>PostgreSQL</strong> database using <strong>pgvector</strong>. Finding the right expert is now as simple as asking a question.
                  </p>
                </div>
                <TiltCard max={7} className="md:order-1 rounded-2xl">
                <div className="bg-academic-bg border border-academic-border rounded-2xl card-3d p-8 h-full [transform-style:preserve-3d]">
                  <div className="space-y-4 font-mono text-xs [transform:translateZ(20px)]">
                    <div className="p-3 bg-academic-surface border border-academic-border rounded flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-slate-400" />
                      1. Professor Data (Bio + Pubs)
                    </div>
                    <div className="w-px h-4 bg-academic-border ml-5" />
                    <div className="p-3 bg-academic-surface border border-academic-border rounded flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-academic-accent" />
                      2. Convert to Vector Embedding
                    </div>
                    <div className="w-px h-4 bg-academic-border ml-5" />
                    <div className="p-3 bg-academic-surface border border-academic-border rounded border-l-[3px] border-l-academic-accent shadow-sm">
                      <span className="text-academic-primary font-bold">3. pgvector Similarity Search</span>
                    </div>
                  </div>
                </div>
                </TiltCard>
              </div>
            </ScrollReveal>

          </div>
        </div>
      </section>

      {/* ── SPLIT FEATURES: DIRECTORY & ORCID ── */}
      <SplitFeatures />

      {/* ── GLOBAL NETWORK PREVIEW ── */}
      <section className="pt-14 md:pt-16 pb-0 relative">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center mb-10 max-w-3xl mx-auto">
              <TypingEffect
                as="h2"
                text="Global Academic Network"
                speed={40}
                showCursor={false}
                className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-academic-primary mb-6"
              />
              <p className="text-academic-muted text-base md:text-lg leading-relaxed mb-8">
                Connect with leading scientists and researchers across the world. Discover their peer reviews, analyze their publications, and build meaningful collaborations on a truly global scale.
              </p>
              <Link href="/search" className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                Explore the Directory
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollZoomWindow>
            <div className="relative w-full">
              {/* Massive vibrant rainbow glare on the wall behind the window - split into two divs for buttery smooth opacity crossfading */}
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#ff595e]/15 via-[#ffca3a]/10 to-[#1982c4]/15 blur-[60px] rounded-[100%] transform translate-y-4 animate-pulse duration-1000 opacity-100 dark:opacity-0 transition-opacity duration-500 ease-in-out" />
              <div className="absolute -inset-10 bg-gradient-to-tr from-[#ff595e]/40 via-[#ffca3a]/30 to-[#1982c4]/40 blur-[80px] rounded-[100%] transform translate-y-4 animate-pulse duration-1000 opacity-0 dark:opacity-100 transition-opacity duration-500 ease-in-out" />
              <DirectoryPreview />
            </div>
          </ScrollZoomWindow>
        </div>
      </section>

      {/* ══ RESEARCH LAYER · SPATIAL COLLAGE ══ */}
      <ResearchCollage />

      {/* ══ ENGINEERING · PRECISION SHOWCASE (bottom) ══ */}
      <section className="relative py-12 md:py-14">
        {/* Faint engineering grid + ambient glow */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-[0.4] dark:opacity-30 bg-[linear-gradient(to_right,var(--color-academic-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-academic-border)_1px,transparent_1px)] bg-[size:3rem_3rem]" 
          style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%)'
          }}
        />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-academic-accent/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Copy */}
            <ScrollReveal direction="up">
              <div className="text-center lg:text-left">
                <span className="badge badge-accent mb-5">Precision Engineering</span>
                <h2 className="text-3xl md:text-5xl font-bold font-sans tracking-tight text-academic-primary mb-6 leading-[1.1]">
                  Engineered for scientific rigor
                </h2>
                <p className="text-academic-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Every profile, search, and verification is powered by a carefully
                  balanced system — semantic vector search, ORCID identity, and a
                  live global index working in perfect synchrony. Discovery, engineered.
                </p>
              </div>
            </ScrollReveal>

            {/* 3D Instrument */}
            <ScrollReveal direction="up" delay={150}>
              <div className="flex justify-center lg:justify-end -mt-8 lg:-mt-20">
                <div className="cursor-pointer transition-all duration-700 hover:scale-110 hover:-translate-y-4 hover:rotate-3 relative group">
                  <div className="absolute inset-0 bg-academic-accent/0 group-hover:bg-academic-accent/10 rounded-full blur-3xl transition-colors duration-700 pointer-events-none" />
                  <EngineeringGyroscope />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}