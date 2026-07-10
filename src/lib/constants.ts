// ── API Configuration ──
export const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// ── Mock Researcher Data ──
export interface Researcher {
  id: number;
  name: string;
  initials: string;
  institution: string;
  department: string;
  researchFields: string[];
  country: string;
  publications: number;
  hIndex?: number;
  orcidId?: string;
  biography?: string;
  avatarColor: string;
}

export const MOCK_RESEARCHERS: Researcher[] = [
  {
    id: 1,
    name: "Dr. Aris Vance",
    initials: "AV",
    institution: "IIT Kanpur",
    department: "Chemical Engineering",
    researchFields: ["Multicomponent Distillation", "Thermodynamics"],
    country: "India",
    publications: 32,
    hIndex: 14,
    orcidId: "0000-0002-1825-0097",
    biography:
      "Research focusing on optimizing continuous multi-component distillation sequences and examining thermodynamic fluid behavior at near-critical points.",
    avatarColor: "bg-violet-100 text-violet-700",
  },
  {
    id: 2,
    name: "Prof. Sarah Jenkins",
    initials: "SJ",
    institution: "MIT",
    department: "Physics",
    researchFields: ["Quantum Computing", "Condensed Matter"],
    country: "United States",
    publications: 58,
    hIndex: 22,
    orcidId: "0000-0001-5109-3700",
    biography:
      "Leading research in quantum error correction and topological states of matter with applications in scalable quantum architectures.",
    avatarColor: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    name: "Dr. Elena Petrov",
    initials: "EP",
    institution: "ETH Zurich",
    department: "Computer Science",
    researchFields: ["Machine Learning", "Natural Language Processing"],
    country: "Switzerland",
    publications: 45,
    hIndex: 19,
    biography:
      "Pioneering work in transformer architectures for low-resource languages and cross-lingual transfer learning.",
    avatarColor: "bg-emerald-100 text-emerald-700",
  },
  {
    id: 4,
    name: "Prof. Kenji Tanaka",
    initials: "KT",
    institution: "University of Tokyo",
    department: "Biomedical Engineering",
    researchFields: ["Neural Interfaces", "Bioelectronics"],
    country: "Japan",
    publications: 67,
    hIndex: 28,
    biography:
      "Developing next-generation brain-computer interfaces using flexible organic bioelectronic devices.",
    avatarColor: "bg-amber-100 text-amber-700",
  },
  {
    id: 5,
    name: "Dr. Amara Okafor",
    initials: "AO",
    institution: "University of Lagos",
    department: "Environmental Science",
    researchFields: ["Climate Modeling", "Renewable Energy"],
    country: "Nigeria",
    publications: 29,
    hIndex: 11,
    biography:
      "Studying regional climate patterns in West Africa and designing sustainable solar-thermal energy solutions.",
    avatarColor: "bg-rose-100 text-rose-700",
  },
  {
    id: 6,
    name: "Prof. Michael Chen",
    initials: "MC",
    institution: "Stanford University",
    department: "Mathematics",
    researchFields: ["Algebraic Geometry", "Number Theory"],
    country: "United States",
    publications: 41,
    hIndex: 16,
    biography:
      "Working on arithmetic aspects of moduli spaces and Langlands program conjectures with computational approaches.",
    avatarColor: "bg-cyan-100 text-cyan-700",
  },
];

// ── Platform Statistics ──
export const PLATFORM_STATS = [
  { value: "125K+", label: "Researchers", icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>', color: "text-violet-600", bg: "bg-violet-50", iconBg: "bg-violet-100" },
  { value: "98+", label: "Countries", icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>', color: "text-emerald-600", bg: "bg-emerald-50", iconBg: "bg-emerald-100" },
  { value: "2.4K+", label: "Institutions", icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>', color: "text-amber-600", bg: "bg-amber-50", iconBg: "bg-amber-100" },
  { value: "1.3M+", label: "Publications", icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>', color: "text-blue-600", bg: "bg-blue-50", iconBg: "bg-blue-100" },
];

// ── Filter Options ──
export const DEPARTMENTS = [
  "All Departments", "Chemical Engineering", "Physics", "Computer Science",
  "Biomedical Engineering", "Environmental Science", "Mathematics", "Biology", "Medicine",
];

export const COUNTRIES = [
  "All Countries", "India", "United States", "Switzerland",
  "Japan", "Nigeria", "United Kingdom", "Germany", "China",
];

export const POPULAR_TAGS = [
  "Computer Science", "Engineering", "Medicine", "Physics", "Biology", "Mathematics", "AI & ML",
];

// ── How it Works Steps ──
export const HOW_IT_WORKS = [
  {
    step: "01", title: "Discover",
    description: "Search our global database of academic researchers. Filter by name, institution, department, or research field.",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>',
  },
  {
    step: "02", title: "Verify",
    description: "Every claimed profile is verified through ORCID authentication, ensuring identity accuracy and eliminating ambiguity.",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>',
  },
  {
    step: "03", title: "Connect",
    description: "View detailed researcher profiles with publications, research areas, and contact information to build collaborations.",
    icon: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>',
  },
];

// ── Profile Form Fields ──
export interface ProfileFormData {
  name: string;
  givenName: string;
  familyName: string;
  institution: string;
  department: string;
  biography: string;
  researchFields: string[];
  country: string;
  website: string;
  googleScholar: string;
}

export const EMPTY_PROFILE: ProfileFormData = {
  name: "",
  givenName: "",
  familyName: "",
  institution: "",
  department: "",
  biography: "",
  researchFields: [],
  country: "",
  website: "",
  googleScholar: "",
};
