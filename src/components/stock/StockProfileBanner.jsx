import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

import GameIconPlaceholder from "../../assets/misc/Entry.svg";

export default function StockProfileBanner() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const res = await apiGet("/api/banner");
        const data = (res?.data || []).find((b) => b.page?.includes("stock"));

        setProfileData(data);
      } catch (err) {
        console.error("Failed to fetch stock profile banner:", err);
      }
    }
    fetchProfileData();
  }, []);

  if (!profileData) {
    return (
      <div className="w-full aspect-[21/9] bg-gray-800 animate-pulse rounded-2xl mb-12"></div>
    );
  }

  return (
    <div className="w-full mb-0 select-none group">
      {/* 1. Bagian Cover Banner */}
      <div className="relative overflow-hidden z-0">
        <div className="aspect-[21/9] md:aspect-[21/7] w-full">
          <img
            src={profileData.image}
            alt="Game Cover"
            className="w-full h-full object-cover"
          />
          {/* Gradient Biru Gelap */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
        </div>
      </div>

      {/* 2. Bagian Info Profil (Sisa Hitam diubah jadi Biru di sini) */}
      <div className="bg-[#001d57] pb-8">
        {" "}
        {/* Tambahkan background biru di sini */}
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="relative -mt-12 md:-mt-16 lg:-mt-20 z-10 flex items-end gap-4 md:gap-6">
            {/* FOTO PROFIL GAME */}
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 p-1.5 md:p-2 bg-[#1a1c20] rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-4 border-[#1a1c20]">
              <div className="w-full h-full rounded-2xl overflow-hidden border border-white/10 relative">
                <img
                  src={profileData.gameIcon || GameIconPlaceholder}
                  alt="Game Icon"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent"></div>
              </div>
            </div>

            {/* JUDUL DAN DEVELOPER */}
            <div className="flex-col pb-2 md:pb-4 flex-grow">
              <h1 className="text-xl md:text-3xl lg:text-4xl font-extrabold text-yellow-400 tracking-tight leading-tight">
                {profileData.gameTitle || "Mobile Legends Stock VegazStore"}
              </h1>
              <p className="text-sm md:text-lg text-gray-300 font-medium">
                {profileData.developer || "Moonton"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
