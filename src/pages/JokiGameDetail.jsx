//JOKI PAGE LANDING ( DAFTAR GAME - SOON)

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import { Gamepad2 } from "lucide-react";

export default function JokiLanding() {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 pt-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight flex items-center justify-center gap-3">
            <Gamepad2 className="text-blue-500 animate-pulse" size={40} />
            VEGAZ JOKI SERVICE
          </h1>
          <p className="text-slate-400 text-sm md:text-base mt-2">
            Pilih Game Favorit Anda dan Tingkatkan Rank Bersama Pro Player Vegaz
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 p-6 md:p-8 rounded-3xl">
          <h2 className="text-lg font-bold text-white mb-6 border-b border-slate-800 pb-3">
            Daftar Game yang Tersedia
          </h2>

          {loading ? (
            <div className="h-40 flex items-center justify-center text-slate-500 font-medium text-sm animate-pulse">
              Memuat daftar game joki...
            </div>
          ) : games.length === 0 ? (
            <div className="text-center text-slate-500 italic py-12">
              Belum ada layanan joki game yang aktif.
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {games.map((game) => (
                <button
                  key={game.id}
                  onClick={() => navigate(`/joki/${game.id}`)} // Pindah ke slash spesifik game ID/Slug
                  className="flex flex-col items-center gap-4 p-5 rounded-2xl border bg-slate-900 border-slate-800 text-slate-400 hover:border-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group text-center"
                >
                  {game.iconUrl ? (
                    <img
                      src={game.iconUrl}
                      alt={game.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-700 group-hover:border-blue-500 transition-colors"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center font-bold text-xl text-white">
                      {game.name?.[0]}
                    </div>
                  )}
                  <span className="font-bold text-sm md:text-base leading-tight">
                    {game.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
