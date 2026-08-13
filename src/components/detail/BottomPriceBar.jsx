import { useEffect, useState } from "react";
import { apiGet } from "../../services/api";
import { useLangCurr } from "../context/LanguageCurrencyContext";
import { generateMessage, sendToChat } from "../../utils/FormChat";
import { ShieldCheck } from "lucide-react";
import PromoModal from "../ui/PromoModal";

export default function BottomPriceBar({ account }) {
  const { formatPrice, t } = useLangCurr();
  const [waAdmin, setWaAdmin] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleConfirmOrder = (modalData) => {
    const detailUrl = `${window.location.origin}/detail/${account.id}`;
    const formattedPrice = formatPrice(modalData.finalPrice);

    const message = generateMessage("account_buy", {
      title: account.title || account.code,
      code: account.code,
      price: formattedPrice,
      url: detailUrl,
      promoCode: modalData.promo?.code || "",
      referral: modalData.referral || "",
    });

    sendToChat(waAdmin, message);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 w-full bg-[#09052b]/95 backdrop-blur-xl border-t border-white/10 z-[100] shadow-[0_-10px_30px_rgba(0,0,0,0.6)]">
        {/* MOBILE layout (< md) */}
        <div className="md:hidden p-3.5 max-w-md mx-auto space-y-2.5">
          <div className="flex justify-between items-center bg-white/[0.03] px-3.5 py-2.5 rounded-xl border border-white/5">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-gray-400 font-bold uppercase tracking-wider">
                {t("detail", "unitInfo") || "Maklumat Unit"}
              </span>
              <span className="text-white font-bold text-xs truncate max-w-[160px]">
                {account.title}
              </span>
              <span className="text-sm font-black text-yellow-400">
                {formatPrice(mainPrice)}
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="bg-blue-600/30 border border-blue-500/30 px-2.5 py-0.5 rounded-md">
                <span className="text-blue-300 font-bold text-[10px] tracking-wider uppercase font-mono">
                  {account.code}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <ShieldCheck size={10} className="text-emerald-400" />
                <span className="text-[8px] text-emerald-400 font-bold uppercase">
                  {t("detail", "stockVerified") || "Disahkan"}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!waAdmin}
            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3 rounded-xl font-bold text-xs transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/10 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {waAdmin
              ? t("global", "buyNow") || "Beli Sekarang"
              : t("detail", "connecting") || "Menyambung..."}
          </button>
        </div>

        {/* DESKTOP layout (≥ md) */}
        <div className="hidden md:flex items-center gap-6 px-8 py-3 max-w-7xl mx-auto">
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="min-w-0">
              <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
                {t("detail", "unitInfo") || "Maklumat Unit"}
              </p>
              <p className="text-white font-bold text-sm truncate">
                {account.title}
              </p>
            </div>

            <div className="w-px h-6 bg-white/10 flex-shrink-0" />

            <div className="bg-blue-600/30 border border-blue-500/30 px-3 py-1 rounded-md flex-shrink-0">
              <span className="text-blue-300 font-bold text-xs tracking-wider uppercase font-mono">
                {account.code}
              </span>
            </div>

            <div className="flex items-center gap-1.5 flex-shrink-0">
              <ShieldCheck size={13} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-400 font-bold uppercase">
                {t("detail", "stockVerified") || "Stok Disahkan"}
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 text-right">
            <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">
              {t("detail", "currentPrice") || "Harga Semasa"}
            </p>
            <span className="text-xl font-black text-yellow-400">
              {formatPrice(mainPrice)}
            </span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            disabled={!waAdmin}
            className="flex-shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-8 py-3 rounded-xl font-bold text-xs transition-all active:scale-[0.98] shadow-lg shadow-emerald-500/10 uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {waAdmin
              ? t("global", "buyNow") || "Beli Sekarang"
              : t("detail", "connecting") || "Menyambung..."}
          </button>
        </div>
      </div>

      <PromoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        account={account}
        mainPrice={mainPrice}
        formatPrice={formatPrice}
        onConfirm={handleConfirmOrder}
      />
    </>
  );
}
