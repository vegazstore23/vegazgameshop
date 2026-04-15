import { Link } from "react-router-dom";

export default function PopularSection() {
  const items = [
    {
      title: "Stock Acc MLLBB",
      desc: "All Stock Account MLBB by VegazStore",
      to: "/stock",
      bg: "from-blue-500 to-blue-700",
    },
    {
      title: "Check Region ID MLBB",
      desc: "Cek region account MLBB sebelum topup",
      to: "/check-region",
      bg: "from-purple-500 to-purple-700",
    },
    {
      title: "Top Up Games",
      desc: "Top up diamond cepat harga berbaloi",
      to: "/topup",
      bg: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Popular</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className={`relative rounded-2xl p-6 h-40 flex flex-col justify-between bg-gradient-to-br ${item.bg} hover:scale-[1.03] transition duration-300 shadow-lg`}
          >
            <div>
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-white/80">{item.desc}</p>
            </div>

            <span className="text-xs opacity-70">Click to open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
