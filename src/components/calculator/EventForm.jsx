import React from "react";

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
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 shadow-inner">
          <i className={`${icon} text-xl`}></i>
        </div>
        <h3 className="text-gray-800 font-black text-xl uppercase tracking-tight">
          {title}
        </h3>
      </div>

      <div className="space-y-2">
        <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-1">
          {label}
        </label>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-800 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold text-lg"
          placeholder={placeholder}
        />
      </div>

      <button
        onClick={onCalc}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all uppercase tracking-widest text-sm"
      >
        Hitung Estimasi
      </button>
    </div>
  );
}
