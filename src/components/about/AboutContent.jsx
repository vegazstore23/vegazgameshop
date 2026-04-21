export default function AboutContent() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="space-y-4">
        <p className="text-gray-200 leading-relaxed">
          VegazGameShop adalah platform marketplace terpercaya yang fokus pada
          penyediaan akun Mobile Legends berkualitas tinggi. Kami berkomitmen
          untuk memberikan pengalaman transaksi yang aman, cepat, dan transparan
          bagi para gamer.
        </p>
        <p className="text-gray-200 leading-relaxed">
          Berdiri sejak tahun 2024, kami telah melayani ratusan pelanggan dengan
          sistem verifikasi akun yang ketat untuk memastikan setiap unit yang
          kami jual bebas dari masalah keamanan.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-8">
        {[
          { label: "Update", val: "Daily Stock" },
          { label: "Security", val: "Verified" },
          { label: "Service", val: "24/7 Support" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white/5 border border-white/10 p-4 rounded-xl text-center shadow-inner"
          >
            <span className="text-[10px] font-black text-blue-400 uppercase block mb-1 tracking-widest">
              {item.label}
            </span>
            <p className="text-xs font-bold text-gray-200 uppercase">
              {item.val}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
