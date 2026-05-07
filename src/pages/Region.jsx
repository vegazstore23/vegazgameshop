import { useState, useEffect } from "react";
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

export default function Region() {
  useEffect(() => {
    document.title = "Semak Wilayah Akaun | VegazGameShop";
  }, []);

  const [status, setStatus] = useState(STATUS.IDLE);
  const [errMsg, setErrMsg] = useState("");
  const [result, setResult] = useState(null);
  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");

  const handleCheck = async (e) => {
    e.preventDefault();
    if (!userId || !zoneId) {
      setErrMsg("Sila masukkan ID Pengguna dan ID Zon.");
      setStatus(STATUS.ERROR);
      return;
    }

    setStatus(STATUS.LOADING);
    try {
      const res = await apiGet(
        `/check-region?userId=${userId}&zoneId=${zoneId}`,
      );
      if (res.success && res.data) {
        setResult(res.data);
        setStatus(STATUS.SUCCESS);
      } else {
        setErrMsg(friendlyError(res.message || "not found"));
        setStatus(STATUS.NOT_FOUND);
      }
    } catch (err) {
      setErrMsg(friendlyError(err.message));
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#020617] to-[#020617]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white mb-4">
              Semak Wilayah Akaun
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
              Sila masukkan ID Pengguna dan ID Zon akaun anda di bawah untuk
              mengesahkan wilayah pendaftaran akaun permainan anda secara
              langsung.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Form Container */}
          <div className="lg:col-span-7 h-full">
            <ScrollReveal delay={0.1}>
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl h-full flex flex-col justify-between">
                <form onSubmit={handleCheck} className="space-y-6">
                  <div>
                    <label className="block text-[10px] text-white/40 uppercase tracking-widest font-black mb-2">
                      ID Pengguna
                    </label>
                    <input
                      type="text"
                      value={userId}
                      onChange={(e) => setUserId(e.target.value)}
                      placeholder="Contoh: 12345678"
                      className="w-full bg-slate-950/50 border border-white/5 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white rounded-2xl p-4 transition-all outline-none text-sm placeholder-white/20"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/40 uppercase tracking-widest font-black mb-2">
                      ID Zon
                    </label>
                    <input
                      type="text"
                      value={zoneId}
                      onChange={(e) => setZoneId(e.target.value)}
                      placeholder="Contoh: 1234"
                      className="w-full bg-slate-950/50 border border-white/5 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 text-white rounded-2xl p-4 transition-all outline-none text-sm placeholder-white/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === STATUS.LOADING}
                    className="w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 bg-gradient-to-r from-blue-600 to-indigo-600 hover:scale-[1.02] active:scale-[0.98] text-white shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:pointer-events-none"
                  >
                    {status === STATUS.LOADING
                      ? "Menyemak..."
                      : "Semak Sekarang"}
                  </button>
                </form>
              </div>
            </ScrollReveal>
          </div>

          {/* Result Panel */}
          <div className="lg:col-span-5 h-full">
            <ScrollReveal delay={0.15}>
              <div className="h-full min-h-[340px] flex flex-col justify-center">
                {status === STATUS.IDLE && (
                  <div className="bg-slate-900/20 border border-white/5 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[340px]">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-white/40">
                      <i className="ri-shield-user-line text-xl"></i>
                    </div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-black mb-1">
                      Sedia Menunggu
                    </p>
                    <p className="text-white/30 text-xs max-w-[200px]">
                      Masukkan butiran akaun anda untuk memulakan carian zon
                      wilayah.
                    </p>
                  </div>
                )}

                {status === STATUS.LOADING && (
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[340px] animate-pulse">
                    <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-4" />
                    <p className="text-blue-400 font-bold text-[10px] uppercase tracking-widest">
                      Sistem Sedang Memproses
                    </p>
                  </div>
                )}

                {status === STATUS.SUCCESS && result && (
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 h-full min-h-[340px] flex flex-col justify-between">
                    <div>
                      <p className="text-green-400 font-bold text-[10px] uppercase tracking-widest mb-4">
                        Carian Berjaya
                      </p>
                      <div className="space-y-4 mb-6">
                        <div>
                          <p className="text-[10px] text-white/40 uppercase mb-0.5">
                            Nama Pengguna
                          </p>
                          <p className="text-lg font-black text-white">
                            {result.username}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                          <div>
                            <p className="text-[10px] text-white/40 uppercase mb-0.5">
                              Wilayah
                            </p>
                            <p className="text-sm font-bold text-white">
                              {result.country}
                            </p>
                          </div>
                          <div>
                            <p className="text-[10px] text-white/40 uppercase mb-0.5">
                              Status
                            </p>
                            <p className="text-sm font-bold text-green-400">
                              Normal
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(status === STATUS.NOT_FOUND || status === STATUS.ERROR) && (
                  <div className="bg-red-500/5 border border-red-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center animate-in fade-in duration-300 h-full min-h-[340px]">
                    <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center mb-4 text-red-400">
                      <i className="ri-error-warning-line text-xl"></i>
                    </div>
                    <p className="text-red-400 font-bold text-[10px] uppercase mb-2 tracking-widest">
                      Ralat Sistem
                    </p>
                    <p className="text-white/60 text-xs leading-relaxed max-w-[220px]">
                      {errMsg}
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
