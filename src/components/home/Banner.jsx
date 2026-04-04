import { useEffect, useState, useRef } from "react";
// Sesuaikan import path apiGet jika diperlukan
import { apiGet } from "../../services/api";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isClickable, setIsClickable] = useState(true);

  // 🔥 STATE BARU: Deteksi apakah layar sedang di ukuran HP (< 768px)
  const [isMobile, setIsMobile] = useState(false);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const isTransitioningRef = useRef(isTransitioning);
  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  // 🔥 EFEK BARU: Mengecek ukuran layar secara real-time
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Cek saat pertama kali website diload
    handleResize();

    // Dengarkan perubahan jika user me-resize layar (atau rotasi HP)
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    fetchBanner();
  }, []);

  async function fetchBanner() {
    try {
      const res = await apiGet("/api/banner");
      const data = (res?.data || []).filter((b) => b.page?.includes("home"));

      if (data.length > 1) {
        const last = data[data.length - 1];
        const prevLast = data.length > 2 ? data[data.length - 2] : data[0];
        const first = data[0];
        const second = data.length > 1 ? data[1] : data[0];

        setBanners([prevLast, last, ...data, first, second]);
        setIndex(2);
      } else {
        setBanners(data);
        setIndex(0);
      }
    } catch (err) {
      console.error(err);
    }
  }

  function next() {
    if (!isClickable || index >= banners.length - 1) return;
    setIsClickable(false);
    setIsTransitioning(true);
    setIndex((prev) => prev + 1);
  }

  function prev() {
    if (!isClickable || index <= 0) return;
    setIsClickable(false);
    setIsTransitioning(true);
    setIndex((prev) => prev - 1);
  }

  useEffect(() => {
    if (!isTransitioningRef.current || banners.length <= 1) return;

    let timeoutId;
    const realCount = banners.length - 4;
    const firstRealIndex = 2;
    const lastRealIndex = firstRealIndex + realCount - 1;

    if (index === lastRealIndex + 1) {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(firstRealIndex);
        setIsClickable(true);
      }, 500);
    } else if (index === firstRealIndex - 1) {
      timeoutId = setTimeout(() => {
        setIsTransitioning(false);
        setIndex(lastRealIndex);
        setIsClickable(true);
      }, 500);
    } else {
      timeoutId = setTimeout(() => {
        setIsClickable(true);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [index, banners.length]);

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => setIsTransitioning(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const handleTouchStart = (e) => setTouchStartX(e.targetTouches[0].clientX);
  const handleTouchMove = (e) => setTouchEndX(e.targetTouches[0].clientX);

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX || !isClickable) return;
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) next();
    else if (distance < -minSwipeDistance) prev();

    setTouchStartX(0);
    setTouchEndX(0);
  };

  if (!banners.length) return null;

  // 🔥 MATEMATIKA RESPONSIVE:
  const itemWidth = isMobile ? 80 : 50; // Lebar 80% di HP, 50% di Desktop
  const offset = isMobile ? 10 : 25; // Sisa ruang penarik tengah (10% di HP, 25% di Desktop)

  return (
    <div className="w-full py-16 overflow-hidden select-none relative z-0">
      <div className="max-w-6xl mx-auto relative group">
        {/* TRACK */}
        <div
          className="flex w-full items-center"
          style={{
            // Rumus sekarang menggunakan variabel dinamis
            transform: `translateX(calc(${offset}% - ${index * itemWidth}%))`,
            transition: isTransitioning
              ? "transform 500ms ease-in-out"
              : "none",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {banners.map((b, i) => {
            const isActive = i === index;

            return (
              <div
                key={i}
                className={`shrink-0 px-2 relative ${
                  isTransitioning
                    ? "transition-all duration-500 ease-in-out"
                    : "transition-none"
                } ${
                  isMobile ? "w-[80%]" : "w-[50%]" // Atur lebar pembungkus dinamis
                } ${
                  isActive
                    ? isMobile
                      ? "scale-105 z-20 opacity-100"
                      : "scale-[1.25] z-20 opacity-100"
                    : isMobile
                      ? "scale-[0.90] z-10 opacity-50"
                      : "scale-[0.85] z-10 opacity-60"
                }`}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden h-full ${
                    isActive ? "shadow-[0_0_30px_rgba(0,0,0,0.6)]" : "shadow-md"
                  }`}
                >
                  <img
                    src={b.image}
                    alt={`Banner ${i}`}
                    className="w-full h-auto object-cover pointer-events-none rounded-2xl"
                  />

                  {/* LAYER GELAP */}
                  <div
                    className={`absolute inset-0 bg-black/75 ${
                      isTransitioning
                        ? "transition-opacity duration-500 ease-in-out"
                        : "transition-none"
                    } ${isActive ? "opacity-0" : "opacity-100"}`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* BUTTONS */}
        <button
          onClick={prev}
          className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-12 h-12 items-center justify-center rounded-full z-30 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        >
          ←
        </button>

        <button
          onClick={next}
          className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white w-12 h-12 items-center justify-center rounded-full z-30 transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm"
        >
          →
        </button>
      </div>
    </div>
  );
}
