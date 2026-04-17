export default function AccountCard({ item, index }) {
  const formatPrice = (val) => {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
    }).format(val);
  };

  const img = item.AccountImages?.[0]?.image;

  return (
    <a
      href={`/detail/${item.id}`}
      className="group relative rounded-2xl overflow-hidden bg-gradient-to-b from-blue-500/90 to-blue-600/90 border border-white/10 shadow-lg hover:-translate-y-2 transition"
    >
      <div
        className={`absolute top-0 right-0 text-[10px] font-bold px-3 py-1 z-[1] ${index < 2 ? "bg-red-500" : "bg-green-500"}`}
      >
        {index < 2 ? "HOT" : "NEW"}
      </div>

      <div className="aspect-[3/4] overflow-hidden">
        <img
          src={img}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          alt={item.title}
        />
      </div>

      <div className="p-4 bg-blue-900/40 backdrop-blur flex flex-col gap-2">
        <span className="text-[10px] w-fit bg-black/40 px-2 py-1 rounded tracking-widest">
          {item.code}
        </span>
        <h3 className="text-sm font-medium line-clamp-1">{item.title}</h3>
        <span className="text-xl font-bold text-yellow-400">
          {formatPrice(item.price)}
        </span>
        <button className="bg-green-500 hover:bg-green-600 py-2 rounded text-[10px] font-bold transition">
          CHECK FULL DETAIL
        </button>
      </div>
    </a>
  );
}
