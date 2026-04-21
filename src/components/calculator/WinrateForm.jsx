import React from "react";

export default function WinrateForm({ inputs, setInputs, onCalc }) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-2 h-8 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
        <h3 className="text-gray-800 font-black text-xl tracking-tight uppercase">
          Winrate Optimizer
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-2">
          <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-1">
            Total Match
          </label>
          <input
            type="number"
            value={inputs.match}
            onChange={(e) => setInputs({ ...inputs, match: e.target.value })}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-800 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold"
            placeholder="Contoh: 1050"
          />
        </div>
        <div className="space-y-2">
          <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-1">
            Winrate Saat Ini (%)
          </label>
          <input
            type="number"
            value={inputs.wr}
            onChange={(e) => setInputs({ ...inputs, wr: e.target.value })}
            className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-800 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold"
            placeholder="Contoh: 52.5"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-gray-500 text-[10px] font-bold uppercase tracking-widest ml-1">
          Target Winrate (%)
        </label>
        <input
          type="number"
          value={inputs.target}
          onChange={(e) => setInputs({ ...inputs, target: e.target.value })}
          className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl p-4 text-gray-800 focus:border-blue-500 focus:bg-white transition-all outline-none font-bold"
          placeholder="Contoh: 60"
        />
      </div>

      <button
        onClick={onCalc}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all uppercase tracking-widest text-sm mt-4"
      >
        Analisis Winrate
      </button>
    </div>
  );
}
