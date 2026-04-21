import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";

export default function DetailInfo({ account, isDescOpen, setIsDescOpen }) {
  const [waAdmin, setWaAdmin] = useState("");

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

  const mainPrice = Number(account.price);
  const originalPrice = Math.round(mainPrice / 0.9); // Simulasi diskon 10%

  const handleOrder = () => {
    const cleanWA = waAdmin.replace(/\D/g, "");
    const message = `Halo Admin Vegaz, saya berminat dengan account:\n\nTitle: ${account.title}\nCode: ${account.code}\nHarga: RM ${mainPrice.toFixed(2)}\n\nApakah masih tersedia?`;
    window.open(
      `https://wa.me/${cleanWA}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="p-6 bg-[#021d4a]/60 backdrop-blur-xl border border-blue-400/20 rounded-3xl text-white shadow-2xl">
      <div className="mb-2">
        <span className="text-blue-400 text-[10px] font-black tracking-[0.2em] uppercase">
          Account Detail
        </span>
      </div>
      <h1 className="text-3xl font-black mb-4 uppercase italic tracking-tighter font-orbitron bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
        {account.title}
      </h1>

      <div className="flex gap-2 mb-6">
        <div className="bg-blue-500/20 border border-blue-400/30 px-4 py-1.5 rounded-lg font-bold text-blue-300 text-[10px] tracking-widest uppercase">
          {account.code}
        </div>
        <div
          className={`px-4 py-1.5 rounded-lg font-bold text-white text-[10px] tracking-widest uppercase ${account.status === "available" ? "bg-green-600/40 border border-green-500/50" : "bg-red-600/40 border border-red-500/50"}`}
        >
          {account.status}
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 p-5 rounded-2xl mb-6">
        <p className="text-[10px] text-blue-300 uppercase font-black mb-1 tracking-widest">
          Current Price
        </p>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl font-black text-yellow-400 font-orbitron">
            RM {mainPrice.toFixed(2)}
          </span>
          <span className="text-gray-500 line-through font-bold text-sm">
            RM {originalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <button
          onClick={() => setIsDescOpen(!isDescOpen)}
          className="w-full flex justify-between items-center text-blue-300 font-black text-[11px] uppercase tracking-widest mb-3 bg-white/5 px-4 py-2 rounded-lg hover:bg-white/10 transition-all"
        >
          <span>Description</span>
          <span>{isDescOpen ? "−" : "+"}</span>
        </button>
        {isDescOpen && (
          <div className="bg-black/20 border border-white/5 p-4 rounded-xl text-sm text-gray-300 leading-relaxed font-medium whitespace-pre-line">
            {account.description || "No description provided for this account."}
          </div>
        )}
      </div>

      <button
        onClick={handleOrder}
        disabled={!waAdmin || account.status !== "available"}
        className="w-full bg-green-500 hover:bg-green-400 disabled:bg-gray-600 disabled:opacity-50 text-white py-4 rounded-2xl font-black transition-all transform active:scale-95 shadow-[0_0_20px_rgba(34,197,94,0.3)] uppercase text-xs tracking-[0.2em]"
      >
        {account.status === "available"
          ? "Secure This Account Now"
          : "Account Not Available"}
      </button>
    </div>
  );
}
