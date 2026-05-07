import { useState, useRef, useEffect } from "react";
import WinrateForm from "../components/calculator/WinrateForm";
import EventForm from "../components/calculator/EventForm";
import CalculatorResult from "../components/calculator/CalculatorResult";
import ScrollReveal from "../components/ScrollReveal.jsx";

export default function Calculator() {
  useEffect(() => {
    document.title = "Kalkulator Gacha & Winrate | VegazGameShop";
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

    if (isNaN(tMatch) || isNaN(tWr) || isNaN(targetWr)) return;
    const result = calculateWinrate(tMatch, tWr, targetWr);
    setCalcResult(result);
    scrollToResult();
  };

  const handleCalcMagic = () => {
    const core = parseInt(magicCore);
    if (isNaN(core)) return;
    const result = calculateMagic(core);
    setCalcResult(result);
    scrollToResult();
  };

  const handleCalcZodiac = () => {
    const star = parseInt(zodiacStar);
    if (isNaN(star)) return;
    const result = calculateZodiac(star);
    setCalcResult(result);
    scrollToResult();
  };

  const handleCalcCollector = () => {
    const stack = parseInt(collectorStack);
    if (isNaN(stack)) return;
    const result = calculateCollector(stack);
    setCalcResult(result);
    scrollToResult();
  };

  const calculateWinrate = (match, wr, target) => {
    if (target >= 100 || target <= wr)
      return { error: "Sasaran winrate tidak logik atau telah dicapai." };
    const num = match * (target - wr);
    const den = 100 - target;
    const needed = Math.ceil(num / den);
    return {
      type: "winrate",
      needed,
      title: "Kalkulator Winrate",
      desc: `Anda memerlukan sekurang-kurangnya ${needed} kemenangan berturut-turut tanpa kalah untuk mencapai sasaran ${target}% winrate.`,
    };
  };

  const calculateMagic = (core) => {
    const needed = Math.max(0, 200 - core);
    const draws = Math.ceil(needed / 1.2);
    return {
      type: "magic",
      needed,
      draws,
      title: "Kalkulator Magic Wheel",
      desc: `Anda memerlukan ${needed} Magic Core lagi (Anggaran sekitar ${draws} kali cabutan).`,
    };
  };

  const calculateZodiac = (star) => {
    const needed = Math.max(0, 100 - star);
    const diamonds = needed * 20;
    return {
      type: "zodiac",
      needed,
      diamonds,
      title: "Kalkulator Zodiac Summon",
      desc: `Anda memerlukan ${needed} Star Power lagi (Anggaran sekitar ${diamonds} Diamond diperlukan).`,
    };
  };

  const calculateCollector = (stack) => {
    const stepsLeft = Math.max(0, 6 - stack);
    return {
      type: "collector",
      stepsLeft,
      title: "Kalkulator Collector",
      desc: `Anda memerlukan ${stepsLeft} ganjaran utama lagi untuk melengkapkan acara ini sepenuhnya.`,
    };
  };

  const tabs = [
    { id: "winrate", label: "Winrate MLBB" },
    { id: "magic", label: "Magic Wheel" },
    { id: "zodiac", label: "Zodiac" },
    { id: "collector", label: "Collector" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#020617] to-[#020617]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white mb-4">
              Kalkulator Gacha & Winrate
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
              Simulasikan perbelanjaan Diamond anda untuk acara gacha atau
              rancang strategi perlawanan untuk mencapai winrate sasaran anda.
            </p>
          </div>
        </ScrollReveal>

        {/* Tabs Container */}
        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 p-1.5 bg-slate-900/80 backdrop-blur-md border border-white/5 rounded-2xl mb-8 overflow-x-auto scrollbar-none">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 min-w-[120px] py-3 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/20 scale-[1.02]"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Form Container */}
          <div className="lg:col-span-7 h-full">
            <ScrollReveal delay={0.15}>
              <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 rounded-3xl shadow-2xl h-full flex flex-col justify-between">
                {activeTab === "winrate" && (
                  <WinrateForm
                    inputs={wrInputs}
                    setInputs={setWrInputs}
                    onCalc={handleCalcWr}
                  />
                )}
                {activeTab === "magic" && (
                  <EventForm
                    title="Magic Wheel"
                    icon="ri-ferris-wheel-line"
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

          {/* Result Container */}
          <div className="lg:col-span-5 h-full" ref={resultRef}>
            <ScrollReveal delay={0.2}>
              <div className="h-full min-h-[340px] flex flex-col justify-center">
                {!calcResult ? (
                  <div className="bg-slate-900/20 border border-white/5 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[340px]">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-4 text-white/40">
                      <i className="ri-calculator-line text-xl"></i>
                    </div>
                    <p className="text-white/40 text-xs uppercase tracking-widest font-black mb-1">
                      Hasil Pengiraan
                    </p>
                    <p className="text-white/30 text-xs max-w-[200px]">
                      Sila masukkan butiran input bagi mendapatkan analisis data
                      perancangan.
                    </p>
                  </div>
                ) : (
                  <div className="bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 h-full min-h-[340px] flex flex-col justify-between">
                    <CalculatorResult result={calcResult} />
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
