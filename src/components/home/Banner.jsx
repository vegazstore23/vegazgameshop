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

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    (async () => {
      try {
        const res = await apiGet("/api/banner");
        const data = (res?.data || []).filter((b) => b.page?.includes("home"));
        if (isMounted.current) setBanners(data);
      } catch (err) {
        console.error("[Banner]", err);
      }
    })();
    return () => {
      isMounted.current = false;
    };
  }, []);

  if (!banners.length) {
    return (
      <div style={{ width: "100%", padding: "24px 0" }}>
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
            borderRadius: "14px",
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
      style={{ width: "100%", padding: "8px 0", overflow: "hidden" }}
      role="region"
      aria-label="Banner carousel"
    >
      <style>{`
        .banner-swiper {
          width: 100%;
          padding-bottom: 36px !important;
          overflow: visible !important;
        }

        .banner-swiper .swiper-slide {
          aspect-ratio: ${BANNER_ASPECT};
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          transition: box-shadow 0.4s ease, opacity 0.4s ease !important;
          opacity: 0.6;
          /* Memastikan slide bisa menerima event klik */
          pointer-events: auto !important; 
        }

        .banner-swiper .swiper-slide-active {
          opacity: 1;
          box-shadow: 0 16px 56px rgba(0,0,0,0.7),
                      0 0 0 1px rgba(255,255,255,0.1);
          z-index: 10; /* Slide aktif harus paling atas */
        }

        .banner-link-wrapper {
          display: block;
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 50; /* Memaksa link berada di atas efek bayangan swiper */
          cursor: pointer !important;
        }

        .banner-swiper .swiper-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          /* Hilangkan pointer-events none agar tidak menghalangi klik pada <a> */
          pointer-events: none; 
        }

        .banner-swiper .swiper-pagination-bullet-active {
          width: 32px;
          background: #3b82f6;
          box-shadow: 0 0 10px #3b82f6;
        }
      `}</style>

      <Swiper
        className="banner-swiper"
        modules={[Autoplay, EffectCoverflow, Pagination, Keyboard, A11y]}
        effect="coverflow"
        grabCursor
        centeredSlides
        loop={canLoop}
        touchStartPreventDefault={false} // Penting agar klik tetap terdeteksi di mobile
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
          0: { slidesPerView: 1.2 },
          768: { slidesPerView: 1.35 },
          1024: { slidesPerView: 1.5 },
        }}
      >
        {banners.map((b, i) => {
          // DEBUG: Cek di console apakah link benar-benar ada
          // console.log("Link Banner:", b.url || b.link);

          const targetUrl = b.url || b.link;

          return (
            <SwiperSlide key={b.id ?? i}>
              {targetUrl ? (
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="banner-link-wrapper"
                  onClick={(e) => {
                    // Jika URL tidak valid atau '#' jangan jalankan
                    if (!targetUrl || targetUrl === "#") {
                      e.preventDefault();
                    }
                    console.log("Banner clicked:", targetUrl);
                  }}
                >
                  <img
                    src={b.image}
                    alt={b.title || `Banner ${i + 1}`}
                    loading="lazy"
                  />
                </a>
              ) : (
                <img
                  src={b.image}
                  alt={b.title || `Banner ${i + 1}`}
                  loading="lazy"
                />
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
