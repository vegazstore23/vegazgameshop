import {
  ShieldCheck,
  Zap,
  Headphones,
  Award,
  CheckCircle2,
} from "lucide-react";

export default function AboutContent() {
  const stats = [
    { label: "Katalog Stok", val: "Update Harian" },
    { label: "Jaminan Data", val: "Terverifikasi 100%" },
    { label: "Layanan Admin", val: "Sokongan 24/7" },
    { label: "Transaksi", val: "Pantas & Selamat" },
    { label: "Reputasi", val: "Ratusan Testimoni" },
    { label: "Pengalaman", val: "Sejak 2019" },
  ];

  const features = [
    {
      icon: ShieldCheck,
      color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
      title: "Keselamatan Dijamin",
      desc: "Setiap akaun disemak secara manual sebelum dijual. Bebas dari isu keselamatan, ban, atau sebarang risiko.",
    },
    {
      icon: Zap,
      color: "text-amber-400 bg-amber-500/10 border-amber-500/20",
      title: "Penghantaran Kilat",
      desc: "Data akaun dihantar dalam masa 5–15 minit selepas pembayaran disahkan via WhatsApp/Telegram.",
    },
    {
      icon: Headphones,
      color: "text-blue-400 bg-blue-500/10 border-blue-500/20",
      title: "Sokongan Aktif 24/7",
      desc: "Admin sedia membantu sebarang pertanyaan dan panduan penukaran data akaun sehingga selesai.",
    },
    {
      icon: Award,
      color: "text-purple-400 bg-purple-500/10 border-purple-500/20",
      title: "Koleksi Akaun Premium",
      desc: "Pilihan akaun dari pelbagai tier — Entry hingga Mythic — dengan spesifikasi lengkap dan telus.",
    },
  ];

  return (
    <div className="space-y-10 animate-fadeUp">
      {/* Intro */}
      <div>
        <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-3">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          Mengenai VegazGameShop
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-4">
          Marketplace Akaun Mobile Legends Terpercaya
        </h2>
        <div className="space-y-3 text-slate-300 text-xs sm:text-sm leading-relaxed">
          <p>
            <strong className="text-white">VegazGameShop</strong> adalah
            platform marketplace terpercaya yang fokus pada penyediaan akaun
            Mobile Legends berkualiti tinggi untuk pasaran Malaysia dan
            Indonesia. Kami berkomitmen memberikan pengalaman transaksi yang
            selamat, pantas, dan telus.
          </p>
          <p>
            Berdiri sejak tahun 2024, kami telah melayani ratusan pelanggan
            dengan sistem verifikasi akaun yang ketat untuk memastikan setiap
            unit yang kami jual bebas dari masalah keselamatan.
          </p>
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {stats.map((item, i) => (
          <div
            key={i}
            className="bg-slate-800/60 border border-white/5 p-3.5 rounded-2xl text-center hover:border-blue-500/30 transition-all group"
          >
            <span className="text-[10px] font-black text-blue-400 uppercase block mb-1 tracking-widest group-hover:scale-105 transition-transform">
              {item.label}
            </span>
            <p className="text-xs sm:text-sm font-bold text-slate-200">
              {item.val}
            </p>
          </div>
        ))}
      </div>

      {/* Kenapa Pilih Kami */}
      <div>
        <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          Kelebihan Perkhidmatan
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {features.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="p-4 bg-slate-800/40 border border-white/5 rounded-2xl flex gap-3.5 items-start hover:bg-slate-800/70 transition-all"
              >
                <div
                  className={`p-2.5 rounded-xl border ${item.color} shrink-0`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-xs sm:text-sm mb-1">
                    {item.title}
                  </h4>
                  <p className="text-slate-400 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cara Pembelian */}
      <div>
        <div className="flex items-center gap-2 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4">
          <span className="w-2 h-2 rounded-full bg-blue-500" />
          Langkah Pembelian Akaun
        </div>
        <div className="space-y-2.5">
          {[
            "Pilih akaun impian anda dari halaman Stok / Katalog.",
            "Tekan Beli Sekarang untuk berhubung terus dengan admin WhatsApp.",
            "Lakukan pembayaran melalui pilihan gateway/transfer yang disepakati.",
            "Hantar bukti pembayaran yang sah kepada admin.",
            "Data log masuk akaun dihantar dalam masa 5–15 minit.",
            "Log masuk & kemaskini kata laluan akaun anda — Selesai! 🎉",
          ].map((step, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-slate-800/30 border border-white/5 rounded-xl text-xs sm:text-sm text-slate-300"
            >
              <div className="w-6 h-6 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center shrink-0 font-bold text-blue-400 text-xs">
                {i + 1}
              </div>
              <span className="leading-snug">{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
