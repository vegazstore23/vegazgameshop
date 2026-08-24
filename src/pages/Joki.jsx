import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import { Gamepad2 } from "lucide-react";
import { useLangCurr } from "../components/context/LanguageCurrencyContext";

export default function Joki() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLangCurr();

  useEffect(() => {
    const loadGames = async () => {
      setLoading(true);
      try {
        const res = await apiGet("/api/joki/games");
        setGames(res.data || []);
      } catch (err) {
        console.error("Gagal memuat data game joki:", err);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, []);

  return (
    <div className="relative w-full min-h-screen text-slate-100 antialiased font-sans pb-24 bg-[#020617] overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Layer 1: Radial Gradient Biru Gelap */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-[#020617] to-[#020617]"></div>

        {/* Layer 2: Bintang-bintang menggunakan Base64 SVG (Twinkling) */}
        <div
          className="absolute inset-0 opacity-60 mix-blend-screen"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect width='400' height='400' fill='transparent'/%3E%3Ccircle cx='50' cy='50' r='1.5' fill='%23fff' opacity='0.8'/%3E%3Ccircle cx='250' cy='150' r='2' fill='%23fff' opacity='0.6'/%3E%3Ccircle cx='150' cy='300' r='1' fill='%23fff' opacity='0.7'/%3E%3Ccircle cx='350' cy='350' r='2.5' fill='%23fff' opacity='0.5'/%3E%3Ccircle cx='80' cy='220' r='1' fill='%23fff' opacity='0.9'/%3E%3C/svg%3E\")",
            backgroundRepeat: "repeat",
            backgroundSize: "300px 300px",
            animation: "twinkle-stars 4s infinite alternate",
          }}
        ></div>
      </div>

      <style>{`
        @keyframes twinkle-stars {
          0% { opacity: 0.3; }
          100% { opacity: 0.8; }
        }
      `}</style>

      {/* KONTEN UTAMA (Di atas background) */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 pt-10 md:pt-16 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight flex items-center justify-center gap-3 uppercase drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">
            <Gamepad2 className="text-blue-400" size={40} />
            Vegaz Joki Service
          </h1>
          <p className="text-slate-400 text-xs md:text-sm font-medium tracking-wide">
            {t("joki", "landingDesc") ||
              "Pilih Game Favorit Anda dan Tingkatkan Rank Bersama Pro Player Vegaz"}
          </p>
        </div>

        {/* List Game */}
        {loading ? (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 animate-pulse mt-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="w-36 sm:w-44 md:w-52 bg-slate-800/50 rounded-2xl border border-white/5 aspect-[3/4]"
              ></div>
            ))}
          </div>
        ) : games.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-dashed border-slate-700 max-w-md mx-auto backdrop-blur-sm mt-8">
            <Gamepad2 className="mx-auto mb-3 text-slate-500" size={40} />
            <p className="text-slate-400 text-sm font-medium">
              Belum ada layanan joki game yang aktif.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-8">
            {games.map((game) => (
              <div
                key={game.id}
                onClick={() => navigate(`/joki/${game.slug || game.id}`)}
                className="group w-36 sm:w-44 md:w-52 flex flex-col bg-[#14141d]/80 rounded-2xl border border-white/10 hover:border-blue-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(37,99,235,0.2)] overflow-hidden backdrop-blur-md"
              >
                {/* Gambar Game */}
                <div className="w-full aspect-[3/4] overflow-hidden bg-slate-900">
                  <img
                    src={game.iconUrl || "https://placehold.co/302x402"}
                    alt={game.name}
                    className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>

                {/* Judul Game */}
                <div className="p-3 md:p-4 text-center border-t border-white/10 bg-gradient-to-b from-transparent to-slate-900/50">
                  <p className="text-xs md:text-sm font-bold text-white truncate uppercase tracking-wider">
                    {game.name}
                  </p>
                  <p className="text-[9px] md:text-[10px] text-blue-400 font-bold mt-1 uppercase tracking-widest">
                   Moonton
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
