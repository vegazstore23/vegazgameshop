import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HIDE_BOTTOM_NAV_PATHS = ["/detail", "/checkout"];

export default function MainLayout({ children }) {
  const { pathname } = useLocation();

  const hideBottomNav = HIDE_BOTTOM_NAV_PATHS.some((p) =>
    pathname.startsWith(p),
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#050510]">
      <Header hideBottomNav={hideBottomNav} />

      <main className="flex-1 pt-16 md:pt-20 pb-16 lg:pb-0">{children}</main>

      <Footer />
    </div>
  );
}
