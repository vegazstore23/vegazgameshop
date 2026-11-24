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
import FeedbackSlider from "../components/home/FeedbackSlider";
import ContactSection from "../components/home/ContactSection";
import PopularSection from "../components/home/PopularSection";
import ScrollReveal from "../components/ScrollReveal.jsx";
import Advantages from "../components/stock/Advantages";
import { useLangCurr } from "../components/context/LanguageCurrencyContext";

function MarqueeTicker() {
  const { t } = useLangCurr();

  const items = [
    t("footer", "fastAndSafe") || "SAFE TRANSACTION",
    t("stock", "adv4Title") || "INSTANT PROCESS",
    t("stock", "adv3Title") || "TRUSTED SELLER",
    t("stock", "adv2Title") || "24/7 SUPPORT",
    t("stock", "adv1Title") || "SECURE DATA",
  ];

  return (
    <div className="w-full overflow-hidden bg-[#011F5B] border-y border-yellow-500/30 py-2.5">
      <div className="flex gap-8 md:gap-16 animate-marquee whitespace-nowrap">
        {[...items, ...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-xs font-black tracking-[0.2em] md:tracking-[0.3em] text-gray-300 flex items-center gap-2 md:gap-3"
          >
            <div className="w-1 h-1 md:w-1.5 md:h-1.5 bg-yellow-400 rounded-full" />{" "}
            {item}
          </span>
        ))}
      </div>
      <style>{`
        .animate-marquee { animation: marquee 20s linear infinite; }
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-33.33%); } }
      `}</style>
    </div>
  );
}

export default function Home() {
  const { t } = useLangCurr();

  useEffect(() => {}, []);

  return (
    <div className="text-white min-h-screen bg-gradient-to-b from-[#0a0a0f] via-[#050b14] to-[#02060a]">
      {/* BAGIAN BANNER */}
      <section className="w-full bg-[#09052b] py-2 md:py-4">
        <div className="max-w-7xl mx-auto px-3 md:px-4">
          <Banner />
        </div>
      </section>

      <div>
        <MarqueeTicker />

        {/* BAGIAN KONTEN UTAMA */}
        <section className="w-full bg-black py-8 md:py-12 px-3 md:px-4">
          <div className="max-w-7xl mx-auto flex flex-col gap-10 md:gap-16">
            <ScrollReveal delay={0.1}>
              <FlashSaleSection />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <div className="flex items-end justify-between mb-4 md:mb-6 border-b border-white/5 pb-3">
                  <h2 className="text-lg md:text-2xl font-bold font-orbitron tracking-tighter flex items-center gap-2 uppercase italic">
                    <RiFireLine className="text-orange-500" />{" "}
                    {t("home", "trending") || "Layanan Populer"}
                  </h2>
                </div>
                <PopularSection />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex items-end justify-between mb-4 md:mb-6 border-b border-white/5 pb-3 mt-4">
                <h2 className="text-lg md:text-2xl font-bold font-orbitron tracking-tighter flex items-center gap-2 uppercase italic">
                  <RiStarFill className="text-blue-500" /> MLBB Account
                </h2>
                <a
                  href="/pr"
                  className="text-[10px] md:text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors whitespace-nowrap"
                >
                  {t("header", "viewAllResults") || "See All →"}
                </a>
              </div>
              <FeaturedAccounts />
            </ScrollReveal>
          </div>
        </section>

        {/* BAGIAN FEEDBACK & SUPPORT */}
        <section className="w-full bg-black py-8 md:py-10 px-3 md:px-4">
          <div className="max-w-7xl mx-auto flex flex-col gap-8 md:gap-16">
            <ScrollReveal>
              <div className="mb-6 md:mb-8 pt-8 border-t border-white/10"></div>
              <div className="mb-12 md:mb-20">
                <h2 className="text-lg md:text-xl font-bold mb-6 md:mb-10 text-center font-orbitron tracking-[0.15em] md:tracking-[0.2em] uppercase italic text-white flex justify-center items-center">
                  <RiMessage3Fill className="mr-2 md:mr-3 text-blue-400" />{" "}
                  Client Feedbacks
                </h2>
                <FeedbackSlider />
              </div>

              <div className="mb-6 md:mb-8 pt-8 md:pt-16 border-t border-white/10">
                <ScrollReveal delay={0.1}>
                  <Advantages />
                </ScrollReveal>
                <h2 className="text-lg md:text-xl font-bold text-center mt-12 mb-6 md:mb-10 font-orbitron tracking-[0.15em] md:tracking-[0.2em] uppercase italic text-white flex justify-center items-center">
                  <RiPhoneFill className="mr-2 md:mr-3 text-blue-400" />{" "}
                  {t("footer", "support") || "Official Support"}
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
