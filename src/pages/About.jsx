import { useState, useEffect } from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import AboutContent from "../components/about/AboutContent";
import AboutFaq from "../components/about/AboutFaq";
import AboutTerms from "../components/about/AboutTerms";
import AboutPrivacy from "../components/about/AboutPrivacy";
import { Info, HelpCircle, ShieldAlert, ShieldCheck } from "lucide-react";

export default function About() {
  useEffect(() => {
    document.title = "Tentang & FAQ | VegazGameShop";
  }, []);

  const [activeTab, setActiveTab] = useState("about");
  const [animating, setAnimating] = useState(false);

  const tabs = [
    { id: "about", label: "Tentang Kami", icon: Info },
    { id: "faq", label: "Soalan Lazim", icon: HelpCircle },
    { id: "syarat", label: "Terma & Syarat", icon: ShieldAlert },
    { id: "kebijakan", label: "Dasar Privasi", icon: ShieldCheck },
  ];

  const handleTabChange = (tab) => {
    if (tab === activeTab || animating) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimating(false);
    }, 150);
  };

  return (
    <div className="min-h-screen pt-28 md:pt-36 pb-24 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[300px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-10 md:mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.25em] mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Pusat Maklumat Resmi
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white font-orbitron mb-3 bg-gradient-to-r from-white via-slate-200 to-blue-300 bg-clip-text text-transparent">
              Pusat Bantuan & FAQ
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              Panduan lengkap mengenai platform VegazGameShop, polisi jaminan
              keselamatan, terma perkhidmatan, dan jawapan soalan lazim.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="p-1.5 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-2xl mb-8 flex gap-1.5 overflow-x-auto custom-scrollbar shadow-2xl">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex-1 min-w-[130px] sm:min-w-0 py-3 px-4 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shrink-0 ${
                    isActive
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 scale-[1.01]"
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon
                    size={14}
                    className={isActive ? "text-white" : "text-slate-500"}
                  />
                  <span className="whitespace-nowrap">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-6 sm:p-8 md:p-10 rounded-3xl shadow-2xl transition-all duration-200"
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(8px)" : "translateY(0)",
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
