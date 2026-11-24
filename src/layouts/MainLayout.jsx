import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

import bottomBg from "../assets/background/FTA.png";

const HIDE_BOTTOM_NAV_PATHS = ["/preview", "/checkout"];

export default function MainLayout({ children }) {
  const { pathname } = useLocation();

  const hideBottomNav = HIDE_BOTTOM_NAV_PATHS.some((p) =>
    pathname.startsWith(p),
  );

  return (
    <div
      className={`min-h-screen flex flex-col bg-black ${
        !hideBottomNav
          ? "pb-[calc(4rem+env(safe-area-inset-bottom))] lg:pb-0"
          : "pb-[env(safe-area-inset-bottom)]"
      }`}
    >
      <Header hideBottomNav={hideBottomNav} />

      <main className="flex-1 pt-[calc(4rem+env(safe-area-inset-top))] md:pt-[calc(5rem+env(safe-area-inset-top))] pb-0">
        {children}
      </main>

      <div className="w-full bg-black leading-none -mt-16 sm:-mt-24 md:-mt-32 lg:-mt-40 relative z-20 pointer-events-none select-none">
        <img
          src={bottomBg}
          alt="Divider Decor"
          className="w-full h-auto block"
        />
      </div>

      <Footer />
    </div>
  );
}
