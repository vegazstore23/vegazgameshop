import { useState, useRef, useEffect } from "react";
import WinrateForm from "../components/calculator/WinrateForm";
import EventForm from "../components/calculator/EventForm";
import CalculatorResult from "../components/calculator/CalculatorResult";
import ScrollReveal from "../components/ScrollReveal.jsx";

export default function Calculator() {
  useEffect(() => {
    document.title = "Calculator Winrate & Gacha MLBB | VegazGameShop";
  }, []);

  const [activeTab, setActiveTab] = useState("winrate");
  const [wrInputs, setWrInputs] = useState({ match: "", wr: "", target: "" });
  const [magicCore, setMagicCore] = useState("");
  const [zodiacStar, setZodiacStar] = useState("");
  const [collectorStack, setCollectorStack] = useState("");
  const [calcResult, setCalcResult] = useState(null);

  const resultRef = useRef(null);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCalcResult(null);
  };

  const scrollToResult = () => {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleCalcWr = () => {
    const tMatch = parseFloat(wrInputs.match);
    const tWr = parseFloat(wrInputs.wr);
    const targetWr = parseFloat(wrInputs.target);

    if (!tMatch || !tWr || !targetWr) {
      setCalcResult(<span>Sila isi semua medan data perlawanan.</span>);
      scrollToResult();
      return;
    }

    if (targetWr <= tWr) {
      setCalcResult(
        <span>Sasaran Winrate mestilah lebih tinggi daripada semasa!</span>,
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
        Anda memerlukan{" "}
        <span className="text-blue-500 font-black text-3xl block my-2">
          {needWin} Kemenangan
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
      setCalcResult(
        "Magic Core anda sudah mencukupi untuk menukar Skin Legend!",
      );
    } else {
      const estDiamond = needed * 54;
      setCalcResult(
        <>
          Perlu <span className="text-purple-500 font-bold">{needed} Core</span>{" "}
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

  const handleCalcZodiac = () => {
    const current = parseInt(zodiacStar) || 0;
    const needed = 100 - current;

    if (needed <= 0) {
      setCalcResult("Star Power sudah maksimum!");
    } else {
      const estDiamond = needed * 18;
      setCalcResult(
        <>
          Perlu{" "}
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

  const handleCalcCollector = () => {
    const currentStack = parseInt(collectorStack) || 0;
    const needed = 6 - currentStack;

    if (needed <= 0) {
      setCalcResult("Stack ganjaran sudah maksimum!");
    } else {
      const estDaily = needed * 650;
      const estInstant = needed * 950;

      setCalcResult(
        <>
          <span className="text-yellow-500 font-bold text-lg">
            {needed} Ganjaran Berbaki
          </span>
          <div className="text-left bg-black/40 p-4 rounded-xl space-y-2 text-sm mt-4 border border-white/5">
            <div className="flex justify-between">
              <span>Ansuran Harian:</span>
              <span className="text-white font-bold">
                ±{estDaily.toLocaleString("id-ID")} DM
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tanpa Ansuran:</span>
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
    <div className="min-h-screen pt-32 pb-20 bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950">
      <div className="max-w-6xl mx-auto px-4">
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-white text-4xl md:text-5xl font-black uppercase tracking-tighter font-orbitron mb-2 italic">
              MLBB <span className="text-blue-500">Tools</span>
            </h1>
            <p className="text-gray-500 text-xs tracking-widest uppercase">
              Alat bantuan strategi & gacha VegazGameShop
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10 bg-black/40 backdrop-blur-md p-2 rounded-2xl border border-white/5">
            {[
              { id: "winrate", label: "Winrate" },
              { id: "magicwheel", label: "Magic Wheel" },
              { id: "zodiac", label: "Zodiac" },
              { id: "collector", label: "Collector" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 scale-105"
                    : "text-gray-500 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <ScrollReveal delay={0.15}>
              <div className="bg-[#172454] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
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
                    label="Magic Core Semasa"
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
                    label="Star Power Semasa"
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
                    label="Ganjaran Utama Dimiliki"
                    placeholder="Contoh: 3"
                  />
                )}
              </div>
            </ScrollReveal>
          </div>

          <div className="lg:col-span-5" ref={resultRef}>
            <ScrollReveal delay={0.2}>
              <CalculatorResult result={calcResult} />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
