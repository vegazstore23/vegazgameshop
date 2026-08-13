import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function AboutFaq() {
  const [openFaq, setOpenFaq] = useState("0-0"); // Default Buka 1 Item

  const faqs = [
    {
      category: "Umum & Keselamatan",
      items: [
        {
          q: "Apakah akaun di sini selamat?",
          a: "Sangat selamat. Semua akaun telah melalui verifikasi data dan semakan riwayat log masuk sebelum dipamerkan. Kami memastikan tiada akaun bermasalah atau berisiko yang kami jual.",
        },
        {
          q: "Adakah VegazGameShop kedai rasmi?",
          a: "VegazGameShop adalah kedai akaun Mobile Legends swasta profesional sejak 2024. Kami bukan affiliasi rasmi Moonton, namun menjual akaun secara telus dan beretika.",
        },
        {
          q: "Boleh saya percaya kedai ini?",
          a: "Ya. Kami telah melayani ratusan pelanggan dari Malaysia dan Indonesia. Anda boleh semak testimoni di halaman utama atau minta bukti transaksi terdahulu via admin.",
        },
      ],
    },
    {
      category: "Prosedur Pembelian",
      items: [
        {
          q: "Bagaimana cara membeli akaun?",
          a: "Pilih akaun di Stok → hubungi admin via WhatsApp → buat pembayaran → hantar bukti bayar → data akaun dihantar dalam 5–15 minit.",
        },
        {
          q: "Apakah kaedah pembayaran yang diterima?",
          a: "Menerima Bank Transfer (MYR/IDR), E-Wallet (Dana, GoPay, TNG eWallet), QRIS, serta USDT.",
        },
        {
          q: "Berapa lama proses penghantaran data?",
          a: "Selepas pembayaran disahkan, data akaun diproses dalam masa 5–15 minit melainkan waktu puncak (maksimal 30 minit).",
        },
      ],
    },
    {
      category: "Selepas Pembelian",
      items: [
        {
          q: "Boleh saya tukar atau pulangkan akaun?",
          a: "Akaun yang dibeli tidak boleh dipulangkan melainkan terdapat kesilapan data dari pihak kami. Semak butiran secara teliti sebelum membayar.",
        },
        {
          q: "Apa yang perlu dilakukan selepas terima data?",
          a: "Segera tukar e-mel dan kata laluan ke maklumat peribadi anda, serta aktifkan pengesahan 2-Faktor (2FA) demi keselamatan.",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-fadeUp">
      {faqs.map((section, si) => (
        <div key={si} className="space-y-3">
          <h4 className="text-xs font-black text-blue-400 uppercase tracking-[0.2em] flex items-center gap-2">
            <HelpCircle size={14} className="text-blue-500" />
            {section.category}
          </h4>
          <div className="space-y-2">
            {section.items.map((item, i) => {
              const key = `${si}-${i}`;
              const isOpen = openFaq === key;
              return (
                <div
                  key={key}
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    isOpen
                      ? "bg-slate-800/80 border-blue-500/40 shadow-lg shadow-blue-500/5"
                      : "bg-slate-800/30 border-white/5 hover:border-white/15"
                  }`}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : key)}
                    className="w-full flex justify-between items-center p-4 text-left gap-3 group"
                  >
                    <span className="font-bold text-xs sm:text-sm text-white group-hover:text-blue-300 transition-colors">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-blue-400 shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-blue-300" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-slate-300 text-xs sm:text-sm border-t border-white/5 bg-slate-900/40 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
