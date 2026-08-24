import { useState } from "react";
import { ChevronDown } from "lucide-react";

export const COUNTRY_CODES = [
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
];

export default function JokiContact({
  selectedCountry,
  setSelectedCountry,
  phone,
  setPhone,
}) {
  const [isCountryOpen, setIsCountryOpen] = useState(false);

  return (
    <div className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white text-sm">
          6
        </div>
        <h2 className="text-base font-bold text-white">Detail Kontak</h2>
      </div>
      <div className="flex gap-2">
        <div className="relative">
          <button
            onClick={() => setIsCountryOpen(!isCountryOpen)}
            className="h-full px-3 py-3 bg-[#383842] hover:bg-[#484852] rounded-xl text-white text-xs font-bold flex items-center gap-2 transition-colors"
          >
            <span>{selectedCountry.flag}</span>{" "}
            <span>{selectedCountry.code}</span> <ChevronDown size={14} />
          </button>
          {isCountryOpen && (
            <div className="absolute left-0 mt-2 w-48 bg-[#282830] border border-slate-700 rounded-xl shadow-2xl z-50 p-2">
              {COUNTRY_CODES.map((c) => (
                <div
                  key={c.code}
                  onClick={() => {
                    setSelectedCountry(c);
                    setIsCountryOpen(false);
                  }}
                  className="flex items-center justify-between px-3 py-2 hover:bg-[#383842] rounded-lg cursor-pointer text-xs text-white transition-colors"
                >
                  <span>
                    {c.flag} {c.name}
                  </span>{" "}
                  <span className="text-slate-400">{c.code}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <input
          type="number"
          placeholder="8123456789 (tanpa angka 0)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="flex-1 px-4 py-3 bg-[#383842] border border-transparent rounded-xl text-white text-sm outline-none focus:border-blue-500 transition-colors"
        />
      </div>
    </div>
  );
}
