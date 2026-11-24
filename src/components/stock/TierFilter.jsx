import Entry from "../../assets/misc/Entry.svg";
import Basic from "../../assets/misc/Basic.svg";
import High from "../../assets/misc/High.svg";
import Luxury from "../../assets/misc/Luxury.svg";
import { useLangCurr } from "../context/LanguageCurrencyContext";

export default function TierFilter({ activeTier, onSelect }) {
  const { rateMYR } = useLangCurr();

  const tiers = [
    { id: "entry", img: Entry, min: 1, max: 100 * rateMYR },
    { id: "mid", img: Basic, min: 101 * rateMYR, max: 249 * rateMYR },
    { id: "mythic", img: High, min: 250 * rateMYR, max: 400 * rateMYR },
    { id: "glory", img: Luxury, min: 401 * rateMYR, max: 10000 * rateMYR },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 sm:gap-2.5 mb-2.5 sm:mb-4">
      {tiers.map((t) => {
        const isActive = activeTier === t.id;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id, t.min, t.max)}
            title={
              isActive
                ? `Klik untuk buang penapis tier ${t.id}`
                : `Tapis tier ${t.id}`
            }
            className={`transition-all duration-300 rounded-xl overflow-hidden border-2 active:scale-95 ${
              isActive
                ? "border-blue-400 scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                : "border-transparent opacity-70 hover:opacity-100 hover:border-white/20"
            }`}
          >
            <img
              src={t.img}
              alt={t.id}
              className="w-full h-full object-cover"
            />
          </button>
        );
      })}
    </div>
  );
}
