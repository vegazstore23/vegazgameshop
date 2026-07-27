import { ShieldCheck, Zap } from "lucide-react";
import BannerJokiImg from "../../assets/banner/BannerJoki.png";

export default function JokiBanner() {
  return (
    <div className="w-full bg-slate-900/60 overflow-hidden relative group">
      <div className="w-full h-52 md:h-64 relative bg-slate-950 overflow-hidden border-b border-slate-800">
        <img
          src={BannerJokiImg}
          alt="Vegaz Joki Banner"
          className="w-full h-full object-cover transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-white uppercase tracking-tight">
            SERVICE JOKI RANK MOBILE LEGENDS
          </h2>
          <p className="text-xs text-blue-400 font-semibold tracking-wide uppercase mt-0.5">
            Vegaz Store
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-6">
          <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono tracking-tight bg-emerald-500/5 border border-emerald-500/10 px-3 py-1.5 rounded-xl">
            <ShieldCheck size={14} className="text-emerald-400 shrink-0" />
            GUARANTEE ACCOUNT 100% AMAN & ANTI BANNED
          </div>
          <div className="flex items-center gap-2 text-[11px] text-amber-400 font-mono tracking-tight bg-amber-500/5 border border-amber-500/10 px-3 py-1.5 rounded-xl">
            <Zap size={14} className="text-amber-400 shrink-0" />
            PROSES INSTAN OLEH WORKER TOP GLOBAL & PRO PLAYER
          </div>
        </div>
      </div>
    </div>
  );
}
