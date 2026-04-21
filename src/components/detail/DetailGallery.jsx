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
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const ASSET_BASE = "https://apivgz.vegazgameshop.com";

export default function DetailGallery({ images = [], status }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-video bg-slate-900 rounded-3xl flex items-center justify-center border border-white/10">
        <span className="text-white/20 uppercase tracking-widest text-xs font-black">
          Tiada Gambar Tersedia
        </span>
      </div>
    );
  }

  const getImageUrl = (path) => {
    if (!path) return "";
    return path.startsWith("http") ? path : `${ASSET_BASE}/uploads/${path}`;
  };

  const isAvailable = status?.toLowerCase() === "available";

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* 1. Main Slider
          FIX: Buang aspect-ratio yang conflict — guna paddingTop trick yang lebih reliable
          di semua browser mobile. aspect-[4/5] kadang render hitam di Chrome mobile
          kerana height tidak dikira dengan betul bila parent ada overflow:hidden.
      */}
      <div
        className="relative group w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 shadow-2xl"
        style={{ paddingTop: "125%" }} // = 4:5 ratio, reliable di semua mobile browser
      >
        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-20">
          <span
            className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20 ${
              isAvailable ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {isAvailable ? "Tersedia" : "Telah Dijual"}
          </span>
        </div>

        {/* Swiper duduk dalam absolute fill supaya paddingTop trick berjaya */}
        <div className="absolute inset-0">
          <Swiper
            style={{
              "--swiper-navigation-color": "#fff",
              "--swiper-pagination-color": "#fff",
              width: "100%",
              height: "100%",
            }}
            loop={images.length > 1}
            effect="fade"
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
              <SwiperSlide key={index} className="w-full h-full">
                <img
                  src={getImageUrl(img)}
                  alt={`Gambar ${index + 1}`}
                  className="w-full h-full object-cover select-none cursor-zoom-in"
                  onClick={() => {
                    setCurrentModalIndex(index);
                    setIsFullscreen(true);
                  }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Custom Nav — Desktop only */}
        {images.length > 1 && (
          <div className="hidden md:block">
            <button className="btn-prev absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all border border-white/10">
              <ChevronLeft size={18} />
            </button>
            <button className="btn-next absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 bg-black/50 backdrop-blur-md rounded-full text-white opacity-0 group-hover:opacity-100 transition-all border border-white/10">
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      {/* 2. Thumbnails */}
      {images.length > 1 && (
        <div className="w-full">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={8}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Thumbs]}
            breakpoints={{
              0: { slidesPerView: 4.5, spaceBetween: 8 },
              768: { slidesPerView: 5.5, spaceBetween: 10 },
            }}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="cursor-pointer">
                {({ isActive }) => (
                  // FIX: Sama — guna paddingTop trick untuk thumbnail juga
                  <div
                    className={`relative rounded-xl overflow-hidden border-2 transition-all ${
                      isActive
                        ? "border-blue-500 shadow-[0_0_12px_rgba(59,130,246,0.5)]"
                        : "border-white/5 opacity-50 hover:opacity-100"
                    }`}
                    style={{ paddingTop: "125%" }}
                  >
                    <div className="absolute inset-0">
                      <img
                        src={getImageUrl(img)}
                        className="w-full h-full object-cover"
                        alt={`Thumbnail ${index + 1}`}
                      />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* 3. Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[999] bg-black/95 backdrop-blur-2xl flex items-center justify-center">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-5 right-5 z-[1000] p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all"
            title="Tutup"
          >
            <X size={22} />
          </button>
          <div className="w-full h-full max-w-4xl p-4">
            <Swiper
              initialSlide={currentModalIndex}
              navigation={true}
              keyboard={true}
              modules={[Navigation, Keyboard]}
              style={{ width: "100%", height: "100%" }}
            >
              {images.map((img, index) => (
                <SwiperSlide
                  key={index}
                  className="flex items-center justify-center"
                >
                  <img
                    src={getImageUrl(img)}
                    className="max-w-full max-h-[88vh] object-contain rounded-xl"
                    alt={`Gambar ${index + 1}`}
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
