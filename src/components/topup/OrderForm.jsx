import React, { useState, useEffect } from "react";
import { apiGet } from "../../services/api";
import {
  User,
  Hash,
  Smartphone,
  Loader2,
  AlertTriangle,
  ShieldCheck,
  XCircle,
} from "lucide-react";

const OrderForm = ({ formData, setFormData, nickname, setNickname, brand }) => {
  const [checking, setChecking] = useState(false);
  const [region, setRegion] = useState(null);
  const [error, setError] = useState("");
  const [isCooldown, setIsCooldown] = useState(false);

  // Fungsi Verifikasi Akun
  const checkAccount = async () => {
    // Jangan jalan jika sedang mengecek, sedang cooldown, atau data kurang
    if (!formData.userId || checking || isCooldown) return;

    setChecking(true);
    setError("");
    setNickname("");
    setRegion(null);

    try {
      const res = await apiGet(
        `/api/region?id=${formData.userId}&serverid=${formData.zoneId || ""}&brand=${encodeURIComponent(brand)}`,
      );

      if (res.status === "success" && res.result) {
        const detectedNick =
          res.result.nickname || res.result.userName || res.result.name;
        const detectedRegion = res.result.country || res.result.region;

        if (detectedNick) {
          setNickname(detectedNick);
          setRegion(detectedRegion);

          // Alert Region Lock khusus MLBB
          if (
            brand.toLowerCase().includes("mobile legends") &&
            detectedRegion?.toLowerCase() !== "indonesia"
          ) {
            alert(
              `⚠️ REGION ALERT: Akun terdeteksi di ${detectedRegion}. Pastikan produk sesuai region!`,
            );
          }
        } else {
          setError("ID / Server tidak ditemukan.");
        }
      } else {
        setError("Akun tidak ditemukan. Silakan periksa ID & Server.");
      }
    } catch (err) {
      setError("Gagal memverifikasi. Coba lagi nanti.");
    } finally {
      setChecking(false);

      // Aktifkan Cooldown selama 5 detik setelah pengecekan selesai
      setIsCooldown(true);
      setTimeout(() => {
        setIsCooldown(false);
      }, 5000);
    }
  };

  // Trigger otomatis dengan Debounce 1 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      // Hanya trigger jika ID minimal 4 karakter dan tidak sedang cooldown
      if (formData.userId && formData.userId.length >= 4 && !isCooldown) {
        checkAccount();
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [formData.userId, formData.zoneId]);

  return (
    <div className="space-y-5">
      {/* Input ID User */}
      <div>
        <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 block">
          User ID
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            <Hash size={18} />
          </div>
          <input
            type="text"
            placeholder="Masukkan ID"
            disabled={checking} // Lock input saat verifying
            value={formData.userId}
            onChange={(e) =>
              setFormData({ ...formData, userId: e.target.value })
            }
            className={`w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-white/5 rounded-2xl text-white text-sm outline-none transition-all ${
              checking
                ? "opacity-50 cursor-not-allowed"
                : "focus:border-blue-500/50 focus:bg-slate-800"
            }`}
          />
        </div>
      </div>

      {/* Input Zone ID */}
      <div>
        <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 block">
          Zone ID / Server
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            <User size={18} />
          </div>
          <input
            type="text"
            placeholder="Masukkan Server/Zone"
            disabled={checking} // Lock input saat verifying
            value={formData.zoneId}
            onChange={(e) =>
              setFormData({ ...formData, zoneId: e.target.value })
            }
            className={`w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-white/5 rounded-2xl text-white text-sm outline-none transition-all ${
              checking
                ? "opacity-50 cursor-not-allowed"
                : "focus:border-blue-500/50 focus:bg-slate-800"
            }`}
          />
        </div>
      </div>

      {/* Box Status: Verifying / Nickname / Error */}
      <div
        className={`transition-all duration-500 overflow-hidden ${nickname || checking || error ? "max-h-24 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div
          className={`rounded-2xl p-4 border flex items-center justify-between ${
            error
              ? "bg-rose-500/10 border-rose-500/20"
              : "bg-blue-600/10 border-blue-500/20"
          }`}
        >
          <div className="flex items-center gap-3">
            {checking ? (
              <Loader2 size={20} className="text-blue-500 animate-spin" />
            ) : error ? (
              <XCircle size={20} className="text-rose-500" />
            ) : (
              <ShieldCheck size={20} className="text-emerald-400" />
            )}

            <div>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">
                Status Akun
              </p>
              <p
                className={`font-black text-sm tracking-wide ${error ? "text-rose-400" : "text-white"}`}
              >
                {checking ? "Memverifikasi Akun..." : error ? error : nickname}
              </p>
            </div>
          </div>

          {isCooldown && !checking && (
            <div className="text-[9px] bg-white/5 px-2 py-1 rounded text-slate-400 font-bold uppercase animate-pulse">
              Cooldown 5s
            </div>
          )}
        </div>
      </div>

      {/* Input No HP */}
      <div>
        <label className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-2 block">
          No. WhatsApp
        </label>
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
            <Smartphone size={18} />
          </div>
          <input
            type="number"
            placeholder="Contoh: 08123456789"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="w-full pl-12 pr-4 py-3.5 bg-slate-800/50 border border-white/5 rounded-2xl text-white text-sm outline-none focus:border-blue-500/50 focus:bg-slate-800 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
