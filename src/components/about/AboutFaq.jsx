import { useState } from "react";

export default function AboutFaq() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      q: "Apakah akun di sini aman?",
      a: "Sangat aman. Semua akun telah melalui proses verifikasi data dan pengecekan riwayat login sebelum dipajang.",
    },
    {
      q: "Bagaimana sistem pembayarannya?",
      a: "Kami menerima pembayaran via Transfer Bank, E-Wallet (Dana/OVO/GoPay), dan QRIS untuk kemudahan transaksi.",
    },
    {
      q: "Berapa lama proses pengiriman data?",
      a: "Setelah pembayaran diverifikasi, data akun akan dikirimkan dalam waktu 5-15 menit melalui kontak resmi kami.",
    },
  ];

  return (
    <div className="space-y-3 animate-in fade-in duration-500">
      {faqs.map((item, i) => (
        <div
          key={i}
          className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
        >
          <button
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
            className="w-full flex justify-between items-center p-4 hover:bg-white/10 transition text-left"
          >
            <span className="font-bold text-sm text-white">{item.q}</span>
            <span
              className={`transition-transform duration-300 text-blue-400 ${openFaq === i ? "rotate-180" : ""}`}
            >
              ▼
            </span>
          </button>
          {openFaq === i && (
            <div className="p-4 text-gray-300 text-sm border-t border-white/10 bg-black/20 leading-relaxed italic">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
