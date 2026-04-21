export default function WinrateForm({ inputs, setInputs, onCalc }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.6)]"></div>
        {/* Pastikan text-white agar terlihat di background gelap */}
        <h3 className="text-white font-black text-xl tracking-tight uppercase font-orbitron">
          Winrate <span className="text-blue-500">Optimizer</span>
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] ml-1">
            Total Match
          </label>
          <input
            type="number"
            value={inputs.match}
            onChange={(e) => setInputs({ ...inputs, match: e.target.value })}
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:border-blue-500 transition-all outline-none font-bold placeholder:text-white/10"
            placeholder="Contoh: 1050"
          />
        </div>
        <div className="space-y-2">
          <label className="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] ml-1">
            Winrate Semasa (%)
          </label>
          <input
            type="number"
            value={inputs.wr}
            onChange={(e) => setInputs({ ...inputs, wr: e.target.value })}
            className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:border-blue-500 transition-all outline-none font-bold placeholder:text-white/10"
            placeholder="Contoh: 52.5"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] ml-1">
          Sasaran Winrate (%)
        </label>
        <input
          type="number"
          value={inputs.target}
          onChange={(e) => setInputs({ ...inputs, target: e.target.value })}
          className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:border-blue-500 transition-all outline-none font-bold placeholder:text-white/10"
          placeholder="Contoh: 60"
        />
      </div>

      <button
        onClick={onCalc}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-900/40 active:scale-[0.98] transition-all uppercase tracking-widest text-xs mt-4"
      >
        Analisis Winrate
      </button>
    </div>
  );
}
