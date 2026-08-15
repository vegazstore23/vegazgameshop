import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Share2, Check } from "lucide-react";
import { useLangCurr } from "../context/LanguageCurrencyContext";

export default function DetailNavigation({ accountTitle = "" }) {
  const { t } = useLangCurr();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: accountTitle || "Akaun MLBB VegazGameShop",
      text: `Cek akaun MLBB ini di VegazGameShop! 🔥\n${accountTitle ? `"${accountTitle}"\n` : ""}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
      }
    } else {
       try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Gagal menyalin link:", err);
      }
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 mb-1 sm:mb-2">
      <div className="flex items-center justify-between gap-2.5 sm:gap-3">
        {/* Sisi Kiri: Tombol Back & Home */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Tombol Kembali ke Stok */}
          <Link
            to="/stock"
            className="group flex items-center gap-2.5 sm:gap-3 bg-[#0d2147]/80 hover:bg-blue-600/30 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-xl shadow-lg active:scale-95"
          >
            <ArrowLeft
              size={18}
              className="text-blue-400 group-hover:-translate-x-1 transition-transform duration-300 flex-shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-[9px] text-blue-300/80 font-bold uppercase tracking-wider leading-none mb-0.5">
                {t("detail", "backTo") || "Kembali ke"}
              </span>
              <span className="text-white font-extrabold text-xs uppercase tracking-tight leading-none">
                {t("detail", "stockList") || "Stok Akaun"}
              </span>
            </div>
          </Link>

          {/* Tombol Home */}
          <Link
            to="/"
            className="p-2.5 sm:p-3 bg-white/5 hover:bg-white/10 rounded-xl sm:rounded-2xl border border-white/10 transition-all duration-200 text-gray-300 hover:text-white active:scale-95 flex items-center justify-center shadow-md"
            title={t("detail", "home") || "Laman Utama"}
            aria-label="Laman Utama"
          >
            <Home size={18} />
          </Link>
        </div>

        {/* Sisi Kanan: Tombol Share */}
        <button
          onClick={handleShare}
          className="relative px-3.5 sm:px-4 py-2.5 sm:py-3 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-xl sm:rounded-2xl border border-blue-500/30 transition-all duration-200 active:scale-95 flex items-center gap-2 font-bold text-xs shadow-md"
          title={t("detail", "share") || "Kongsi"}
          aria-label="Kongsi Akaun"
        >
          {copied ? (
            <>
              <Check size={18} className="text-green-400 animate-in zoom-in" />
              <span className="text-green-400 text-xs font-bold hidden sm:inline">
                Tersalin!
              </span>
            </>
          ) : (
            <>
              <Share2 size={18} />
              <span className="hidden sm:inline font-bold text-xs">
                {t("detail", "share") || "Kongsi"}
              </span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
