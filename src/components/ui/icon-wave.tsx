"use client";
import React from "react";
import { 
  Dna, Microscope, FlaskConical, Atom, Calculator, 
  Cog, Cpu, HeartPulse, Code, Telescope, Globe, 
  BookOpen, TestTube, GraduationCap, Brain, Zap,
  Leaf, BarChart3, Activity, Lightbulb
} from "lucide-react";

const ICONS = [
  { icon: Dna, name: "Genetics" },
  { icon: Microscope, name: "Biology" },
  { icon: FlaskConical, name: "Chemistry" },
  { icon: Atom, name: "Physics" },
  { icon: Calculator, name: "Mathematics" },
  { icon: Cog, name: "Mechanical Engineering" },
  { icon: Cpu, name: "Computer Engineering" },
  { icon: HeartPulse, name: "Medicine" },
  { icon: Code, name: "Software Science" },
  { icon: Telescope, name: "Astronomy" },
  { icon: Globe, name: "Earth Sciences" },
  { icon: BookOpen, name: "Humanities" },
  { icon: TestTube, name: "Research Methods" },
  { icon: GraduationCap, name: "Academic Theory" },
  { icon: Brain, name: "Neuroscience" },
  { icon: Zap, name: "Electrical Engineering" },
  { icon: Leaf, name: "Environmental Science" },
  { icon: BarChart3, name: "Economics & Statistics" },
  { icon: Activity, name: "Sports Science" },
  { icon: Lightbulb, name: "Innovation" },
];

export default function IconWave() {
  // We double the array so the marquee can scroll seamlessly
  const items = [...ICONS, ...ICONS];

  // The time it takes for 20 items to scroll by (shifting 50% of the 40-item track)
  const MARQUEE_TIME = 30;
  // The delay difference between each adjacent item so they form a stationary wave
  const delayDiff = MARQUEE_TIME / ICONS.length;

  return (
    <div className="relative w-full overflow-hidden py-12 flex items-center bg-transparent [perspective:1200px] pointer-events-none">
      
      {/* Edge Gradients for seamless fading, matching the main background */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-academic-bg to-transparent z-10 pointer-events-none [transform:translateZ(150px)]" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-academic-bg to-transparent z-10 pointer-events-none [transform:translateZ(150px)]" />

      {/* Marquee Track Container */}
      {/* Width fits 28 items. animate-marquee shifts it left by 50% continuously */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] [transform-style:preserve-3d]">
        {items.map((item, index) => {
          // Negative delay ensures the wave is established correctly without waiting
          const delay = -(index * delayDiff) + "s";
          
          return (
            <div 
              key={index} 
              className="flex-shrink-0 px-2 sm:px-3"
            >
              {/* Vertical Sine Wave Animation Wrapper */}
              <div 
                className="animate-wave [transform-style:preserve-3d]"
                style={{ animationDelay: delay }}
              >
                {/* Visual Icon Card */}
                <div 
                  className="relative w-16 h-16 sm:w-20 sm:h-20 cursor-pointer group [transform-style:preserve-3d] transition-all duration-200 hover:scale-110 pointer-events-auto"
                  title={item.name}
                >
                  {/* The Background Layer (Flat for flawless hit testing) */}
                  <div className="absolute inset-0 rounded-full border border-academic-border/80 bg-academic-surface shadow-md transition-all duration-200 group-hover:shadow-[0_0_20px_var(--color-academic-accent)] group-hover:border-academic-accent" />
                  
                  {/* The Icon Layer (Pops out in 3D) */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none [transform-style:preserve-3d]">
                    <item.icon className="w-8 h-8 sm:w-10 sm:h-10 text-black dark:text-slate-400 opacity-70 transition-all duration-200 group-hover:opacity-100 group-hover:text-academic-accent group-hover:[transform:translateZ(30px)]" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
