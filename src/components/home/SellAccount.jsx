import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { handleWhatsAppChat } from "../../utils/FormChat";

import whatsappIcon from "../../assets/icons/whatsapp.svg";
import telegramIcon from "../../assets/icons/telegram.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import verifiedIcon from "../../assets/icons/verified.svg";

export default function SellAccount() {
  const [contactData, setContactData] = useState(null);

  useEffect(() => {
    fetchContact();
  }, []);

  async function fetchContact() {
    try {
      const res = await apiGet("/api/contact");
      const data = Array.isArray(res) ? res : res?.data || [];

      const contact = data.find((c) => c.isActive && c.roles?.includes("jual"));

      if (contact) {
        setContactData(contact);
      }
    } catch (err) {
      console.error("Contact error:", err);
    }
  }

  const handleAction = (e) => {
    e.preventDefault();
    handleWhatsAppChat("jual", "jual");
  };

  return (
    <button
      onClick={handleAction}
      className="w-full flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl px-5 py-4 border border-white/20 shadow-lg hover:scale-[1.01] active:scale-[0.98] transition-all group"
    >
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-full flex items-center justify-center p-2.5 shadow-md group-hover:rotate-12 transition-transform">
          <img src={instagramIcon} alt="Instagram" className="w-full h-full" />
        </div>
        <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center p-2.5 shadow-md group-hover:-rotate-12 transition-transform">
          <img src={telegramIcon} alt="Telegram" className="w-full h-full" />
        </div>
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center p-2.5 shadow-md group-hover:rotate-12 transition-transform">
          <img src={whatsappIcon} alt="WhatsApp" className="w-full h-full" />
        </div>
      </div>

      <div className="text-center font-orbitron tracking-tight text-sm md:text-base text-white">
        JUAL ACCOUNT?{" "}
        <span className="text-yellow-300 font-black italic">
          CHAT ADMIN SEKARANG
        </span>
      </div>

      {/* Verified Icon */}
      <div className="w-6 h-6 flex items-center justify-center">
        <img
          src={verifiedIcon}
          alt="Verified"
          className="w-full h-full brightness-0 invert opacity-80"
        />
      </div>
    </button>
  );
}
