import React, { useState, useEffect } from "react";
import { X, Tag, Info, CheckCircle2, Megaphone } from "lucide-react";
import { apiGet, apiFetch } from "../../services/api";

export default function PromoModal({
  isOpen,
  onClose,
  account,
  mainPrice,
  formatPrice,
  onConfirm,
}) {
  const [promoCode, setPromoCode] = useState("");
  const [promoData, setPromoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [referralSources, setReferralSources] = useState([]);
  const [selectedReferral, setSelectedReferral] = useState("");
  const [loadingSettings, setLoadingSettings] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const fetchSettings = async () => {
        try {
          const res = await apiGet("/api/settings");
          if (res?.data?.referralSources) {
            setReferralSources(res.data.referralSources);
          }
        } catch (err) {
          console.error("Gagal load settings:", err);
        } finally {
          setLoadingSettings(false);
        }
      };
      fetchSettings();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setLoading(true);
    setMessage(null);

    try {
      const res = await apiFetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode }),
      });

      if (res.success) {
        setPromoData(res.data);
        setMessage({ type: "success", text: "Kupon berjaya digunakan!" });
      } else {
        setPromoData(null);
        setMessage({ type: "error", text: res.message || "Kod tidak sah" });
      }
    } catch (err) {
      setPromoData(null);
      setMessage({ type: "error", text: "Gagal memvalidasi kod promo." });
    } finally {
      setLoading(false);
    }
  };

  let finalPrice = mainPrice;
  let discountAmount = 0;
  let discountPercent = 0;

  if (promoData) {
    if (promoData.discount_type === "percent") {
      discountPercent = Number(promoData.discount_value);
      discountAmount = mainPrice * (discountPercent / 100);
    } else {
      discountAmount = Number(promoData.discount_value);
      if (mainPrice > 0) {
        discountPercent = Math.round((discountAmount / mainPrice) * 100);
      }
    }
    finalPrice = Math.max(0, mainPrice - discountAmount);
  }

  const handleLanjutkan = () => {
    onConfirm({
      promo: promoData,
      finalPrice: finalPrice,
      referral: selectedReferral,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center z-[9999] p-0 sm:p-4 transition-opacity duration-300 animate-in fade-in">
      <div className="bg-[#1c1c22] border border-slate-700/80 rounded-t-3xl sm:rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative flex flex-col max-h-[90vh] transition-transform duration-300 transform animate-in slide-in-from-bottom">
        <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-[#282830]/50 shrink-0">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            Ringkasan Pesanan
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-6 flex-1 custom-scrollbar">
          {/* INFO PRODUK */}
          <div className="bg-[#282830] p-4 rounded-xl border border-white/5 flex justify-between items-center shadow-inner">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">
                {account.code}
              </p>
              <p className="text-sm text-white font-bold line-clamp-1">
                {account.title}
              </p>
            </div>
            <div className="text-right">
              {promoData && (
                <div className="flex items-center justify-end gap-1.5 mb-0.5">
                  <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 text-[10px] font-black px-1.5 py-0.5 rounded">
                    -{discountPercent}%
                  </span>
                  <p className="text-xs text-slate-400 line-through">
                    {formatPrice(mainPrice)}
                  </p>
                </div>
              )}
              <p className="text-base font-black text-amber-400">
                {formatPrice(finalPrice)}
              </p>
            </div>
          </div>

          <div className="bg-[#141419] p-4 rounded-xl border border-slate-700/50">
            <label className="text-[11px] text-slate-300 font-bold mb-3 flex items-center gap-1.5">
              <Tag size={14} className="text-amber-400" />
              Masukkan Kod Promo (opsyenal)
            </label>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                placeholder="cth: DISKAUN10"
                className="w-full bg-[#282830] border border-slate-700 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-amber-500 uppercase tracking-widest placeholder:normal-case placeholder:tracking-normal"
              />
              <button
                type="button"
                onClick={handleApplyPromo}
                disabled={loading || !promoCode}
                className="w-full bg-amber-600 hover:bg-amber-500 disabled:bg-slate-700 disabled:text-slate-500 text-white py-3 rounded-xl text-xs font-bold transition shadow-lg shadow-amber-500/10"
              >
                {loading ? "Menyemak..." : "Terapkan"}
              </button>
            </div>

            {message && (
              <div
                className={`mt-3 p-3 rounded-xl flex items-start gap-2 text-xs font-bold ${
                  message.type === "success"
                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border border-red-500/20"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <Info size={16} />
                )}
                <p className="mt-0.5">{message.text}</p>
              </div>
            )}
          </div>

          <div>
            <label className="text-[11px] text-slate-300 font-bold mb-3 flex items-center gap-1.5">
              <Megaphone size={14} className="text-blue-400" />
              Kamu tahu kedai VEGAZ dari mana?
            </label>

            {loadingSettings ? (
              <p className="text-xs text-slate-500 animate-pulse">
                Memuatkan pilihan...
              </p>
            ) : referralSources.length === 0 ? (
              <p className="text-xs text-slate-500 italic">
                Tiada pilihan tersedia.
              </p>
            ) : (
              <div className="space-y-2">
                {referralSources.map((source, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedReferral(source)}
                    className={`w-full text-left px-4 py-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-between ${
                      selectedReferral === source
                        ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                        : "bg-[#282830] border-slate-700 text-slate-300 hover:bg-[#32323d]"
                    }`}
                  >
                    <span>{source}</span>
                    {selectedReferral === source && (
                      <CheckCircle2 size={16} className="text-white" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="p-4 border-t border-slate-700/50 bg-[#1c1c22] shrink-0">
          <button
            type="button"
            onClick={handleLanjutkan}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3.5 rounded-xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-emerald-500/20 flex justify-center items-center gap-2"
          >
            Lanjutkan ke WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}
