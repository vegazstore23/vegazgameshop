import React, { useState } from "react";
import { Gamepad2, Flame, Monitor, Ticket } from "lucide-react";
import BannerSlider from "./BannerSlider";
import { useLangCurr } from "../context/LanguageCurrencyContext";

const PUBLISHER_MAP = {
  // Mobile Games & Popular
  "mobile legends": "Moonton",
  mlbb: "Moonton",
  "free fire": "Garena",
  ff: "Garena",
  pubg: "Tencent Games",
  "pubg mobile": "Tencent Games",
  roblox: "Roblox Corporation",
  "genshin impact": "COGNOSPHERE / HoYoverse",
  honkai: "COGNOSPHERE / HoYoverse",
  "zenless zone zero": "COGNOSPHERE / HoYoverse",
  zzz: "COGNOSPHERE / HoYoverse",
  "honor of kings": "Tencent Games",
  hok: "Tencent Games",
  "arena breakout": "Proxima Beta",
  "point blank": "Zepetto",
  valorant: "Riot Games",
  "league of legends": "Riot Games",
  "wild rift": "Riot Games",
  "call of duty": "Activision / Garena",
  codm: "Activision / Garena",
  "stumble guys": "Scopely",
  "magic chess": "Moonton",
  undawn: "Level Infinite",
  "ea sports fc": "Electronic Arts",
  efootball: "Konami",
  pes: "Konami",
  "brawl stars": "Supercell",
  "clash of clans": "Supercell",
  "clash royale": "Supercell",
  "hay day": "Supercell",
  "omega strikers": "Odyssey Interactive",
  ragnarok: "Gravity",
  "sausage man": "XD Entertainment",
  lifeafter: "NetEase",
  "identity v": "NetEase",
  naraka: "NetEase",
  badlanders: "NetEase",
  "hyper front": "NetEase",

  steam: "Valve",
  "google play": "Google",
  spotify: "Spotify AB",
  netflix: "Netflix",
  vidio: "Vidio",
  viu: "Viu",
  iqiyi: "iQIYI",
  bilibili: "Bilibili",
  wetv: "Tencent",
  playstation: "Sony",
  xbox: "Microsoft",
  nintendo: "Nintendo",
  minecraft: "Mojang / Microsoft",
  garena: "Garena",
  Unipin: "UniPin",
  gemscool: "Gemscool",
};

const getGameDeveloper = (brandName = "") => {
  const name = brandName.toLowerCase().trim();

  for (const key in PUBLISHER_MAP) {
    if (name.includes(key)) {
      return PUBLISHER_MAP[key];
    }
  }

  return "Official Publisher";
};

const TAB_CATEGORIES = [
  { id: "topup_games", label: "Top Up Games", icon: <Gamepad2 size={14} /> },
  { id: "mlbb", label: "Specialist MLBB", icon: <Flame size={14} /> },
  { id: "roblox", label: "Specialist Roblox", icon: <Flame size={14} /> },
  { id: "freefire", label: "Specialist Free Fire", icon: <Flame size={14} /> },
  { id: "pubgm", label: "Specialist PUBGM", icon: <Flame size={14} /> },
  {
    id: "mcgogo",
    label: "Specialist Magic Chess : Go Go",
    icon: <Flame size={14} />,
  },
  { id: "streaming", label: "Streaming", icon: <Monitor size={14} /> },
  { id: "voucher", label: "Voucher", icon: <Ticket size={14} /> },
];

