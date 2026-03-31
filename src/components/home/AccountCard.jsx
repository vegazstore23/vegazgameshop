export default function AccountCard({ acc }) {
  const originalPrice = Math.round(acc.price * 1.1);
  const discount = Math.round(
    ((originalPrice - acc.price) / originalPrice) * 100,
  );

  const image = acc.AccountImages?.[0]?.image;

  return (
    <div className="group relative rounded-2xl overflow-hidden bg-blue-600/90 border border-white/10 shadow-lg hover:-translate-y-1 transition">
      {/* DISKON */}
      <div className="absolute top-2 right-2 bg-orange-500 text-xs px-2 py-1 rounded">
        DISKON {discount}%
      </div>

      {/* IMAGE */}
      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={image}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />
      </div>

      {/* CONTENT */}
      <div className="p-3 flex flex-col gap-2">
        <span className="text-xs bg-black/40 px-2 py-1 rounded">
          {acc.code}
        </span>

        <div>
          <p className="text-gray-400 line-through text-sm">
            Rp {originalPrice.toLocaleString()}
          </p>

          <p className="text-yellow-400 font-bold text-lg">
            Rp {acc.price.toLocaleString()}
          </p>
        </div>

        <a
          href={`https://wa.me/?text=Order akun ${acc.code}`}
          target="_blank"
          className="bg-green-500 text-center py-2 rounded-xl text-sm font-bold"
        >
          Beli Sekarang
        </a>
      </div>
    </div>
  );
}
