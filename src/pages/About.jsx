import { useState } from "react";
import AboutContent from "../components/about/AboutContent";
import AboutFaq from "../components/about/AboutFaq";
import AboutTerms from "../components/about/AboutTerms";

export default function About() {
  const [activeTab, setActiveTab] = useState("about");

  const tabs = [
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
    { id: "syarat", label: "S&K" },
    { id: "kebijakan", label: "Privasi" },
  ];

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-10">
          <h1 className="text-white text-3xl font-black uppercase tracking-tighter font-orbitron italic mb-2">
            Info / <span className="text-blue-500">FAQ</span>
          </h1>
          <p className="text-gray-400 text-xs tracking-widest uppercase">
            Ketentuan & Panduan Vegazgameshop
          </p>
        </header>

        {/* Unified Tabs UI */}
        <div className="flex gap-2 p-1 bg-black/40 backdrop-blur-md border border-white/5 rounded-2xl mb-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-[80px] py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "text-gray-500 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-3xl prose prose-invert max-w-none prose-sm">
          {activeTab === "about" && <AboutContent />}
          {activeTab === "faq" && <AboutFaq />}
          {activeTab === "syarat" && <AboutTerms />}
        </div>
      </div>
    </div>
  );
}
