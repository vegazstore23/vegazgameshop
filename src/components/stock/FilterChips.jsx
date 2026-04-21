const TIER_LABELS = {
  entry: "Entry RM1–RM100",
  mid: "Mid RM101–RM249",
  mythic: "Mythic RM250–RM400",
  glory: "Glory RM401–RM10,000",
};

const SORT_LABELS = {
  newest: "Terbaru",
  oldest: "Terlama",
  price_asc: "Harga Terendah",
  price_desc: "Harga Tertinggi",
};

export default function FilterChips({
  activeTier,
  onClearTier,
  currentSort,
  onClearSort,
}) {
  // FIX: Default sort kini "newest" (sama dengan Stock.jsx)
  // Chip hanya muncul bila ada tier aktif ATAU sort bukan "newest"
  if (!activeTier && currentSort === "newest") return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {activeTier && (
        <span className="bg-blue-600/50 border border-blue-400/30 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase flex items-center gap-2">
          Tier: {TIER_LABELS[activeTier]}
          <button
            onClick={onClearTier}
            className="hover:text-red-400 transition-colors"
            title="Buang penapis tier"
          >
            ✕
          </button>
        </span>
      )}

      {/* Chip sort muncul hanya bila sort bukan default "newest" */}
      {currentSort !== "newest" && (
        <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase flex items-center gap-2">
          Susun: {SORT_LABELS[currentSort]}
          <button
            onClick={onClearSort}
            className="hover:text-red-400 transition-colors"
            title="Tetapkan semula susunan"
          >
            ✕
          </button>
        </span>
      )}
    </div>
  );
}
