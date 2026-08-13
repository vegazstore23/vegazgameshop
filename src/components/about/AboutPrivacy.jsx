import { ShieldCheck, FileText, Lock, UserCheck } from "lucide-react";

export default function AboutPrivacy() {
  const sections = [
    {
      title: "Maklumat Yang Kami Kumpul",
      icon: FileText,
      items: [
        "Nombor WhatsApp / Telegram untuk proses transaksi & penghantaran data.",
        "Nama pengguna yang anda berikan semasa proses pembelian.",
        "Sejarah transaksi untuk sokongan pelanggan.",
      ],
    },
    {
      title: "Keselamatan & Penggunaan Data",
      icon: Lock,
      items: [
        "Maklumat peribadi HANYA digunakan untuk memproses transaksi.",
        "Kami tidak menyimpan data log masuk akaun (e-mel/kata laluan) selepas penghantaran selesai.",
        "Maklumat anda tidak akan dijual atau dikongsi kepada pihak ketiga.",
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-fadeUp">
      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-xs sm:text-sm text-slate-300 leading-relaxed">
        Dasar Privasi ini menerangkan bagaimana{" "}
        <strong className="text-white">VegazGameShop</strong> mengumpul dan
        melindungi data peribadi anda. Dikemaskini:{" "}
        <span className="text-blue-400 font-bold">2026</span>.
      </div>

      {sections.map((section, si) => {
        const Icon = section.icon;
        return (
          <div key={si} className="space-y-3">
            <h3 className="font-black text-blue-400 text-xs uppercase tracking-[0.2em] flex items-center gap-2">
              <Icon size={16} />
              {section.title}
            </h3>
            <div className="space-y-2">
              {section.items.map((item, i) => (
                <div
                  key={i}
                  className="p-3 bg-slate-800/30 border border-white/5 rounded-xl text-xs sm:text-sm text-slate-300 flex items-center gap-2.5"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      <div className="text-center pt-4 border-t border-white/5 text-[11px] text-slate-500">
        © 2024–2026 VegazGameShop · Hak Cipta Terpelihara
      </div>
    </div>
  );
}