const CatalogView = ({ brands, onSelectGame, activeTab, setActiveTab }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { t } = useLangCurr();

  const popularBrands = brands.filter(
    (brand) => brand.isPopular && brand.regionConfig?.id?.isActive !== false,
  );

  const getFilteredBrands = () => {
    if (!brands || brands.length === 0) return [];

    return brands.filter((brand) => {
      const config = brand.regionConfig?.id || {
        isActive: true,
        categories: ["topup_games"],
      };
      if (config.isActive === false) return false;

      const matchesSearch = brand.brandName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      if (!matchesSearch) return false;

      if (activeTab === "topup_games") return true;

      return config.categories?.includes(activeTab);
    });
  };

  const currentFilteredBrands = getFilteredBrands();

  return (
    <div className="w-full min-h-screen text-slate-100 antialiased font-sans pb-24 bg-[#121318]">
      <div className="max-w-7xl mx-auto px-4 pt-2 space-y-8">
        <div className="rounded-2xl overflow-hidden border border-slate-800/80 shadow-2xl">
          <BannerSlider />
        </div>

        {/* SECTION 1: POPULER SEKARANG! (Mobile: 2 baris / 2 kolom, Desktop: 3 kolom) */}
        {popularBrands.length > 0 &&
          activeTab === "topup_games" &&
          !searchTerm && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🔥</span>
                <div>
                  <h2 className="text-base font-black text-white tracking-wide uppercase">
                    {t("topup", "popularTitle")}
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    {t("topup", "popularDesc")}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {popularBrands.slice(0, 6).map((brand) => (
                  <div
                    key={`popular-${brand.brandName}`}
                    onClick={() => onSelectGame(brand)}
                    className="group relative h-28 sm:h-32 rounded-2xl overflow-hidden cursor-pointer border border-slate-800 hover:border-yellow-400/80 transition-all duration-300 shadow-lg hover:shadow-yellow-400/10 hover:-translate-y-0.5"
                  >
                    <img
                      src={
                        brand.bannerUrl ||
                        brand.iconUrl ||
                        "https://placehold.co/600x300"
                      }
                      alt={brand.brandName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                    <div className="absolute bottom-0 inset-x-0 bg-yellow-400 text-slate-950 px-3 py-1.5 sm:px-4 sm:py-2 flex items-center justify-between font-bold">
                      <span className="text-xs sm:text-sm font-extrabold truncate max-w-[70%]">
                        {brand.brandName}
                      </span>
                      <span className="text-[10px] opacity-80 truncate">
                        {getGameDeveloper(brand.brandName)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* TAB NAVIGASI SPESIALIS */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800/80">
          {TAB_CATEGORIES.map((cat) => {
            const isActive = activeTab === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? "bg-yellow-400 text-slate-950 font-black shadow-lg shadow-yellow-400/20 scale-105"
                    : "bg-slate-900/80 text-slate-400 hover:bg-slate-800 hover:text-white border border-slate-800"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="flex justify-between items-center gap-4">
          <div className="w-full sm:w-72 ml-auto">
            <input
              type="text"
              placeholder={t("topup", "searchPlaceholder")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white focus:border-yellow-400 outline-none transition-colors"
            />
          </div>
        </div>

        {/* GRID KATALOG UTAMA (Mobile: 3 baris / 3 kolom, md: 4, lg: 6) */}
        {currentFilteredBrands.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {currentFilteredBrands.map((brand) => (
              <div
                key={brand.brandName}
                onClick={() => onSelectGame(brand)}
                className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 hover:border-yellow-400/80 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-yellow-400/10 hover:-translate-y-1"
                style={{ aspectRatio: "302 / 402" }}
              >
                {brand.isPopular && (
                  <div className="absolute top-2 right-2 z-20 px-2 py-0.5 bg-yellow-400 text-slate-950 text-[9px] font-black rounded uppercase shadow-md">
                    HOT
                  </div>
                )}

                <img
                  src={
                    brand.iconUrl ||
                    brand.bannerUrl ||
                    "https://placehold.co/302x402"
                  }
                  alt={brand.brandName}
                  className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3.5 z-10">
                  <p className="text-xs sm:text-sm font-black text-white line-clamp-1 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    {brand.brandName}
                  </p>
                  <p className="text-[10px] font-bold text-yellow-400 tracking-wider uppercase opacity-90 line-clamp-1 mt-0.5">
                    {getGameDeveloper(brand.brandName)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 max-w-md mx-auto">
            <Gamepad2
              size={40}
              className="mx-auto mb-3 text-slate-600 animate-pulse"
            />
            <p className="text-slate-400 text-xs font-medium">
              {t("topup", "noGameFound")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogView;
