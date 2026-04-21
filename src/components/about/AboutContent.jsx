export default function AboutContent() {
  const stats = [
    { label: "Stok", val: "Update Harian" },
    { label: "Keselamatan", val: "Terverifikasi" },
    { label: "Perkhidmatan", val: "Sokongan 24/7" },
    { label: "Transaksi", val: "100% Selamat" },
    { label: "Pelanggan", val: "Ratusan Berpuas" },
    { label: "Pengalaman", val: "Sejak 2024" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h3 className="font-black text-blue-400 mb-4 flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
          🎮 Tentang VegazGameShop
        </h3>
        <div className="space-y-4">
          <p className="text-gray-200 leading-relaxed text-sm">
            VegazGameShop adalah platform marketplace terpercaya yang fokus pada
            penyediaan akaun Mobile Legends berkualiti tinggi untuk pasaran
            Malaysia dan Indonesia. Kami berkomitmen memberikan pengalaman
            transaksi yang selamat, pantas, dan telus bagi semua gamer.
          </p>
          <p className="text-gray-200 leading-relaxed text-sm">
            Berdiri sejak tahun 2024, kami telah melayani ratusan pelanggan
            dengan sistem verifikasi akaun yang ketat untuk memastikan setiap
            unit yang kami jual bebas dari masalah keselamatan, ban, atau
            sebarang risiko teknikal.
          </p>
          <p className="text-gray-200 leading-relaxed text-sm">
            Setiap akaun yang dipamerkan telah melalui proses semakan menyeluruh
            merangkumi semakan riwayat log masuk, status keselamatan, dan
            kelengkapan data sebelum diluluskan untuk dijual.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {stats.map((item, i) => (
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

      <div>
        <h3 className="font-black text-blue-400 mb-4 flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
          ⚡ Kenapa Pilih Kami?
        </h3>
        <div className="space-y-3">
          {[
            {
              icon: "🔒",
              title: "Keselamatan Dijamin",
              desc: "Setiap akaun disemak secara manual sebelum dijual. Kami tidak menjual akaun bermasalah atau berisiko.",
            },
            {
              icon: "⚡",
              title: "Penghantaran Pantas",
              desc: "Data akaun dihantar dalam masa 5–15 minit selepas pembayaran disahkan melalui saluran rasmi kami.",
            },
            {
              icon: "💬",
              title: "Sokongan Aktif",
              desc: "Admin kami sedia membantu 24/7 melalui WhatsApp, Telegram, dan Instagram untuk sebarang pertanyaan.",
            },
            {
              icon: "🏆",
              title: "Akaun Berkualiti",
              desc: "Koleksi akaun kami merangkumi pelbagai tier — dari Entry hingga Mythic — dengan harga yang kompetitif.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="flex gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
            >
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <p className="font-black text-white text-xs uppercase tracking-wider mb-1">
                  {item.title}
                </p>
                <p className="text-gray-400 text-xs leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-black text-blue-400 mb-4 flex items-center gap-2 uppercase text-xs tracking-[0.2em]">
          📍 Cara Pembelian
        </h3>
        <ol className="space-y-3">
          {[
            "Pilih akaun yang dikehendaki dari halaman Stok.",
            "Hubungi admin melalui butang Chat / WhatsApp yang tersedia.",
            "Lakukan pembayaran mengikut kaedah yang disepakati.",
            "Hantar bukti pembayaran kepada admin.",
            "Data akaun akan dihantar dalam masa 5–15 minit.",
            "Selesai — nikmati akaun anda! 🎉",
          ].map((step, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-sm text-gray-200"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0">
                <span className="text-blue-400 text-[10px] font-black">
                  {i + 1}
                </span>
              </div>
              <span className="leading-relaxed text-xs">{step}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
