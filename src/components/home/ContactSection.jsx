import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

import waIcon from "../../assets/icons/whatsapp.svg";
import igIcon from "../../assets/icons/instagram.svg";
import tgIcon from "../../assets/icons/telegram.svg";

// ── Platform icon map (react-icons fallback pakai emoji SVG inline) ────────────
// Tambah import jika ada: import { RiTiktokLine, RiYoutubeLine, RiFacebookLine } from "react-icons/ri"
// Sementara guna SVG inline ringkas supaya consistent

function PlatformIcon({ type, src }) {
  if (src) {
    return <img src={src} alt={type} className="w-6 h-6" loading="lazy" />;
  }
  // Inline SVG icons untuk platform tanpa asset lokal
  const icons = {
    tiktok: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.85a8.27 8.27 0 004.84 1.56V6.95a4.85 4.85 0 01-1.07-.26z" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.54 3.5 12 3.5 12 3.5s-7.54 0-9.38.55A3.02 3.02 0 00.5 6.19C0 8.04 0 12 0 12s0 3.96.5 5.81a3.02 3.02 0 002.12 2.14C4.46 20.5 12 20.5 12 20.5s7.54 0 9.38-.55a3.02 3.02 0 002.12-2.14C24 15.96 24 12 24 12s0-3.96-.5-5.81zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white">
        <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79V24C19.62 23.1 24 18.1 24 12.07z" />
      </svg>
    ),
  };
  return icons[type] || <span className="text-white text-lg">🔗</span>;
}

// ── Platform config ───────────────────────────────────────────────────────────
const PLATFORM_CONFIG = {
  whatsapp: { icon: waIcon, bg: "bg-green-500", label: "WhatsApp" },
  telegram: { icon: tgIcon, bg: "bg-sky-500", label: "Telegram" },
  instagram: {
    icon: igIcon,
    bg: "bg-gradient-to-tr from-purple-500 to-pink-500",
    label: "Instagram",
  },
  tiktok: { icon: null, bg: "bg-black", label: "TikTok" },
  youtube: { icon: null, bg: "bg-red-600", label: "YouTube" },
  facebook: { icon: null, bg: "bg-blue-600", label: "Facebook" },
};

// Strip semua prefix seperti @, +, t.me/, wa.me/ dll — ambil username/number sahaja
function cleanVal(val) {
  return val
    .trim()
    .replace(/^https?:\/\/[^/]+\//, "") // buang domain prefix kalau ada URL
    .replace(/^[@+]/, ""); // buang @ atau + di depan
}

function getLink(c) {
  const val = c.value?.trim() || "";

  // Kalau user dah bagi full URL, guna terus
  if (val.startsWith("http://") || val.startsWith("https://")) return val;

  const clean = cleanVal(val);

  switch (c.type) {
    case "whatsapp":
      // Guna t.me untuk Telegram CS juga (nombor atau username)
      return `https://wa.me/${clean.replace(/\D/g, "")}`;
    case "telegram":
      // Support nombor telefon (+60xxx) atau username (@vegazstore / vegazstore)
      return clean.match(/^\d/)
        ? `https://t.me/+${clean.replace(/\D/g, "")}` // nombor → t.me/+60xxx
        : `https://t.me/${clean}`; // username → t.me/vegazstore
    case "instagram":
      return `https://instagram.com/${clean}`;
    case "tiktok":
      return `https://tiktok.com/@${clean}`;
    case "youtube":
      // Support channel handle (@vegazstore) atau channel ID
      return clean.startsWith("@")
        ? `https://youtube.com/${clean}`
        : `https://youtube.com/@${clean}`;
    case "facebook":
      return `https://facebook.com/${clean}`;
    default:
      return "#";
  }
}

// ── Skeleton ─────────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="flex items-center gap-4 border border-white/10 p-4 rounded-2xl min-w-[240px] animate-pulse">
      <div className="w-12 h-12 rounded-full bg-white/10 shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <div className="h-3 bg-white/10 rounded w-20" />
        <div className="h-3 bg-white/10 rounded w-32" />
      </div>
    </div>
  );
}

// ── Contact Card ─────────────────────────────────────────────────────────────
function ContactCard({ c }) {
  const config = PLATFORM_CONFIG[c.type] || {};

  return (
    <a
      href={getLink(c)}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-4 bg-black/20 hover:bg-black/40 border border-white/10 p-4 rounded-2xl transition-all hover:scale-105 min-w-[240px] backdrop-blur-md"
    >
      <div
        className={`w-12 h-12 shrink-0 rounded-full ${config.bg || "bg-white/20"} flex items-center justify-center overflow-hidden`}
      >
        <PlatformIcon type={c.type} src={config.icon} />
      </div>
      <div className="flex flex-col text-left overflow-hidden">
        <span className="text-sm font-bold text-white uppercase tracking-wider">
          {c.label || config.label || c.type}
        </span>
        <span className="text-xs text-white/70 truncate mt-0.5">{c.value}</span>
      </div>
    </a>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function ContactSection() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  async function fetchContacts() {
    setLoading(true);
    setError(false);
    try {
      const res = await apiGet("/api/contact");
      setContacts(res?.data || []);
    } catch (err) {
      console.error("Contact error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const contactGroup = contacts.filter(
    (c) => c.category?.toLowerCase() === "contacts",
  );
  const socialGroup = contacts.filter(
    (c) => c.category?.toLowerCase() === "socials",
  );

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 mb-20 px-6">
        <div className="flex flex-wrap justify-center gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-12 mb-20 px-6 text-center">
        <p className="text-white/40 text-sm">
          Gagal memuatkan maklumat hubungan.
        </p>
        <button
          onClick={fetchContacts}
          className="mt-3 text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest"
        >
          Cuba Semula
        </button>
      </div>
    );
  }

  if (!contacts.length) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 mb-20 px-6">
      <div className="flex flex-col items-center">
        {/* Contacts */}
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

        {contactGroup.length > 0 && socialGroup.length > 0 && (
          <hr className="w-full max-w-md border-t border-white/20 my-10" />
        )}

        {/* Socials */}
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
