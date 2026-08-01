import React, { useState, useEffect } from "react";
import { Gamepad2, Sparkles, Loader2 } from "lucide-react";
import BannerSlider from "./BannerSlider";
import { apiGet } from "../../services/api";

const GAMORA_CATEGORIES = [
  { id: "popular", label: "🔥 Lagi Populer" },
  { id: "voucher", label: "Voucher" },
  { id: "direct", label: "Top Up Langsung" },
  { id: "new", label: "☀️ Baru Rilis" },
];

const CatalogView = ({ onSelectGame, activeTab }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGamoraCat, setSelectedGamoraCat] = useState("popular");
  const [expandedCategories, setExpandedCategories] = useState({});

  // 1. Fetch Brand/Game langsung dari Backend Admin
  useEffect(() => {
    async function fetchCatalogBrands() {
      setLoading(true);
      try {
        const res = await apiGet("/api/topup/brands");
        // Mengakomodasi jika res.data berbentuk array atau objek
        const fetchedBrands = Array.isArray(res) ? res : res?.data || [];
        setBrands(fetchedBrands);
      } catch (err) {
        console.error("Gagal load catalog brands:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchCatalogBrands();
  }, []);

  const toggleExpand = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // Filter Brand berdasarkan Kategori & Tab Regional (Indonesia / Malaysia)
  const getFilteredBrandsByCat = (gamoraCatId) => {
    if (!brands || brands.length === 0) return [];

    return brands.filter((brand) => {
      // Bawaan regional check jika ada di DB
      const isIndonesia = activeTab === "indonesia" || !activeTab;
      const isRegionMatch = isIndonesia
        ? (brand.isIndonesiaActive ?? true)
        : (brand.isMalaysiaActive ?? false);

      if (!isRegionMatch) return false;

      const brandCat = (brand.category || "popular").toLowerCase();

      if (gamoraCatId === "popular") {
        return brand.isPopular || brandCat === "popular" || brandCat === "game";
      }
      return brandCat === gamoraCatId.toLowerCase();
    });
  };

  return (
    <div className="w-full min-h-screen text-slate-100 antialiased font-sans pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        {/* Banner Slider */}
        <div className="mb-8">
          <BannerSlider />
        </div>

        {/* Tab Kategori Kapsul */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 mb-10 pb-6 border-b border-slate-800/80">
          {GAMORA_CATEGORIES.map((cat) => {
            const isActive = selectedGamoraCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedGamoraCat(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-300 ${
                  isActive
                    ? "bg-purple-600/20 text-purple-400 border-purple-500/50 shadow-lg shadow-purple-500/10 font-bold scale-105"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Content catalog */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500 gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
            <p className="text-xs font-mono uppercase tracking-wider">
              Loading produk dari database...
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {brands.length > 0 ? (
              GAMORA_CATEGORIES.map((cat) => {
                if (
                  selectedGamoraCat !== "popular" &&
                  selectedGamoraCat !== cat.id
                ) {
                  return null;
                }

                const currentBrands = getFilteredBrandsByCat(cat.id);
                if (currentBrands.length === 0) return null;

                const isExpanded = expandedCategories[cat.id];
                const displayedBrands = isExpanded
                  ? currentBrands
                  : currentBrands.slice(0, 6);
                const hasMoreThanLimit = currentBrands.length > 6;

                return (
                  <section key={cat.id} className="w-full">
                    <div className="flex items-center gap-2 mb-5">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <h2 className="text-lg font-bold text-white tracking-tight">
                        {cat.label}
                      </h2>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                      {displayedBrands.map((brand) => (
                        <div
                          key={brand.id || brand.brandName}
                          onClick={() => onSelectGame(brand)}
                          className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-3.5 text-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10 hover:border-purple-500/40 hover:-translate-y-1 group flex flex-col items-center justify-between min-h-[150px] backdrop-blur-sm"
                        >
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden mb-3 bg-slate-800/50 border border-white/5 group-hover:scale-105 transition-transform duration-300 shadow-md flex items-center justify-center shrink-0">
                            <img
                              src={
                                brand.iconUrl ||
                                brand.image ||
                                "https://placehold.co/150"
                              }
                              alt={brand.brandName || brand.name}
                              className="w-full h-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <p className="text-xs font-semibold text-slate-300 group-hover:text-purple-400 transition-colors line-clamp-2 px-1 w-full text-center">
                            {brand.brandName || brand.name}
                          </p>
                        </div>
                      ))}
                    </div>

                    {hasMoreThanLimit && (
                      <div className="text-center mt-6">
                        <button
                          onClick={() => toggleExpand(cat.id)}
                          className="text-xs font-bold text-purple-400 hover:text-purple-300 transition-colors bg-purple-500/10 hover:bg-purple-500/20 px-5 py-2.5 rounded-xl border border-purple-500/20"
                        >
                          {isExpanded
                            ? "Sembunyikan"
                            : "Tampilkan lebih banyak"}
                        </button>
                      </div>
                    )}
                  </section>
                );
              })
            ) : (
              <div className="text-center py-16 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 max-w-md mx-auto my-8">
                <Gamepad2
                  size={40}
                  className="mx-auto mb-3 text-slate-600 animate-pulse"
                />
                <h4 className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                  BELUM ADA PRODUK DI DATABASE
                </h4>
                <p className="text-slate-500 text-xs mt-1.5 px-6 leading-relaxed">
                  Tambahkan brand / game dari Admin Dashboard terlebih dahulu.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogView;
