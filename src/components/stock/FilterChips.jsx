const TIER_LABELS = {
  entry: "Entry RM1–RM100",
  mid: "Mid RM101–RM249",
  mythic: "Mythic RM250–RM400",
  glory: "Glory RM401–RM10,000",
};

const SORT_LABELS = {
  newest: "Latest Upload",
  oldest: "Oldest Upload",
  price_asc: "Price ↑",
  price_desc: "Price ↓",
};

export default function FilterChips({
  activeTier,
  setActiveTier,
  currentSort,
  setCurrentSort,
  setCurrentMinPrice,
  setCurrentMaxPrice,
}) {
  const clearTier = () => {
    setActiveTier(null);
    setCurrentMinPrice(0);
    setCurrentMaxPrice(999999);
  };

  const clearSort = () => {
    setCurrentSort("newest");
  };

  if (!activeTier && currentSort === "newest") return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {activeTier && (
        <span className="flex items-center gap-2 bg-blue-600/50 border border-blue-400/30 px-3 py-1 rounded-full text-xs">
          Tier: {TIER_LABELS[activeTier]}
          <button
            onClick={clearTier}
            className="hover:text-red-400 font-bold ml-1"
          >
            ✕
          </button>
        </span>
      )}

      {currentSort !== "newest" && (
        <span className="flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs">
          Sort: {SORT_LABELS[currentSort]}
          <button
            onClick={clearSort}
            className="hover:text-red-400 font-bold ml-1"
          >
            ✕
          </button>
        </span>
      )}
    </div>
  );
}
