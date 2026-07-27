import React from "react";
import { CheckCircle } from "lucide-react";

const ProductGrid = ({
  products,
  selectedProduct,
  onSelect,
  loading,
  activeTab,
  exchangeRate = 3200,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-pulse">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-24 bg-slate-800/40 rounded-xl border border-white/[0.05]"
          ></div>
        ))}
      </div>
    );
  }

  const isMalaysiaMode = activeTab === "malaysia";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {products.map((item) => {
        const isSelected = selectedProduct?.id === item.id;
        return (
          <div
            key={item.id}
            onClick={() => onSelect(item)}
            className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between overflow-hidden min-h-[85px] ${
              isSelected
                ? "border-blue-500 bg-gradient-to-br from-blue-600/10 to-cyan-600/5 shadow-md"
                : "border-white/[0.05] bg-slate-800/30 hover:border-white/20 hover:bg-slate-800/50"
            }`}
          >
            {isSelected && (
              <div className="absolute top-0 right-0 bg-blue-500 text-white p-1 rounded-bl-lg">
                <CheckCircle
                  size={12}
                  fill="currentColor"
                  className="text-slate-900"
                />
              </div>
            )}

            <div>
              <p
                className={`text-xs font-bold leading-tight uppercase tracking-wide transition-colors ${
                  isSelected ? "text-blue-400" : "text-white/80"
                }`}
              >
                {item.productName}
              </p>
            </div>

            <div className="mt-2 pt-2 border-t border-white/[0.03] flex items-center justify-between">
              <span className="text-xs md:text-sm font-black text-white tracking-wide">
                {isMalaysiaMode
                  ? `RM ${(Number(item.sellPrice) / exchangeRate).toFixed(2)}`
                  : `Rp ${Number(item.sellPrice).toLocaleString("id-ID")}`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
