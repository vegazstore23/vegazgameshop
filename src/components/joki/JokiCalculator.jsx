import { AlertCircle, Plus, Minus } from "lucide-react";
import JokiPackageGrid from "./JokiPackageGrid";
import { getRankImage } from "../../utils/rankImages";

export default function JokiCalculator({
  gameId,
  variants = [],
  startRankIdx,
  setStartRankIdx,
  totalStarsOrdered,
  setTotalStarsOrdered,
  minOrderRequired,
  selectedPkg,
  setSelectedPkg,
  formatCurrency,
  jokiType,
  setJokiType,
}) {
  const handleCounter = (type) => {
    if (type === "plus") {
      setTotalStarsOrdered((prev) => prev + 1);
    } else if (type === "minus") {
      if (totalStarsOrdered > minOrderRequired) {
        setTotalStarsOrdered((prev) => prev - 1);
      }
    }
  };

  const isMinimumUnitValid =
    jokiType === "unit" ? totalStarsOrdered >= minOrderRequired : true;

  return (
    <div className="w-full space-y-8">
      {/* ========================================================= */}
      {/* BAGIAN ATAS: PILIHAN JOKI PER BINTANG                      */}
      {/* ========================================================= */}
      <div
        className={`bg-slate-900/40 border rounded-3xl p-6 space-y-5 transition-all duration-300 ${
          jokiType === "unit"
            ? "border-blue-500/50 bg-blue-950/10 shadow-lg shadow-blue-500/5"
            : "border-slate-800"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${jokiType === "unit" ? "bg-blue-500 animate-pulse" : "bg-slate-600"}`}
          ></div>
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            Option 1: Joki Per Bintang (Satuan)
          </h4>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {variants && variants.length > 0 ? (
            variants.map((v, index) => {
              const isSelected = jokiType === "unit" && startRankIdx === index;
              const rankStaticIcon = getRankImage(
                v.imageKey || v.image_key || v.name || "",
              );

              return (
                <button
                  key={v.id || index}
                  type="button"
                  onClick={() => {
                    setJokiType("unit"); // Auto switch ke tipe unit
                    setStartRankIdx(index);
                    setSelectedPkg(null); // Reset pilihan borongan
                  }}
                  className={`border p-5 rounded-2xl flex items-center gap-4 text-left transition-all duration-300 group ${
                    isSelected
                      ? "border-blue-500 bg-blue-600/5 shadow-md shadow-blue-500/5"
                      : "border-slate-800 bg-slate-900/30 hover:border-slate-700"
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center shrink-0 overflow-hidden bg-slate-950/40 rounded-xl p-1 border border-white/5">
                    {rankStaticIcon ? (
                      <img
                        src={rankStaticIcon}
                        alt={v.name}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <div className="text-blue-400 font-bold text-xs uppercase">
                        {v.name?.substring(0, 3)}
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold text-sm truncate group-hover:text-blue-400 transition-colors">
                      {v.name}
                    </h4>
                    <p className="text-slate-400 text-[10px] uppercase font-bold mt-0.5">
                      Harga per bintang:
                    </p>
                    <p className="text-emerald-400 font-black text-sm font-mono mt-0.5">
                      {formatCurrency(v.price)}
                    </p>
                  </div>
                </button>
              );
            })
          ) : (
            <div className="col-span-2 text-center text-slate-500 italic py-4 text-sm">
              Data pangkat belum dikonfigurasi.
            </div>
          )}
        </div>

        {/* Pengatur Jumlah Bintang (Hanya tampil jika opsi per bintang sedang aktif) */}
        {jokiType === "unit" && variants[startRankIdx] && (
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs text-slate-400 font-bold">
                Rank Aktif:{" "}
                <span className="text-blue-400">
                  {variants[startRankIdx]?.name}
                </span>
              </p>
              {!isMinimumUnitValid && (
                <div className="text-amber-400 text-[10px] flex items-center gap-1.5 mt-1">
                  <AlertCircle size={12} />
                  <span>Wajib minimal {minOrderRequired} bintang.</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 p-1.5 rounded-xl self-start sm:self-center">
              <button
                type="button"
                onClick={() => handleCounter("minus")}
                disabled={totalStarsOrdered <= minOrderRequired}
                className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-slate-800 flex items-center justify-center text-slate-400 disabled:opacity-30 transition-colors"
              >
                <Minus size={14} />
              </button>
              <input
                type="number"
                value={totalStarsOrdered}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setTotalStarsOrdered(
                    val < minOrderRequired ? minOrderRequired : val,
                  );
                }}
                className="w-12 bg-transparent text-center text-white font-mono font-black text-sm outline-none"
              />
              <button
                type="button"
                onClick={() => handleCounter("plus")}
                className="w-8 h-8 rounded-lg bg-slate-950 hover:bg-slate-800 flex items-center justify-center text-slate-400 transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* BAGIAN BAWAH: PAKET JOKI BORONGAN                         */}
      {/* ========================================================= */}
      <div
        className={`bg-slate-900/40 border rounded-3xl p-6 space-y-5 transition-all duration-300 ${
          jokiType === "package"
            ? "border-purple-500/50 bg-purple-950/10 shadow-lg shadow-purple-500/5"
            : "border-slate-800"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-2 h-2 rounded-full ${jokiType === "package" ? "bg-purple-500 animate-pulse" : "bg-slate-600"}`}
          ></div>
          <h4 className="text-xs font-black uppercase tracking-wider text-white">
            Option 2: Paket Joki Borongan (Flat Rate)
          </h4>
        </div>

        {/* Grid paket borongan langsung mejeng di bawah mengalir */}
        <JokiPackageGrid
          gameId={gameId}
          selectedPkg={selectedPkg}
          setSelectedPkg={(pkg) => {
            setJokiType("package"); // Auto switch ke tipe borongan paket
            setSelectedPkg(pkg);
          }}
          formatCurrency={formatCurrency}
        />
      </div>
    </div>
  );
}
