import Banner from "../components/home/Banner";
import FeaturedAccounts from "../components/home/FeaturedAccounts";
import SellAccount from "../components/home/SellAccount";
import FeedbackSlider from "../components/home/FeedbackSlider";
import Section from "../components/ui/Section";
import ContactSection from "../components/home/ContactSection";
import PopularSection from "../components/home/PopularSection";

import mainBg from "../assets/background/background.webp";
import bg1 from "../assets/background/bg-vegaz2.webp";
import bg2 from "../assets/background/bg-akun.webp";
import bg3 from "../assets/background/bg-transaksi.webp";

export default function Home() {
  return (
    <div
      className="text-white space-y-10 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      <div className="max-w-7xl mx-auto px-4 pt-20">
        <Banner />
      </div>

      <Section bg={bg1}>
        <SellAccount />
      </Section>

      <Section bg={bg2}>
        <PopularSection />
      </Section>

      <Section bg={bg2}>
        <h2 className="text-2xl font-bold mb-4">Featured Accounts</h2>
        <FeaturedAccounts />
      </Section>

      <Section bg={bg3}>
        <h2 className="text-xl font-bold mb-4">Customer Feedback</h2>
        <FeedbackSlider />
      </Section>

      <Section bg={bg1}>
        <h2 className="text-xl font-bold text-center mb-4">OFFICIAL CONTACT</h2>
        <ContactSection />
      </Section>
    </div>
  );
}
