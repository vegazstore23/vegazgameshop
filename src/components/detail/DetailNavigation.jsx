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
      text: `Cek akaun MLBB ini di VegazGameShop! 🔥\n${
        accountTitle ? `"${accountTitle}"\n` : ""
      }`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // User cancel share
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
    <section className="max-w-7xl mx-auto px-4 pt-3 pb-1">
      <div className="flex items-center justify-between gap-2">
        {/* Sisi Kiri: Tombol Back & Home Rapat */}
        <div className="flex items-center gap-2">
          {/* Tombol Back Panah */}
          <Link
            to="/product"
            className="group flex items-center justify-center w-10 h-10 bg-[#0d2147]/80 hover:bg-blue-600/30 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-xl shadow-md active:scale-95 flex-shrink-0"
            title={t("detail", "backToStock") || "Kembali ke Stok"}
            aria-label="Kembali ke Stok"
          >
            <ArrowLeft
              size={18}
              className="text-blue-400 group-hover:-translate-x-0.5 transition-transform duration-300"
            />
          </Link>

          {/* Tombol Home + Teks */}
          <Link
            to="/"
            className="flex items-center gap-2 h-10 px-3.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-all duration-200 text-gray-300 hover:text-white active:scale-95 shadow-md font-bold text-xs"
            title={t("detail", "home") || "Laman Utama"}
          >
            <Home size={16} className="text-gray-300" />
            <span className="whitespace-nowrap">
              {t("detail", "home") || "Laman Utama"}
            </span>
          </Link>
        </div>

        {/* Sisi Kanan: Tombol Share */}
        <button
          onClick={handleShare}
          className="h-10 px-3.5 bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 hover:text-blue-300 rounded-xl border border-blue-500/30 transition-all duration-200 active:scale-95 flex items-center gap-2 font-bold text-xs shadow-md"
          title={t("detail", "share") || "Kongsi"}
          aria-label="Kongsi Akaun"
        >
          {copied ? (
            <>
              <Check size={16} className="text-green-400 animate-in zoom-in" />
              <span className="text-green-400 text-xs font-bold whitespace-nowrap">
                Tersalin!
              </span>
            </>
          ) : (
            <>
              <Share2 size={16} />
              <span className="whitespace-nowrap">
                {t("detail", "share") || "Bagikan"}
              </span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}
