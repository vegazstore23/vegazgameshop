import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  // 1. Efek untuk pindah halaman (Route Berubah)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // 2. Efek untuk klik link yang sama (Force Scroll)
  useEffect(() => {
    const handleSamePageClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      // Ambil path tujuan dari link (misal: /stock)
      const targetPath = new URL(link.href).pathname;

      // Jika path tujuan sama dengan path saat ini
      if (targetPath === window.location.pathname) {
        window.scrollTo({
          top: 0,
          behavior: "smooth", // Pakai smooth agar terlihat animasinya
        });
      }
    };

    document.addEventListener("click", handleSamePageClick);
    return () => document.removeEventListener("click", handleSamePageClick);
  }, []);

  return null;
}
