import { useState } from "react";

const SORT_LABELS = {
  newest: "Latest Upload",
  oldest: "Oldest Upload",
  price_asc: "Price ↑",
  price_desc: "Price ↓",
};

export default function SearchSortBar({
  setCurrentSearch,
  currentSort,
  setCurrentSort,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="flex gap-2 mb-2 relative">
      <input
        placeholder="Search account code or title..."
        className="w-full bg-gray-200 rounded-full py-2 px-6 text-black focus:outline-none focus:ring-2 ring-blue-400"
        onChange={(e) => setCurrentSearch(e.target.value)}
      />

      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="bg-blue-400 hover:bg-blue-500 px-6 rounded-full transition"
      >
        {SORT_LABELS[currentSort] || "Filter"}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 top-12 w-56 bg-blue-900 p-2 rounded-xl shadow-2xl z-10 border border-white/10">
          {Object.entries(SORT_LABELS).map(([key, label]) => (
            <div
              key={key}
              onClick={() => {
                setCurrentSort(key);
                setDropdownOpen(false);
              }}
              className="cursor-pointer p-3 hover:bg-white/10 rounded-lg text-sm"
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
