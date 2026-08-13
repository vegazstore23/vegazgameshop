export default function JokiForm({ accountData, setAccountData }) {
  const handleChange = (field, val) => {
    setAccountData((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5">
      <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm">
          1
        </div>
        <h3 className="text-base font-bold text-white">Masukkan Data Akun</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-slate-300 font-bold mb-2 block">
            Login Via
          </label>
          <select
            value={accountData.loginType}
            onChange={(e) => handleChange("loginType", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500 font-medium transition-colors"
          >
            <option value="Moonton">Pilih Login Via (Moonton)</option>
            <option value="VK">Akun VK</option>
            <option value="TikTok">Akun TikTok</option>
            <option value="Google">Google Mail / Gmail</option>
          </select>
        </div>
        <div>
          <label className="text-xs text-slate-300 font-bold mb-2 block">
            User ID & Nick Name
          </label>
          <input
            type="text"
            placeholder="Masukkan User ID & Nick Name"
            value={accountData.userId}
            onChange={(e) => handleChange("userId", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-slate-300 font-bold mb-2 block">
            Email/No. Hp/Moonton ID
          </label>
          <input
            type="text"
            placeholder="Masukkan Email/No. Hp/Moonton ID"
            value={accountData.emailOrHp}
            onChange={(e) => handleChange("emailOrHp", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-slate-300 font-bold mb-2 block">
            Password
          </label>
          <input
            type="password"
            placeholder="Masukkan Password"
            value={accountData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-slate-300 font-bold mb-2 block">
            Request Hero (Minimal 3 Hero)
          </label>
          <input
            type="text"
            placeholder="Masukkan Request Hero (Minimal 3 Hero)"
            value={accountData.reqHero}
            onChange={(e) => handleChange("reqHero", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
          />
        </div>
        <div>
          <label className="text-xs text-slate-300 font-bold mb-2 block">
            Catatan Untuk Penjoki (Request Worker Disini)
          </label>
          <input
            type="text"
            placeholder="Masukkan Catatan Untuk Penjoki"
            value={accountData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
          />
        </div>
      </div>
      <div className="mt-4 bg-slate-800/50 p-3 rounded-xl border border-slate-700 flex items-center gap-2">
        <span className="text-[10px] text-slate-400">
          ⓘ Please make sure you fill the correct account data
        </span>
      </div>
    </div>
  );
}
