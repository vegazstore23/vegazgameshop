import React from "react";
import { useLangCurr } from "../context/LanguageCurrencyContext";
import { X, Check, Globe } from "lucide-react";

export default function LanguageSwitchModal({ isOpen, onClose }) {
  const { lang, setLang, t } = useLangCurr();

  if (!isOpen) return null;

  const languages = [
    {
      code: "MY",
      name: "Malaysia",
      curr: "MYR (RM)",
      flag: "🇲🇾",
      desc: "Bahasa Melayu & Ringgit Malaysia",
    },
    {
      code: "ID",
      name: "Indonesia",
      curr: "IDR (Rp)",
      flag: "🇮🇩",
      desc: "Bahasa Indonesia & Rupiah",
    },
    {
      code: "EN",
      name: "Global / English",
      curr: "USD ($)",
      flag: "🌐",
      desc: "English & US Dollar / USDT",
    },
  ];

  const handleSelect = (code) => {
    setLang(code);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm bg-[#0f172a] border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient Glow Subtle Accent */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-blue-600/15 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-cyan-600/10 blur-3xl rounded-full pointer-events-none" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-3.5 border-b border-white/5 mb-4 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white uppercase tracking-wider">
                {t("global", "tabSwitch") || "Pilih Wilayah & Bahasa"}
              </h3>
              <p className="text-[10px] text-slate-400">
                Ubah mata uang dan penyesuaian bahasa
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-150 active:scale-90"
            aria-label="Tutup Modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-2.5 relative z-10">
          {languages.map((item) => {
            const isSelected = lang === item.code;
            return (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`w-full p-3.5 rounded-2xl border flex items-center justify-between transition-all duration-200 text-left active:scale-[0.98] ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-900/30 to-slate-800/80 border-blue-500/80 text-white shadow-[0_4px_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/30"
                    : "bg-slate-900/60 border-white/5 text-slate-300 hover:bg-slate-800/60 hover:border-white/10"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  {/* Bendera dibuat lebih tajam & mencolok */}
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl shrink-0 shadow-inner">
                    {item.flag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">
                        {item.name}
                      </span>
                      <span
                        className={`text-[9px] font-extrabold px-2 py-0.5 rounded-md border ${
                          isSelected
                            ? "bg-blue-500/20 border-blue-400/30 text-blue-300"
                            : "bg-white/5 border-white/10 text-slate-400"
                        }`}
                      >
                        {item.curr}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-[0_0_10px_rgba(59,130,246,0.6)] animate-in zoom-in duration-150">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="mt-5 pt-3 border-t border-white/5 text-center">
          <p className="text-[10px] text-slate-500 leading-relaxed">
            * Penyesuaian mata uang menggunakan kurs resmi VegazGameShop.
          </p>
        </div>
      </div>
    </div>
  );
}
