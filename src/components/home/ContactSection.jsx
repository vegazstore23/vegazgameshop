import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

import waIcon from "../../assets/icons/whatsapp.svg";
import igIcon from "../../assets/icons/instagram.svg";
import tgIcon from "../../assets/icons/telegram.svg";
// Tambahkan import icon baru jika ada, atau gunakan fallback emoji/lucide jika perlu

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
    const val = c.value;
    if (c.type === "whatsapp") return `https://wa.me/${val}`;
    if (c.type === "telegram") return `https://t.me/${val}`;
    if (c.type === "instagram") return `https://instagram.com/${val.replace('@', '')}`;
    if (c.type === "tiktok") return `https://tiktok.com/@${val.replace('@', '')}`;
    if (c.type === "youtube") return val.includes('http') ? val : `https://youtube.com/${val}`;
    if (c.type === "facebook") return val.includes('http') ? val : `https://facebook.com/${val}`;
    return val.includes('http') ? val : "#";
  }

  function getIcon(type) {
    if (type === "whatsapp") return waIcon;
    if (type === "telegram") return tgIcon;
    if (type === "instagram") return igIcon;
    // Fallback sederhana jika icon svg belum diimport
    return null;
  }

  if (!contacts.length) return null;

  // SINKRONISASI FILTER: Menggunakan 'contacts' dan 'socials' sesuai database terbaru
  const contactGroup = contacts.filter(
    (c) => c.category?.toLowerCase() === "contacts"
  );

  const socialGroup = contacts.filter(
    (c) => c.category?.toLowerCase() === "socials"
  );

  const ContactCard = ({ c }) => (
    <a
      href={getLink(c)}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 bg-black/20 hover:bg-black/40 border border-white/10 p-4 rounded-2xl transition-all hover:scale-105 min-w-[240px] backdrop-blur-md"
    >
      <div className="w-12 h-12 shrink-0 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
        {getIcon(c.type) ? (
          <img src={getIcon(c.type)} alt={c.type} className="w-6 h-6" />
        ) : (
          <span className="text-xl text-white">🔗</span>
        )}
      </div>

      <div className="flex flex-col text-left overflow-hidden">
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          {c.label || c.type}
        </span>
        <span className="text-xs text-white/90 truncate mt-0.5">{c.value}</span>
      </div>
    </a>
  );

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-20 px-6">
      <div className="flex flex-col items-center">
        {/* SECTION 1: CONTACTS (Chat, Order, CS) */}
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

        {/* DIVIDER */}
        {contactGroup.length > 0 && socialGroup.length > 0 && (
          <hr className="w-full max-w-md border-t border-white/20 my-10" />
        )}

        {/* SECTION 2: SOCIALS (Instagram, TikTok, dll) */}
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