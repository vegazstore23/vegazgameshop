import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiGet } from "../../services/api";

const BannerSlider = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const res = await apiGet("/api/banner");

        const topupBanners = (res?.data || []).filter((b) =>
          b.page
            ?.split(",")
            .map((p) => p.trim().toLowerCase())
            .includes("topup"),
        );

        setBanners(topupBanners);
      } catch (err) {
        console.error("Failed to fetch topup banners:", err);
      }
    }

    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  if (!banners.length) {
    return (
      <div className="w-full aspect-[3/1] bg-slate-900/40 animate-pulse rounded-2xl border border-white/[0.03]" />
    );
  }

  return (
    <div className="relative group w-full aspect-[3/1] rounded-2xl overflow-hidden border border-white/[0.03] shadow-md shadow-black/40 bg-slate-950/40 backdrop-blur-sm transition-all duration-300">
      <div className="w-full h-full relative">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
              index === currentBanner ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title || "Banner"}
              className="w-full h-full object-cover select-none pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {banners.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrentBanner((p) => (p === 0 ? banners.length - 1 : p - 1))
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/50 backdrop-blur-md text-white/80 hover:text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/80 shadow-lg border border-white/5"
          >
            <ChevronLeft size={16} />
          </button>

          <button
            onClick={() =>
              setCurrentBanner((p) => (p === banners.length - 1 ? 0 : p + 1))
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/50 backdrop-blur-md text-white/80 hover:text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-black/80 shadow-lg border border-white/5"
          >
            <ChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {banners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentBanner(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentBanner
                    ? "w-5 bg-yellow-500"
                    : "w-1.5 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default BannerSlider;
