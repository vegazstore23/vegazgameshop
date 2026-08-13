import { Link } from "react-router-dom";

export default function PopularSection() {
  const items = [
    {
      title: "Stock Acc MLBB",
      desc: "All Stock Account MLBB by VegazStore",
      to: "/stock",
      glow: "from-cyan-500 via-blue-500 to-indigo-500",
      accentText: "text-cyan-400",
      iconBg: "from-cyan-500 to-blue-600",
      badge: "READY STOCK",
    },
    {
      title: "Check Region ID",
      desc: "Cek region account MLBB sebelum topup",
      to: "/check-region",
      glow: "from-purple-500 via-fuchsia-500 to-pink-500",
      accentText: "text-fuchsia-400",
      iconBg: "from-purple-500 to-fuchsia-600",
      badge: "FREE UTILITY",
    },
    {
      title: "Top Up Games",
      desc: "Top up diamond cepat harga berbaloi",
      to: "/topup-games",
      glow: "from-amber-400 via-orange-500 to-yellow-500",
      accentText: "text-amber-400",
      iconBg: "from-amber-500 to-orange-600",
      badge: "INSTANT PROCESS",
    },
    {
      title: "Joki Rank MLBB",
      desc: "Push rank aman oleh pro player terpercaya",
      to: "/joki-boost",
      glow: "from-red-500 via-rose-500 to-orange-500",
      accentText: "text-red-400",
      iconBg: "from-red-500 to-rose-600",
      badge: "FAST PUSH",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* grid-cols-2 untuk mobile, md:grid-cols-4 untuk desktop agar pas 4 item */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="group relative rounded-2xl p-[1px] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none"
          >
            {/* 1. Outer Neon Glow Border */}
            <div
              className={`absolute inset-0 bg-gradient-to-r ${item.glow} opacity-30 blur-sm group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
            />

            {/* 2. Main Card Container */}
            <div className="relative flex flex-col justify-between w-full h-44 p-4 md:p-5 rounded-2xl bg-slate-950/80 backdrop-blur-xl border border-white/15 group-hover:border-white/30 shadow-2xl overflow-hidden transition-all duration-300">
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 ease-in-out pointer-events-none" />

              <div className="z-10">
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-[9px] md:text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 ${item.accentText}`}
                  >
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base md:text-lg font-black tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all">
                  {item.title}
                </h3>
                <p className="text-[11px] md:text-xs text-slate-400 mt-1 line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center justify-between z-10 pt-2 border-t border-white/5">
                <span className="text-[10px] md:text-[11px] font-bold tracking-wider text-slate-400 group-hover:text-white transition-colors">
                  EXPLORE NOW
                </span>

                <div
                  className={`w-7 h-7 md:w-8 md:h-8 rounded-xl bg-gradient-to-tr ${item.iconBg} flex items-center justify-center shadow-md group-hover:scale-110 group-hover:translate-x-1 transition-all duration-300`}
                >
                  <svg
                    className="w-3.5 h-3.5 md:w-4 md:h-4 text-white fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
