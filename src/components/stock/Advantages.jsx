import { ShieldCheck, PhoneCall, CreditCard, Zap } from "lucide-react";
import { useLangCurr } from "../context/LanguageCurrencyContext";

export default function Advantages() {
  const { t } = useLangCurr();

  const features = [
    {
      title: t("stock", "adv1Title") || "Jaminan Perkhidmatan",
      desc:
        t("stock", "adv1Desc") ||
        "Keselamatan dan kualiti perkhidmatan terjamin sepenuhnya",
      icon: (
        <ShieldCheck className="text-yellow-400 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
      ),
    },
    {
      title: t("stock", "adv2Title") || "Perkhidmatan 24 Jam",
      desc:
        t("stock", "adv2Desc") ||
        "Perkhidmatan tanpa henti, 24 jam setiap hari",
      icon: (
        <PhoneCall className="text-yellow-400 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
      ),
    },
    {
      title: t("stock", "adv3Title") || "Pembayaran Selamat & Dipercayai",
      desc:
        t("stock", "adv3Desc") ||
        "Transaksi selamat, pembayaran boleh dipercayai.",
      icon: (
        <CreditCard className="text-yellow-400 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
      ),
    },
    {
      title: t("stock", "adv4Title") || "Proses Cepat & Automatik",
      desc:
        t("stock", "adv4Desc") ||
        "Proses pantas, automatik, tanpa sebarang masalah.",
      icon: (
        <Zap className="text-yellow-400 w-6 h-6 md:w-8 md:h-8 flex-shrink-0" />
      ),
    },
  ];

  return (
    <div className="w-full py-8 md:py-16">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        <h2 className="text-center text-white font-bold text-base md:text-xl mb-6 md:mb-10 tracking-widest uppercase">
          {t("stock", "advMainTitle") || "Kenapa Beli Akaun Di VegazStore?"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1a1c20]/60 backdrop-blur-sm border border-white/5 p-4 md:p-6 rounded-xl md:rounded-2xl flex justify-between items-center group hover:border-yellow-400/50 transition-all duration-300"
            >
              <div className="space-y-0.5 md:space-y-1 pr-2">
                <h3 className="text-white font-bold text-sm md:text-lg">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="p-2 md:p-3 bg-yellow-400/10 rounded-full group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
