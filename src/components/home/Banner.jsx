import { useEffect, useState, useRef, useCallback } from "react";
import { apiGet } from "../../services/api";


export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(2);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const isLockedRef = useRef(false);
  const trackRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const baseTranslatePct = useRef(0);
  const autoPlayRef = useRef(null);
  const indexRef = useRef(index);

  useEffect(() => {
    isLockedRef.current = isLocked;
  }, [isLocked]);
  useEffect(() => {
    indexRef.current = index;
  }, [index]);

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
        indexRef.current = 2;
      } else {
        setBanners(data);
        setIndex(0);
        indexRef.current = 0;
      }
    } catch (err) {
      console.error(err);
    }
  }

  // Config: Banner aktif dominan, samping "mengintip" (Peek)
  let itemWidth, peekWidth;
  if (windowWidth >= 1024) {
    itemWidth = 78; // 78% lebar banner aktif
    peekWidth = 11; // Samping kiri & kanan mengintip ~11%
  } else if (windowWidth >= 768) {
    itemWidth = 85;
    peekWidth = 7.5;
  } else {
    itemWidth = 88;
    peekWidth = 6;
  }

  const scaleActive = 1;
  const scaleInactive = 0.85;

  function getTranslatePct(idx) {
    return peekWidth - idx * itemWidth;
  }

  const goTo = useCallback(
    (idx, animated = true) => {
      if (isLockedRef.current) return;
      isLockedRef.current = true;
      setIsLocked(true);
      if (animated) setIsTransitioning(true);

      setIndex(idx);
      indexRef.current = idx;
      baseTranslatePct.current = getTranslatePct(idx);

      if (trackRef.current) {
        trackRef.current.style.transition = animated
          ? "transform 600ms cubic-bezier(0.2, 1, 0.3, 1)"
          : "none";
        trackRef.current.style.transform = `translateX(${baseTranslatePct.current}%)`;
      }

      setTimeout(() => {
        setBanners((prev) => {
          const realCount = prev.length - 4;
          const firstReal = 2;
          const lastReal = firstReal + realCount - 1;
          const curIdx = indexRef.current;

          if (curIdx > lastReal) {
            const newIdx = firstReal;
            setIndex(newIdx);
            indexRef.current = newIdx;
            baseTranslatePct.current = getTranslatePct(newIdx);
            if (trackRef.current) {
              trackRef.current.style.transition = "none";
              trackRef.current.style.transform = `translateX(${baseTranslatePct.current}%)`;
            }
          } else if (curIdx < firstReal) {
            const newIdx = lastReal;
            setIndex(newIdx);
            indexRef.current = newIdx;
            baseTranslatePct.current = getTranslatePct(newIdx);
            if (trackRef.current) {
              trackRef.current.style.transition = "none";
              trackRef.current.style.transform = `translateX(${baseTranslatePct.current}%)`;
            }
          }
          return prev;
        });
        isLockedRef.current = false;
        setIsLocked(false);
      }, 620);
    },
    [itemWidth, peekWidth],
  );

  useEffect(() => {
    if (banners.length <= 1) return;
    autoPlayRef.current = setInterval(() => {
      goTo(indexRef.current + 1, true);
    }, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, [banners.length, goTo]);

  const resetAutoPlay = useCallback(() => {
    clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(() => {
      goTo(indexRef.current + 1, true);
    }, 4000);
  }, [goTo]);

  const onPointerDown = useCallback((e) => {
    if (isLockedRef.current) return;
    isDragging.current = true;
    dragStartX.current = e.clientX ?? e.touches?.[0]?.clientX;
    if (trackRef.current) {
      trackRef.current.style.transition = "none";
    }
    clearInterval(autoPlayRef.current);
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      if (!isDragging.current || !trackRef.current) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      const containerW =
        trackRef.current.parentElement?.offsetWidth || window.innerWidth;
      const deltaPct = ((clientX - dragStartX.current) / containerW) * 100;
      trackRef.current.style.transform = `translateX(${baseTranslatePct.current + deltaPct}%)`;
    };

    const onEnd = (e) => {
      if (!isDragging.current) return;
      isDragging.current = false;
      const clientX = e.clientX ?? e.changedTouches?.[0]?.clientX;
      const containerW =
        trackRef.current?.parentElement?.offsetWidth || window.innerWidth;
      const deltaPct = ((clientX - dragStartX.current) / containerW) * 100;

      if (Math.abs(deltaPct) > 8) {
        goTo(deltaPct < 0 ? indexRef.current + 1 : indexRef.current - 1);
      } else {
        if (trackRef.current) {
          trackRef.current.style.transition =
            "transform 500ms cubic-bezier(0.2, 1, 0.3, 1)";
          trackRef.current.style.transform = `translateX(${baseTranslatePct.current}%)`;
        }
      }
      resetAutoPlay();
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: false });
    window.addEventListener("touchend", onEnd);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [goTo, resetAutoPlay]);

  useEffect(() => {
    if (banners.length && trackRef.current) {
      baseTranslatePct.current = getTranslatePct(index);
      trackRef.current.style.transform = `translateX(${baseTranslatePct.current}%)`;
    }
  }, [banners.length]);

  if (!banners.length) return null;

  const realCount = banners.length - 4;
  const firstReal = 2;
  const realIndex = (((index - firstReal) % realCount) + realCount) % realCount;

  return (
    <div className="w-full py-6 overflow-hidden select-none relative bg-transparent">
      {/* Meteor Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-b from-transparent to-white/40"
            style={{
              width: "1.5px",
              height: "60px",
              left: `${Math.random() * 100}%`,
              top: "-10%",
              opacity: 0.4,
              animation: `meteor ${2 + Math.random() * 3}s linear ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Main Track */}
      <div
        className="relative z-20 overflow-visible"
        ref={trackRef}
        style={{ willChange: "transform" }}
      >
        <div
          className="flex items-center w-full"
          onMouseDown={onPointerDown}
          onTouchStart={onPointerDown}
        >
          {banners.map((b, i) => {
            const isActive = i === index;
            const distance = Math.abs(i - index);

            return (
              <div
                key={i}
                className="shrink-0"
                style={{
                  width: `${itemWidth}%`,
                  padding: "0 8px",
                  zIndex: isActive ? 50 : 50 - distance,
                  perspective: "1000px",
                }}
              >
                <div
                  className="transition-all duration-700 ease-out relative group"
                  style={{
                    borderRadius: "20px",
                    overflow: "hidden",
                    aspectRatio: windowWidth < 768 ? "16/7.5" : "21/8",
                    transform: `scale(${isActive ? scaleActive : scaleInactive}) rotateY(${isActive ? 0 : i < index ? 10 : -10}deg)`,
                    opacity: isActive ? 1 : 0.4,
                    filter: isActive ? "none" : "blur(1px)",
                    boxShadow: isActive
                      ? "0 25px 50px -12px rgba(0, 0, 0, 0.7)"
                      : "none",
                  }}
                >
                  <img
                    src={b.image}
                    alt=""
                    className="w-full h-full object-cover pointer-events-none transition-transform duration-1000 group-hover:scale-105"
                  />
                  {/* Glass Shine Effect */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
                  )}
                  {/* Overlay for inactive */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-black/40" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 z-50 pointer-events-none">
        <button
          onClick={() => {
            goTo(index - 1);
            resetAutoPlay();
          }}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all pointer-events-auto shadow-xl"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={() => {
            goTo(index + 1);
            resetAutoPlay();
          }}
          className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all pointer-events-auto shadow-xl"
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Progressive Dots */}
      <div className="flex justify-center gap-2 mt-6 relative z-50">
        {Array.from({ length: realCount }).map((_, i) => (
          <button
            key={i}
            onClick={() => {
              goTo(i + firstReal);
              resetAutoPlay();
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${i === realIndex ? "w-8 bg-blue-500 shadow-[0_0_10px_#3b82f6]" : "w-1.5 bg-white/20"}`}
          />
        ))}
      </div>
    </div>
  );
}
