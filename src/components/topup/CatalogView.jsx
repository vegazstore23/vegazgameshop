import React, { useState } from "react";
import { Gamepad2 } from "lucide-react";
import BannerSlider from "./BannerSlider";

// Definisikan tab kategori kapsul oval persis ala Gamora
const GAMORA_CATEGORIES = [
  { id: "popular", label: "🔥 Lagi Populer" },
  { id: "voucher", label: "Voucher" },
  { id: "direct", label: "Top Up Langsung" },
  { id: "new", label: "☀️ Baru Rilis" },
  { id: "login", label: "Top Up Login" },
  { id: "pulsa", label: "Pulsa" },
  { id: "entertainment", label: "Entertainment" },
];

function parseRegionConfig(brand) {
  if (brand.regionConfig && typeof brand.regionConfig === "object") {
    return {
      id: {
        isActive: brand.regionConfig.id?.isActive ?? true,
        categories: brand.regionConfig.id?.categories ?? ["mobile"],
      },
      my: {
        isActive: brand.regionConfig.my?.isActive ?? false,
        categories: brand.regionConfig.my?.categories ?? ["mobile"],
      },
    };
  }
  return { id: { isActive: !!brand.isActive, categories: ["mobile"] } };
}

const CatalogView = ({
  brands,
  onSelectGame,
  hasDataLoaded,
  nonPopularBrands,
  activeCategory,
  activeTab,
}) => {
  // State internal untuk navigasi klik kapsul menu Gamora
  const [selectedGamoraCat, setSelectedGamoraCat] = useState("popular");

  // State untuk melacak kategori mana saja yang sedang di-expand (Tampilkan lebih banyak)
  const [expandedCategories, setExpandedCategories] = useState({});

  // Toggle buka/tutup limit item game
  const toggleExpand = (catId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId],
    }));
  };

  // ==========================================
  // LOGIKA ASLI LU: Memfilter data berdasarkan tab regional & kategori
  // ==========================================
  const getFilteredBrandsByCat = (gamoraCatId) => {
    const targetSource = nonPopularBrands || brands; // Fallback aman jika nonPopularBrands kosong
    if (!targetSource || targetSource.length === 0) return [];

    return targetSource.filter((brand) => {
      const rc = parseRegionConfig(brand);
      const cats =
        activeTab === "indonesia" ? rc.id.categories : rc.my.categories;

      if (gamoraCatId === "popular") {
        // Game masuk populer kalau ada tag 'popular' atau default 'mobile'
        return cats?.includes("popular") || cats?.includes("mobile");
      }
      // Menyesuaikan lowercase agar tidak sensitif huruf besar/kecil dari DB lu
      return (
        cats?.includes(gamoraCatId) ||
        brand.category?.toLowerCase() === gamoraCatId
      );
    });
  };

  // Cek apakah ada data sama sekali yang bisa ditampilkan
  const isDataEmpty = !brands || brands.length === 0;

  return (
    <div className="w-full min-h-screen bg-white text-slate-900 antialiased font-sans pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        {/* 1. BANNER SLIDER UTAMA */}
        <div className="mb-8">
          <BannerSlider />
        </div>

        {/* 2. TAB KATEGORI KAPSUL OVAL (UI JIPLAKAN DARI image_8d355c.png) */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-12 border-b border-slate-100 pb-6">
          {GAMORA_CATEGORIES.map((cat) => {
            const isActive = selectedGamoraCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedGamoraCat(cat.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wide border transition-all duration-200 ${
                  isActive
                    ? "bg-purple-50 text-purple-600 border-purple-400 shadow-sm font-bold scale-105"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* 3. LOOPING KATEGORI KE BAWAH (UI JIPLAKAN DARI image_8d3579.png) */}
        <div className="space-y-16">
          {!isDataEmpty && hasDataLoaded ? (
            GAMORA_CATEGORIES.map((cat) => {
              // INTERKONEKSI KAPSUL: Jika kapsul di klik selain 'popular', hide seksi lain yang gak dklik
              if (
                selectedGamoraCat !== "popular" &&
                selectedGamoraCat !== cat.id
              ) {
                return null;
              }

              const currentCategoryBrands = getFilteredBrandsByCat(cat.id);
              if (currentCategoryBrands.length === 0) return null;

              // Batasi tampilan cuma 6 item (1 baris) di awal kalau belum di-expand
              const isExpanded = expandedCategories[cat.id];
              const displayedBrands = isExpanded
                ? currentCategoryBrands
                : currentCategoryBrands.slice(0, 6);
              const hasMoreThanLimit = currentCategoryBrands.length > 6;

              return (
                <section
                  key={cat.id}
                  className="w-full transition-all duration-300"
                >
                  {/* Judul Kategori */}
                  <div className="flex items-center gap-2 mb-6">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                      {cat.label}
                    </h2>
                  </div>

                  {/* Grid Item Game dalam bentuk Box Kapsul Light Mode */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
                    {displayedBrands.map((brand) => (
                      <div
                        key={brand.id || brand.brandName}
                        onClick={() => onSelectGame(brand)}
                        className="bg-white border border-slate-100 rounded-2xl p-4 text-center cursor-pointer transition-all duration-200 hover:shadow-lg hover:border-purple-200 hover:-translate-y-1 group flex flex-col items-center justify-between min-h-[160px]"
                      >
                        {/* Box Kotak Cover Game */}
                        <div className="w-20 h-20 rounded-2xl overflow-hidden mb-3 bg-slate-50 border border-slate-100 group-hover:scale-105 transition-transform duration-200 shadow-sm flex items-center justify-center">
                          <img
                            src={brand.iconUrl || "https://placehold.co/150"}
                            alt={brand.brandName}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        {/* Judul Teks Game */}
                        <p className="text-xs font-bold text-slate-700 group-hover:text-purple-600 transition-colors line-clamp-2 px-1 w-full text-center">
                          {brand.brandName || brand}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Tombol Tampilkan Lebih Banyak (Berfungsi Nyata) */}
                  {hasMoreThanLimit && (
                    <div className="text-center mt-8">
                      <button
                        onClick={() => toggleExpand(cat.id)}
                        className="text-xs font-bold text-purple-600 hover:text-purple-700 transition-colors bg-purple-50/70 hover:bg-purple-100/80 px-5 py-2.5 rounded-xl border border-purple-100"
                      >
                        {isExpanded ? "Sembunyikan" : "Tampilkan lebih banyak"}
                      </button>
                    </div>
                  )}
                </section>
              );
            })
          ) : (
            /* STATE KOSONG */
            <div className="text-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 max-w-md mx-auto my-12">
              <Gamepad2
                size={44}
                className="mx-auto mb-4 text-slate-300 animate-pulse"
              />
              <h4 className="text-slate-700 text-base font-bold uppercase tracking-wider">
                BELUM ADA PRODUK
              </h4>
              <p className="text-slate-400 text-xs mt-2 px-8 leading-relaxed">
                Produk untuk kategori regional ini belum tersedia di database
                server kamu tod.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CatalogView;
