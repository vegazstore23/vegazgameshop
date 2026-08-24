export default function JokiForm({ accountData, setAccountData }) {
  const handleChange = (field, val) => {
    setAccountData((prev) => ({ ...prev, [field]: val }));
  };

  return (
    <div className="bg-[#282830] rounded-2xl p-4 sm:p-6 shadow-lg border border-white/5">
      <div className="flex items-center gap-3 mb-5 border-b border-white/10 pb-4">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-bold text-sm shrink-0">
          1
        </div>
        <h3 className="text-base font-bold text-white">Masukkan Data Akun</h3>
      </div>

      {/* grid-cols-2 dipakai biar mobile tetep 2 kolom / 2 baris sejajar */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        <div>
          <label className="text-[10px] sm:text-xs text-slate-300 font-bold mb-1.5 sm:mb-2 block truncate">
            Login Via
          </label>
          <select
            value={accountData.loginType}
            onChange={(e) => handleChange("loginType", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-sm text-white outline-none focus:border-blue-500 font-medium transition-colors appearance-none"
          >
            <option value="Moonton">Moonton</option>
            <option value="VK">Akun VK</option>
            <option value="TikTok">Akun TikTok</option>
            <option value="Google">Google / Gmail</option>
          </select>
        </div>
        <div>
          <label className="text-[10px] sm:text-xs text-slate-300 font-bold mb-1.5 sm:mb-2 block truncate">
            User ID & Nick
          </label>
          <input
            type="text"
            placeholder="User ID & Nick"
            value={accountData.userId}
            onChange={(e) => handleChange("userId", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] sm:text-xs text-slate-300 font-bold mb-1.5 sm:mb-2 block truncate">
            Email/Hp/Moonton ID
          </label>
          <input
            type="text"
            placeholder="Email / No. HP"
            value={accountData.emailOrHp}
            onChange={(e) => handleChange("emailOrHp", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] sm:text-xs text-slate-300 font-bold mb-1.5 sm:mb-2 block truncate">
            Password
          </label>
          <input
            type="password"
            placeholder="Password Akun"
            value={accountData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] sm:text-xs text-slate-300 font-bold mb-1.5 sm:mb-2 block truncate">
            Request Hero (Max 3)
          </label>
          <input
            type="text"
            placeholder="Req Hero (Max 3)"
            value={accountData.reqHero}
            onChange={(e) => handleChange("reqHero", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
          />
        </div>
        <div>
          <label className="text-[10px] sm:text-xs text-slate-300 font-bold mb-1.5 sm:mb-2 block truncate">
            Catatan Penjoki (Worker)
          </label>
          <input
            type="text"
            placeholder="Catatan Joki"
            value={accountData.notes}
            onChange={(e) => handleChange("notes", e.target.value)}
            className="w-full bg-[#383842] border border-transparent rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-[11px] sm:text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 font-medium transition-colors"
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
