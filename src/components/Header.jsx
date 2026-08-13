import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { RiSearchLine } from "react-icons/ri";
import { RiHome3Fill } from "react-icons/ri";
import { DiRuby } from "react-icons/di";
import { RiArchiveStackFill } from "react-icons/ri";
import { RiMapPinFill } from "react-icons/ri";
import { RiCustomerServiceFill } from "react-icons/ri";
import { RiSpam2Fill } from "react-icons/ri";
import { RiSendPlaneFill } from "react-icons/ri";
import { GiSwordman } from "react-icons/gi";
import Vegaz from "../assets/logo/vegazgameshop.png";

import { useLangCurr } from "./context/LanguageCurrencyContext";
import LanguageSwitchModal from "./ui/LanguageSwitchModal";

const IconHome = () => <RiHome3Fill className="w-6 h-6" />;
const IconStock = () => <RiArchiveStackFill className="w-6 h-6" />;
const IconRegion = () => <RiMapPinFill className="w-6 h-6" />;
const IconTopup = () => <DiRuby className="w-6 h-6" />;
const IconJoki = () => <GiSwordman className="w-6 h-6" />;
const IconAbout = () => <RiSpam2Fill className="w-6 h-6" />;
const IconSell = () => <RiSendPlaneFill className="w-6 h-6" />;
const IconSupport = () => <RiCustomerServiceFill className="w-6 h-6" />;

function FlagSwitcher() {
  const { lang } = useLangCurr();
  const [openModal, setOpenModal] = useState(false);

  const flags = {
    MY: { src: "https://flagcdn.com/w40/my.png", label: "MY" },
    ID: { src: "https://flagcdn.com/w40/id.png", label: "ID" },
    EN: { src: "https://flagcdn.com/w40/us.png", label: "EN" },
  };

  const currentKey = (lang || "MY").toUpperCase();
  const currentFlag = flags[currentKey] || flags.MY;

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 hover:border-blue-500 transition shadow-md shrink-0 group active:scale-95"
      >
        <div className="w-5 h-5 rounded-full overflow-hidden shrink-0 flex items-center justify-center border border-slate-600">
          <img
            src={currentFlag.src}
            alt={lang}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">
          {lang}
        </span>
      </button>

      <LanguageSwitchModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </>
  );
}

