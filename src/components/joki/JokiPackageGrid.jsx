import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { MoveRight, Zap } from "lucide-react";
import { getRankImage } from "../../utils/rankImages";

export default function JokiPackageGrid({
  gameId,
  selectedPkg,
  setSelectedPkg,
  formatCurrency,
}) {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadPackages = async () => {
      setLoading(true);
      try {
        const res = await apiGet(`/api/joki/variants/${gameId}?type=package`);
        setPackages(res.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (gameId) loadPackages();
  }, [gameId]);

  if (loading)
    return (
      <div className="py-12 text-center text-slate-500 animate-pulse font-bold text-sm">
        Membuka katalog paket borongan...
      </div>
    );
  if (packages.length === 0)
    return (
      <div className="text-center text-slate-600 italic py-8 border border-dashed border-slate-800 rounded-3xl text-sm">
        Paket borongan belum tersedia saat ini.
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {packages.map((pkg) => {
        const fromImg = getRankImage(pkg.fromRank || pkg.from_rank || "");
        const toImg = getRankImage(pkg.toRank || pkg.to_rank || "");

        return (
          <button
            key={pkg.id}
            type="button"
            onClick={() => setSelectedPkg(pkg)}
            className={`border p-5 rounded-2xl flex flex-col justify-between text-left transition-all duration-300 relative overflow-hidden group min-h-[190px] ${
              selectedPkg?.id === pkg.id
                ? "border-purple-500 bg-purple-600/5 shadow-md shadow-purple-500/5"
                : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
            }`}
          >
            <div className="w-full space-y-3">
              <h4 className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors truncate">
                {pkg.name}
              </h4>

              <div className="flex items-center gap-3 bg-slate-950/60 p-2.5 rounded-xl border border-white/[0.02] justify-center">
                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 overflow-hidden flex items-center justify-center p-0.5">
                    {fromImg ? (
                      <img
                        src={fromImg}
                        className="w-full h-full object-contain"
                        alt="From"
                      />
                    ) : (
                      <span className="text-[9px] text-slate-600">-</span>
                    )}
                  </div>
                  <span className="text-[9px] font-black text-slate-400 tracking-tight font-mono truncate max-w-[65px]">
                    {pkg.fromRank || pkg.from_rank}
                  </span>
                </div>

                <MoveRight size={14} className="text-purple-500 shrink-0" />

                <div className="flex flex-col items-center">
                  <div className="w-9 h-9 overflow-hidden flex items-center justify-center p-0.5">
                    {toImg ? (
                      <img
                        src={toImg}
                        className="w-full h-full object-contain"
                        alt="To"
                      />
                    ) : (
                      <span className="text-[9px] text-slate-600">-</span>
                    )}
                  </div>
                  <span className="text-[9px] font-black text-purple-400 tracking-tight font-mono truncate max-w-[65px]">
                    {pkg.toRank || pkg.to_rank}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full mt-4 pt-2.5 border-t border-slate-800/60 flex items-center justify-between">
              <span className="text-emerald-400 font-black text-base font-mono">
                {formatCurrency(pkg.price)}
              </span>
              <span className="bg-purple-950/80 text-purple-400 text-[8px] font-black tracking-widest uppercase border border-purple-900/40 px-2 py-0.5 rounded flex items-center gap-0.5">
                <Zap size={9} /> INSTANT
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
