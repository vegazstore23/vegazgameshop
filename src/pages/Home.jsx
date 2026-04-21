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
  return (
    <div
      className="text-white min-h-screen bg-cover bg-fixed"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      <Section bg={bg4} >
        <Banner />
      </Section>

      <div className="my-10 space-y-10">
        <Section bg={bg2}>
          <div className="flex flex-col gap-16">
            <ScrollReveal>
              <SellAccount />
            </ScrollReveal>
            {/* Bagian Popular */}
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
                Featured Accounts
              </h2>
              <FeaturedAccounts />
            </ScrollReveal>
          </div>
        </Section>

        {/* --- PENYATUAN 2: Feedback & Contact --- */}
        {/* Kita bungkus dalam satu div, tapi di dalamnya kita panggil Section masing-masing */}
        {/* Supaya terlihat nyatu tapi beda background, kita hilangkan gap/space antar keduanya */}
        <div className="-space-y-10">
          {" "}
          {/* Menghilangkan efek space-y-10 dari parent div */}
          {/* Feedback Section */}
          <Section bg={bg3}>
            <ScrollReveal>
              <h2 className="text-xl font-bold mb-4 font-orbitron tracking-tighter">
                Customer Feedback
              </h2>
              <FeedbackSlider />
            </ScrollReveal>
          </Section>
          {/* Contact Section (Langsung nempel di bawah Feedback) */}
          <Section bg={bg1}>
            <ScrollReveal>
              <h2 className="text-xl font-bold text-center mb-4 font-orbitron tracking-tighter">
                OFFICIAL CONTACT
              </h2>
              <ContactSection />
            </ScrollReveal>
          </Section>
        </div>
      </div>

      <div className="pb-20"></div>
    </div>
  );
}
