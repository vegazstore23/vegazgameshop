export default function AboutPrivacy() {
  const sections = [
    {
      title: "Maklumat Yang Kami Kumpul",
      icon: "📂",
      color: "blue",
      items: [
        "Nombor WhatsApp / Telegram yang anda gunakan semasa menghubungi admin untuk tujuan transaksi.",
        "Nama atau nama pengguna yang anda berikan semasa proses pembelian.",
        "Maklumat pembayaran seperti nama pemilik akaun bank (bukan nombor kad atau PIN).",
        "Sejarah transaksi dalam sistem kami untuk tujuan rekod dan sokongan pelanggan.",
      ],
    },
    {
      title: "Cara Kami Menggunakan Maklumat",
      icon: "🔍",
      color: "blue",
      items: [
        "Maklumat peribadi anda HANYA digunakan untuk memproses dan melengkapkan transaksi pembelian akaun.",
        "Kami menggunakan sejarah transaksi untuk memberikan sokongan pelanggan yang lebih baik dan pantas.",
        "Kami mungkin menggunakan nombor hubungan untuk menghantar notis berkaitan pesanan atau promosi — anda boleh meminta untuk berhenti menerima promosi pada bila-bila masa.",
        "Maklumat anda tidak akan dijual, disewa, atau dikongsi kepada mana-mana pihak ketiga untuk tujuan pemasaran.",
      ],
    },
    {
      title: "Keselamatan Data",
      icon: "🔒",
      color: "green",
      items: [
        "Semua maklumat transaksi dan data peribadi diproses dengan piawaian keselamatan yang ketat.",
        "Kami tidak menyimpan data log masuk akaun (e-mel/kata laluan) selepas selesai proses penghantaran.",
        "Maklumat pembayaran anda diproses secara selamat dan tidak disimpan dalam sistem kami secara kekal.",
        "Akses kepada data pelanggan adalah terhad hanya kepada kakitangan yang diberi kuasa sahaja.",
      ],
    },
    {
      title: "Hak-Hak Anda",
      icon: "⚖️",
      color: "purple",
      items: [
        "Anda berhak untuk meminta akses kepada maklumat peribadi yang kami simpan tentang anda.",
        "Anda berhak meminta pembetulan sebarang maklumat yang tidak tepat atau sudah lapuk.",
        "Anda berhak meminta penghapusan data peribadi anda dari sistem kami setelah transaksi selesai.",
        "Anda berhak menarik balik kebenaran untuk menerima sebarang komunikasi pemasaran dari kami.",
        "Untuk mengemukakan sebarang permintaan berkaitan hak privasi, sila hubungi admin kami secara terus.",
      ],
    },
    {
      title: "Kuki & Teknologi Penjejakan",
      icon: "🍪",
      color: "amber",
      items: [
        "Laman web kami mungkin menggunakan kuki asas untuk meningkatkan pengalaman pengguna.",
        "Kami tidak menggunakan alat penjejakan pihak ketiga untuk mengumpul data pelayaran anda.",
        "Anda boleh mematikan kuki melalui tetapan pelayar anda, namun ini mungkin mempengaruhi fungsi laman web.",
      ],
    },
  ];

  const colorMap = {
    blue: "border-blue-500 bg-blue-500/5",
    green: "border-green-500 bg-green-500/5",
    purple: "border-purple-500 bg-purple-500/5",
    amber: "border-amber-500 bg-amber-500/5",
  };

  const iconColorMap = {
    blue: "text-blue-400",
    green: "text-green-400",
    purple: "text-purple-400",
    amber: "text-amber-400",
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
        <p className="text-gray-400 text-xs leading-relaxed">
          Dasar Privasi ini menerangkan bagaimana{" "}
          <span className="text-white font-bold">VegazGameShop</span> mengumpul,
          menggunakan, dan melindungi maklumat peribadi anda. Dengan menggunakan
          perkhidmatan kami, anda bersetuju dengan terma dalam dasar privasi
          ini.{" "}
          <span className="text-blue-400">
            Kali terakhir dikemaskini: Januari 2025.
          </span>
        </p>
      </div>

      {sections.map((section, si) => (
        <div key={si}>
          <h3
            className={`font-black mb-4 flex items-center gap-2 uppercase text-xs tracking-[0.2em] ${iconColorMap[section.color]}`}
          >
            {section.icon} {section.title}
          </h3>
          <div
            className={`border-l-4 ${colorMap[section.color]} rounded-r-xl pl-4 py-1 space-y-3`}
          >
            {section.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 shrink-0 opacity-60" />
                <p className="text-gray-300 text-xs leading-relaxed">{item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
        <p className="text-red-400 text-[10px] font-black uppercase tracking-wider mb-1">
          🚨 Penting
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          Sekiranya anda mengesyaki berlakunya pelanggaran data atau penggunaan
          maklumat anda tanpa kebenaran, sila hubungi admin kami dengan segera.
          Kami mengambil serius setiap laporan keselamatan dan akan menyiasat
          dengan teliti.
        </p>
      </div>

      <div className="text-center pt-2">
        <p className="text-gray-600 text-[10px]">
          © 2024–2025 VegazGameShop · Semua hak terpelihara ·{" "}
          <span className="text-blue-500">Malaysia &amp; Indonesia</span>
        </p>
      </div>
    </div>
  );
}
