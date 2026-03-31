import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import bg from "../../assets/background/bg-mengkilat.webp";

export default function Banner() {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetchBanner();
  }, []);

  async function fetchBanner() {
    try {
      const res = await apiGet("/api/banner");

      // 🔥 ambil data + filter home
      const data = (res?.data || []).filter((b) => b.page === "home");

      console.log("BANNER:", data);

      setBanners(data);
    } catch (err) {
      console.error("Banner error:", err);
    }
  }

  function next() {
    setIndex((prev) => (prev + 1) % banners.length);
  }

  function prev() {
    setIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  }

  // 🔥 fallback (biar ga ilang)
  if (!banners.length) {
    return (
      <div
        className="w-full h-[220px] rounded-xl bg-cover bg-center animate-pulse"
        style={{ backgroundImage: `url(${bg})` }}
      />
    );
  }

  return (
    <div
      className="relative w-full aspect-[16/7] rounded-xl overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* IMAGE */}
      <img src={banners[index]?.image} className="w-full h-full object-cover" />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* tombol */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/40 w-10 h-10 rounded-full"
      >
        ←
      </button>

      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/40 w-10 h-10 rounded-full"
      >
        →
      </button>
    </div>
  );
}
