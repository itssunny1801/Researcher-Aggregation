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
  { value: "125K+", label: "Researchers", icon: "👥", color: "text-violet-600", bg: "bg-violet-50", iconBg: "bg-violet-100" },
  { value: "98+", label: "Countries", icon: "🌍", color: "text-emerald-600", bg: "bg-emerald-50", iconBg: "bg-emerald-100" },
  { value: "2.4K+", label: "Institutions", icon: "🏛️", color: "text-amber-600", bg: "bg-amber-50", iconBg: "bg-amber-100" },
  { value: "1.3M+", label: "Publications", icon: "📄", color: "text-blue-600", bg: "bg-blue-50", iconBg: "bg-blue-100" },
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
    icon: "🔍",
  },
  {
    step: "02", title: "Verify",
    description: "Every claimed profile is verified through ORCID authentication, ensuring identity accuracy and eliminating ambiguity.",
    icon: "✅",
  },
  {
    step: "03", title: "Connect",
    description: "View detailed researcher profiles with publications, research areas, and contact information to build collaborations.",
    icon: "🤝",
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
