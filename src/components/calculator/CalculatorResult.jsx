import React from "react";

export default function CalculatorResult({ result }) {
  return (
    <div className="sticky top-32 bg-gray-900 p-8 rounded-3xl border border-gray-800 shadow-2xl overflow-hidden relative group">
      {/* Animasi Glow Background */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full group-hover:bg-blue-500/30 transition-colors duration-700"></div>

      <h4 className="text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-8 flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
        </span>
        Live Analysis
      </h4>

      <div className="min-h-[160px] flex items-center justify-center text-center">
        <div className="text-white text-xl font-medium leading-relaxed italic">
          {result ? (
            <div className="animate-in zoom-in-95 duration-300">{result}</div>
          ) : (
            <span className="text-gray-500 text-base not-italic">
              Silahkan masukkan data akun Vegaz kamu untuk melihat estimasi.
            </span>
          )}
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-800/50">
        <p className="text-[10px] text-gray-500 text-center leading-relaxed uppercase tracking-tighter">
          *Algoritma berdasarkan rata-rata keberuntungan sistem Moonton.
        </p>
      </div>
    </div>
  );
}
