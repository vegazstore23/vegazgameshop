import { Tag } from "lucide-react";

export default function JokiPromo({ promoCode, setPromoCode }) {
  return (
    <div className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white text-sm">
          4
        </div>
        <h2 className="text-base font-bold text-white">Kode Promo</h2>
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Ketik Kode Promo Kamu"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="flex-1 bg-[#383842] border border-transparent focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white outline-none uppercase"
        />
        <button className="bg-slate-700 hover:bg-slate-600 px-5 py-3 rounded-xl text-white font-bold text-xs transition-colors">
          Gunakan
        </button>
      </div>
      <button className="text-xs text-blue-400 hover:underline font-bold flex items-center gap-1.5">
        <Tag size={14} /> Pakai Promo Yang Tersedia
      </button>
    </div>
  );
}
