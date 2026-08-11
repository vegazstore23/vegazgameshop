import { useLangCurr } from "../context/LanguageCurrencyContext";

export default function FilterChips({
  activeTier,
  onClearTier,
  currentSort,
  onClearSort,
}) {
  const { t } = useLangCurr();

  const TIER_LABELS = {
    entry: "Entry RM1–RM100",
    mid: "Mid RM101–RM249",
    mythic: "Mythic RM250–RM400",
    glory: "Glory RM401–RM10,000",
  };

  const SORT_LABELS = {
    newest: t("stock", "sortNewest") || "Terbaru",
    oldest: t("stock", "sortOldest") || "Terlama",
    price_asc: t("stock", "sortPriceAsc") || "Harga Terendah",
    price_desc: t("stock", "sortPriceDesc") || "Harga Tertinggi",
  };

  if (!activeTier && currentSort === "newest") return null;

  return (
    <div className="flex flex-wrap gap-2 mt-4">
      {activeTier && (
        <span className="bg-blue-600/50 border border-blue-400/30 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase flex items-center gap-2">
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
        <span className="bg-white/10 border border-white/20 px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase flex items-center gap-2">
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
