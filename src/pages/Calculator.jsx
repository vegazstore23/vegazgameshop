import { useState, useRef } from "react";
// Import komponen hasil pemecahan sebelumnya
import WinrateForm from "../components/calculator/WinrateForm";
import EventForm from "../components/calculator/EventForm";
import CalculatorResult from "../components/calculator/CalculatorResult";

export default function Calculator() {

  const [activeTab, setActiveTab] = useState("winrate");
  const [wrInputs, setWrInputs] = useState({ match: "", wr: "", target: "" });
  const [magicCore, setMagicCore] = useState("");
  const [zodiacStar, setZodiacStar] = useState("");
  const [collectorStack, setCollectorStack] = useState("");
  const [calcResult, setCalcResult] = useState(null);


  const resultRef = useRef(null);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCalcResult(null); // Reset hasil saat pindah tab agar bersih
  };

  // --- FUNGSI HELPER AUTO SCROLL ---
  const scrollToResult = () => {
    // Delay 100ms agar React sempat merender konten baru sebelum di-scroll
    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  // --- LOGIC KALKULATOR WINRATE ---
  const handleCalcWr = () => {
    const tMatch = parseFloat(wrInputs.match);
    const tWr = parseFloat(wrInputs.wr);
    const targetWr = parseFloat(wrInputs.target);

    if (!tMatch || !tWr || !targetWr) {
      setCalcResult(<span>Harap isi semua kolom data match.</span>);
      scrollToResult();
      return;
    }

    if (targetWr <= tWr) {
      setCalcResult(
        <span>Target Winrate harus lebih tinggi dari saat ini!</span>,
      );
      scrollToResult();
      return;
    }

    const winMatch = (tWr / 100) * tMatch;
    const needWin = Math.ceil(
      (targetWr * tMatch - 100 * winMatch) / (100 - targetWr),
    );

    setCalcResult(
      <>
        <div className="animate-pulse mb-2 text-blue-400 text-sm uppercase font-black">
          Analisis Selesai
        </div>
        Kamu perlu{" "}
        <span className="text-blue-500 font-black text-3xl block my-2">
          {needWin} Win
        </span>{" "}
        tanpa kalah untuk mencapai WR {targetWr}%
      </>,
    );
    scrollToResult();
  };

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
          <span className="text-white font-black text-2xl">
            ±{estDiamond.toLocaleString("id-ID")} Diamond
          </span>
        </>,
      );
    }
    scrollToResult();
  };

  // --- LOGIC KALKULATOR ZODIAC ---
  const handleCalcZodiac = () => {
    const current = parseInt(zodiacStar) || 0;
    const needed = 100 - current;

    if (needed <= 0) {
      setCalcResult("Star Power sudah maksimal!");
    } else {
      const estDiamond = needed * 18;
      setCalcResult(
        <>
          Butuh{" "}
          <span className="text-orange-400 font-bold">{needed} Star Power</span>{" "}
          lagi.
          <br />
          <span className="text-white font-black text-2xl">
            ±{estDiamond.toLocaleString("id-ID")} Diamond
          </span>
        </>,
      );
    }
    scrollToResult();
  };

  // --- LOGIC KALKULATOR COLLECTOR ---
  const handleCalcCollector = () => {
    const currentStack = parseInt(collectorStack) || 0;
    const needed = 6 - currentStack;

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
          <div className="text-left bg-gray-800/50 p-4 rounded-xl space-y-2 text-sm mt-4">
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
    scrollToResult();
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#0a0c14] text-[#e8eaf6]">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="text-center mb-12">
          <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-900 text-4xl md:text-5xl font-black uppercase tracking-tighter font-orbitron mb-2 italic">
            MLBB Tools
          </h1>
          <p className="text-gray-500 font-medium italic">
            Optimalkan strategi gacha dan winrate kamu
          </p>
        </div>

        {/* TABS NAVIGATION */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 bg-gray-900/50 p-2 rounded-2xl border border-white/5 backdrop-blur-sm">
          {[
            { id: "winrate", label: "Winrate" },
            { id: "magicwheel", label: "Magic Wheel" },
            { id: "zodiac", label: "Zodiac" },
            { id: "collector", label: "Collector" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-105 font-black"
                  : "text-gray-500 hover:text-gray-300 hover:bg-white/5 font-bold"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* KOLOM KIRI: FORMULIR INPUT */}
          <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-gray-100">
            {activeTab === "winrate" && (
              <WinrateForm
                inputs={wrInputs}
                setInputs={setWrInputs}
                onCalc={handleCalcWr}
              />
            )}
            {activeTab === "magicwheel" && (
              <EventForm
                title="Magic Wheel"
                icon="ri- Ferris-wheel-line"
                value={magicCore}
                setValue={setMagicCore}
                onCalc={handleCalcMagic}
                label="Magic Core Saat Ini"
                placeholder="Contoh: 120"
              />
            )}
            {activeTab === "zodiac" && (
              <EventForm
                title="Zodiac Summon"
                icon="ri-star-line"
                value={zodiacStar}
                setValue={setZodiacStar}
                onCalc={handleCalcZodiac}
                label="Star Power Saat Ini"
                placeholder="0 - 99"
              />
            )}
            {activeTab === "collector" && (
              <EventForm
                title="Collector Event"
                icon="ri-shield-user-line"
                value={collectorStack}
                setValue={setCollectorStack}
                onCalc={handleCalcCollector}
                label="Hadiah Utama Dimiliki"
                placeholder="Contoh: 3"
              />
            )}
          </div>

          {/* KOLOM KANAN: HASIL (DENGAN REF) */}
          <div className="lg:col-span-5" ref={resultRef}>
            <CalculatorResult result={calcResult} />
          </div>
        </div>
      </div>
    </div>
  );
}
