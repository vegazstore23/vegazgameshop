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

  // ── Skeleton ───────────────────────────────────────────────────────────────
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
  // Loop perlukan sekurang-kurangnya 3 slide supaya clone kiri & kanan cukup
  const canLoop = slideCount >= 3;

  return (
    // ── Wrapper clip: overflow hidden supaya clone slides kiri & kanan
    //    boleh wujud dalam DOM tapi tak visible luar kawasan banner ──────────
    <div
      style={{ width: "100%", padding: "8px 0", overflow: "hidden" }}
      role="region"
      aria-label="Banner carousel"
    >
      <style>{`
        .banner-swiper {
          width: 100%;
          /* Bagi ruang untuk pagination dots di bawah */
          padding-bottom: 36px !important;
          /* overflow visible supaya slide sebelah nampak (coverflow effect) —
             tapi sekarang parent wrapper yang handle clip, bukan swiper sendiri */
          overflow: visible !important;
        }

        .banner-swiper .swiper-slide {
          aspect-ratio: ${BANNER_ASPECT};
          border-radius: 16px;
          overflow: hidden;
          cursor: grab;
          border: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          transition: box-shadow 0.4s ease, opacity 0.4s ease !important;
          opacity: 0.6;
        }

        .banner-swiper .swiper-slide:active {
          cursor: grabbing;
        }

        .banner-swiper .swiper-slide-active {
          opacity: 1;
          box-shadow: 0 16px 56px rgba(0,0,0,0.7),
                      0 0 0 1px rgba(255,255,255,0.1);
        }

        .banner-swiper .swiper-slide-prev,
        .banner-swiper .swiper-slide-next {
          opacity: 0.75;
        }

        .banner-swiper .swiper-slide img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          user-select: none;
          pointer-events: none;
          -webkit-user-drag: none;
        }

        .banner-swiper .swiper-pagination {
          bottom: 4px !important;
        }

        .banner-swiper .swiper-pagination-bullet {
          width: 6px;
          height: 6px;
          background: rgba(255,255,255,0.2);
          opacity: 1;
          border-radius: 999px;
          transition: width 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
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
        // loopAdditionalSlides DIBUANG — deprecated & punca loop kanan broken.
        // Swiper v8+ handle clone slides sendiri secara automatik.
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
          480: { slidesPerView: 1.2 },
          768: { slidesPerView: 1.35 },
          1024: { slidesPerView: 1.5 },
        }}
      >
        {banners.map((b, i) => (
          <SwiperSlide key={b.id ?? i}>
            <a
              href={b.url ?? b.link ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={b.title || `Banner ${i + 1}`}
              style={{ display: "block", width: "100%", height: "100%" }}
              onClick={(e) => {
                if (!b.url && !b.link) e.preventDefault();
              }}
            >
              <img
                src={b.image}
                alt={b.title || `Banner ${i + 1}`}
                draggable={false}
                loading="lazy"
                onError={(e) => {
                  const slide = e.currentTarget.closest(".swiper-slide");
                  if (slide) slide.style.display = "none";
                }}
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
