import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

// Pastikan file SVG-nya sudah benar-benar ada di folder ini ya!
import waIcon from "../../assets/icons/whatsapp.svg";
import igIcon from "../../assets/icons/instagram.svg";
import tgIcon from "../../assets/icons/telegram.svg";

export default function ContactSection() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    apiGet("/api/contact")
      .then((res) => {
        setContacts(res?.data || []);
      })
      .catch((err) => console.error("Contact error:", err));
  }, []);

  function getLink(c) {
    if (c.type === "whatsapp") return `https://wa.me/${c.value}`;
    if (c.type === "telegram") return `https://t.me/${c.value}`;
    if (c.type === "instagram") return `https://instagram.com/${c.value}`;
    // Tambahkan sosmed lain jika ada (misal facebook, tiktok)
    return "#";
  }

  function getIcon(type) {
    if (type === "whatsapp") return waIcon;
    if (type === "telegram") return tgIcon;
    if (type === "instagram") return igIcon;
    return null;
  }

  if (!contacts.length) return null;

  const contactGroup = contacts.filter(
    (c) => c.category?.toLowerCase() === "contact",
  );

  const socialGroup = contacts.filter(
    (c) => c.category?.toLowerCase() === "social",
  );

  // Komponen Card UI agar kode tidak berulang
  const ContactCard = ({ c }) => (
    <a
      href={getLink(c)}
      target="_blank"
      rel="noreferrer"
      // 🔥 UI BARU: Background agak gelap (black/20), efek kaca (backdrop-blur-md)
      className="flex items-center gap-4 bg-black/20 hover:bg-black/40 border border-white/10 p-4 rounded-2xl transition-all hover:scale-105 min-w-[240px] backdrop-blur-md"
    >
      {/* KIRI: ICON */}
      <div className="w-12 h-12 shrink-0 rounded-full bg-white/20 flex items-center justify-center">
        <img src={getIcon(c.type)} alt={c.type} className="w-6 h-6" />
      </div>

      {/* KANAN: TEXT (NAMA DI ATAS, VALUE DI BAWAH) */}
      <div className="flex flex-col text-left overflow-hidden">
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          {c.label}
        </span>
        {/* 🔥 Teks value diperjelas menjadi white/90 (sebelumnya white/60) */}
        <span className="text-xs text-white/90 truncate mt-0.5">{c.value}</span>
      </div>
    </a>
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-20 px-6">
      <div className="flex flex-col items-center">
        {/* === BAGIAN ATAS: CONTACT (WA, TG) === */}
        {contactGroup.length > 0 && (
          <div className="w-full flex flex-col items-center">
            <h3 className="text-white/50 text-sm font-semibold mb-6 uppercase tracking-widest">
              Hubungi Kami
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {contactGroup.map((c) => (
                <ContactCard key={c.id || c.value} c={c} />
              ))}
            </div>
          </div>
        )}

        {/* === GARIS PEMBATAS PUTIH === */}
        {contactGroup.length > 0 && socialGroup.length > 0 && (
          <hr className="w-full max-w-md border-t border-white/20 my-10" />
        )}

        {/* === BAGIAN BAWAH: SOCIAL MEDIA (IG, TIKTOK, DLL) === */}
        {socialGroup.length > 0 && (
          <div className="w-full flex flex-col items-center">
            <h3 className="text-white/50 text-sm font-semibold mb-6 uppercase tracking-widest">
              Ikuti Kami
            </h3>
            <div className="flex flex-wrap justify-center gap-6">
              {socialGroup.map((c) => (
                <ContactCard key={c.id || c.value} c={c} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
