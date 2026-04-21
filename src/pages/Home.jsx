import React, { useEffect } from "react";
import Banner from "../components/home/Banner";
import FeaturedAccounts from "../components/home/FeaturedAccounts";
import SellAccount from "../components/home/SellAccount";
import FeedbackSlider from "../components/home/FeedbackSlider";
import Section from "../components/ui/Section";
import ContactSection from "../components/home/ContactSection";
import PopularSection from "../components/home/PopularSection";
import ScrollReveal from "../components/ScrollReveal.jsx";

import mainBg from "../assets/background/background.webp";
import bg1 from "../assets/background/bg-vegaz2.webp";
import bg2 from "../assets/background/bg-akun.webp";
import bg3 from "../assets/background/bg-transaksi.webp";
import bg4 from "../assets/background/bg-banner.jpg";

export default function Home() {
  useEffect(() => {
    document.title = "Platform Jual Beli & Topup Games Malaysia ";
  }, []);

  return (
    <div
      className="text-white min-h-screen bg-cover bg-fixed"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      <Section bg={bg4}>
        <Banner />
      </Section>

      <div className="my-10 space-y-10">
        <Section bg={bg2}>
          <div className="flex flex-col gap-16">
            <ScrollReveal>
              <SellAccount />
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div>
                <h2 className="text-2xl font-bold mb-6 font-orbitron tracking-tighter">
                  Popular
                </h2>
                <PopularSection />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-2xl font-bold mb-4 font-orbitron tracking-tighter">
                Akaun Pilihan
              </h2>
              <FeaturedAccounts />
            </ScrollReveal>
          </div>
        </Section>

        <div className="-space-y-10">
          <Section bg={bg3}>
            <ScrollReveal>
              <h2 className="text-xl font-bold mb-4 font-orbitron tracking-tighter">
                Maklum Balas Pelanggan
              </h2>
              <FeedbackSlider />
            </ScrollReveal>
          </Section>

          <Section bg={bg1}>
            <ScrollReveal>
              <h2 className="text-xl font-bold text-center mb-4 font-orbitron tracking-tighter">
                HUBUNGI RASMI
              </h2>
              <ContactSection />
            </ScrollReveal>
          </Section>
        </div>
      </div>

      <div className="pb-20" />
    </div>
  );
}
