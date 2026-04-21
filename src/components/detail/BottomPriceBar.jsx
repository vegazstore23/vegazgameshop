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
          (c) =>
            c.role?.toLowerCase().includes("order") ||
            c.tags?.toLowerCase().includes("order"),
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
    const message = `Halo Admin Vegaz, saya berminat dengan unit:\n\n🚀 Unit: ${account.title}\n🆔 Code: ${account.code}\n💰 Harga: RM ${mainPrice.toFixed(2)}\n\nApakah masih tersedia?`;
    window.open(
      `https://wa.me/${cleanWA}?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <div className="fixed bottom-0 left-0 w-full p-4 bg-[#051636]/95 backdrop-blur-2xl border-t border-blue-500/30 md:hidden z-[100] animate-in slide-in-from-bottom duration-500 shadow-[0_-20px_50px_rgba(0,0,0,0.8)]">
      <div className="max-w-md mx-auto space-y-4">
        {/* Row Atas: Info Akun & Code */}
        <div className="flex justify-between items-center bg-white/5 p-3 rounded-2xl border border-white/10">
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
              <span className="text-[10px] text-blue-300 font-black uppercase tracking-[0.2em] leading-none">
                Identity Unit
              </span>
            </div>
            <span className="text-white font-black text-sm truncate max-w-[140px] italic">
              {account.title}
            </span>
            <div className="text-xl font-black text-yellow-400 font-orbitron mt-1 drop-shadow-[0_0_10px_rgba(250,204,21,0.3)]">
              RM {mainPrice.toFixed(2)}
            </div>
          </div>

          <div className="flex flex-col items-end">
            {/* Primary Key / Code Unit Dibuat Sangat Jelas */}
            <div className="bg-blue-600 px-3 py-1 rounded-lg mb-2 shadow-[0_0_15px_rgba(37,99,235,0.4)]">
              <span className="text-white font-black text-[11px] tracking-wider uppercase font-mono italic">
                {account.code}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <ShieldCheck size={10} className="text-green-400" />
              <span className="text-[9px] text-green-400 font-black uppercase tracking-tighter">
                Verified Stock
              </span>
            </div>
          </div>
        </div>

        {/* Tombol Secure - Full Width & Premium */}
        <button
          onClick={handleOrder}
          disabled={!waAdmin}
          className="group relative w-full overflow-hidden bg-gradient-to-r from-green-600 to-emerald-500 text-white py-4 rounded-xl font-black text-xs transition-all active:scale-[0.96] shadow-lg shadow-green-900/40 uppercase tracking-[0.2em]"
        >
          <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12"></div>
          <div className="relative flex items-center justify-center gap-2">
            <Zap size={14} className="fill-white" />
            <span>{waAdmin ? "Secure Transaction Now" : "Connecting..."}</span>
          </div>
        </button>
      </div>
    </div>
  );
}
