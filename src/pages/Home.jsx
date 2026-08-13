import React, { useEffect } from "react";
import {
  RiFireLine,
  RiStarFill,
  RiMessage3Fill,
  RiPhoneFill,
} from "react-icons/ri";

import Banner from "../components/home/Banner";
import FlashSaleSection from "../components/home/FlashSaleSection";
import FeaturedAccounts from "../components/home/FeaturedAccounts";
import SellAccount from "../components/home/SellAccount";
import FeedbackSlider from "../components/home/FeedbackSlider";
import ContactSection from "../components/home/ContactSection";
import PopularSection from "../components/home/PopularSection";
import ScrollReveal from "../components/ScrollReveal.jsx";
import Advantages from "../components/stock/Advantages";

function MarqueeTicker() {
  const items = [
    "SAFE TRANSACTION",
    "INSTANT PROCESS",
    "TRUSTED SELLER",
    "24/7 SUPPORT",
    "SECURE DATA",
  ];
  return (
    <div className="w-full overflow-hidden bg-[#011F5B] border-y border-yellow-500/30 py-2.5">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-[10px] font-black tracking-[0.3em] text-gray-300 flex items-center gap-3"
          >
            <div className="w-1 h-1 bg-yellow-400 rounded-full" /> {item}
          </span>
        ))}
      </div>
      <style>{`
        .animate-marquee { animation: marquee 25s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

export default function Home() {
  useEffect(() => {
    document.title =
      "VegazGameShop — Platform Jual Beli & Topup Games Malaysia";
  }, []);

  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#050b14] to-[#02060a]">
      <section className="w-full bg-[#09052b] py-3">
        <div className="max-w-7xl mx-auto px-4">
          <Banner />
        </div>
      </section>

      <div>
        <MarqueeTicker />

        <section className="w-full bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#020617] to-[#020617] py-12 px-4">
          <div className="max-w-7xl mx-auto flex flex-col gap-16">
            <ScrollReveal delay={0.1}>
              <FlashSaleSection />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-4">
                  <h2 className="text-2xl font-bold font-orbitron tracking-tighter flex items-center gap-3 uppercase italic">
                    <RiFireLine className="text-blue-500" /> Trending
                  </h2>
                </div>
                <PopularSection />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-4">
                <h2 className="text-2xl font-bold font-orbitron tracking-tighter flex items-center gap-3 uppercase italic">
                  <RiStarFill className="text-blue-500" /> MLBB Account
                </h2>
                <a
                  href="/stock"
                  className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors"
                >
                  See All Stock →
                </a>
              </div>
              <FeaturedAccounts />
            </ScrollReveal>
          </div>
        </section>

        {/* 3. BAGIAN FEEDBACK & CONTACT (Nuansa Putih bersih elegan) */}
        <section className="w-full bg-[#020617] py-6 md:py-10 px-3 md:px-4">
          <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16">
            <ScrollReveal>
              <div className="mb-8 pt-16 border-t border-white/10"></div>
              <div className="mb-20">
                <h2 className="text-xl font-bold mb-10 text-center font-orbitron tracking-[0.2em] uppercase italic text-white">
                  <RiMessage3Fill className="inline mr-3 text-blue-400" />{" "}
                  Client Feedbacks
                </h2>
                <FeedbackSlider />
              </div>
              <div className="mb-8 pt-16 border-t border-white/10">
                <ScrollReveal delay={0.1}>
                  <Advantages />
                </ScrollReveal>
                <h2 className="text-xl font-bold text-center mb-10 font-orbitron tracking-[0.2em] uppercase italic text-white">
                  <RiPhoneFill className="inline mr-3 text-blue-400" /> Official
                  Support
                </h2>
                <ContactSection />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </div>
  );
}
