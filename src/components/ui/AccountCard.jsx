import { useNavigate } from "react-router-dom";

export default function AccountCard({ acc, type }) {
  const navigate = useNavigate();
  if (!acc) return null;

  const ASSET_BASE = "https://apivgz.vegazgameshop.com";

  // PRIORITAS: 1. Kolom image utama, 2. Gambar pertama dari gallery
  const imagePath =
    acc.image || (acc.AccountImages && acc.AccountImages[0]?.image);

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

  const goDetail = (e) => {
    e.preventDefault();
    navigate(`/detail/${acc.id}`);
  };

  const orderWA = (e) => {
    e.preventDefault();
    const message = `Halo Admin Vegaz, saya berminat dengan akun:\n\nTitle: ${acc.title}\nCode: ${acc.code}\nHarga: RM ${sellingPriceRM}\n\nApakah masih tersedia?`;
    window.open(
      `https://wa.me/60XXXXXXXXXX?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="group relative rounded-2xl bg-gradient-to-b from-blue-500/90 to-blue-600/90 border border-white/10 shadow-lg hover:-translate-y-1 transition flex flex-col h-full text-white overflow-hidden">
      {/* Label Diskon */}
      <div className="absolute top-2 left-2 bg-orange-500 text-[10px] px-2 py-1 rounded z-10 font-bold shadow-md">
        -{discountPercent}%
      </div>

      {/* Area Gambar */}
      <div
        className="aspect-[4/5] bg-slate-800 overflow-hidden cursor-pointer relative"
        onClick={goDetail}
      >
        {imagePath ? (
          <img
            src={getImageUrl(imagePath)}
            alt={acc.title || "Account"}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/20 text-xs font-bold tracking-widest uppercase">
            No Image
          </div>
        )}

        {/* Overlay Role (Hanya tampil jika ada data role) */}
        {acc.role && (
          <div className="absolute bottom-2 left-2">
            <span className="text-[10px] bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 font-bold text-cyan-400 uppercase">
              {acc.role}
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-center">
          <span className="text-[10px] bg-black/40 px-2 py-0.5 rounded font-mono text-gray-300">
            {acc.code}
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded font-black tracking-tighter ${
              isHot ? "bg-red-500" : "bg-yellow-500 text-black"
            }`}
          >
            {isHot ? "HOT" : "STAR"}
          </span>
        </div>

        <h3 className="text-sm font-bold line-clamp-2 min-h-[40px] leading-tight">
          {acc.title || "Akun MLBB"}
        </h3>

        {/* Harga Section */}
        <div className="flex flex-col gap-1 mt-1">
          <div className="flex justify-between text-[10px] text-gray-400 line-through">
            <span>RM {originalPriceRM.toLocaleString("ms-MY")}</span>
            <span>Rp {originalPriceIDR.toLocaleString("id-ID")}</span>
          </div>
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="text-yellow-400 font-black text-lg leading-none">
                RM {sellingPriceRM.toLocaleString("ms-MY")}
              </span>
            </div>
            <span className="text-[11px] font-bold text-white/90">
              Rp {sellingPriceIDR.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Button Section */}
        <div className="mt-auto pt-3">
          {type === "home" ? (
            <button
              onClick={orderWA}
              className="w-full bg-green-500 hover:bg-green-600 py-2.5 rounded-xl text-xs font-black transition shadow-lg shadow-green-500/20 uppercase"
            >
              Beli Sekarang
            </button>
          ) : (
            <button
              onClick={goDetail}
              className="w-full bg-white/10 hover:bg-white/20 py-2.5 rounded-xl text-xs font-black transition border border-white/20 uppercase"
            >
              Lihat Detail
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
