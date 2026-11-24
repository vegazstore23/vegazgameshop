import { useLangCurr } from "../context/LanguageCurrencyContext";

export default function FilterChips({
  activeTier,
  onClearTier,
  currentSort,
  onClearSort,
}) {
  const { t, formatPrice, rateMYR } = useLangCurr();

  const TIER_LABELS = {
    entry: `Entry ${formatPrice(1 * rateMYR)}–${formatPrice(100 * rateMYR)}`,
    mid: `Mid ${formatPrice(101 * rateMYR)}–${formatPrice(249 * rateMYR)}`,
    mythic: `Mythic ${formatPrice(250 * rateMYR)}–${formatPrice(400 * rateMYR)}`,
    glory: `Glory ${formatPrice(401 * rateMYR)}–${formatPrice(10000 * rateMYR)}`,
  };

  const SORT_LABELS = {
    newest: t("stock", "sortNewest") || "Terbaru",
    oldest: t("stock", "sortOldest") || "Terlama",
    price_asc: t("stock", "sortPriceAsc") || "Harga Terendah",
    price_desc: t("stock", "sortPriceDesc") || "Harga Tertinggi",
  };

  if (!activeTier && currentSort === "newest") return null;

  return (
    <div className="flex flex-wrap gap-1.5 mt-1.5 sm:mt-2">
      {activeTier && (
        <span className="bg-blue-600/50 border border-blue-400/30 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold text-white uppercase flex items-center gap-1.5">
          Tier: {TIER_LABELS[activeTier]}
          <button
            onClick={onClearTier}
            className="hover:text-red-400 transition-colors"
            title={t("stock", "clearTier") || "Hapus filter tier"}
          >
            ✕
          </button>
        </span>
      )}

      {currentSort !== "newest" && (
        <span className="bg-white/10 border border-white/20 px-2.5 py-0.5 rounded-full text-[9px] sm:text-[10px] font-bold text-white uppercase flex items-center gap-1.5">
          {t("stock", "sortLabel") || "Susun"}: {SORT_LABELS[currentSort]}
          <button
            onClick={onClearSort}
            className="hover:text-red-400 transition-colors"
            title={t("stock", "clearSort") || "Reset susunan"}
          >
            ✕
          </button>
        </span>
      )}
    </div>
  );
}
