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
import Section from "../components/ui/Section";
import ContactSection from "../components/home/ContactSection";
import PopularSection from "../components/home/PopularSection";
import ScrollReveal from "../components/ScrollReveal.jsx";
import Advantages from "../components/stock/Advantages";

import mainBg from "../assets/background/background.webp";
import bg2 from "../assets/background/bg-akun.webp";
import bg3 from "../assets/background/bg-transaksi.webp";
import bg4 from "../assets/background/bg-banner.jpg";

function MarqueeTicker() {
  const items = [
    "SAFE TRANSACTION",
    "INSTANT PROCESS",
    "TRUSTED SELLER",
    "24/7 SUPPORT",
    "SECURE DATA",
  ];
  return (
    <div className="w-full overflow-hidden bg-white/[0.02] border-y border-white/5 py-3">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="text-[10px] font-black tracking-[0.3em] text-gray-500 flex items-center gap-3"
          >
            <div className="w-1 h-1 bg-blue-500 rounded-full" /> {item}
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
    <div
      className="text-white min-h-screen bg-cover bg-fixed"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      <Section bg={bg4}>
        <Banner />
      </Section>

      <div>
        <MarqueeTicker />
        <Section bg={bg2}>
          <div className="flex flex-col gap-16">
            <ScrollReveal delay={0.1}>
              <FlashSaleSection />
            </ScrollReveal>

            <ScrollReveal>
              <SellAccount />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-4">
                  <h2 className="text-2xl font-bold font-orbitron tracking-tighter flex items-center gap-3 uppercase italic">
                    <RiFireLine className="text-blue-500" /> Trending
                  </h2>
                  <a
                    href="/stock"
                    className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition-colors"
                  >
                    See All Stock →
                  </a>
                </div>
                <PopularSection />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex items-end justify-between mb-8 border-b border-white/5 pb-4">
                <h2 className="text-2xl font-bold font-orbitron tracking-tighter flex items-center gap-3 uppercase italic">
                  <RiStarFill className="text-blue-500" /> Top Choice
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

            <ScrollReveal delay={0.1}>
              <Advantages />
            </ScrollReveal>
          </div>
        </Section>

        <Section bg={bg3}>
          <ScrollReveal>
            <div className="mb-20">
              <h2 className="text-xl font-bold mb-10 text-center font-orbitron tracking-[0.2em] uppercase italic text-white/90">
                <RiMessage3Fill className="inline mr-3 text-blue-500" /> Client
                Feedbacks
              </h2>
              <FeedbackSlider />
            </div>

            <div className="py-8" />

            <div className="mb-8 pt-16 border-t border-white/5">
              <h2 className="text-xl font-bold text-center mb-10 font-orbitron tracking-[0.2em] uppercase italic text-white/90">
                <RiPhoneFill className="inline mr-3 text-blue-500" /> Official
                Support
              </h2>
              <ContactSection />
            </div>
          </ScrollReveal>
        </Section>
      </div>

      <div className="pb-20" />
    </div>
  );
}
