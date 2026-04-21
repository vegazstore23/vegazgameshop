import { useState, useRef, useEffect } from "react";
import { apiGet } from "../services/api";
import ScrollReveal from "../components/ScrollReveal.jsx";

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  NOT_FOUND: "not_found",
  ERROR: "error",
};

function friendlyError(msg = "") {
  const m = msg.toLowerCase();
  if (
    m.includes("tidak valid") ||
    m.includes("invalid") ||
    m.includes("not found")
  )
    return "ID Pengguna atau ID Zon tidak dijumpai. Sila semak semula input anda.";
  return "Ralat sistem berlaku. Pastikan sambungan stabil dan cuba lagi.";
}

function RegionHeroBanner() {
  return (
    <div className="relative w-full overflow-hidden pt-20 pb-12 md:pt-32 md:pb-20 bg-[#172454]">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(0deg, transparent 24%, rgba(255,255,255,.05) 25%, rgba(255,255,255,.05) 26%, transparent 27%, transparent 74%, rgba(255,255,255,.05) 75%, rgba(255,255,255,.05) 76%, transparent 77%, transparent)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-6 flex flex-col items-center text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
              Semakan Pelayan Rasmi
            </span>
          </div>

          <h1 className="text-white text-4xl md:text-6xl font-black uppercase tracking-tight mb-4 font-orbitron">
            SEMAK <span className="text-blue-400">ID</span>
          </h1>

          <p className="text-white/50 text-xs md:text-sm max-w-xl leading-relaxed">
            Sahkan identiti akaun Mobile Legends dengan pantas dan tepat melalui
            integrasi sistem API VegazGameShop.
          </p>
        </ScrollReveal>
      </div>
    </div>
  );
}

export default function Region() {
  const [gameId, setGameId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [status, setStatus] = useState(STATUS.IDLE);
  const [result, setResult] = useState(null);
  const [errMsg, setErrMsg] = useState("");
  const resultRef = useRef(null);

  async function handleSubmit() {
    if (!gameId.trim() || !zoneId.trim()) {
      setStatus(STATUS.NOT_FOUND);
      setErrMsg("Sila isi ID Pengguna dan ID Zon.");
      return;
    }
    setStatus(STATUS.LOADING);
    setResult(null);
    setErrMsg("");

    try {
      const data = await apiGet(`/api/region?id=${gameId}&serverid=${zoneId}`);
      if (data?.status === "success" && data?.result?.nickname) {
        setResult({
          nickname: data.result.nickname,
          country: data.result.country || "Global",
        });
        setStatus(STATUS.SUCCESS);
      } else {
        setErrMsg(friendlyError(data?.message || ""));
        setStatus(STATUS.NOT_FOUND);
      }
    } catch (err) {
      setErrMsg(friendlyError(err?.message || ""));
      setStatus(STATUS.ERROR);
    }

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }

  useEffect(() => {
    document.title = "Region Checker MLBB | VegazGameShop";
  }, []);

  return (
    <div className="min-h-screen bg-[#141414]">
      <RegionHeroBanner />

      <section className="max-w-7xl mx-auto px-4 -mt-8 pb-20 relative z-30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <ScrollReveal delay={0.1}>
            <div className="bg-[#172454] rounded-2xl p-8 border border-white/10 shadow-2xl">
              <h2 className="text-white font-bold text-sm uppercase tracking-widest mb-8 flex items-center gap-3">
                <span className="w-1 h-4 bg-blue-500 rounded-full" />
                Masukkan Data Akaun
              </h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-[10px] font-bold text-blue-300/60 uppercase mb-2 ml-1">
                    ID Pengguna
                  </label>
                  <input
                    type="number"
                    value={gameId}
                    onChange={(e) => setGameId(e.target.value)}
                    placeholder="Contoh: 12345678"
                    className="w-full bg-[#0f172a] border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:border-blue-500 outline-none transition-all placeholder:text-white/10"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold text-blue-300/60 uppercase mb-2 ml-1">
                    ID Zon
                  </label>
                  <input
                    type="number"
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    placeholder="Contoh: 1234"
                    className="w-full bg-[#0f172a] border border-white/5 rounded-xl px-4 py-3.5 text-white text-sm focus:border-blue-500 outline-none transition-all placeholder:text-white/10"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={status === STATUS.LOADING}
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/40 uppercase text-xs tracking-widest disabled:opacity-50"
                >
                  {status === STATUS.LOADING
                    ? "Menyemak..."
                    : "Semak Nama Pengguna"}
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div ref={resultRef}>
              {status === STATUS.IDLE && (
                <div className="h-full min-h-[300px] border border-white/5 bg-white/[0.02] rounded-2xl flex flex-col items-center justify-center text-center p-6">
                  <p className="text-white/20 text-xs font-bold uppercase tracking-widest">
                    Keputusan akan dipaparkan di sini
                  </p>
                </div>
              )}

              {status === STATUS.SUCCESS && result && (
                <div className="bg-[#172454] border border-blue-500/30 rounded-2xl p-8 animate-in fade-in slide-in-from-right-4">
                  <div className="text-[10px] font-black text-blue-400 uppercase mb-6 tracking-tighter flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Akaun Disahkan
                  </div>
                  <div className="space-y-6">
                    <div>
                      <p className="text-[10px] text-white/40 uppercase mb-1">
                        Nama Pengguna
                      </p>
                      <p className="text-3xl font-black text-white italic font-orbitron">
                        {result.nickname}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                      <div>
                        <p className="text-[10px] text-white/40 uppercase mb-1">
                          Wilayah
                        </p>
                        <p className="text-sm font-bold text-white">
                          {result.country}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] text-white/40 uppercase mb-1">
                          Status
                        </p>
                        <p className="text-sm font-bold text-green-400">
                          Normal
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {(status === STATUS.NOT_FOUND || status === STATUS.ERROR) && (
                <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-8 flex flex-col items-center text-center animate-in fade-in">
                  <p className="text-red-400 font-bold text-[10px] uppercase mb-2 tracking-widest">
                    Ralat
                  </p>
                  <p className="text-white/60 text-sm">{errMsg}</p>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="h-20 bg-[#141414]" />
    </div>
  );
}
