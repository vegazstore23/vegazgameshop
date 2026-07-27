export default function JokiForm({ accountData, setAccountData }) {
  const handleChange = (field, val) => {
    setAccountData((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center gap-3 mb-5 border-b border-slate-800 pb-3">
        <div className="w-7 h-7 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-black text-sm">
          1
        </div>
        <h3 className="text-sm font-black uppercase tracking-wider text-white">
          Lengkapi Data Akun Mobile Legends
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-[11px] text-slate-400 font-bold uppercase block mb-1.5">
            ID / Email / No HP Login
          </label>
          <input
            type="text"
            placeholder="Masukkan Email/ID Akun"
            value={accountData.userId}
            onChange={(e) => handleChange("userId", e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="text-[11px] text-slate-400 font-bold uppercase block mb-1.5">
            Password Akun
          </label>
          <input
            type="password"
            placeholder="Masukkan Password"
            value={accountData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="text-[11px] text-slate-400 font-bold uppercase block mb-1.5">
            Jenis Login Akun
          </label>
          <select
            value={accountData.loginType}
            onChange={(e) => handleChange("loginType", e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-blue-500 font-bold text-slate-300"
          >
            <option value="Moonton">Moonton Login (Rekomendasi)</option>
            <option value="VK">Akun VK</option>
            <option value="TikTok">Akun TikTok</option>
            <option value="Google">Google Mail / Gmail</option>
          </select>
        </div>

        <div>
          <label className="text-[11px] text-slate-400 font-bold uppercase block mb-1.5">
            Request Hero / Catatan (Opsional)
          </label>
          <input
            type="text"
            placeholder="Contoh: Req Hero Assassin / Mage"
            value={accountData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-600 outline-none focus:border-blue-500 font-medium"
          />
        </div>
      </div>
    </div>
  );
}
