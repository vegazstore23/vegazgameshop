import React, { useState, useEffect } from "react";
import { apiGet, apiFetch } from "../../services/api";
import ProductGrid from "./ProductGrid";
import OrderForm from "./OrderForm";
import {
  ArrowLeft,
  Zap,
  Info,
  Shield,
  Headphones,
  Clock,
  CheckCircle,
} from "lucide-react";

const DetailView = ({
  selectedBrand,
  onBack,
  waAdmin = "628xxx",
  activeTab,
  exchangeRate = 3200,
}) => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [formData, setFormData] = useState({
    userId: "",
    zoneId: "",
    phone: "",
  });

  const brand = typeof selectedBrand === "object" ? selectedBrand : null;
  const brandName = brand?.brandName || brand?.name || selectedBrand || "";
  const bannerUrl = brand?.bannerUrl || brand?.banner || null;
  const iconUrl = brand?.iconUrl || brand?.image || null;

  useEffect(() => {
    async function fetchProducts() {
      if (!brandName) return;
      setLoading(true);
      try {
        // Panggil API produk berdasarkan brand
        const res = await apiGet(
          `/api/topup/products?brand=${encodeURIComponent(brandName)}`,
        );
        const data = Array.isArray(res) ? res : res?.data || [];

        // Filter hanya produk yang isActive dari DB
        const activeProducts = data.filter((p) => p.isActive !== false);
        setProducts(activeProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [brandName]);

  const isMalaysiaMode = activeTab === "malaysia";
  const isFormValid = selectedProduct && formData.userId && formData.phone;

  const handleOrder = async () => {
    if (!isFormValid) return;
    setOrdering(true);

    const priceFormatted = isMalaysiaMode
      ? `RM ${(Number(selectedProduct.sellPrice) / exchangeRate).toFixed(2)}`
      : `Rp ${Number(selectedProduct.sellPrice).toLocaleString("id-ID")}`;

    try {
      // Simpan transaksi di database backend admin
      await apiFetch("/api/topup/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: brandName,
          productCode:
            selectedProduct.productCode ||
            selectedProduct.code ||
            selectedProduct.id,
          productName: selectedProduct.productName,
          target:
            formData.userId + (formData.zoneId ? `|${formData.zoneId}` : ""),
          phone: formData.phone,
          nickname: nickname || null,
          sellPrice: selectedProduct.sellPrice,
        }),
      });
    } catch (err) {
      console.warn("Lanjut ke WA meskipun order log error:", err.message);
    } finally {
      setOrdering(false);
    }

    // Format pesan WhatsApp ke Admin
    const text =
      `Halo VegazGameShop, saya mau order TopUp:\n\n` +
      `🎮 Game: ${brandName}\n` +
      `💎 Produk: ${selectedProduct.productName}\n` +
      `🆔 ID Target: ${formData.userId}${formData.zoneId ? ` (${formData.zoneId})` : ""}\n` +
      `👤 Nickname: ${nickname || "-"}\n` +
      `📱 No WA: ${formData.phone}\n` +
      `💰 Total: ${priceFormatted}\n\n` +
      `Mohon instruksi pembayarannya. Terima kasih!`;

    window.open(
      `https://wa.me/${waAdmin}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={18} />
        <span className="text-xs font-bold uppercase tracking-wider">
          Kembali ke Katalog
        </span>
      </button>

      {/* Banner Box */}
      <div className="relative w-full rounded-3xl overflow-hidden mb-8 border border-slate-800 bg-slate-900 min-h-[180px] shadow-2xl flex items-end p-6">
        {bannerUrl && (
          <img
            src={bannerUrl}
            alt={brandName}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />

        <div className="relative z-10 flex items-center gap-4">
          {iconUrl && (
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/10 bg-slate-900 shrink-0 shadow-lg">
              <img
                src={iconUrl}
                alt={brandName}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div>
            <p className="text-[10px] text-purple-400 uppercase font-black tracking-widest">
              Top Up Game
            </p>
            <h1 className="text-2xl sm:text-3xl font-black text-white uppercase">
              {brandName}
            </h1>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        {/* Step 1: Input Data */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center font-black text-white text-xs">
                1
              </div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Lengkapi Data Akun
              </h2>
            </div>
            <OrderForm
              formData={formData}
              setFormData={setFormData}
              nickname={nickname}
              setNickname={setNickname}
              brand={brandName}
            />
          </div>
        </div>

        {/* Step 2: Pilih Nominal */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-purple-600 rounded-xl flex items-center justify-center font-black text-white text-xs">
                2
              </div>
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Pilih Nominal Nominal
              </h2>
            </div>
            <ProductGrid
              products={products}
              selectedProduct={selectedProduct}
              onSelect={setSelectedProduct}
              loading={loading}
              activeTab={activeTab}
              exchangeRate={exchangeRate}
            />
          </div>

          <button
            onClick={handleOrder}
            disabled={!isFormValid || ordering}
            className="w-full py-4 bg-purple-600 hover:bg-purple-500 disabled:opacity-30 disabled:grayscale text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2"
          >
            <Zap size={18} fill="currentColor" />
            {ordering ? "Memproses..." : "Beli Sekarang via WhatsApp"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
