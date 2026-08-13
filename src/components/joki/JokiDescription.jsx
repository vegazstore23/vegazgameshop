export default function JokiDescription({ gameData }) {
  return (
    <div className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5 space-y-4">
      <div className="flex items-center gap-3">
        <h3 className="text-sm font-bold text-white tracking-wider">
          Deskripsi Joki Rank {gameData?.name || "Mobile Legends"}
        </h3>
      </div>
      <div className="text-xs text-slate-400 space-y-3 leading-relaxed border-t border-white/10 pt-3">
        <p className="font-medium text-slate-300">
          Joki Rank {gameData?.name || "Mobile Legends"} dari VegazStore: Solusi
          Cepat Naik Rank! <br />
          Kami mempersembahkan layanan joki yang cepat, murah, serta aman dan
          terpercaya! Tingkatkan permainan dan rank Anda dengan bantuan dari
          profesional kami.
        </p>
        <div className="space-y-1">
          <p className="font-bold text-white">
            Berikut adalah langkah-langkah sederhana untuk Order Jasa Joki :
          </p>
          <ol className="list-decimal pl-4 space-y-1 text-slate-400">
            <li>Lengkapi Data Akun Joki Dengan Teliti</li>
            <li>Pilih Jenis Variant Joki (Sesuai Kebutuhan)</li>
            <li>Masukkan Jumlah Order Sesuai Tujuan Rank</li>
            <li>Pilih Metode Pembayaran</li>
            <li>Masukkan Kode Promo Jika Ada</li>
            <li>Masukkan Nomor WhatsApp yang Valid</li>
            <li>Klik Order Now & Lakukan Pembayaran</li>
          </ol>
        </div>
        <div className="space-y-1 pt-2">
          <p className="font-bold text-white">Estimasi Waktu Proses :</p>
          <p>
            Kami berkomitmen untuk menyelesaikan jasa joki Anda dalam waktu
            12-48 jam. Vegaz Sahabat Para Gamers!
          </p>
        </div>
      </div>
    </div>
  );
}
