export default function AccountCard({ acc, type }) {
  if (!acc) return null;

  const image = acc.image || null;
  const isHot = acc.isHot || false;

  const sellingPriceRM = acc.price || 0; // Harga asli dari database
  const discountPercent = 10; // Set diskon palsu 10%

  // Rumus mencari harga coret: Harga Jual dibagi 0.9 (dibulatkan agar tidak koma)
  const originalPriceRM = Math.round(sellingPriceRM / 0.9);

  // Rate Konversi
  const rateIDR = 4100;
  const sellingPriceIDR = sellingPriceRM * rateIDR;
  const originalPriceIDR = originalPriceRM * rateIDR;

  const goDetail = () => {
    console.log("Menuju halaman detail untuk ID:", acc.id);
  };

  const orderWA = () => {
    console.log("Pesan via WA untuk ID:", acc.id);
  };

  return (
    <div
      className="group relative rounded-2xl
      bg-gradient-to-b from-blue-500/90 to-blue-600/90
      border border-white/10 shadow-lg
      hover:-translate-y-1 transition
      flex flex-col h-full text-white"
    >
      {/* 🔥 BADGE DISKON STATIS 10% */}
      <div className="absolute top-2 left-2 bg-orange-500 text-xs px-2 py-1 rounded z-10 font-bold shadow-md">
        -{discountPercent}%
      </div>

      {/* IMAGE */}
      <div
        className="aspect-[4/5] bg-slate-800 overflow-hidden cursor-pointer rounded-t-2xl relative"
        onClick={goDetail}
      >
        {image ? (
          <img
            src={image}
            alt={acc.title || "Account"}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          /* Placeholder jika admin belum upload gambar akun */
          <div className="w-full h-full flex items-center justify-center text-white/20 text-sm font-bold tracking-widest">
            NO IMAGE
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        {/* TOP */}
        <div className="flex justify-between items-center">
          <span className="text-xs bg-black/40 px-2 py-1 rounded font-medium">
            {acc.code}
          </span>

          <span
            className={`text-xs px-2 py-1 rounded font-bold ${
              isHot ? "bg-red-500" : "bg-yellow-500"
            }`}
          >
            {isHot ? "HOT" : "STAR"}
          </span>
        </div>

        {/* TITLE */}
        <h3 className="text-sm font-medium line-clamp-2 min-h-[40px]">
          {acc.title || "Akun MLBB Sultan"}
        </h3>

        {/* PRICE SECTION */}
        <div className="flex flex-col gap-1 mt-1">
          {/* HARGA CORET (Harga Mark-up) */}
          <div className="flex justify-between text-[11px] text-gray-300 line-through opacity-80">
            <span>RM {originalPriceRM.toLocaleString("id-ID")}</span>
            <span>Rp {originalPriceIDR.toLocaleString("id-ID")}</span>
          </div>

          {/* HARGA JUAL ASLI DARI DATABASE */}
          <div className="flex justify-between items-center">
            <span className="text-yellow-400 font-bold text-lg">
              RM {sellingPriceRM.toLocaleString("id-ID")}
            </span>
            <span className="text-xs font-semibold text-white">
              Rp {sellingPriceIDR.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* PUSH BUTTON KE BAWAH */}
        <div className="mt-auto pt-4">
          {type === "home" ? (
            <button
              onClick={orderWA}
              className="w-full bg-green-500 hover:bg-green-600 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-green-500/30"
            >
              Beli Sekarang
            </button>
          ) : (
            <button
              onClick={goDetail}
              className="w-full bg-blue-700 hover:bg-blue-800 py-2.5 rounded-xl text-sm font-bold transition shadow-lg shadow-blue-900/30"
            >
              Lihat Detail
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
