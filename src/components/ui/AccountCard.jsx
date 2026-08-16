import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../../services/api";
import { useLangCurr } from "../context/LanguageCurrencyContext";
import { generateMessage, sendToChat } from "../../utils/FormChat";

import HotIcon from "../../assets/icons/Hot.png";
import StarIcon from "../../assets/icons/Star.webp";

export default function AccountCard({ acc, type, waAdmin: propWaAdmin }) {
  const navigate = useNavigate();
  const { lang, formatPrice, t } = useLangCurr();
  const [waAdmin, setWaAdmin] = useState(propWaAdmin || "");

  if (!acc) return null;

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
    if (!propWaAdmin) {
      async function fetchContact() {
        try {
          const res = await apiGet("/api/contact");
          const admin = res.data?.find(
            (c) =>
              c.isActive &&
              (c.roles?.includes("order") || c.roles?.includes("midman")),
          );
          if (admin) setWaAdmin(admin.value);
        } catch (err) {
          console.error("Gagal ambil kontak WA:", err);
        }
      }
      fetchContact();
    }
  }, [propWaAdmin]);

  const ASSET_BASE = "https://apivgz.vegazgameshop.com";
  const imagePath =
    acc.image ||
    acc.mainImage ||
    (acc.AccountImages && acc.AccountImages[0]?.image);
  const isHot = acc.isHot || false;

  const priceIDR = Number(acc.price) || 0;
  const originalPriceIDR = Math.round(priceIDR / 0.9);

  const getImageUrl = (path) => {
    if (!path) return null;
    return path.startsWith("http") ? path : `${ASSET_BASE}/uploads/${path}`;
  };

  const handleOrder = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    const detailUrl = `${window.location.origin}/detail/${acc.id}`;
    const formattedPrice = formatPrice(priceIDR);

    const message = generateMessage("account_buy", {
      title: acc.title || acc.code,
      code: acc.code,
      price: formattedPrice,
      url: detailUrl,
    });

    sendToChat(waAdmin, message);
  };

  return (
    <div
      onClick={() => navigate(`/detail/${acc.id}`)}
      className="group relative rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 border border-white/10 shadow-lg transition flex flex-col h-full text-white overflow-hidden cursor-pointer"
    >
      <div className="absolute top-2 left-2 bg-orange-500 text-[10px] px-2 py-1 rounded z-10 font-bold shadow-md">
        -10%
      </div>

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
            alt={acc.title || acc.code}
            className={`w-full h-full object-cover transition duration-500 ${
              isAvailable ? "group-hover:scale-105" : "opacity-40 grayscale"
            }`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-bold uppercase">
            No Image
          </div>
        )}

        {!isAvailable && statusConfig[status] && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
            <span
              className={`${statusConfig[status]} text-white text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-xl border border-white/20`}
            >
              {status}
            </span>
          </div>
        )}

        {type === "stock" && acc.role && (
          <div className="absolute bottom-2 left-2 right-2 flex justify-start items-center">
            <span className="text-[9px] bg-blue-600/80 backdrop-blur-sm px-2 py-1 rounded-md border border-white/20 font-black uppercase tracking-wider text-white shadow-lg">
              {acc.role}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className={`${!isAvailable ? "opacity-50" : ""}`}>
          <span className="text-sm font-black text-white uppercase tracking-wider block">
            CODE: {acc.code}
          </span>
        </div>

        <div
          className={`flex flex-col gap-1 mt-auto ${!isAvailable ? "opacity-50" : ""}`}
        >
          <div className="flex justify-between text-[11px] text-gray-200 line-through">
            <span>{formatPrice(originalPriceIDR)}</span>
          </div>

          <div className="flex justify-between items-end">
            <span className="text-yellow-400 font-black text-lg leading-none">
              {formatPrice(priceIDR)}
            </span>
          </div>
        </div>

        {type === "home" && isAvailable && (
          <div className="pt-1">
            <button
              onClick={handleOrder}
              className="w-full bg-green-500 hover:bg-green-600 py-2.5 rounded-xl text-xs font-black transition shadow-lg uppercase"
            >
              {t("global", "buyNow")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
