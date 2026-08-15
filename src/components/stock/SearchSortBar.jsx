import { useState, useRef, useEffect } from "react";
import { useLangCurr } from "../context/LanguageCurrencyContext";

export default function SearchSortBar({
  setCurrentSearch,
  currentSort,
  setCurrentSort,
}) {
  const { t } = useLangCurr();
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const debounceRef = useRef(null);
  const dropdownRef = useRef(null);

  const SORT_LABELS = {
    newest: t("stock", "sortNewest") || "Terbaru",
    oldest: t("stock", "sortOldest") || "Terlama",
    price_asc: t("stock", "sortPriceAsc") || "Harga Terendah",
    price_desc: t("stock", "sortPriceDesc") || "Harga Tertinggi",
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setCurrentSearch(val);
    }, 450);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleClearSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchValue("");
    setCurrentSearch("");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 md:gap-3 relative z-50 mt-3">
      {/* Search Input */}
      <div className="relative flex-1">
        <input
          value={searchValue}
          placeholder={
            t("stock", "searchPlaceholder") || "Cari kod atau tajuk akaun..."
          }
          className="w-full bg-[#0f172a] border border-white/10 rounded-xl py-2.5 px-4 pr-10 text-white outline-none focus:border-blue-500 transition-all text-xs md:text-sm"
          onChange={handleSearchChange}
        />
        {searchValue && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors text-base leading-none p-1"
            title={t("stock", "clearSearch") || "Kosongkan carian"}
            aria-label="Kosongkan carian"
          >
            ✕
          </button>
        )}
      </div>

      {/* Dropdown Sort Button */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full sm:w-48 md:w-56 bg-blue-800 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold transition flex justify-between items-center active:scale-95 shadow-md"
        >
          <span className="text-[11px] md:text-xs uppercase tracking-wider truncate">
            {SORT_LABELS[currentSort] || t("stock", "sortLabel") || "Susun"}
          </span>
          <span className="text-[10px] ml-2">{dropdownOpen ? "▲" : "▼"}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 left-0 sm:left-auto top-12 w-full sm:w-56 bg-[#1e293b] p-1.5 rounded-xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-150 z-50">
            {Object.entries(SORT_LABELS).map(([key, label]) => (
              <div
                key={key}
                onClick={() => {
                  setCurrentSort(key);
                  setDropdownOpen(false);
                }}
                className={`cursor-pointer p-2.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-colors ${
                  currentSort === key
                    ? "bg-blue-600 text-white"
                    : "hover:bg-white/5 text-gray-400"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
