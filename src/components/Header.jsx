import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import { RiHome3Fill } from "react-icons/ri";
import { DiRuby } from "react-icons/di";
import { RiArchiveStackFill } from "react-icons/ri";
import { RiMapPinFill } from "react-icons/ri";
import { RiCustomerServiceFill } from "react-icons/ri";
import { BiSolidCalculator } from "react-icons/bi";
import { RiSpam2Fill } from "react-icons/ri";
import { RiSendPlaneFill } from "react-icons/ri";
import Vegaz from "../assets/logo/vegazgameshop.png";

// --- Icons ---
const IconHome = () => <RiHome3Fill className="w-6 h-6" />;
const IconStock = () => <RiArchiveStackFill className="w-6 h-6" />;
const IconRegion = () => <RiMapPinFill className="w-6 h-6" />;
const IconTopup = () => <DiRuby className="w-6 h-6" />;
const IconAbout = () => <RiSpam2Fill className="w-6 h-6" />;
const IconCalculator = () => <BiSolidCalculator className="w-6 h-6" />;
const IconSell = () => <RiSendPlaneFill className="w-6 h-6" />;
const IconSupport = () => <RiCustomerServiceFill className="w-6 h-6" />;

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

      {/* ── Mobile dropdown (Original Theme - Tidy Version) ──────────────────────── */}
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
          className="flex items-center gap-3 p-3 rounded-xl font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition"
        >
          <IconSell />
          <span>Jual Account</span>
        </a>

        <div className="h-px bg-white/10 my-1" />

        <a
          href={csHref}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 p-3 rounded-xl font-semibold text-gray-200 hover:text-white hover:bg-white/10 transition"
        >
          <IconSupport />
          <span>Customer Service</span>
        </a>

        {/* FIXED: Link About sekarang mengarah ke /about dan menggunakan <Link> */}
        <Link
          to="/about"
          className={`flex items-center gap-3 p-3 rounded-xl font-semibold transition ${
            pathname === "/about"
              ? "bg-white/20 text-white"
              : "text-gray-200 hover:text-white hover:bg-white/10"
          }`}
        >
          <IconAbout />
          <span>About & FAQ</span>
        </Link>
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
        </nav>
      )}
    </>
  );
}
