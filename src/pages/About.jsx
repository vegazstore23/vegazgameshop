import { useState, useEffect } from "react";
import ScrollReveal from "../components/ScrollReveal.jsx";
import AboutContent from "../components/about/AboutContent";
import AboutFaq from "../components/about/AboutFaq";
import AboutTerms from "../components/about/AboutTerms";
import AboutPrivacy from "../components/about/AboutPrivacy";

export default function About() {
  useEffect(() => {
    document.title = "About FAQ | VegazGameShop";
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
    <div className="min-h-screen pt-32 pb-20 bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <ScrollReveal>
          <header className="text-center mb-10">
            <h1 className="text-white text-3xl font-black uppercase tracking-tighter font-orbitron italic mb-2">
              Maklumat / <span className="text-blue-500">Soalan Lazim</span>
            </h1>
            <p className="text-gray-400 text-xs tracking-widest uppercase">
              Terma &amp; Panduan VegazGameShop
            </p>
          </header>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex gap-2 p-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl mb-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`flex-1 min-w-[80px] py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20 scale-[1.03]"
                    : "text-gray-500 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div
            className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl prose prose-invert max-w-none prose-sm"
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
