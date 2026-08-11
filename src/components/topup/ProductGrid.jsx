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
  const isMalaysiaMode = activeTab === "malaysia";

  return (
    <div className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5">
      {/* Header Step 2 */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-[#FACC15] rounded flex items-center justify-center font-bold text-black text-sm">
          2
        </div>
        <h2 className="text-base font-bold text-white">Pilih Nominal</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-pulse">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-24 bg-[#383842] rounded-xl border border-white/5"
            ></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {products.map((item) => {
            const isSelected = selectedProduct?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between min-h-[90px] ${
                  isSelected
                    ? "border-[#FACC15] bg-[#3f3f4a]"
                    : "border-transparent bg-[#383842] hover:bg-[#3f3f4a]"
                }`}
              >
                <div>
                  <p className="text-xs font-bold text-white/90 leading-tight">
                    {item.productName}
                  </p>
                </div>

                <div className="mt-3">
                  <span className="text-sm font-black text-white tracking-wide">
                    {isMalaysiaMode
                      ? `RM ${(Number(item.sellPrice) / exchangeRate).toFixed(2)}`
                      : `Rp ${Number(item.sellPrice).toLocaleString("id-ID")}`}
                  </span>
                </div>

                {/* Aksesoris diskon / label */}
                {isSelected && (
                  <div className="absolute top-0 right-0 bg-[#FACC15] px-1.5 py-1 rounded-bl-lg rounded-tr-lg">
                    <CheckCircle size={12} className="text-black" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
