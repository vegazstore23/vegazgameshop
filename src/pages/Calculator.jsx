import { useState } from "react";

export default function Calculator() {
  // --- STATE UNTUK TAB ---
  const [activeTab, setActiveTab] = useState("winrate");

  // --- STATE UNTUK INPUT FORM ---
  const [wrInputs, setWrInputs] = useState({ match: "", wr: "", target: "" });
  const [magicCore, setMagicCore] = useState("");
  const [zodiacStar, setZodiacStar] = useState("");
  const [collectorStack, setCollectorStack] = useState("");

  // --- STATE UNTUK HASIL (RESULT) ---
  const [calcResult, setCalcResult] = useState(null);

  // --- LOGIC GANTI TAB ---
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCalcResult(null); // Reset hasil saat pindah tab
  };

  // --- LOGIC KALKULATOR WINRATE ---
  const handleCalcWr = () => {
    const tMatch = parseFloat(wrInputs.match);
    const tWr = parseFloat(wrInputs.wr);
    const targetWr = parseFloat(wrInputs.target);

    if (!tMatch || !tWr || !targetWr) {
      setCalcResult(<span>Harap isi semua kolom data match.</span>);
      return;
    }

    if (targetWr <= tWr) {
      setCalcResult(
        <span>Target Winrate harus lebih tinggi dari Winrate saat ini!</span>,
      );
      return;
    }

    const winMatch = (tWr / 100) * tMatch;
    const needWin = Math.ceil(
      (targetWr * tMatch - 100 * winMatch) / (100 - targetWr),
    );

    setCalcResult(
      <>
        <div className="animate-pulse mb-2 text-blue-400 text-sm uppercase">
          Analisis Selesai
        </div>
        Kamu perlu{" "}
        <span className="text-blue-500 font-black text-3xl block my-2">
          {needWin} Win
        </span>{" "}
        tanpa kalah untuk mencapai WR {targetWr}%
      </>,
    );
  };

  // --- LOGIC KALKULATOR MAGIC WHEEL ---
  const handleCalcMagic = () => {
    const current = parseInt(magicCore) || 0;
    const needed = 200 - current;

    if (needed <= 0) {
      setCalcResult("Magic Core kamu sudah cukup untuk menukar Legend Skin!");
    } else {
      const estDiamond = needed * 54;
      setCalcResult(
        <>
          Butuh <span className="text-purple-500 font-bold">{needed} Core</span>{" "}
          lagi.
          <br />
          <span className="text-sm opacity-60">Estimasi Biaya:</span>
          <br />
          <span className="text-white font-black text-2xl">
            ±{estDiamond.toLocaleString("id-ID")} Diamond
          </span>
        </>,
      );
    }
  };

  // --- LOGIC KALKULATOR ZODIAC ---
  const handleCalcZodiac = () => {
    const current = parseInt(zodiacStar) || 0;
    const needed = 100 - current;

    if (needed <= 0) {
      setCalcResult("Star Power sudah maksimal!");
    } else {
      const estDiamond = needed * 18; // Rata-rata optimis
      setCalcResult(
        <>
          Butuh{" "}
          <span className="text-orange-400 font-bold">{needed} Star Power</span>{" "}
          lagi.
          <br />
          <span className="text-sm opacity-60">Estimasi Terburuk:</span>
          <br />
          <span className="text-white font-black text-2xl">
            ±{estDiamond.toLocaleString("id-ID")} Diamond
          </span>
        </>,
      );
    }
  };

  // --- LOGIC KALKULATOR COLLECTOR ---
  const handleCalcCollector = () => {
    const currentStack = parseInt(collectorStack) || 0;
    const totalStack = 6;
    const needed = totalStack - currentStack;

    if (needed <= 0) {
      setCalcResult("Stack hadiah sudah maksimal!");
    } else {
      const estDaily = needed * 650;
      const estInstant = needed * 950;

      setCalcResult(
        <>
          <span className="text-yellow-500 font-bold text-lg">
            {needed} Hadiah Tersisa
          </span>
          <br />
          <br />
          <div className="text-left bg-gray-800/50 p-4 rounded-xl space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Cicilan Harian:</span>
              <span className="text-white font-bold">
                ±{estDaily.toLocaleString("id-ID")} DM
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tanpa Cicilan:</span>
              <span className="text-white font-bold">
                ±{estInstant.toLocaleString("id-ID")} DM
              </span>
            </div>
          </div>
        </>,
      );
    }
  };

  // --- COMPONENT RENDER ---
  return (
    <div
      className="min-h-screen overflow-x-hidden pt-24 md:pt-28 lg:pt-32"
      style={{
        background: "#0a0c14",
        color: "#e8eaf6",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* HEADER TEXT */}
        <div className="text-center mb-12">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 text-4xl md:text-5xl font-black uppercase tracking-tighter font-orbitron mb-2">
            MLBB Tools
          </h1>
          <p className="text-gray-500 font-medium italic">
            Optimalkan strategi gacha dan winrate kamu
          </p>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {[
            { id: "winrate", label: "Winrate" },
            { id: "magicwheel", label: "Magic Wheel" },
            { id: "zodiac", label: "Zodiac" },
            { id: "collector", label: "Collector" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl border-2 text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? "border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-200 scale-105"
                  : "border-gray-100 bg-gray-50 text-gray-600 hover:border-blue-400 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* KOLOM KIRI: FORM */}
          <div className="lg:col-span-7 bg-white border border-gray-100 p-8 rounded-3xl shadow-2xl shadow-gray-200/50">
            {/* FORM WINRATE */}
            {activeTab === "winrate" && (
              <div>
                <h3 className="text-gray-800 font-black text-xl mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-blue-600 rounded-full"></span>{" "}
                  WINRATE OPTIMIZER
                </h3>
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-gray-400 text-xs font-bold uppercase ml-1">
                        Total Match
                      </label>
                      <input
                        type="number"
                        value={wrInputs.match}
                        onChange={(e) =>
                          setWrInputs({ ...wrInputs, match: e.target.value })
                        }
                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="300"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-gray-400 text-xs font-bold uppercase ml-1">
                        Winrate Saat Ini (%)
                      </label>
                      <input
                        type="number"
                        value={wrInputs.wr}
                        onChange={(e) =>
                          setWrInputs({ ...wrInputs, wr: e.target.value })
                        }
                        className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition-all"
                        placeholder="65"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-gray-400 text-xs font-bold uppercase ml-1">
                      Target Winrate (%)
                    </label>
                    <input
                      type="number"
                      value={wrInputs.target}
                      onChange={(e) =>
                        setWrInputs({ ...wrInputs, target: e.target.value })
                      }
                      className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 text-gray-800 outline-none focus:border-blue-500 focus:bg-white transition-all"
                      placeholder="70"
                    />
                  </div>
                  <button
                    onClick={handleCalcWr}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all active:scale-95 mt-4"
                  >
                    HITUNG SEKARANG
                  </button>
                </div>
              </div>
            )}

            {/* FORM MAGIC WHEEL */}
            {activeTab === "magicwheel" && (
              <div>
                <h3 className="text-gray-800 font-black text-xl mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-purple-600 rounded-full"></span>{" "}
                  MAGIC WHEEL ESTIMASI
                </h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-gray-400 text-xs font-bold uppercase ml-1">
                      Magic Core Saat Ini
                    </label>
                    <input
                      type="number"
                      value={magicCore}
                      onChange={(e) => setMagicCore(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 text-gray-800 outline-none focus:border-purple-500 focus:bg-white transition-all"
                      placeholder="Contoh: 20"
                    />
                  </div>
                  <button
                    onClick={handleCalcMagic}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-purple-200 transition-all mt-4"
                  >
                    HITUNG ESTIMASI
                  </button>
                </div>
              </div>
            )}

            {/* FORM ZODIAC */}
            {activeTab === "zodiac" && (
              <div>
                <h3 className="text-gray-800 font-black text-xl mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-orange-500 rounded-full"></span>{" "}
                  ZODIAC ESTIMASI
                </h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-gray-400 text-xs font-bold uppercase ml-1">
                      Star Power Saat Ini
                    </label>
                    <input
                      type="number"
                      value={zodiacStar}
                      onChange={(e) => setZodiacStar(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 text-gray-800 outline-none focus:border-orange-500 focus:bg-white transition-all"
                      placeholder="0 - 99"
                    />
                  </div>
                  <button
                    onClick={handleCalcZodiac}
                    className="w-full bg-gradient-to-r from-orange-500 to-yellow-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-orange-200 transition-all mt-4"
                  >
                    HITUNG ESTIMASI
                  </button>
                </div>
              </div>
            )}

            {/* FORM COLLECTOR */}
            {activeTab === "collector" && (
              <div>
                <h3 className="text-gray-800 font-black text-xl mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-yellow-500 rounded-full"></span>
                  COLLECTOR ESTIMASI
                </h3>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-gray-400 text-xs font-bold uppercase ml-1">
                      Hadiah Utama Dimiliki (0-5)
                    </label>
                    <input
                      type="number"
                      value={collectorStack}
                      onChange={(e) => setCollectorStack(e.target.value)}
                      className="w-full bg-gray-50 border-2 border-gray-50 rounded-2xl p-4 text-gray-800 outline-none focus:border-yellow-500 focus:bg-white transition-all"
                      placeholder="Contoh: 3"
                    />
                  </div>
                  <button
                    onClick={handleCalcCollector}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-yellow-200 transition-all mt-4"
                  >
                    HITUNG ESTIMASI
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* KOLOM KANAN: HASIL ANALISIS */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden relative">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full"></div>

              <h4 className="text-blue-400 font-bold text-sm uppercase tracking-widest mb-6 flex items-center gap-2">
                <i className="ri-bar-chart-box-line"></i> Hasil Analisis
              </h4>

              <div className="min-h-[150px] flex items-center justify-center text-center">
                <div className="text-white text-xl font-medium leading-relaxed">
                  {/* Tampilkan pesan Default atau Hasil Kalkulasi */}
                  {calcResult ? (
                    calcResult
                  ) : (
                    <span className="text-gray-400 text-base">
                      Masukkan data kamu untuk melihat estimasi dan analisis di
                      sini.
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-800 text-gray-500 text-xs text-center">
                *Estimasi ini bersifat perkiraan berdasarkan algoritma umum
                MLBB.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
