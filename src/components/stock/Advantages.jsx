import { ShieldCheck, PhoneCall, CreditCard, Zap } from "lucide-react";

export default function Advantages() {
  const features = [
    {
      title: "Jaminan Perkhidmatan",
      desc: "Keselamatan dan kualiti perkhidmatan terjamin sepenuhnya",
      icon: <ShieldCheck className="text-yellow-400 w-8 h-8" />,
    },
    {
      title: "Perkhidmatan 24 Jam",
      desc: "Perkhidmatan tanpa henti, 24 jam setiap hari",
      icon: <PhoneCall className="text-yellow-400 w-8 h-8" />,
    },
    {
      title: "Pembayaran Selamat & Dipercayai",
      desc: "Transaksi selamat, pembayaran boleh dipercayai.",
      icon: <CreditCard className="text-yellow-400 w-8 h-8" />,
    },
    {
      title: "Proses Cepat & Automatik",
      desc: "Proses pantas, automatik, tanpa sebarang masalah.",
      icon: <Zap className="text-yellow-400 w-8 h-8" />,
    },
  ];

  return (
    <div className="w-full py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-white font-bold text-xl mb-10 tracking-widest uppercase">
          Kenapa Beli Akaun Di VegazStore?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#1a1c20]/60 backdrop-blur-sm border border-white/5 p-6 rounded-2xl flex justify-between items-center group hover:border-yellow-400/50 transition-all duration-300"
            >
              <div className="space-y-1">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
              <div className="p-3 bg-yellow-400/10 rounded-full group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
