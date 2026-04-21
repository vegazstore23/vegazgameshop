import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Import Aset Logo & Icon
import Vegaz from "../assets/logo/vegazgameshop.png";
import telegramIcon from "../assets/icons/telegram.svg";
import instagramIcon from "../assets/icons/instagram.svg";
import whatsappIcon from "../assets/icons/whatsapp.svg";
import tiktokIcon from "../assets/icons/tiktok.svg";
import facebookIcon from "../assets/icons/facebook.svg";

/**
 * Komponen Internal untuk merender ikon berdasarkan tipe platform
 */
function PlatformIcon({ type, className }) {
  const t = type?.toLowerCase();
  switch (t) {
    case "whatsapp":
      return <img src={whatsappIcon} alt="WA" className={className} />;
    case "telegram":
      return <img src={telegramIcon} alt="TG" className={className} />;
    case "instagram":
      return <img src={instagramIcon} alt="IG" className={className} />;
    case "tiktok":
      return <img src={tiktokIcon} alt="TT" className={className} />;
    case "facebook":
      return <img src={facebookIcon} alt="FB" className={className} />;
    default:
      return (
        <svg
          className={className}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
      );
  }
}

function buildHref(type, value, msg = "") {
  const t = type?.toLowerCase();
  if (t === "whatsapp") {
    const phone = value.replace(/\D/g, "");
    return `https://wa.me/${phone}${msg ? `?text=${encodeURIComponent(msg)}` : ""}`;
  }
  if (t === "telegram") {
    const handle = value.replace(/^@/, "");
    return `https://t.me/${handle}`;
  }
  if (t === "instagram") {
    const handle = value.replace(/^@/, "");
    return `https://instagram.com/${handle}`;
  }
  if (t === "tiktok") {
    const handle = value.replace(/^@/, "");
    return `https://tiktok.com/@${handle}`;
  }
  return value.startsWith("http") ? value : `#`;
}

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/stock", label: "Stock MLBB" },
  { to: "/check-region", label: "ID MLBB Checker" },
  { to: "/calculator-mlbb", label: "Calculator MLBB" },
  { to: "/about", label: "About / FAQ" },
];

export default function Footer() {
  const [shop, setShop] = useState({
    name: "VEGAZGAMESHOP",
    description:
      "Vegaz GameShop ialah pembekal top-up permainan dan baucar yang 100% sah dengan menawarkan harga terendah di seluruh Malaysia.",
  });
  const [socials, setSocials] = useState([]);
  const [csContacts, setCsContacts] = useState([]);
  const [jualContact, setJualContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://apivgz.vegazgameshop.com/api/public/app-config",
        );
        const json = await res.json();
        if (json?.success) {
          const shopData = json.data.shop ?? {};
          setShop({
            name: shopData.name ?? "VEGAZGAMESHOP",
            description: shopData.description ?? shop.description,
          });
          const contacts = json.data.contacts ?? [];
          setSocials(contacts.filter((c) => c.roles?.includes("social_media")));
          setCsContacts(contacts.filter((c) => c.roles?.includes("cs")));
          setJualContact(contacts.find((c) => c.roles?.includes("jual")));
        }
      } catch (err) {
        console.error("Footer error:", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const year = new Date().getFullYear();

  return (
    <footer className="relative text-gray-300 bg-[#080f2a]">
      <div className="bg-transparent py-6 pt-16 -translate-y-6 relative z-[9] w-full rounded-t-[40px] md:rounded-t-[60px] overflow-hidden"></div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Col 1: Brand */}
          <div className="flex flex-col gap-4">
            <Link
              to="/"
              className="inline-block w-fit transition-transform hover:scale-105 active:scale-95"
            >
              <img
                src={Vegaz}
                className="h-10 object-contain"
                alt="VegazGameShop"
              />
            </Link>
            <p className="text-[13px] text-gray-400 leading-relaxed italic">
              {shop.description}
            </p>
          </div>

          {/* Col 2: Navigasi */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.18em]">
              Navigasi
            </h4>
            <ul className="flex flex-col gap-2.5">
              {QUICK_LINKS.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-[13px] text-gray-400 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: CS */}
          <div className="flex flex-col gap-4">
            <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.18em]">
              Customer Service
            </h4>
            <ul className="flex flex-col gap-3">
              {csContacts.map((c) => (
                <li key={c.id}>
                  <a
                    href={buildHref(c.type, c.value)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 group transition-all active:brightness-150"
                  >
                    <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all">
                      <PlatformIcon
                        type={c.type}
                        className="w-5 h-5 group-hover:scale-110 transition-transform"
                      />
                    </span>
                    <span className="text-[13px] text-gray-400 group-hover:text-white group-hover:font-bold transition-all">
                      {c.label || c.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social Media */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <h4 className="text-[11px] font-bold text-blue-400 uppercase tracking-[0.18em]">
                Social Media
              </h4>
              <ul className="flex flex-col gap-3">
                {socials.map((s) => (
                  <li key={s.id}>
                    <a
                      href={buildHref(s.type, s.value)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-3 group active:opacity-70 transition-all"
                    >
                      <span className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:border-blue-500 group-hover:shadow-[0_0_10px_#3b82f6] transition-all duration-300">
                        <PlatformIcon type={s.type} className="w-5 h-5" />
                      </span>
                      <div className="flex flex-col overflow-hidden">
                        <span className="text-[9px] text-blue-400 font-bold uppercase tracking-widest leading-none mb-1 opacity-0 group-hover:opacity-100 transition-all">
                          {s.type}
                        </span>
                        <span className="text-[13px] text-gray-400 group-hover:text-white transition-colors truncate">
                          {s.label || s.value}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* JUAL AKUN BUTTON */}
            {!loading && jualContact && (
              <a
                href={buildHref(
                  jualContact.type,
                  jualContact.value,
                  "Halo Vegaz, saya ingin jual account game",
                )}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] active:scale-[0.97] transition-all rounded-xl px-4 py-3 group relative overflow-hidden"
              >
                {/* Efek flash saat hover */}
                <div className="absolute inset-0 bg-white opacity-0 group-hover:animate-pulse pointer-events-none" />

                <PlatformIcon
                  type={jualContact.type}
                  className="w-5 h-5 relative z-10"
                />
                <div className="flex flex-col leading-tight relative z-10">
                  <span className="text-[12px] font-bold text-white uppercase tracking-tight">
                    Jual Akun
                  </span>
                  <span className="text-[10px] text-blue-100 opacity-80">
                    Proses Cepat & Aman
                  </span>
                </div>
              </a>
            )}
          </div>
        </div>

        <div className="mt-14 mb-6 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        <div className="text-center text-[11px] text-gray-500 tracking-wide uppercase">
          © {year} {shop.name}. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
