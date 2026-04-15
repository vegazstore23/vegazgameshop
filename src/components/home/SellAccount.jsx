import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

export default function SellAccount() {
  const [link, setLink] = useState("#");

  useEffect(() => {
    fetchContact();
  }, []);

  async function fetchContact() {
    try {
      const res = await apiGet("/api/contact");

      const data = Array.isArray(res) ? res : res?.data || [];

      const contact = data.find(
        (c) => c.category === "contact" && c.roles?.includes("order"),
      );

      if (!contact) return;

      const number = contact.value.replace(/[^0-9]/g, "");

      const message = encodeURIComponent(
        `Halo Admin Vegaz,
        
        Saya nak jual account Mobile Legends
        Skin:
        Rank:
        
        Maklumat apa sahaja yang perlu saya siapkan?`,
      );

      setLink(`https://wa.me/${number}?text=${message}`);
    } catch (err) {
      console.error("Contact error:", err);
    }
  }

  return (
    <a
      href={link}
      target="_blank"
      className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl px-5 py-4 border border-white/20 shadow-lg hover:scale-[1.02] transition"
    >
      <div className="flex gap-3">
        <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center">
          IG
        </div>
        <div className="w-10 h-10 bg-sky-500 rounded-full flex items-center justify-center">
          TG
        </div>
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
          WA
        </div>
      </div>

      <div className="text-center font-semibold text-sm md:text-base">
        JUAL AKUN?{" "}
        <span className="text-yellow-300 font-bold">CHAT ADMIN SEKARANG</span>
      </div>

      <div>✔</div>
    </a>
  );
}
