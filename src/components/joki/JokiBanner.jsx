import { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Keyboard,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import { apiGet } from "../../services/api";

const BANNER_ASPECT = 3115 / 1150;

export default function JokiBanner() {
  const [banners, setBanners] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    (async () => {
      try {
        const res = await apiGet("/api/banner");
        // Filter banner khusus untuk page joki
        const data = (res?.data || []).filter((b) =>
          b.page?.toLowerCase().includes("joki"),
        );
        if (isMounted.current) setBanners(data);
      } catch (err) {
        console.error("[JokiBanner]", err);
      }
    })();
    return () => {
      isMounted.current = false;
    };
  }, []);

  const handleBannerClick = (swiper) => {
    const clickedIndex = swiper.clickedIndex;
    if (clickedIndex === undefined) return;

    const clickedSlide = swiper.slides[clickedIndex];
    if (!clickedSlide) return;

    const targetUrl = clickedSlide.getAttribute("data-link");

    if (targetUrl && targetUrl !== "#" && targetUrl.trim() !== "") {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    }
  };

  if (!banners.length) {
    return (
      <div
        style={{
          width: "100%",
          padding: "16px 16px 0 16px",
          maxWidth: "1280px",
          margin: "0 auto",
        }}
      >
        <style>{`
          @keyframes banner-pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
        `}</style>
        <div
          style={{
            width: "100%",
            aspectRatio: BANNER_ASPECT,
            borderRadius: "16px",
            background: "rgba(255,255,255,0.05)",
            animation: "banner-pulse 1.5s ease-in-out infinite",
          }}
        />
      </div>
    );
  }

  const slideCount = banners.length;
  const canLoop = slideCount >= 3;

  return (
    <div
      style={{ width: "100%", padding: "12px 0", overflow: "hidden" }}
      role="region"
      aria-label="Joki Banner carousel"
    >
      <style>{`
        .joki-banner-swiper {
          width: 100%;
          padding-bottom: 36px !important;
          overflow: visible !important;
        }

        .joki-banner-swiper .swiper-slide {
          aspect-ratio: ${BANNER_ASPECT};
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          transition: box-shadow 0.4s ease, opacity 0.4s ease !important;
          opacity: 0.6;
          pointer-events: auto !important; 
        }

        .joki-banner-swiper .swiper-slide-active {
          opacity: 1;
          box-shadow: 0 16px 56px rgba(0,0,0,0.7),
                      0 0 0 1px rgba(59,130,246,0.3);
          z-index: 10;
        }

        .joki-banner-swiper .swiper-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          pointer-events: none; 
        }

        .joki-banner-swiper .swiper-pagination-bullet-active {
          width: 32px;
          background: #3b82f6;
          box-shadow: 0 0 10px #3b82f6;
        }
      `}</style>

      <Swiper
        className="joki-banner-swiper"
        modules={[Autoplay, EffectCoverflow, Pagination, Keyboard, A11y]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop={canLoop}
        onClick={handleBannerClick}
        touchStartPreventDefault={false}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 50,
          modifier: 1.2,
          scale: 0.91,
          slideShadows: false,
        }}
        autoplay={
          canLoop
            ? {
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }
            : false
        }
        pagination={{ clickable: true }}
        keyboard={{ enabled: true }}
        a11y={{ enabled: true }}
        breakpoints={{
          0: { slidesPerView: 1.15 },
          768: { slidesPerView: 1.3 },
          1024: { slidesPerView: 1.4 },
        }}
      >
        {banners.map((b, i) => {
          const targetUrl = b.url || b.link || "";

          return (
            <SwiperSlide key={b.id ?? i} data-link={targetUrl}>
              <img
                src={b.image}
                alt={b.title || `Joki Banner ${i + 1}`}
                loading="lazy"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
