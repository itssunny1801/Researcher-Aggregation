/*The code for the initial search page goes here.*/

import Link from "next/link";

// 1. DEFINE THE TYPE BLUEPRINT
// This acts as a strict contract. If a dev forgets "country" or typos "dept", 
// TypeScript will trigger a red underline immediately.
export interface Professor {
  id: number;
  name: string;
  college: string;
  dept: string;
  area: string[];
  country: string;
}

export default function SearchPage() {
  
  // 2. APPLY THE TYPE TO YOUR DATA
  // We explicitly tell TypeScript that this array MUST strictly match the Professor interface.
  const mockProfessors: Professor[] = [
    { 
      id: 1, 
      name: "Dr. Aris Vance", 
      college: "IIT Kanpur", 
      dept: "Chemical Engineering", 
      area: ["Multicomponent Distillation", "Thermodynamics"], 
      country: "India" 
    },
    { 
      id: 2, 
      name: "Prof. Sarah Jenkins", 
      college: "MIT", 
      dept: "Physics", 
      area: ["Quantum Computing", "Condensed Matter"], 
      country: "USA" 
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold text-slate-900 mb-6">Researcher Directory</h1>
      
      {/* Filters Row */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <input 
          type="text" 
          placeholder="Search by name or keyword..." 
          className="p-2 border border-slate-300 rounded-md text-sm focus:outline-none focus:border-slate-900"
        />
        <select className="p-2 border border-slate-300 rounded-md text-sm bg-white">
          <option>All Departments</option>
          <option>Chemical Engineering</option>
          <option>Physics</option>
        </select>
        <select className="p-2 border border-slate-300 rounded-md text-sm bg-white">
          <option>All Countries</option>
          <option>India</option>
          <option>USA</option>
        </select>
        {/* Next.js internal Link navigation */}
        <Link 
          href="/"
          className="bg-slate-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors text-center block"
        >
          Back to Home
        </Link>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockProfessors.map((prof: Professor) => (
          <div key={prof.id} className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-slate-900 mb-1">{prof.name}</h3>
            <p className="text-sm text-slate-600 mb-2">{prof.dept} • {prof.college} ({prof.country})</p>
            <div className="flex flex-wrap gap-2 mt-4">
              {prof.area.map((tag: string, index: number) => (
                <span key={index} className="px-2.5 py-0.5 bg-slate-100 text-slate-800 text-xs font-medium rounded-full border border-slate-200">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}