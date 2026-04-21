export default function EventForm({
  title,
  icon,
  value,
  setValue,
  onCalc,
  placeholder,
  label,
}) {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-400 border border-blue-500/30">
          <i className={`${icon} text-xl`}></i>
        </div>
        {/* Harus text-white */}
        <h3 className="text-white font-black text-xl uppercase tracking-tight font-orbitron italic">
          {title}
        </h3>
      </div>

      <div className="space-y-2">
        <label className="text-blue-400 text-[9px] font-black uppercase tracking-[0.2em] ml-1">
          {label}
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-black/40 border border-white/5 rounded-2xl p-4 text-white focus:border-blue-500 transition-all outline-none font-bold text-lg placeholder:text-white/10"
          placeholder={placeholder}
        />
      </div>

      <button
        onClick={onCalc}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-900/40 active:scale-[0.98] transition-all uppercase tracking-widest text-xs"
      >
        Kira Anggaran
      </button>
    </div>
  );
}
