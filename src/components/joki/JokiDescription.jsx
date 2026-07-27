import { Info } from "lucide-react";

export default function JokiDescription({ gameData }) {
  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
      <div className="flex items-center gap-3">
        {gameData?.iconUrl ? (
          <img
            src={gameData.iconUrl}
            alt={gameData.name}
            className="w-12 h-12 rounded-xl object-cover border border-slate-700 shadow"
          />
        ) : (
          <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center font-black text-xs text-white">
            MLBB
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Info size={15} className="text-blue-500" /> Kategori Game
          </h3>
          <p className="text-xs text-slate-400">
            {gameData?.name || "Mobile Legends: Bang Bang"}
          </p>
        </div>
      </div>

      <div className="text-xs text-slate-400 space-y-3 leading-relaxed border-t border-slate-800/60 pt-3">
        <p className="font-medium text-slate-300">
          Layanan joki terbaik untuk menaikkan tier Mobile Legends Anda mulai
          dari Grandmaster hingga Mythical Glory/Immortal.
        </p>

        <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 space-y-2">
          <p className="font-extrabold text-blue-400 text-[10px] tracking-widest uppercase">
            Petunjuk Pemesanan:
          </p>
          <ol className="list-decimal pl-4 space-y-1.5 text-slate-400 text-[11px]">
            <li>Lengkapi data login akun MLBB Anda dengan benar.</li>
            <li>Pilih varian atau isi formulir target pangkat idaman.</li>
            <li>
              Selesaikan pembayaran dan pesanan Anda langsung masuk antrean
              pemrosesan pro player.
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
