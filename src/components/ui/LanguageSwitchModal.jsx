import React, { useEffect, useState } from "react";
import { useLangCurr } from "../context/LanguageCurrencyContext";
import { X, Check } from "lucide-react";

function FlagMY() {
  return (
    <svg
      viewBox="0 0 36 24"
      className="w-full h-full object-cover"
      aria-hidden="true"
    >
      <rect width="36" height="24" fill="#FFFFFF" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect
          key={i}
          y={(i * 24) / 14}
          width="36"
          height={24 / 14}
          fill="#CC0001"
        />
      ))}
      <rect width="18" height={(8 * 24) / 14} fill="#010066" />
      <circle cx="7.4" cy="6.8" r="4.1" fill="#FFCC00" />
      <circle cx="8.7" cy="6.8" r="3.4" fill="#010066" />
      <polygon
        points="12.2,3.5 13.0,5.6 15.2,5.6 13.4,6.9 14.1,9.0 12.2,7.7 10.3,9.0 11.0,6.9 9.2,5.6 11.4,5.6"
        fill="#FFCC00"
      />
    </svg>
  );
}

function FlagID() {
  return (
    <svg
      viewBox="0 0 36 24"
      className="w-full h-full object-cover"
      aria-hidden="true"
    >
      <rect width="36" height="12" fill="#CE1126" />
      <rect y="12" width="36" height="12" fill="#FFFFFF" />
    </svg>
  );
}

function FlagUS() {
  return (
    <svg
      viewBox="0 0 36 24"
      className="w-full h-full object-cover"
      aria-hidden="true"
    >
      <rect width="36" height="24" fill="#FFFFFF" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect
          key={i}
          y={(i * 24) / 13}
          width="36"
          height={24 / 13}
          fill="#B22234"
        />
      ))}
      <rect width="15.5" height={(7 * 24) / 13} fill="#3C3B6E" />
      {[2.5, 5.2, 7.9, 10.6].map((cy, rIdx) =>
        [2.6, 5.4, 8.2, 11.0, 13.4].map((cx, cIdx) => (
          <circle
            key={`${rIdx}-${cIdx}`}
            cx={cx}
            cy={cy}
            r="0.55"
            fill="#FFFFFF"
          />
        )),
      )}
    </svg>
  );
}

const REGIONS = [
  {
    code: "MY",
    name: "Malaysia",
    curr: "MYR · RM",
    desc: "Bahasa Melayu & Ringgit Malaysia",
    Flag: FlagMY,
  },
  {
    code: "ID",
    name: "Indonesia",
    curr: "IDR · Rp",
    desc: "Bahasa Indonesia & Rupiah",
    Flag: FlagID,
  },
  {
    code: "EN",
    name: "Global / US",
    curr: "USD · $",
    desc: "English & US Dollar",
    Flag: FlagUS,
  },
];

export default function LanguageSwitchModal({ isOpen, onClose }) {
  const { lang, setLang, t } = useLangCurr();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setVisible(false);
      return;
    }
    const raf = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(raf);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelect = (code) => {
    setLang(code);
    setTimeout(() => {
      onClose();
    }, 140);
  };

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm transition-opacity duration-200 ease-out ${
        visible ? "opacity-100" : "opacity-0"
      }`}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-sm bg-[#0f172a] border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          visible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-[0.97]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              {t("global", "tabSwitch") || "Pilih Wilayah & Mata Uang"}
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {t("global", "tabSwitchDesc") ||
                "Sesuaikan bahasa dan tampilan harga"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-150 active:scale-90"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Region Options */}
        <div className="space-y-2">
          {REGIONS.map(({ code, name, curr, desc, Flag }) => {
            const isSelected = lang === code;
            return (
              <button
                key={code}
                type="button"
                onClick={() => handleSelect(code)}
                className={`group w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] ${
                  isSelected
                    ? "bg-slate-800/90 border-blue-500/70 text-white"
                    : "bg-[#020617]/60 border-slate-800/90 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-7 rounded-md overflow-hidden border border-white/10 shrink-0 transition-transform duration-300 ease-out group-hover:scale-105">
                    <Flag />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs sm:text-[13px] text-white truncate">
                        {name}
                      </span>
                      <span
                        className={`text-[10px] font-semibold px-1.5 py-0.5 rounded transition-colors duration-200 ${
                          isSelected
                            ? "bg-blue-500/15 text-blue-300"
                            : "bg-slate-800 text-slate-400 group-hover:text-slate-300"
                        }`}
                      >
                        {curr}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {desc}
                    </p>
                  </div>
                </div>

                <div
                  className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 transition-all duration-200 ease-out ${
                    isSelected
                      ? "bg-blue-500 text-white scale-100 opacity-100"
                      : "bg-slate-800/80 text-transparent scale-75 opacity-0 group-hover:opacity-40"
                  }`}
                >
                  <Check size={12} strokeWidth={3} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <p className="mt-4 pt-3 border-t border-slate-800/80 text-center text-[10px] text-slate-500">
          {t("global", "tabSwitchFooter") ||
            "Konversi harga mengikuti kurs aktif VegazGameShop."}
        </p>
      </div>
    </div>
  );
}
