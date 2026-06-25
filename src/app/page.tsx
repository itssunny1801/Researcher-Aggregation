import Link from "next/link";
export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-center">
      <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">
        Global Editorial Reviewer Directory
      </h1>
      <p className="text-lg text-slate-600 mb-8">
        A database engine seeded by OpenAlex to search, verify, and track academic researchers.
      </p>
      
      <Link 
            href="/search" 
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-md font-medium hover:bg-emerald-700 transition-colors"
      >
       Go to Search Directory
        </Link>
    </div>
  );
}