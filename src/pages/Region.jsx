import { useState } from "react";
import { apiGet } from "../services/api";

export default function Region() {
  const [gameId, setGameId] = useState("");
  const [serverId, setServerId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  function resetAlerts() {
    setError("");
    setResult(null);
  }

  async function handleSubmit() {
    resetAlerts();

    if (!gameId.trim() || !serverId.trim()) {
      setError("User ID dan Server ID wajib diisi.");
      return;
    }

    setLoading(true);
    try {
      const data = await apiGet(
        `/api/region?id=${encodeURIComponent(gameId)}&serverid=${encodeURIComponent(serverId)}`,
      );

      if (data.status === "success") {
        setResult({
          nickname: data.result.nickname,
          country: data.result.country,
        });
      } else {
        setError(data.message || "ID atau Server ID tidak valid.");
      }
    } catch (err) {
      console.error(err);
      setError("Terjadi kesalahan koneksi ke server.");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <>

      <main className="pt-24 md:pt-28 lg:pt-32 min-h-screen bg-[url('/assets/images/background/bg-stripe.webp')] bg-center bg-cover">
        <div className="max-w-4xl mx-auto px-4">
          {/* TITLE */}
          <h1 className="text-white text-3xl font-bold text-center mb-8 uppercase tracking-widest font-orbitron">
            ID Checker
          </h1>

          {/* CARD */}
          <div className="bg-blue-900/40 backdrop-blur-md border border-blue-500/20 p-6 rounded-2xl shadow-xl">
            <h3 className="text-blue-400 font-bold mb-4 uppercase text-sm">
              Cek ID Mobile Legends
            </h3>
            <p className="text-gray-300 text-sm mb-6">
              Masukkan User ID dan Server ID untuk mengetahui username dan
              region account.
            </p>

            {/* INPUT */}
            <div className="space-y-4">
              <input
                type="number"
                id="gameId"
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="User ID 123456789"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500 transition-all"
              />
              <input
                type="number"
                id="serverId"
                value={serverId}
                onChange={(e) => setServerId(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Server ID (1234)"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white outline-none focus:border-blue-500 transition-all"
              />
            </div>

            {/* BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold py-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Memeriksa..." : "CHECK NOW"}
            </button>

            {/* ERROR */}
            {error && (
              <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-300 p-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            {/* RESULT */}
            {result && (
              <div className="mt-4 bg-emerald-400/10 border border-emerald-400/30 text-white p-4 rounded-xl">
                <p className="text-emerald-400 font-bold mb-2">
                  Akun Ditemukan
                </p>
                <p className="text-sm">
                  Nickname:{" "}
                  <span className="font-semibold">
                    {result.nickname || "—"}
                  </span>
                </p>
                <p className="text-sm">
                  Country:{" "}
                  <span className="font-semibold">{result.country || "—"}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

    </>
  );
}
