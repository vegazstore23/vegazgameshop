import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

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
const IconContact = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="18" cy="5" r="2" />
    <circle cx="6" cy="12" r="2" />
    <circle cx="18" cy="19" r="2" />
    <path
      d="M8 12l8-6M8 12l8 6"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
  </svg>
);
const IconStar = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 3l2.9 6 6.6.6-5 4.3 1.5 6.4L12 17l-6 3.3 1.5-6.4-5-4.3 6.6-.6L12 3z" />
  </svg>
);
const IconInfo = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
    <rect x="11" y="10" width="2" height="7" fill="white" />
    <circle cx="12" cy="7" r="1.3" fill="white" />
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
const IconFaq = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" />
    <path
      d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-2 2-2 3"
      stroke="white"
      strokeWidth="1.5"
      fill="none"
    />
    <circle cx="12" cy="17" r="1.2" fill="white" />
  </svg>
);
const IconSupport = () => (
  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a7 7 0 0 0-7 7v4a3 3 0 0 0 3 3h2v-6H7V9a5 5 0 0 1 10 0v1h-3v6h2a3 3 0 0 0 3-3V9a7 7 0 0 0-7-7z" />
  </svg>
);

const PAGE_MAP = {
  "/": "home",
  "/stock": "stock",
  "/topup": "topup",
  "/about": "about",
  "/calculator": "calculator",
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

        // Contact model: roles is a JSON array e.g. ["order"] or ["cs","order"]
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

  /* Close menu on outside click */
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

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const desktopCls = (page) =>
    `flex items-center gap-2 font-semibold transition ${
      activePage === page ? "text-white" : "text-gray-400 hover:text-blue-400"
    }`;

  const bottomCls = (page) =>
    `flex flex-col items-center justify-center text-xs font-medium transition ${
      activePage === page ? "text-white" : "text-gray-400 hover:text-blue-400"
    }`;

  return (
    <>
      {/* ── Top header bar ───────────────────────── */}
      <header className="fixed top-0 left-0 w-full z-[9999] bg-[#172454] border-b border-white/10 shadow-lg">
        <div className="max-w-screen-xl mx-auto px-4 md:px-6 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src="/assets/logo/vegazgameshop.png"
              className="h-9 md:h-10 lg:h-11 object-contain drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]"
              alt="VegazGameShop"
            />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden lg:flex items-center gap-6 lg:gap-8 text-xl">
            <li>
              <Link to="/" className={desktopCls("home")}>
                <IconHome />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/#feedbackWrapper"
                className="flex items-center gap-2 font-semibold text-gray-400 hover:text-blue-400"
              >
                <IconStar />
                <span>Feedback</span>
              </Link>
            </li>
            <li>
              <Link to="/topup" className={desktopCls("topup")}>
                <IconTopup />
                <span>Top Up</span>
              </Link>
            </li>
            <li>
              <Link to="/stock" className={desktopCls("stock")}>
                <IconStock />
                <span>Stock</span>
              </Link>
            </li>
            <li>
              <Link
                to="/#contactWrapper"
                className="flex items-center gap-2 font-semibold text-gray-400 hover:text-blue-400"
              >
                <IconContact />
                <span>Contact</span>
              </Link>
            </li>
            <li>
              <Link to="/about" className={desktopCls("about")}>
                <IconInfo />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link to="/calculator" className={desktopCls("calculator")}>
                <IconCalculator />
                <span>Calculator</span>
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <button
            id="mobileToggle"
            className="lg:hidden text-white text-3xl p-2"
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen((v) => !v);
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
            ? "opacity-100 translate-y-0 pointer-events-auto"
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
          <span>Jual Akun</span>
        </a>

        <div className="h-px bg-white/10 my-1" />

        <Link
          to="/about"
          className="flex items-center gap-3 p-3 rounded-xl font-semibold text-gray-200 hover:text-blue-400 hover:bg-white/5 transition"
        >
          <IconFaq />
          <span>About / FAQ</span>
        </Link>

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
          <Link to="/" className={bottomCls("home")}>
            <IconHome />
            <span>Home</span>
          </Link>
          <Link to="/stock" className={bottomCls("stock")}>
            <IconStock />
            <span>Stock</span>
          </Link>
          <Link to="/topup" className={bottomCls("topup")}>
            <IconTopup />
            <span>Top Up</span>
          </Link>
          <Link
            to="/#feedbackWrapper"
            className="flex flex-col items-center justify-center text-xs font-medium transition text-gray-400 hover:text-blue-400"
          >
            <IconStar />
            <span>Feedback</span>
          </Link>
          <Link to="/calculator" className={bottomCls("calculator")}>
            <IconCalculator />
            <span>Calc</span>
          </Link>
        </nav>
      )}
    </>
  );
}
