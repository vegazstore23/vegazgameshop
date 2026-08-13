import { MoveRight, Zap } from "lucide-react";
import { getRankImage } from "../../utils/rankImages";

export default function JokiPackageGrid({
  items,
  selectedItem,
  onSelect,
  formatPrice,
  type,
}) {
  if (!items || items.length === 0) return null;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {items.map((item) => {
        const isSelected = selectedItem?.id === item.id;
        const fromImg = getRankImage(
          item.fromRank ||
            item.from_rank ||
            item.imageKey ||
            item.image_key ||
            item.name ||
            "",
        );
        const toImg = getRankImage(item.toRank || item.to_rank || "");

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onSelect(item)}
            className={`relative p-3 sm:p-4 rounded-xl border-2 cursor-pointer flex flex-col justify-between text-left transition-all duration-200 min-h-[110px] ${
              isSelected
                ? "border-blue-500 bg-[#383842] shadow-md shadow-blue-500/10"
                : "border-transparent bg-[#383842] hover:bg-[#3f3f4a]"
            }`}
          >
            <div className="flex items-start gap-2.5 mb-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 shrink-0 bg-slate-900 rounded-lg p-1 overflow-hidden flex items-center justify-center">
                {fromImg ? (
                  <img
                    src={fromImg}
                    className="w-full h-full object-contain"
                    alt=""
                  />
                ) : (
                  <span className="text-xs text-slate-600 font-bold">-</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[11px] sm:text-xs font-bold text-white/90 leading-tight mb-1 truncate">
                  {item.name}
                </h4>
                <span className="text-xs sm:text-sm font-black text-blue-400 tracking-wide">
                  {formatPrice(item.price)}
                </span>
              </div>
            </div>

            <div className="w-full flex items-center justify-between mt-auto pt-2 border-t border-white/5">
              {type === "package" && toImg ? (
                <div className="flex items-center gap-1 text-[8px] sm:text-[9px] text-slate-400 font-bold uppercase bg-slate-900 px-1.5 py-0.5 rounded-md">
                  To <MoveRight size={9} />{" "}
                  <img
                    src={toImg}
                    className="w-2.5 h-2.5 object-contain"
                    alt=""
                  />
                </div>
              ) : type === "unit" ? (
                <span className="text-[9px] sm:text-[10px] text-slate-400">
                  / Bintang
                </span>
              ) : (
                <span />
              )}

              <span className="bg-slate-900 text-blue-400 text-[8px] sm:text-[9px] font-black tracking-widest uppercase px-1.5 py-0.5 rounded flex items-center gap-0.5 ml-auto">
                <Zap size={9} /> INSTAN
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
