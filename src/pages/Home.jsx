import React, { useEffect, useState } from "react";
import {
  RiFlashlightFill,
  RiSearchLine,
  RiCustomerService2Fill,
  RiWallet3Line,
  RiShieldCheckLine,
  RiFireLine,
  RiStarFill,
  RiMessage3Fill,
  RiPhoneFill,
} from "react-icons/ri";

import Banner from "../components/home/Banner";
import FeaturedAccounts from "../components/home/FeaturedAccounts";
import SellAccount from "../components/home/SellAccount";
import FeedbackSlider from "../components/home/FeedbackSlider";
import Section from "../components/ui/Section";
import ContactSection from "../components/home/ContactSection";
import PopularSection from "../components/home/PopularSection";
import ScrollReveal from "../components/ScrollReveal.jsx";
import Advantages from "../components/stock/Advantages";

import mainBg from "../assets/background/background.webp";
import bg1 from "../assets/background/bg-vegaz2.webp";
import bg2 from "../assets/background/bg-akun.webp";
import bg3 from "../assets/background/bg-transaksi.webp";
import bg4 from "../assets/background/bg-banner.jpg";

// ── Flash Sale Timer (persistent via localStorage) ────────────────────────────
const FLASH_SALE_KEY = "vegaz_flash_sale_end";
const FLASH_SALE_DURATION_MS = 6 * 60 * 60 * 1000; // 6 jam

function getOrCreateEndTime() {
  try {
    const stored = localStorage.getItem(FLASH_SALE_KEY);
    if (stored) {
      const end = parseInt(stored, 10);
      // Kalau masih belum expired, guna yang sama
      if (end > Date.now()) return end;
    }
    // Buat end time baru
    const newEnd = Date.now() + FLASH_SALE_DURATION_MS;
    localStorage.setItem(FLASH_SALE_KEY, String(newEnd));
    return newEnd;
  } catch {
    // Fallback kalau localStorage tak available (private mode, dll)
    return Date.now() + FLASH_SALE_DURATION_MS;
  }
}

function getTimeLeft(endTime) {
  const diff = Math.max(0, endTime - Date.now());
  const totalSec = Math.floor(diff / 1000);
  return {
    h: Math.floor(totalSec / 3600),
    m: Math.floor((totalSec % 3600) / 60),
    s: totalSec % 60,
  };
}

function FlashSaleBanner() {
  const [endTime] = useState(() => getOrCreateEndTime());
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      const left = getTimeLeft(endTime);
      setTimeLeft(left);

      // Reset bila dah habis
      if (left.h === 0 && left.m === 0 && left.s === 0) {
        try {
          localStorage.removeItem(FLASH_SALE_KEY);
        } catch {}
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="w-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/40">
          <RiFlashlightFill size={24} className="text-white animate-pulse" />
        </div>
        <div>
          <h3 className="text-white font-bold text-lg uppercase tracking-tighter leading-none">
            Limited Deals
          </h3>
          <p className="text-blue-300 text-[11px] font-medium mt-1 uppercase tracking-widest opacity-70">
            Flash Sale Active
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 bg-black/40 px-5 py-2.5 rounded-xl border border-white/5">
        <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mr-2">
          Time Left
        </span>
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tabular-nums">
            {pad(timeLeft.h)}
          </span>
          <span className="text-blue-500 font-bold">:</span>
          <span className="text-white font-bold text-xl tabular-nums">
            {pad(timeLeft.m)}
          </span>
          <span className="text-blue-500 font-bold">:</span>
          <span className="text-white font-bold text-xl tabular-nums">
            {pad(timeLeft.s)}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── How It Works ─────────────────────────────────────────────────────────────
function HowItWorksSection() {
  const steps = [
    { title: "Browse", desc: "Find your account", icon: <RiSearchLine /> },
    {
      title: "Consult",
      desc: "Chat with admin",
      icon: <RiCustomerService2Fill />,
    },
    { title: "Payment", desc: "Secure checkout", icon: <RiWallet3Line /> },
    { title: "Instant", desc: "Access delivered", icon: <RiShieldCheckLine /> },
  ];

  return (
    <div className="w-full py-10">
      <h2 className="text-xl font-bold text-center mb-12 font-orbitron tracking-[0.2em] text-white uppercase opacity-80">
        Purchase Workflow
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {steps.map((s, i) => (
          <div key={i} className="group flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-500 mb-5 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
              {React.cloneElement(s.icon, { size: 28 })}
            </div>
            <h3 className="text-white font-bold text-xs uppercase tracking-widest mb-2">
              {s.title}
            </h3>
            <p className="text-gray-500 text-[10px] leading-relaxed px-4">
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Marquee Ticker ────────────────────────────────────────────────────────────
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

// ── Main Page ─────────────────────────────────────────────────────────────────
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
              <FlashSaleBanner />
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

            <ScrollReveal>
              <HowItWorksSection />
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
