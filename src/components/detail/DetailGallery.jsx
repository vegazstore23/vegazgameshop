import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/effect-fade";

import {
  FreeMode,
  Navigation,
  Thumbs,
  EffectFade,
  Keyboard,
} from "swiper/modules";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";

const ASSET_BASE = "https://apivgz.vegazgameshop.com";

export default function DetailGallery({ images = [], status }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-[4/5] bg-slate-900 rounded-3xl flex items-center justify-center border border-white/10">
        <span className="text-white/20 uppercase tracking-widest text-xs font-black">
          No Image Available
        </span>
      </div>
    );
  }

  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${ASSET_BASE}/uploads/${path}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full max-w-full overflow-hidden">
      {/* 1. Main Slider Container */}
      <div className="relative group w-full aspect-[4/5] sm:aspect-square lg:aspect-[4/5] rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl">
        {/* Status Badge */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20 ${
              status?.toLowerCase() === "sold" ? "bg-red-600" : "bg-green-600"
            }`}
          >
            {status || "Available"}
          </span>
        </div>

        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          loop={images.length > 1}
          effect={"fade"}
          speed={500}
          keyboard={{ enabled: true }}
          navigation={{
            nextEl: ".btn-next",
            prevEl: ".btn-prev",
          }}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs, EffectFade, Keyboard]}
          className="w-full h-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} className="w-full h-full bg-slate-950">
              <img
                src={getImageUrl(img)}
                alt="Product"
                className="w-full h-full object-cover select-none cursor-zoom-in"
                onClick={() => {
                  setCurrentModalIndex(index);
                  setIsFullscreen(true);
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation - Hidden on Small Mobile */}
        {images.length > 1 && (
          <div className="hidden md:block">
            <button className="btn-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all border border-white/10">
              <ChevronLeft size={20} />
            </button>
            <button className="btn-next absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all border border-white/10">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      {/* 2. Thumbnails Slider */}
      {images.length > 1 && (
        <div className="w-full px-1">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4.5}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumb-swiper"
            breakpoints={{
              320: { slidesPerView: 4.2, spaceBetween: 8 },
              768: { slidesPerView: 5.5, spaceBetween: 12 },
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                {({ isActive }) => (
                  <div
                    className={`aspect-[4/5] rounded-xl overflow-hidden border-2 transition-all ${
                      isActive
                        ? "border-blue-500 scale-95 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                        : "border-white/5 opacity-40 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={getImageUrl(img)}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* 3. Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[999] bg-black backdrop-blur-2xl flex flex-col items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 z-[1000] p-4 bg-white/10 rounded-full text-white"
          >
            <X size={24} />
          </button>
          <div className="w-full h-full max-w-4xl p-4">
            <Swiper
              initialSlide={currentModalIndex}
              navigation={true}
              keyboard={true}
              modules={[Navigation, Keyboard]}
              className="w-full h-full"
            >
              {images.map((img, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <img
                    src={getImageUrl(img)}
                    className="max-w-full max-h-[85vh] object-contain rounded-lg"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
    </div>
  );
}
