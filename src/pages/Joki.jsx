import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import { Gamepad2, Search } from "lucide-react";
import { useLangCurr } from "../components/context/LanguageCurrencyContext";

export default function Joki() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="w-full min-h-screen text-slate-100 antialiased font-sans pb-24 bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#020617] to-[#020617]">
      <div className="max-w-7xl mx-auto px-4 pt-6 space-y-8">
        <div className="text-center space-y-2 mt-4 md:mt-8">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight flex items-center justify-center gap-3 uppercase">
            <Gamepad2 className="text-blue-500 animate-pulse" size={36} />
            Vegaz Joki Service
          </h1>
          <p className="text-slate-400 text-xs md:text-sm">
            {t("joki", "landingDesc") ||
              "Pilih Game Favorit Anda dan Tingkatkan Rank Bersama Pro Player Vegaz"}
          </p>
        </div>

        <div className="flex justify-end items-center gap-4">
          <div className="w-full sm:w-72 relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={16}
            />
            <input
              type="text"
              placeholder={
                t("joki", "searchPlaceholder") || "Cari Game Joki..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-xs text-white focus:border-blue-500 outline-none transition-colors shadow-lg"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-40 sm:w-48 md:w-56 bg-slate-900 rounded-2xl border border-slate-800/80 aspect-[302/402]"
              ></div>
            ))}
          </div>
        ) : filteredGames.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/40 rounded-3xl border border-dashed border-slate-800 max-w-md mx-auto">
            <Gamepad2 className="mx-auto mb-3 text-slate-600" size={40} />
            <p className="text-slate-400 text-xs font-medium">
              Belum ada layanan joki game yang aktif.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {filteredGames.map((game) => (
              <div
                key={game.id}
                onClick={() => navigate(`/joki/${game.slug || game.id}`)}
                className="w-40 sm:w-48 md:w-56 group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800/80 hover:border-blue-500/80 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1"
                style={{ aspectRatio: "302 / 402" }}
              >
                <img
                  src={game.iconUrl || "https://placehold.co/302x402"}
                  alt={game.name}
                  className="w-full h-full object-cover select-none group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-10 text-center">
                  <p className="text-sm md:text-base font-black text-white line-clamp-2 group-hover:translate-y-0 translate-y-2 transition-transform duration-300 uppercase">
                    {game.name}
                  </p>
                  <p className="text-[10px] md:text-xs font-bold text-blue-400 tracking-wider uppercase opacity-90 line-clamp-1 mt-1">
                    Vegaz Pro Joki
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
