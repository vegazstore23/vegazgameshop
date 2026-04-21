export default function AboutTerms() {
  const terms = [
    "Pembeli wajib membaca deskripsi akun secara teliti sebelum melakukan transaksi.",
    "VegazGameShop tidak bertanggung jawab atas penyalahgunaan akun setelah data berhasil diserahkan.",
    "Dilarang melakukan spam chat atau penipuan bukti transfer pada admin kami.",
    "Akun yang sudah dibeli tidak dapat ditukar atau dikembalikan kecuali ada kesalahan data dari pihak kami.",
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <h3 className="font-black text-blue-400 mb-6 flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
        📋 Terma & Syarat Penggunaan
      </h3>
      <ul className="space-y-4">
        {terms.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-sm text-gray-200">
            <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
              <span className="text-blue-400 text-[10px]">✔</span>
            </div>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
