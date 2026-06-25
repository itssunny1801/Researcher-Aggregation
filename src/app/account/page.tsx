/*The code for the account page goes here.*/
export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* ORCID Verification Header Banner */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <span className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
          <div>
            <p className="text-sm font-semibold text-emerald-900">Connected via ORCID iD</p>
            <p className="text-xs text-emerald-700 font-mono">0000-0002-1825-0097</p>
          </div>
        </div>
        <span className="text-xs font-bold uppercase tracking-wider bg-emerald-200 text-emerald-800 px-2 py-1 rounded">
          Verified Account
        </span>
      </div>

      {/* Profile Details Sheet */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center space-y-4 text-center md:border-r md:border-slate-100 md:pr-6">
          <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center text-slate-500 font-bold text-2xl">
            AV
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Dr. Aris Vance</h2>
            <p className="text-sm text-slate-500">IIT Kanpur</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Biography</label>
            <p className="text-sm text-slate-700 leading-relaxed">
              Research focusing on optimizing continuous multi-component distillation sequences and examining thermodynamic fluid behavior at near-critical points.
            </p>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Designated Research Fields</label>
            <div className="flex flex-wrap gap-2 mt-2">
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100">
                Chemical Engineering
              </span>
              <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-md border border-indigo-100">
                Thermodynamics
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}