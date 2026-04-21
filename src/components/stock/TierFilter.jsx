import Entry from "../../assets/misc/Entry.svg";
import Basic from "../../assets/misc/Basic.svg";
import High from "../../assets/misc/High.svg";
import Luxury from "../../assets/misc/Luxury.svg";

export default function TierFilter({ activeTier, onSelect }) {
  const tiers = [
    { id: "entry", img: Entry, min: 1, max: 100 },
    { id: "mid", img: Basic, min: 101, max: 249 },
    { id: "mythic", img: High, min: 250, max: 400 },
    { id: "glory", img: Luxury, min: 401, max: 10000 },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
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
            className={`transition-all duration-300 rounded-xl overflow-hidden border-2 ${
              isActive
                ? "border-blue-400 scale-105 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                : "border-transparent opacity-60 hover:opacity-100 hover:border-white/20"
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
