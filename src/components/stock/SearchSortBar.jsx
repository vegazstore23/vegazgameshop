import { useState, useRef, useEffect } from "react";

export default function SearchSortBar({
  setCurrentSearch,
  currentSort,
  setCurrentSort,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // BUG FIX 1: Debounce — ref untuk simpan timer ID
  const debounceRef = useRef(null);

  // BUG FIX 2: Click-outside — ref pada wrapper dropdown
  const dropdownRef = useRef(null);

  const SORT_LABELS = {
    newest: "Terbaru",
    oldest: "Terlama",
    price_asc: "Harga Terendah",
    price_desc: "Harga Tertinggi",
  };

  // BUG FIX 1: Debounce search — tunggu 450ms selepas user berhenti taip
  // sebelum hantar value ke parent (yang akan trigger API call)
  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchValue(val);

    // Batalkan timer sebelumnya kalau user masih menaip
    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(() => {
      setCurrentSearch(val);
    }, 450);
  };

  // Bersihkan timer bila komponen di-unmount (elak memory leak)
  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  // BUG FIX 2: Tutup dropdown bila klik di luar kawasan dropdown
  useEffect(() => {
    if (!dropdownOpen) return;

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };

    // Guna mousedown supaya tutup sebelum blur/focus events lain
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  // BUG FIX 3 (bonus): Clear search — kosongkan input dan trigger API semula
  const handleClearSearch = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    setSearchValue("");
    setCurrentSearch("");
  };

  /*
    Reset dilakukan dari Stock.jsx dengan mengubah prop `key` (searchSortResetKey).
    Bila key berubah, React unmount + remount komponen ini →
    searchValue & dropdownOpen reset ke nilai awal secara automatik.
  */

  return (
    <div className="flex flex-col md:flex-row gap-3 relative z-50">
      {/* Search input dengan butang clear */}
      <div className="relative flex-1">
        <input
          value={searchValue}
          placeholder="Cari kod atau tajuk akaun..."
          className="w-full bg-[#0f172a] border border-white/10 rounded-xl py-3 pl-6 pr-10 text-white outline-none focus:border-blue-500 transition-all"
          onChange={handleSearchChange}
        />
        {/* Butang ✕ hanya muncul bila ada teks dalam input */}
        {searchValue && (
          <button
            onClick={handleClearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors text-lg leading-none"
            title="Kosongkan carian"
            aria-label="Kosongkan carian"
          >
            ✕
          </button>
        )}
      </div>

      {/* Sort dropdown dengan click-outside handler */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="w-full md:w-56 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold transition flex justify-between items-center active:scale-95"
        >
          <span className="text-xs uppercase tracking-widest">
            {SORT_LABELS[currentSort] || "Susun"}
          </span>
          <span className="text-[10px]">{dropdownOpen ? "▲" : "▼"}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 left-0 md:left-auto top-14 w-full md:w-56 bg-[#1e293b] p-2 rounded-xl shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-200">
            {Object.entries(SORT_LABELS).map(([key, label]) => (
              <div
                key={key}
                onClick={() => {
                  setCurrentSort(key);
                  setDropdownOpen(false);
                }}
                className={`cursor-pointer p-3 rounded-lg text-[10px] font-bold uppercase tracking-widest transition-colors ${
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
