import { useState, useEffect } from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import AboutContent from "../components/about/AboutContent";
import AboutFaq from "../components/about/AboutFaq";
import AboutTerms from "../components/about/AboutTerms";
import AboutPrivacy from "../components/about/AboutPrivacy";

export default function About() {
  useEffect(() => {
    document.title = "Tentang & FAQ | VegazGameShop";
  }, []);

  const [activeTab, setActiveTab] = useState("about");
  const [animating, setAnimating] = useState(false);

  const tabs = [
    { id: "about", label: "Tentang Kami" },
    { id: "faq", label: "Soalan Lazim" },
    { id: "syarat", label: "Syarat & Perjanjian" },
    { id: "kebijakan", label: "Privasi" },
  ];

  const handleTabChange = (tab) => {
    if (tab === activeTab || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimating(false);
    }, 200);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#020617] to-[#020617]">
      <div className="max-w-4xl mx-auto px-4">
        {/* Hero Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-200 to-white mb-4">
              Maklumat & Soalan Lazim
            </h1>
            <p className="text-sm md:text-base text-gray-400 max-w-xl mx-auto">
              Semua perkara yang anda perlu tahu mengenai platform
              VegazGameShop, dasar privasi, dan terma perkhidmatan kami.
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

        {/* Active Content Panel */}
        <ScrollReveal delay={0.15}>
          <div
            className="bg-slate-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-10 rounded-3xl prose prose-invert max-w-none prose-sm shadow-2xl transition-all duration-300"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating
                ? "translateY(10px) scale(0.99)"
                : "translateY(0) scale(1)",
              transition: "opacity 200ms ease, transform 200ms ease",
            }}
          >
            {activeTab === "about" && <AboutContent />}
            {activeTab === "faq" && <AboutFaq />}
            {activeTab === "syarat" && <AboutTerms />}
            {activeTab === "kebijakan" && <AboutPrivacy />}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
