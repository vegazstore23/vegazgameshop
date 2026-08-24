import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import GameIconPlaceholder from "../../assets/logo/LOGO-VEGAZ.jpg";

export default function JokiBanner() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function fetchProfileData() {
      try {
        const res = await apiGet("/api/banner");
        // Ambil banner pertama yang khusus untuk page joki
        const data = (res?.data || []).find((b) =>
          b.page?.toLowerCase().includes("joki"),
        );
        setProfileData(data);
      } catch (err) {
        console.error("Failed to fetch joki banner:", err);
      }
    }
    fetchProfileData();
  }, []);

  if (!profileData) {
    return (
      <div className="w-full aspect-[3110/1159] bg-gray-800 animate-pulse rounded-2xl mb-12"></div>
    );
  }

  return (
    <div className="w-full mb-0 select-none group">
      {/* BANNER ATAS */}
      <div className="relative overflow-hidden z-0">
        <div className="aspect-[3110/1159] w-full">
          <img
            src={profileData.image}
            alt="Joki Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent"></div>
        </div>
      </div>

      {/* SECTION PROFIL GAME (PERSIS STOCK) */}
      <div className="bg-[#140c5e] pb-6 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 md:px-10">
          <div className="relative -mt-10 md:-mt-16 lg:-mt-20 z-10 flex items-center md:items-end gap-3 md:gap-6">
            {/* LOGO GAME (Overlapping Banner + Perspective 3D) */}
            <div className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 [perspective:800px]">
              <div
                className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative border border-white/10 bg-slate-900"
                style={{
                  transform: "rotateY(16deg) rotateX(-1deg)",
                  transformOrigin: "left center",
                }}
              >
                <img
                  src={profileData.gameIcon || GameIconPlaceholder}
                  alt="Game Icon"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
              </div>
            </div>

            {/* JUDUL DAN DEVELOPER */}
            <div className="flex flex-col justify-center md:justify-end pb-1 md:pb-3 flex-grow">
              <h1 className="text-base sm:text-xl md:text-3xl lg:text-4xl font-extrabold text-white tracking-wide uppercase leading-tight">
                {profileData.gameTitle || "Mobile Legends Joki VegazStore"}
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-300 font-semibold mt-0.5">
                {profileData.developer || "Moonton"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
