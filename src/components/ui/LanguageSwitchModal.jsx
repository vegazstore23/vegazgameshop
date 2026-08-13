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
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeUp">
      <div className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-3xl p-6 shadow-2xl overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-2xl rounded-full pointer-events-none" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <Globe size={18} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                {t("global", "tabSwitch") || "Pilih Lokasi & Bahasa"}
              </h3>
              <p className="text-[10px] text-slate-400">
                Ubah bahasa & otomatis sesuaikan mata uang
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-xl transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Options List */}
        <div className="space-y-3 relative z-10">
          {languages.map((item) => {
            const isSelected = lang === item.code;
            return (
              <button
                key={item.code}
                onClick={() => handleSelect(item.code)}
                className={`w-full p-4 rounded-2xl border flex items-center justify-between transition-all duration-200 text-left ${
                  isSelected
                    ? "bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-blue-500 text-white shadow-lg shadow-blue-500/10"
                    : "bg-slate-800/40 border-white/5 text-slate-300 hover:bg-slate-800/80 hover:border-white/15"
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl shrink-0">{item.flag}</span>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white">
                        {item.name}
                      </span>
                      <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-white/10 text-blue-300 font-mono">
                        {item.curr}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                {isSelected && (
                  <div className="w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-md">
                    <Check size={14} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer Note */}
        <p className="text-[10px] text-slate-500 text-center mt-6">
          * Konversi harga akan otomatis disesuaikan dengan rate resmi
          VegazGameShop.
        </p>
      </div>
    </div>
  );
}
