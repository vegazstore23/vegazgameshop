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
import bg4 from "../assets/background/bg-banner.jpg";

export default function Home() {
  return (
    <div
      className="text-white min-h-screen bg-cover bg-fixed"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      <Section bg={bg4}>
        <Banner />
      </Section>

      <div className="my-10">
        <Section bg={bg1}>
          <div className="flex flex-col gap-12">
            <SellAccount />
            <div>
              <h2 className="text-2xl font-bold mb-6">Popular</h2>
              <PopularSection />
            </div>
          </div>
        </Section>
      </div>

      <div className="my-10">
        <Section bg={bg2}>
          <h2 className="text-2xl font-bold mb-4">Featured Accounts</h2>
          <FeaturedAccounts />
        </Section>
      </div>

      <div className="mt-10">
        {/* Feedback Section */}
        <Section bg={bg3}>
          <h2 className="text-xl font-bold mb-4">Customer Feedback</h2>
          <FeedbackSlider />
        </Section>

        <Section bg={bg1}>
          <h2 className="text-xl font-bold text-center mb-4">
            OFFICIAL CONTACT
          </h2>
          <ContactSection />
        </Section>
      </div>

      <div className="pb-20"></div>
    </div>
  );
}
