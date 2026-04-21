import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../../services/api";

import HotIcon from "../../assets/icons/Hot.png";
import StarIcon from "../../assets/icons/Star.webp";

export default function AccountCard({ acc, type }) {
  const navigate = useNavigate();
  const [waAdmin, setWaAdmin] = useState("");

  if (!acc) return null;

  // Normalisasi Status agar pengecekan konsisten
  const statusRaw = acc.status || "Available";
  const status =
    statusRaw.charAt(0).toUpperCase() + statusRaw.slice(1).toLowerCase();
  const isAvailable = status === "Available";

  const statusConfig = {
    Reserved: "bg-yellow-500",
    Hold: "bg-orange-500",
    Sold: "bg-red-600",
  };

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await apiGet("/api/contact");
        const admin = res.data?.find(
          (c) =>
            c.role?.toLowerCase().includes("order") ||
            c.tags?.toLowerCase().includes("order"),
        );
        if (admin) setWaAdmin(admin.value);
      } catch (err) {
        console.error("Gagal ambil kontak WA:", err);
      }
    }
    fetchContact();
  }, []);

  const ASSET_BASE = "https://apivgz.vegazgameshop.com";

  const imagePath =
    acc.image ||
    acc.mainImage ||
    (acc.AccountImages && acc.AccountImages[0]?.image);

  const isHot = acc.isHot || false;
  const sellingPriceRM = Number(acc.price) || 0;
  const discountPercent = 10;
  const originalPriceRM = Math.round(sellingPriceRM / 0.9);

  const rateIDR = 4100;
  const sellingPriceIDR = sellingPriceRM * rateIDR;
  const originalPriceIDR = originalPriceRM * rateIDR;

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${ASSET_BASE}/uploads/${path}`;
  };

  const orderWA = (e) => {
    e.preventDefault();
    e.stopPropagation(); // Biar gak trigger navigate detail
    const cleanWA = waAdmin.replace(/\D/g, "");
    const message = `Halo Admin Vegaz, saya berminat dengan account:\n\nTitle: ${acc.title}\nCode: ${acc.code}\nHarga: RM ${sellingPriceRM} / Rp ${sellingPriceIDR.toLocaleString("id-ID")}\n\nApakah masih tersedia?`;
    window.open(
      `https://wa.me/${cleanWA}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div
      onClick={() => navigate(`/detail/${acc.id}`)}
      className="group relative rounded-2xl bg-gradient-to-b from-blue-500/90 to-blue-600/90 border border-white/10 shadow-lg transition flex flex-col h-full text-white overflow-hidden cursor-pointer"
    >
      {/* Label Diskon */}
      <div className="absolute top-2 left-2 bg-orange-500 text-[10px] px-2 py-1 rounded z-10 font-bold shadow-md">
        -{discountPercent}%
      </div>

      {/* Badge PNG (Hot/Star) */}
      <div className="absolute top-2 right-2 z-10">
        <img
          src={isHot ? HotIcon : StarIcon}
          alt="badge"
          className="w-8 h-8 object-contain"
        />
      </div>

      {/* Area Gambar */}
      <div className="aspect-[4/5] bg-slate-800 overflow-hidden relative">
        {imagePath ? (
          <img
            src={getImageUrl(imagePath)}
            alt={acc.title}
            className={`w-full h-full object-cover transition duration-500 ${
              isAvailable ? "group-hover:scale-105" : "opacity-40 grayscale"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-bold uppercase">
            No Image
          </div>
        )}

        {/* Info Badge Status (Hanya muncul jika TIDAK Available) */}
        {!isAvailable && statusConfig[status] && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <span
              className={`${statusConfig[status]} text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl border border-white/20`}
            >
              {status}
            </span>
          </div>
        )}

        {/* Info Kode Akun */}
        <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center">
          <span className="text-[10px] bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 font-bold text-yellow-400">
            {acc.code}
          </span>
        </div>
      </div>

      {/* Konten Text */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3
          className={`text-sm font-bold line-clamp-2 min-h-[40px] leading-tight ${!isAvailable ? "opacity-50" : ""}`}
        >
          {acc.title || "Akun MLBB"}
        </h3>

        {/* Harga Section */}
        <div
          className={`flex flex-col gap-1 mt-1 ${!isAvailable ? "opacity-50" : ""}`}
        >
          <div className="flex justify-between text-[10px] text-gray-400 line-through">
            <span>RM {originalPriceRM.toLocaleString("ms-MY")}</span>
            {type === "stock" && (
              <span>Rp {originalPriceIDR.toLocaleString("id-ID")}</span>
            )}
          </div>

          <div className="flex justify-between items-end">
            <span className="text-yellow-400 font-black text-lg leading-none">
              RM {sellingPriceRM.toLocaleString("ms-MY")}
            </span>
            {type === "stock" && (
              <span className="text-[11px] font-bold text-white/90">
                Rp {sellingPriceIDR.toLocaleString("id-ID")}
              </span>
            )}
          </div>
        </div>

        {/* Button hanya jika Available dan tipe Home */}
        {type === "home" && isAvailable && (
          <div className="mt-auto pt-3">
            <button
              onClick={orderWA}
              className="w-full bg-green-500 hover:bg-green-600 py-2.5 rounded-xl text-xs font-black transition shadow-lg uppercase"
            >
              Beli Sekarang
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
