import { useEffect, useState, useRef } from "react";
import { apiGet } from "../../services/api";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isClickable, setIsClickable] = useState(true);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);

  const isTransitioningRef = useRef(isTransitioning);
  useEffect(() => {
    isTransitioningRef.current = isTransitioning;
  }, [isTransitioning]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
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
      timeoutId = setTimeout(() => setIsClickable(true), 500);
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
    if (distance > 50) next();
    else if (distance < -50) prev();
    setTouchStartX(0);
    setTouchEndX(0);
  };

  if (!banners.length) return null;

  let itemWidth;
  let scaleInactive;
  let gap;

  if (windowWidth >= 1024) {
    itemWidth = 50; 
    scaleInactive = "scale-[0.8] opacity-40 blur-[1px]";
    gap = "-1%";
  } else if (windowWidth >= 768) {
    itemWidth = 75;
    scaleInactive = "scale-[0.85] opacity-50";
    gap = "0%";
  } else {
    itemWidth = 88; 
    scaleInactive = "scale-[0.9] opacity-60";
    gap = "0%";
  }

  const dynamicOffset = (100 - itemWidth) / 2;

  return (
    <div className="w-full py-4 overflow-hidden select-none relative z-0">
      <div className="max-w-7xl mx-auto relative">
        <div
          className="flex w-full items-center"
          style={{
            transform: `translateX(calc(${dynamicOffset}% - ${index * itemWidth}%))`,
            transition: isTransitioning
              ? "transform 600ms cubic-bezier(0.2, 1, 0.3, 1)"
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
                className="shrink-0 relative flex justify-center items-center transition-all duration-500"
                style={{
                  width: `${itemWidth}%`,
                  zIndex: isActive ? 20 : 10,
                  margin: `0 ${gap}`,
                }}
              >
                <div
                  className={`relative rounded-2xl overflow-hidden transition-all duration-700 ease-out ${
                    isActive
                      ? "scale-100 z-20 opacity-100 shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                      : `${scaleInactive} z-10`
                  }`}
                  style={{
                    width: "100%",
                    aspectRatio: windowWidth < 768 ? "16/8" : "21/8",
                  }}
                >
                  <img
                    src={b.image}
                    alt={`Banner ${i}`}
                    className="w-full h-full object-cover pointer-events-none"
                  />
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40 transition-opacity"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <button
          onClick={prev}
          className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/90 text-black w-10 h-10 items-center justify-center rounded-full z-30 shadow-lg hover:bg-white"
        >
          <span>{"<"}</span>
        </button>
        <button
          onClick={next}
          className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/90 text-black w-10 h-10 items-center justify-center rounded-full z-30 shadow-lg hover:bg-white"
        >
          <span>{">"}</span>
        </button>
      </div>
    </div>
  );
}