export default function Header({ hideBottomNav = false }) {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t, formatPrice } = useLangCurr();

  const [menuOpen, setMenuOpen] = useState(false);
  const [orderHref, setOrderHref] = useState("#");
  const [csHref, setCsHref] = useState("#");

  // State untuk Live Search Dropdown
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchRef = useRef(null);

  const DESKTOP_NAV = [
    { to: "/", icon: <IconHome />, label: t("header", "home") || "Home" },
    {
      to: "/stock",
      icon: <IconStock />,
      label: t("header", "stock") || "Stock",
    },
    { to: "/tp", icon: <IconTopup />, label: t("header", "topup") || "Top Up" },
    { to: "/jk", icon: <IconJoki />, label: t("header", "joki") || "Joki" },
    {
      to: "/check-region",
      icon: <IconRegion />,
      label: t("header", "region") || "Region",
    },
    {
      to: "/about",
      icon: <IconAbout />,
      label: t("header", "about") || "About",
    },
  ];

  const BOTTOM_NAV = [
    { to: "/", icon: <IconHome />, label: t("header", "home") || "Home" },
    {
      to: "/stock",
      icon: <IconStock />,
      label: t("header", "stock") || "Stock",
    },
    { to: "/tp", icon: <IconTopup />, label: t("header", "topup") || "Top Up" },
    { to: "/jk", icon: <IconJoki />, label: t("header", "joki") || "Joki" },
    {
      to: "/check-region",
      icon: <IconRegion />,
      label: t("header", "region") || "Region",
    },
  ];

  // Fetch Kontak Admin
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(
          "https://apivgz.vegazgameshop.com/api/public/app-config",
        );
        const json = await res.json();
        const contacts = json?.data?.contacts ?? [];
        const orderContact = contacts.find(
          (c) => Array.isArray(c.roles) && c.roles.includes("order"),
        );
        const csContact = contacts.find(
          (c) => Array.isArray(c.roles) && c.roles.includes("cs"),
        );

        if (orderContact)
          setOrderHref(
            `https://wa.me/${orderContact.value.replace(/\D/g, "")}`,
          );
        if (csContact)
          setCsHref(`https://wa.me/${csContact.value.replace(/\D/g, "")}`);
      } catch (err) {
        console.error("Header: failed to fetch contacts", err);
      }
    }
    load();
  }, []);

  // Live Search Effect (Debounce 300ms)
  useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSuggestions([]);
      setIsSearching(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const res = await fetch(
          "https://apivgz.vegazgameshop.com/api/public/account",
        );
        const json = await res.json();

        let list = [];
        if (Array.isArray(json)) {
          list = json;
        } else if (Array.isArray(json?.data)) {
          list = json.data;
        } else if (Array.isArray(json?.data?.data)) {
          list = json.data.data;
        }

        const filtered = list.filter((item) => {
          const title = (item.title || "").toLowerCase();
          const code = (item.code || "").toLowerCase();
          const desc = (item.description || "").toLowerCase();
          return (
            title.includes(query) ||
            code.includes(query) ||
            desc.includes(query)
          );
        });

        setSuggestions(filtered.slice(0, 3));
      } catch (err) {
        console.error("Live search error:", err);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchQuery("");
    setSuggestions([]);
  }, [pathname]);

  const getDesktopNavClass = (path) => {
    const isActive = pathname === path;
    return `flex items-center gap-2 font-semibold transition ${
      isActive ? "text-yellow-400" : "text-white hover:text-yellow-300"
    }`;
  };

  const getBottomNavClass = (path) => {
    const isActive = pathname === path;
    return `flex flex-col items-center justify-center text-xs font-medium transition ${
      isActive ? "text-yellow-400" : "text-white hover:text-yellow-300"
    }`;
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[9999] bg-[#09052b] border-b border-white/10 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20 gap-3 md:gap-4">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={Vegaz}
              className="h-8 md:h-10 lg:h-11 object-contain"
              alt="VegazGameShop"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 flex-1 justify-center">
            {DESKTOP_NAV.map(({ to, icon, label }) => (
              <li key={to}>
                <Link to={to} className={getDesktopNavClass(to)}>
                  {icon}
                  <span className="text-sm xl:text-base">{label}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3 shrink-0 ml-auto lg:ml-0">
            {/* Search Container */}
            <div className="relative" ref={searchRef}>
              <div className="relative w-40 sm:w-56 xl:w-64">
                <input
                  type="text"
                  placeholder={
                    t("header", "searchPlaceholder") || "Cari kode atau hero..."
                  }
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/60 border border-slate-700/80 focus:border-blue-500 text-white text-[10px] md:text-xs rounded-full pl-3.5 pr-8 py-2 outline-none transition-all shadow-inner"
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
                  <RiSearchLine size={14} className="md:w-4 md:h-4" />
                </span>
              </div>

              {suggestions.length > 0 && (
                <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900 border border-slate-700 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] overflow-hidden z-50 p-2 space-y-1.5">
                  <div className="px-3 py-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                    {t("header", "searchResults") ||
                      `Hasil Pencarian Akun (${suggestions.length})`}
                  </div>
                  {suggestions.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        navigate(`/detail/${item.id}`);
                        setSuggestions([]);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800 cursor-pointer transition group"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                        <img
                          src={
                            item.image ||
                            item.thumbnail ||
                            "https://placehold.co/100"
                          }
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex flex-col flex-1 min-w-0">
                        <span className="text-xs font-black text-white truncate group-hover:text-blue-400 transition-colors">
                          {item.title || item.code}
                        </span>
                        <span className="text-[10px] text-slate-400 truncate">
                          Code: {item.code || `#${item.id}`}
                        </span>
                        <span className="text-[11px] font-bold text-amber-400 mt-0.5">
                          {formatPrice(item.price)}
                        </span>
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      navigate(`/stock`);
                      setSuggestions([]);
                      setSearchQuery("");
                    }}
                    className="w-full text-center py-2 text-[11px] font-bold text-blue-400 hover:text-blue-300 bg-blue-600/10 hover:bg-blue-600/20 rounded-xl transition mt-1"
                  >
                    {t("header", "viewAllResults") || "Lihat Semua Stok Akun →"}
                  </button>
                </div>
              )}
            </div>

            {/* Flag & Language Switcher Modal */}
            <FlagSwitcher />

            <button
              id="mobileToggle"
              className="lg:hidden text-white text-2xl p-1 shrink-0 flex items-center justify-center"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen(!menuOpen);
              }}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <div
        id="mobileMenu"
        className={`fixed top-16 md:top-20 left-0 w-full bg-[#1c4ed8]/70 backdrop-blur-xl border-b border-white/10 flex flex-col gap-2 p-6 z-40 lg:hidden transition-all duration-300 ease-out shadow-2xl ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <Link
          to="/about"
          className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition ${
            pathname === "/about"
              ? "bg-white/20 text-yellow-400"
              : "text-white hover:text-yellow-300 hover:bg-white/10"
          }`}
        >
          <IconAbout />
          <span>{t("header", "about") || "About & FAQ"}</span>
        </Link>

        <div className="h-px bg-white/10 my-1" />

        <a
          href={orderHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl font-semibold text-white hover:text-yellow-300 hover:bg-white/10 transition"
        >
          <IconSell />
          <span>{t("header", "sellAccount") || "Jual Account"}</span>
        </a>

        <div className="h-px bg-white/10 my-1" />

        <a
          href={csHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl font-semibold text-white hover:text-yellow-300 hover:bg-white/10 transition"
        >
          <IconSupport />
          <span>{t("header", "customerService") || "Customer Service"}</span>
        </a>
      </div>

      {!hideBottomNav && (
        <nav className="fixed bottom-0 left-0 w-full bg-[#09052b] border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] flex justify-around items-center h-16 lg:hidden z-50">
          {BOTTOM_NAV.map(({ to, icon, label }) => (
            <Link key={to} to={to} className={getBottomNavClass(to)}>
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      )}
    </>
  );
}
