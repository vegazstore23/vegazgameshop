import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { handleWhatsAppChat } from "../../utils/FormChat";

import whatsappIcon from "../../assets/icons/whatsapp.svg";
import telegramIcon from "../../assets/icons/telegram.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import verifiedIcon from "../../assets/icons/verified.svg";

export default function SellAccount() {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, []);

  async function fetchContact() {
    try {
      const res = await apiGet("/api/contact");
      const data = Array.isArray(res) ? res : res?.data || [];

      const contact = data.find((c) => c.isActive && c.roles?.includes("jual"));
      if (contact) setContactData(contact);
    } catch (err) {
      console.error("Contact error:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleAction = (e) => {
    e.preventDefault();
    if (contactData?.value) {
      const num = contactData.value.replace(/\D/g, "");
      window.open(
        `https://wa.me/${num}?text=Saya%20nak%20jual%20akaun`,
        "_blank",
      );
    } else {
      handleWhatsAppChat("jual", "jual");
    }
  };

  // Skeleton sementara data load
  if (loading) {
    return (
      <div className="w-full h-[72px] rounded-2xl bg-white/5 animate-pulse border border-white/10" />
    );
  }

  // Tambahkan sedikit sentuhan transisi warna agar lebih "hidup"
  return (
    <button
      onClick={handleAction}
      aria-label={`Jual akaun via WhatsApp ke ${contactData?.label || "Admin"}`}
      className="w-full flex items-center justify-between bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 rounded-2xl px-5 py-4 border border-white/20 shadow-lg hover:shadow-cyan-500/20 active:scale-[0.97] transition-all group overflow-hidden"
    >
      <div className="flex gap-2.5 relative">
        {/* Jika hanya WA, cukup satu ikon. Jika tetap 3, perkecil sedikit agar tidak sesak */}
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center p-2.5 shadow-md group-hover:scale-110 transition-transform">
          <img src={whatsappIcon} alt="WhatsApp" className="w-full h-full" />
        </div>
        {/* Indikator Online (Opsional - Penambah Trust) */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 border-2 border-blue-600 rounded-full animate-pulse"></span>
      </div>

      <div className="flex-1 px-4 text-center">
        <p className="font-orbitron tracking-tight text-xs md:text-sm text-white/90">
          JUAL ACCOUNT?
        </p>
        <p className="text-yellow-300 font-black italic text-sm md:text-base leading-tight">
          {contactData?.label
            ? `CHAT ${contactData.label.toUpperCase()}`
            : "CHAT ADMIN SEKARANG"}
        </p>
        {contactData?.value && (
          <span className="block text-[10px] font-medium text-cyan-100/70 mt-0.5 font-sans">
            {contactData.value}
          </span>
        )}
      </div>

      <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg backdrop-blur-sm">
        <img
          src={verifiedIcon}
          alt="Verified"
          className="w-5 h-5 brightness-0 invert opacity-90 group-hover:rotate-[360deg] transition-transform duration-700"
        />
      </div>
    </button>
  );
}
