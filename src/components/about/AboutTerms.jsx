import { CheckCircle2, AlertTriangle } from "lucide-react";

export default function AboutTerms() {
  const sections = [
    {
      title: "Terma Am Penggunaan",
      items: [
        "Pembeli wajib membaca dan memahami deskripsi akaun secara teliti sebelum melakukan sebarang transaksi.",
        "Dengan melakukan pembelian, pembeli dianggap telah bersetuju dengan kesemua terma dan syarat yang ditetapkan.",
        "VegazGameShop berhak menolak atau membatalkan sebarang transaksi yang mencurigakan.",
        "Pembeli di bawah umur perlu mendapat kebenaran ibu bapa atau penjaga.",
      ],
    },
    {
      title: "Terma Transaksi & Pembayaran",
      items: [
        "Harga tertera dalam Ringgit Malaysia (MYR), Rupiah Indonesia (IDR), atau USDT.",
        "Pembayaran mestilah diselesaikan dalam masa 30 minit selepas sepakat harga.",
        "Bukti pembayaran yang dihantar mestilah jelas dan tulen.",
      ],
    },
    {
      title: "Polisi Pemulangan & Tuntutan",
      items: [
        "Akaun yang dibeli tidak boleh dipulangkan melainkan terdapat kesilapan data terbukti dari pihak VegazGameShop.",
        "Tuntutan mestilah dibuat dalam masa 1x24 jam selepas penerimaan data akaun.",
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-fadeUp">
      {sections.map((section, si) => (
        <div key={si} className="space-y-3">
          <h3 className="font-black text-blue-400 text-xs uppercase tracking-[0.2em]">
            {section.title}
          </h3>
          <div className="space-y-2">
            {section.items.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 bg-slate-800/30 border border-white/5 rounded-xl"
              >
                <CheckCircle2
                  size={16}
                  className="text-emerald-400 shrink-0 mt-0.5"
                />
                <span className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3 items-start">
        <AlertTriangle size={18} className="text-amber-400 shrink-0 mt-0.5" />
        <div>
          <h4 className="text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            Penafian
          </h4>
          <p className="text-slate-400 text-xs leading-relaxed">
            VegazGameShop berhak mengubah terma dan syarat ini pada bila-bila
            masa tanpa notis terlebih dahulu.
          </p>
        </div>
      </div>
    </div>
  );
}
