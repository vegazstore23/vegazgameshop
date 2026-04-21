import { useState } from "react";

export default function AboutFaq() {
  const [openFaq, setOpenFaq] = useState(null);

  const faqs = [
    {
      category: "Umum",
      items: [
        {
          q: "Apakah akaun di sini selamat?",
          a: "Sangat selamat. Semua akaun telah melalui proses verifikasi data dan semakan riwayat log masuk sebelum dipamerkan. Kami memastikan tiada akaun bermasalah, kena ban, atau berisiko yang kami jual kepada pelanggan.",
        },
        {
          q: "Adakah VegazGameShop kedai rasmi?",
          a: "VegazGameShop adalah kedai akaun Mobile Legends swasta yang beroperasi secara profesional sejak 2024. Kami bukan affiliasi rasmi Moonton, namun kami menjual akaun dengan cara yang telus dan beretika.",
        },
        {
          q: "Boleh saya percaya kedai ini?",
          a: "Ya. Kami telah melayani ratusan pelanggan dari Malaysia dan Indonesia. Anda boleh semak testimoni pelanggan di halaman utama kami atau tanya terus kepada admin untuk bukti transaksi terdahulu.",
        },
      ],
    },
    {
      category: "Pembelian",
      items: [
        {
          q: "Bagaimana cara membeli akaun?",
          a: "Pilih akaun dari halaman Stok → hubungi admin via WhatsApp/Telegram → buat pembayaran → hantar bukti bayar → data akaun dihantar dalam 5–15 minit. Mudah dan pantas!",
        },
        {
          q: "Apakah kaedah pembayaran yang diterima?",
          a: "Kami menerima pelbagai kaedah pembayaran termasuk Transfer Bank, E-Wallet (Dana, OVO, GoPay), QRIS, TNG eWallet, dan kaedah lain yang boleh dirunding dengan admin.",
        },
        {
          q: "Berapa lama proses penghantaran data?",
          a: "Selepas pembayaran disahkan, data akaun akan dihantar dalam masa 5–15 minit melalui saluran rasmi kami (WhatsApp/Telegram). Pada waktu puncak, proses mungkin mengambil sehingga 30 minit.",
        },
        {
          q: "Boleh saya beli akaun sebagai hadiah untuk orang lain?",
          a: "Boleh! Anda hanya perlu maklumkan kepada admin bahawa pembelian adalah sebagai hadiah. Data akaun akan dihantar kepada anda untuk diserahkan sendiri.",
        },
      ],
    },
    {
      category: "Selepas Pembelian",
      items: [
        {
          q: "Boleh saya tukar atau pulangkan akaun yang sudah dibeli?",
          a: "Akaun yang sudah dibeli tidak boleh ditukar atau dipulangkan kecuali terdapat kesilapan data dari pihak kami. Sila semak semua butiran akaun sebelum membuat pembayaran.",
        },
        {
          q: "Apa yang perlu dilakukan selepas terima data akaun?",
          a: "Segera tukar e-mel dan kata laluan akaun kepada maklumat peribadi anda. Aktifkan pengesahan dua faktor (2FA) untuk keselamatan tambahan. Jangan kongsikan data log masuk asal kepada sesiapa.",
        },
        {
          q: "Bagaimana jika akaun bermasalah selepas dibeli?",
          a: "Hubungi admin kami dalam masa 1x24 jam selepas penerimaan data. Kami akan menyiasat dan memberikan penyelesaian yang sesuai bergantung kepada jenis masalah yang dilaporkan.",
        },
      ],
    },
    {
      category: "Teknikal",
      items: [
        {
          q: "Apakah itu Tier akaun dan maknanya?",
          a: "Tier merujuk kepada ranking tertinggi yang pernah dicapai dalam akaun tersebut — bermula dari Entry (pemula) hingga Mythic (peringkat tertinggi). Semakin tinggi tier, semakin tinggi nilai akaun.",
        },
        {
          q: "Adakah server akaun mempengaruhi pembelian?",
          a: "Ya. Pastikan server akaun yang dipilih sesuai dengan kawasan anda. Akaun Server Malaysia/Singapura disyorkan untuk pengguna Malaysia bagi memastikan ping yang rendah dan pengalaman bermain yang lebih baik.",
        },
        {
          q: "Boleh saya semak ID akaun sebelum beli?",
          a: "Ya! Gunakan ciri Semak ID di halaman Region Checker kami untuk mengesahkan nickname dan maklumat akaun sebelum membuat keputusan pembelian.",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {faqs.map((section, si) => (
        <div key={si}>
          <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-[0.25em] mb-3 flex items-center gap-2">
            <span className="w-4 h-px bg-blue-500/50" />
            {section.category}
          </h4>
          <div className="space-y-2">
            {section.items.map((item, i) => {
              const key = `${si}-${i}`;
              const isOpen = openFaq === key;
              return (
                <div
                  key={key}
                  className="border border-white/10 rounded-xl overflow-hidden bg-white/5"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : key)}
                    className="w-full flex justify-between items-center p-4 hover:bg-white/10 transition text-left gap-3"
                  >
                    <span className="font-bold text-sm text-white">
                      {item.q}
                    </span>
                    <span
                      className={`transition-transform duration-300 text-blue-400 shrink-0 text-xs ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  <div
                    style={{
                      maxHeight: isOpen ? "300px" : "0",
                      overflow: "hidden",
                      transition: "max-height 300ms ease",
                    }}
                  >
                    <div className="p-4 text-gray-300 text-sm border-t border-white/10 bg-black/20 leading-relaxed">
                      {item.a}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
