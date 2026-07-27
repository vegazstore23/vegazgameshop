import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const handleSamePageClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const targetPath = new URL(link.href).pathname;

      if (targetPath === window.location.pathname) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    document.addEventListener("click", handleSamePageClick);
    return () => document.removeEventListener("click", handleSamePageClick);
  }, []);

  return null;
}
