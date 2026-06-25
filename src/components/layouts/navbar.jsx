import Link from "next/link";
export default function Navbar() {
  return (
    <nav className="w-full p-4 bg-slate-900 text-white flex justify-between items-center">
      <div className="font-bold text-lg">🎓 Academic Directory</div>
      <div className="space-x-4">
        <Link href="/account" className="hover:underline">
          Account
        </Link>
      </div>
    </nav>
  )
}