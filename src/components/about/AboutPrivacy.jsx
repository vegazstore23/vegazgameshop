export default function AboutPrivacy() {
  const policies = [
    "Data pribadi pembeli (Nomor WA/Nama) hanya digunakan untuk keperluan pengiriman data akun.",
    "Kami tidak menyimpan data login pembeli di server kami secara permanen.",
    "Informasi transaksi dienkripsi dan tidak akan dibagikan kepada pihak ketiga manapun.",
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <h3 className="font-black text-blue-400 mb-6 flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
        🛡 Dasar Privasi & Data
      </h3>
      <div className="grid gap-4">
        {policies.map((item, i) => (
          <div
            key={i}
            className="p-4 bg-blue-500/5 rounded-xl border-l-4 border-blue-500 text-xs text-gray-300 leading-relaxed shadow-sm"
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
