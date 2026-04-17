import Entry from "../../assets/misc/Entry.svg";
import Basic from "../../assets/misc/Basic.svg";
import High from "../../assets/misc/High.svg";
import Luxury from "../../assets/misc/Luxury.svg";

export default function TierFilter({
  setActiveTier,
  setCurrentMinPrice,
  setCurrentMaxPrice,
  setCurrentPage,
}) {
  const selectTier = (tier, min, max) => {
    setActiveTier(tier);
    setCurrentMinPrice(min);
    setCurrentMaxPrice(max);
    setCurrentPage(1);
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      <button
        onClick={() => selectTier("entry", 1, 200)}
        className="hover:scale-105 transition"
      >
        <img src={Entry} alt="Entry" />
      </button>
      <button
        onClick={() => selectTier("mid", 201, 400)}
        className="hover:scale-105 transition"
      >
        <img src={Basic} alt="Mid" />
      </button>
      <button
        onClick={() => selectTier("mythic", 401, 600)}
        className="hover:scale-105 transition"
      >
        <img src={High} alt="Mythic" />
      </button>
      <button
        onClick={() => selectTier("glory", 601, 10000)}
        className="hover:scale-105 transition"
      >
        <img src={Luxury} alt="Glory" />
      </button>
    </div>
  );
}
