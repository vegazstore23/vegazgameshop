import { Link } from "react-router-dom";
import { useLangCurr } from "../context/LanguageCurrencyContext";
import { ShieldCheck, Zap, Globe, Sparkles } from "lucide-react";

export default function PopularSection() {
  const { t } = useLangCurr();

  const items = [
    {
      title: "Mobile Legends",
      dev: "Moonton",
      to: "/product",
      badgeText: t("header", "stock") || "STOCK",
      icon: <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />,
      gradientBg: "from-blue-950 via-[#071330] to-[#020d26]",
      borderGlow: "border-cyan-500/30 group-hover:border-cyan-400",
      accentFold: "bg-cyan-500/20",
    },
    {
      title: "Joki Rank MLBB",
      dev: "VegazStore",
      to: "/joki-boost",
      badgeText: "PUSH",
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />,
      gradientBg: "from-blue-950 via-[#071330] to-[#020d26]",
      borderGlow: "border-blue-500/30 group-hover:border-blue-400",
      accentFold: "bg-blue-500/20",
    },
    {
      title: "Check Region MLBB",
      dev: "VegazStore",
      to: "/check-region",
      badgeText: "FREE",
      icon: <Globe className="w-6 h-6 sm:w-8 sm:h-8 text-sky-400" />,
      gradientBg: "from-blue-950 via-[#071330] to-[#020d26]",
      borderGlow: "border-sky-500/30 group-hover:border-sky-400",
      accentFold: "bg-sky-500/20",
    },
    {
      title: "Top Up Games",
      dev: "VegazStore",
      to: "/topup-games",
      badgeText: "INSTANT",
      icon: <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />,
      gradientBg: "from-blue-950 via-[#071330] to-[#020d26]",
      borderGlow: "border-indigo-500/30 group-hover:border-indigo-400",
      accentFold: "bg-indigo-500/20",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
      <div className="mb-4 sm:mb-6 space-y-0.5 sm:space-y-1"></div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
        {items.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className={`group relative flex flex-col justify-between rounded-2xl sm:rounded-[22px] overflow-hidden border ${item.borderGlow} shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.97] bg-gradient-to-b ${item.gradientBg}`}
          >
            <div className="p-3 sm:p-4 md:p-5 flex items-start justify-between relative z-10">
              <div className="p-2 sm:p-2.5 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300 shadow-inner">
                {item.icon}
              </div>

              <span className="text-[8px] sm:text-[9px] md:text-[10px] font-black tracking-wider uppercase px-2 py-0.5 sm:py-1 rounded-full bg-blue-500/10 border border-blue-400/20 text-cyan-300">
                {item.badgeText}
              </span>
            </div>

            <div className="relative bg-[#0d1b3e] p-3 sm:p-3.5 md:p-4 border-t border-white/10 flex flex-col justify-center min-h-[64px] sm:min-h-[72px] md:min-h-[80px]">
              <h3 className="text-xs sm:text-sm font-black text-white leading-tight line-clamp-1 uppercase tracking-tight group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-[9px] sm:text-[10px] md:text-xs text-blue-300/70 font-bold mt-0.5 line-clamp-1">
                {item.dev}
              </p>

              <div
                className={`absolute bottom-0 right-0 w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 ${item.accentFold}`}
                style={{ clipPath: "polygon(100% 0, 0 100%, 100% 100%)" }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
