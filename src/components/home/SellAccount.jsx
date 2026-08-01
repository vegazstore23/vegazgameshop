import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { FiSend } from "react-icons/fi";
import telegramIcon from "../../assets/icons/telegram.svg";

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

    // Auto text preset untuk Telegram
    const defaultText =
      "Halo Admin, saya mau jual akun MLBB nih. Boleh minta info ketentuannya?";
    const encodedText = encodeURIComponent(defaultText);

    if (contactData?.value) {
      const username = contactData.value.replace("@", "").trim();
      window.open(`https://t.me/${username}?text=${encodedText}`, "_blank");
    } else {
      window.open(`https://t.me/vegazMLBB?text=${encodedText}`, "_blank");
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[76px] rounded-2xl bg-slate-800 animate-pulse" />
    );
  }

  return (
    <button
      onClick={handleAction}
      className={`
        group w-full px-5 py-4 rounded-2xl 
        flex items-center justify-between gap-4 
        bg-slate-800 text-slate-300
        transition-all duration-300 ease-in-out

        /* Dark Neumorphism Outer Shadow (Timbul) */
        shadow-[-5px_-5px_10px_rgba(255,_255,_255,_0.05),_5px_5px_10px_rgba(0,_0,_0,_0.4)]
        
        /* Dark Neumorphism Inner Shadow on Hover (Melesak/Ditekan) */
        hover:shadow-[-1px_-1px_5px_rgba(255,_255,_255,_0.02),_1px_1px_5px_rgba(0,_0,_0,_0.2),inset_-2px_-2px_5px_rgba(255,_255,_255,_0.05),inset_2px_2px_4px_rgba(0,_0,_0,_0.5)]
        hover:text-sky-400
        active:scale-[0.98]
      `}
    >
      <div className="flex items-center gap-4">
        {/* Ikon Telegram dengan efek cekung/inset statis */}
        <div className="w-11 h-11 flex items-center justify-center rounded-full bg-slate-800 shadow-[inset_-2px_-2px_5px_rgba(255,_255,_255,_0.05),inset_2px_2px_4px_rgba(0,_0,_0,_0.5)] group-hover:shadow-none transition-all duration-300">
          <img
            src={telegramIcon}
            alt="Telegram"
            className="w-5 h-5 brightness-0 invert opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all"
          />
        </div>

        <div className="text-left">
          <p className="text-[11px] font-bold uppercase tracking-widest text-sky-500/80 group-hover:text-sky-400 transition-colors">
            Jual Account?
          </p>
          <p className="text-sm mt-0.5 font-medium tracking-wide">
            {contactData?.label
              ? `CHAT ${contactData.label.toUpperCase()}`
              : "CHAT ADMIN TELEGRAM"}
          </p>
        </div>
      </div>

      {/* Ikon dari template yang kamu berikan */}
      <div className="w-8 h-8 flex items-center justify-center rounded-full opacity-60 group-hover:opacity-100 group-hover:translate-x-1 group-hover:bg-slate-700/50 transition-all duration-300">
        <FiSend className="text-lg" />
      </div>
    </button>
  );
}
