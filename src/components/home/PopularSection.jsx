import { Link } from "react-router-dom";
import { useLangCurr } from "../context/LanguageCurrencyContext";

export default function PopularSection() {
  const { t } = useLangCurr();

  const menuItems = [
    {
      title: t("popular", "buyTitle") || "Beli Akun",
      subtitle: t("popular", "buyDesc") || "Stok Akun MLBB Ready & Aman",
      to: "/product",
      style: "bg-[#112240] border-blue-500/80 hover:bg-[#162b52]",
    },
    {
      title: t("popular", "sellTitle") || "Jual Akun",
      subtitle: t("popular", "sellDesc") || "Titip Jual & Jual Cepat Via Chat",
      to: "https://linktr.ee/vegazgameshop",
      style: "bg-[#421616] border-red-500/80 hover:bg-[#521c1c]",
    },
    {
      title: t("popular", "topupTitle") || "Top Up Games",
      subtitle: t("popular", "topupDesc") || "Diamond & WDP Proses Instan",
      to: "/topup-games",
      style: "bg-[#2b1340] border-purple-500/80 hover:bg-[#371952]",
    },
    {
      title: t("popular", "jokiTitle") || "Joki Rank MLBB",
      subtitle: t("popular", "jokiDesc") || "Push Rank Cepat & Terpercaya",
      to: "/joki-boost",
      style: "bg-[#12381d] border-emerald-500/80 hover:bg-[#174725]",
    },
    {
      title: t("popular", "regionTitle") || "Check Region",
      subtitle: t("popular", "regionDesc") || "Cek ID & Server Akun Gratis",
      to: "/check-region",
      style: "bg-[#3f3312] border-amber-500/80 hover:bg-[#4f4017]",
    },
    {
      title: t("popular", "calcTitle") || "Calculator MLBB",
      subtitle:
        t("popular", "calcDesc") || "Hitung Winrate, Zodiac & Magic Wheel",
      to: "/calculator-mlbb",
      style: "bg-[#2d3812] border-lime-500/80 hover:bg-[#394717]",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {menuItems.map((item, i) => {
          const isExternal = item.to.startsWith("http");
          const cardClass = `h-full flex flex-col justify-center rounded-xl border px-4 py-5 sm:px-5 sm:py-6 min-h-[92px] sm:min-h-[104px] transition-colors duration-150 active:opacity-80 ${item.style}`;

          const content = (
            <>
              <h3 className="text-[15px] sm:text-lg font-black text-white uppercase tracking-tight leading-tight">
                {item.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-white/80 font-medium leading-snug mt-1">
                {item.subtitle}
              </p>
            </>
          );

          return isExternal ? (
            <a
              key={i}
              href={item.to}
              target="_blank"
              rel="noopener noreferrer"
              className={cardClass}
            >
              {content}
            </a>
          ) : (
            <Link key={i} to={item.to} className={cardClass}>
              {content}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
