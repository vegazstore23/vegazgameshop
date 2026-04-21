import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { ShieldCheck, Zap } from "lucide-react";

export default function BottomPriceBar({ account }) {
  const [waAdmin, setWaAdmin] = useState("");
  const mainPrice = Number(account?.price) || 0;

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await apiGet("/api/contact");
        const admin = res.data?.find(
          (c) => c.isActive && c.roles?.includes("order"),
        );
        if (admin) setWaAdmin(admin.value);
      } catch (err) {
        console.error(err);
      }
    }
    fetchContact();
  }, []);

  if (!account || account.status?.toLowerCase() === "sold") return null;

  const handleOrder = () => {
    const cleanWA = waAdmin.replace(/\D/g, "");
    const message = `Halo Admin Vegaz, saya berminat dengan unit ini:\n\n🚀 Unit: ${account.title}\n🆔 Kod: ${account.code}\n💰 Harga: RM ${mainPrice.toFixed(2)}\n\nAdakah masih tersedia?`;
    window.open(
      `https://wa.me/${cleanWA}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#051636]/95 backdrop-blur-2xl border-t border-blue-500/30 z-[100] animate-in slide-in-from-bottom duration-500 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      {/* ── MOBILE layout (< md) ── stack vertical, compact */}
      <div className="md:hidden p-4 max-w-md mx-auto space-y-3">
        {/* Info row */}
        <div className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-2xl border border-white/10">
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-[9px] text-blue-300 font-black uppercase tracking-[0.2em]">
                Maklumat Unit
              </span>
            </div>
            <span className="text-white font-black text-sm truncate max-w-[150px] italic">
              {account.title}
            </span>
            <span className="text-lg font-black text-yellow-400 font-orbitron">
              RM {mainPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="bg-blue-600 px-3 py-1 rounded-lg shadow-[0_0_12px_rgba(37,99,235,0.4)]">
              <span className="text-white font-black text-[10px] tracking-wider uppercase font-mono italic">
                {account.code}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={9} className="text-green-400" />
              <span className="text-[8px] text-green-400 font-black uppercase tracking-tight">
                Stok Disahkan
              </span>
            </div>
          </div>
        </div>
        {/* CTA button */}
        <button
          onClick={handleOrder}
          disabled={!waAdmin}
          className="group relative w-full overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 text-white py-3.5 rounded-xl font-black text-xs transition-all active:scale-[0.96] shadow-lg shadow-green-900/40 uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
          <div className="relative flex items-center justify-center gap-2">
            <Zap size={13} className="fill-white" />
            <span>{waAdmin ? "Beli Sekarang" : "Sedang Menyambung..."}</span>
          </div>
        </button>
      </div>

      {/* ── DESKTOP layout (≥ md) ── single row, info kiri + butang kanan */}
      <div className="hidden md:flex items-center gap-6 px-8 py-3 max-w-7xl mx-auto">
        {/* Kiri: Nama + Kod + Status */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          {/* Dot pulse */}
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse flex-shrink-0" />

          {/* Nama & Kod */}
          <div className="min-w-0">
            <p className="text-[9px] text-blue-300 font-black uppercase tracking-[0.2em] leading-none mb-0.5">
              Maklumat Unit
            </p>
            <p className="text-white font-black text-sm truncate italic leading-tight">
              {account.title}
            </p>
          </div>

          {/* Divider */}
          <div className="w-px h-8 bg-white/10 flex-shrink-0" />

          {/* Kod badge */}
          <div className="bg-blue-600 px-3 py-1.5 rounded-lg flex-shrink-0 shadow-[0_0_12px_rgba(37,99,235,0.35)]">
            <span className="text-white font-black text-[10px] tracking-wider uppercase font-mono italic">
              {account.code}
            </span>
          </div>

          {/* Verified */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <ShieldCheck size={11} className="text-green-400" />
            <span className="text-[9px] text-green-400 font-black uppercase tracking-tight">
              Stok Disahkan
            </span>
          </div>
        </div>

        {/* Tengah: Harga */}
        <div className="flex-shrink-0 text-center">
          <p className="text-[9px] text-blue-300 font-black uppercase tracking-widest leading-none mb-0.5">
            Harga Semasa
          </p>
          <span className="text-2xl font-black text-yellow-400 font-orbitron drop-shadow-[0_0_8px_rgba(250,204,21,0.3)]">
            RM {mainPrice.toFixed(2)}
          </span>
        </div>

        {/* Kanan: Butang CTA */}
        <button
          onClick={handleOrder}
          disabled={!waAdmin}
          className="group relative flex-shrink-0 overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 text-white px-10 py-3 rounded-xl font-black text-xs transition-all active:scale-[0.97] shadow-lg shadow-green-900/40 uppercase tracking-[0.2em] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" />
          <div className="relative flex items-center gap-2">
            <Zap size={13} className="fill-white" />
            <span>{waAdmin ? "Beli Sekarang" : "Sedang Menyambung..."}</span>
          </div>
        </button>
      </div>
    </div>
  );
}
