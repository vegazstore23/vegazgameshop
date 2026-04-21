import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Vegaz from "../assets/logo/vegazgameshop.png";

// --- Icons ---
const IconHome = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3l9 7v11a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V10l9-7z" />
  </svg>
);
const IconStock = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16a1 1 0 0 1 1 1v3H3V5a1 1 0 0 1 1-1z" />
    <path d="M3 10h18v4H3z" />
    <path d="M3 16h18v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
  </svg>
);
const IconRegion = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
  </svg>
);
const IconTopup = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 3h10l4 6-9 12L3 9l4-6z" />
    <path
      d="M7 3l5 6 5-6M3 9h18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const IconAbout = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
);
const IconCalculator = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <rect x="7" y="5" width="10" height="3" fill="white" />
    <circle cx="8" cy="12" r="1" />
    <circle cx="12" cy="12" r="1" />
    <circle cx="16" cy="12" r="1" />
    <circle cx="8" cy="16" r="1" />
    <circle cx="12" cy="16" r="1" />
    <circle cx="16" cy="16" r="1" />
  </svg>
);
const IconSell = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 4h16v4H4z" />
    <path d="M4 10h16v10H4z" />
    <circle cx="12" cy="15" r="2" />
  </svg>
);
const IconSupport = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a7 7 0 0 0-7 7v4a3 3 0 0 0 3 3h2v-6H7V9a5 5 0 0 1 10 0v1h-3v6h2a3 3 0 0 0 3-3V9a7 7 0 0 0-7-7z" />
  </svg>
);

// Map path sesuai App.jsx + Topup
const PAGE_MAP = {
  "/": "home",
  "/stock": "stock",
  "/topup": "topup",
  "/check-region": "region",
  "/calculator-mlbb": "calculator",
  "/about": "about",
};

export default function Header({ hideBottomNav = false }) {
  const { pathname } = useLocation();
  const activePage = PAGE_MAP[pathname] ?? "";

  const [menuOpen, setMenuOpen] = useState(false);
  const [orderHref, setOrderHref] = useState("#");
  const [csHref, setCsHref] = useState("#");

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

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (
        !e.target.closest("#mobileMenu") &&
        !e.target.closest("#mobileToggle")
      ) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const getNavClass = (path, isDesktop = false) => {
    const isActive = pathname === path;
    if (isDesktop) {
      return `flex items-center gap-2 font-semibold transition ${
        isActive ? "text-white" : "text-gray-400 hover:text-blue-400"
      }`;
    }
    return `flex flex-col items-center justify-center text-xs font-medium transition ${
      isActive ? "text-white" : "text-gray-400 hover:text-blue-400"
    }`;
  };

  return (
    <>
      {/* ── Top header bar ───────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-[9999] bg-[#172454] border-b border-white/10 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <img
              src={Vegaz}
              className="h-9 md:h-10 lg:h-11 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
              alt="VegazGameShop"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6 lg:gap-8">
            <li>
              <Link to="/" className={getNavClass("/", true)}>
                <IconHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to="/topup" className={getNavClass("/topup", true)}>
                <IconTopup />
                <span>Top Up</span>
              </Link>
            </li>
            <li>
              <Link to="/stock" className={getNavClass("/stock", true)}>
                <IconStock />
                <span>Stock</span>
              </Link>
            </li>
            <li>
              <Link
                to="/check-region"
                className={getNavClass("/check-region", true)}
              >
                <IconRegion />
                <span>Region</span>
              </Link>
            </li>
            <li>
              <Link
                to="/calculator-mlbb"
                className={getNavClass("/calculator-mlbb", true)}
              >
                <IconCalculator />
                <span>Calculator</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className={getNavClass("/about", true)}>
                <IconAbout />
                <span>About</span>
              </Link>
            </li>
          </ul>

          <button
            id="mobileToggle"
            className="lg:hidden text-white text-3xl p-2"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
          >
            ☰
          </button>
        </div>
      </header>

      {/* ── Mobile dropdown ──────────────────────── */}
      <div
        id="mobileMenu"
        className={`fixed top-16 left-0 w-full bg-[#1c4ed8]/55 backdrop-blur-lg border-b border-white/10 flex flex-col gap-2 p-6 z-40 lg:hidden transition-all duration-300 ease-out ${
          menuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <a
          href={orderHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl font-semibold text-gray-200 hover:text-blue-400 hover:bg-white/5 transition"
        >
          <IconSell />
          <span>Jual Account</span>
        </a>
        <div className="h-px bg-white/10 my-1" />
        <a
          href={csHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl font-semibold text-gray-200 hover:text-blue-400 hover:bg-white/5 transition"
        >
          <IconSupport />
          <span>Customer Service</span>
        </a>
      </div>

      {/* ── Mobile bottom nav ─────────────────────── */}
      {!hideBottomNav && (
        <nav className="fixed bottom-0 left-0 w-full bg-[#172454] border-t border-white/10 shadow-[0_-4px_20px_rgba(0,0,0,0.4)] flex justify-around items-center h-16 lg:hidden z-50">
          <Link to="/" className={getNavClass("/")}>
            <IconHome />
            <span>Home</span>
          </Link>
          <Link to="/topup" className={getNavClass("/topup")}>
            <IconTopup />
            <span>Top Up</span>
          </Link>
          <Link to="/stock" className={getNavClass("/stock")}>
            <IconStock />
            <span>Stock</span>
          </Link>
          <Link to="/check-region" className={getNavClass("/check-region")}>
            <IconRegion />
            <span>Region</span>
          </Link>
          <Link
            to="/calculator-mlbb"
            className={getNavClass("/calculator-mlbb")}
          >
            <IconCalculator />
            <span>Calc</span>
          </Link>
          <Link to="/about" className={getNavClass("/about")}>
            <IconAbout />
            <span>About</span>
          </Link>
        </nav>
      )}
    </>
  );
}
