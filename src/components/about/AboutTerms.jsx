export default function AboutTerms() {
  const sections = [
    {
      title: "Terma Am Penggunaan",
      icon: "📋",
      items: [
        "Pembeli wajib membaca dan memahami deskripsi akaun secara teliti sebelum melakukan sebarang transaksi.",
        "Dengan melakukan pembelian, pembeli dianggap telah bersetuju dengan kesemua terma dan syarat yang ditetapkan oleh VegazGameShop.",
        "VegazGameShop berhak menolak atau membatalkan sebarang transaksi yang mencurigakan tanpa sebarang notis terlebih dahulu.",
        "Pembeli mestilah berumur 13 tahun ke atas. Pembeli di bawah umur perlu mendapat kebenaran ibu bapa atau penjaga.",
        "VegazGameShop tidak bertanggungjawab atas sebarang kerugian yang timbul akibat penggunaan akaun yang tidak bertanggungjawab oleh pembeli.",
      ],
    },
    {
      title: "Terma Transaksi & Pembayaran",
      icon: "💳",
      items: [
        "Semua harga yang tertera adalah dalam Ringgit Malaysia (MYR) atau Rupiah Indonesia (IDR) bergantung kepada perjanjian.",
        "Pembayaran mestilah diselesaikan dalam masa 30 minit selepas harga dipersetujui. Selepas tempoh ini, tempahan akan dibatalkan secara automatik.",
        "Bukti pembayaran yang dihantar mestilah jelas dan tulen. Sebarang manipulasi bukti pembayaran akan diambil tindakan undang-undang.",
        "Dilarang keras melakukan spam chat, mengugut, atau menghantar bukti bayar palsu kepada admin kami.",
        "Sekiranya pembayaran telah dibuat tetapi akaun belum diterima dalam masa 30 minit, sila hubungi admin segera.",
      ],
    },
    {
      title: "Terma Penghantaran & Penerimaan",
      icon: "📦",
      items: [
        "Data akaun akan dihantar melalui saluran rasmi (WhatsApp/Telegram) dalam masa 5–30 minit selepas pembayaran disahkan.",
        "Pembeli bertanggungjawab memastikan nombor hubungan yang diberikan adalah aktif dan betul semasa transaksi.",
        "Selepas data akaun diterima, pembeli WAJIB segera menukar e-mel dan kata laluan kepada maklumat peribadi sendiri.",
        "VegazGameShop tidak bertanggungjawab atas sebarang kejadian setelah data akaun berjaya diserahkan kepada pembeli.",
        "Pembeli disyorkan mengaktifkan pengesahan dua faktor (2FA) segera selepas menerima akaun.",
      ],
    },
    {
      title: "Polisi Pemulangan & Pertukaran",
      icon: "🔄",
      items: [
        "Akaun yang telah dibeli tidak boleh dipulangkan atau ditukar kecuali terdapat kesilapan data yang terbukti dari pihak VegazGameShop.",
        "Tuntutan pemulangan atau pertukaran mestilah dibuat dalam masa 1x24 jam selepas penerimaan data akaun.",
        "Tuntutan yang dibuat selepas tempoh 24 jam atau selepas kata laluan ditukar tidak akan dilayan.",
        "VegazGameShop berhak meminta bukti yang munasabah sebelum memproses sebarang tuntutan pemulangan.",
      ],
    },
    {
      title: "Larangan & Pantang Larang",
      icon: "🚫",
      items: [
        "Dilarang menjual semula akaun yang dibeli dari VegazGameShop tanpa kebenaran bertulis dari pihak kami.",
        "Dilarang menggunakan sebarang maklumat akaun untuk tujuan penipuan, scam, atau aktiviti haram.",
        "Dilarang memberikan ancaman, ugutan, atau paksaan kepada admin atau pihak VegazGameShop.",
        "Sebarang percubaan untuk mengeksploitasi sistem atau polisi kami akan mengakibatkan blacklist kekal.",
      ],
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {sections.map((section, si) => (
        <div key={si}>
          <h3 className="font-black text-blue-400 mb-4 flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
            {section.icon} {section.title}
          </h3>
          <ul className="space-y-3">
            {section.items.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30 mt-0.5">
                  <span className="text-blue-400 text-[9px]">✔</span>
                </div>
                <span className="text-gray-300 text-xs leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div className="mt-6 p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
        <p className="text-yellow-400 text-[10px] font-black uppercase tracking-wider mb-1">
          ⚠ Penafian
        </p>
        <p className="text-gray-400 text-xs leading-relaxed">
          VegazGameShop berhak mengubah terma dan syarat ini pada bila-bila masa
          tanpa notis terlebih dahulu. Penggunaan berterusan perkhidmatan kami
          dianggap sebagai penerimaan terhadap sebarang perubahan tersebut.
        </p>
      </div>
    </div>
  );
}
