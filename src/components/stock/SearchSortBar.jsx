import { useState } from "react";

export default function SearchSortBar({
  setCurrentSearch,
  currentSort,
  setCurrentSort,
}) {
  const [searchValue, setSearchValue] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const SORT_LABELS = {
    newest: "Terbaru",
    oldest: "Terlama",
    price_asc: "Harga Terendah",
    price_desc: "Harga Tertinggi",
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentSearch(e.target.value);
  };

  /*
    Reset dilakukan dari Stock.jsx dengan mengubah prop `key` (searchSortResetKey).
    Bila key berubah, React unmount + remount komponen ini →
    searchValue & dropdownOpen reset ke nilai awal secara automatik.
  */

  return (
    <div className="flex flex-col md:flex-row gap-3 relative z-50">
      <input
        value={searchValue}
        placeholder="Cari kod atau tajuk akaun..."
        className="flex-1 bg-[#0f172a] border border-white/10 rounded-xl py-3 px-6 text-white outline-none focus:border-blue-500 transition-all"
        onChange={handleSearchChange}
      />

      <div className="relative">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
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
