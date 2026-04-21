import {
  Search,
  MousePointerClick,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export default function TutorialBeli() {
  const langkah = [
    {
      title: "1. Pilih Akaun",
      desc: "Cari dan pilih akaun idaman anda melalui katalog kami yang tersedia.",
      icon: <Search className="text-yellow-400 w-8 h-8" />,
    },
    {
      title: "2. Klik Beli Sekarang",
      desc: "Tekan butang 'Beli Sekarang' untuk melihat ringkasan harga dan butiran akaun.",
      icon: <MousePointerClick className="text-yellow-400 w-8 h-8" />,
    },
    {
      title: "3. Hubungi Admin",
      desc: "Anda akan diarahkan terus ke WhatsApp Admin untuk proses pengesahan stok.",
      icon: <MessageCircle className="text-yellow-400 w-8 h-8" />,
    },
    {
      title: "4. Bayar & Siap",
      desc: "Lakukan pembayaran dan akaun akan diserahkan terus secara automatik dan selamat.",
      icon: <CheckCircle2 className="text-yellow-400 w-8 h-8" />,
    },
  ];

  return (
    <div className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header Section dengan Aksen Kuning */}
        <div className="flex items-center gap-4 mb-8">
          <div className="h-8 w-1.5 bg-yellow-400 rounded-full"></div>
          <h2 className="text-white font-black text-xl tracking-wider uppercase italic">
            Cara Mudah Beli Akaun di VegazStore
          </h2>
        </div>

        {/* Grid Langkah-Langkah */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {langkah.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1a1c20]/60 backdrop-blur-md border border-white/5 p-6 rounded-2xl flex flex-col gap-4 group hover:border-yellow-400/50 hover:bg-[#1a1c20]/80 transition-all duration-300 shadow-xl"
            >
              <div className="p-3 bg-yellow-400/10 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-white font-bold text-base uppercase tracking-tight group-hover:text-yellow-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Note Tambahan di Bawah */}
        <p className="mt-8 text-center text-gray-500 text-[10px] uppercase tracking-[0.2em] font-medium">
          Semua transaksi di VegazGameShop dilindungi oleh sistem keselamatan
          tinggi
        </p>
      </div>
    </div>
  );
}
