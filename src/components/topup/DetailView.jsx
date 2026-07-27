import React, { useState, useEffect } from "react";
import { apiGet, apiFetch } from "../../services/api";
import ProductGrid from "./ProductGrid";
import OrderForm from "./OrderForm";
import {
  ArrowLeft,
  Zap,
  Info,
  CheckCircle,
  Loader2,
  Shield,
  Clock,
  Headphones,
} from "lucide-react";

const DetailView = ({
  selectedBrand,
  onBack,
  waAdmin,
  activeTab,
  exchangeRate,
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
  const brandName = brand?.brandName || selectedBrand || "";
  const bannerUrl = brand?.bannerUrl || null;
  const iconUrl = brand?.iconUrl || null;
  const companyName = brand?.companyName || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await apiGet(`/api/topup/products?brand=${brandName}`);
        setProducts(res.data || []);
      } catch (err) {
        console.error("Error load produk:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [brandName]);

  const isMalaysiaMode = activeTab === "malaysia";

  const isFormValid = selectedProduct && formData.userId && formData.phone;

  const handleOrder = async () => {
    if (!isFormValid) return;
    setOrdering(true);

    const totalPriceText = isMalaysiaMode
      ? `RM ${(Number(selectedProduct.sellPrice) / exchangeRate).toFixed(2)}`
      : `Rp ${Number(selectedProduct.sellPrice).toLocaleString("id-ID")}`;

    try {
      await apiFetch("/api/topup/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brand: brandName,
          productCode: selectedProduct.productCode || selectedProduct.id,
          productName: selectedProduct.productName,
          target:
            formData.userId + (formData.zoneId ? `|${formData.zoneId}` : ""),
          phone: formData.phone,
          nickname: nickname || null,
          region: isMalaysiaMode ? "MY" : "ID",
          sellPrice: selectedProduct.sellPrice,
        }),
      });
    } catch (err) {
      console.warn("Gagal simpan order ke DB, lanjut ke WA:", err.message);
    } finally {
      setOrdering(false);
    }

    const text =
      `Halo VegazGameShop, saya mau order:\n\n` +
      `Layanan: ${brandName} (${isMalaysiaMode ? "Malaysia" : "Indonesia"})\n` +
      `Produk: ${selectedProduct.productName}\n` +
      `ID: ${formData.userId}${formData.zoneId ? ` (Zone: ${formData.zoneId})` : ""}\n` +
      `Nickname: ${nickname || "-"}\n` +
      `No. HP: ${formData.phone}\n` +
      `Total: ${totalPriceText}\n\n` +
      `Mohon instruksi pembayarannya. Terima kasih!`;

    window.open(
      `https://wa.me/${waAdmin}?text=${encodeURIComponent(text)}`,
      "_blank",
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 animate-in fade-in duration-500">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-6 group transition-colors"
      >
        <ArrowLeft
          size={20}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-sm font-bold uppercase tracking-wider">
          Kembali ke Katalog
        </span>
      </button>

      <div
        className="relative w-full rounded-3xl overflow-hidden mb-8 shadow-2xl border border-white/5"
        style={{ minHeight: 200 }}
      >
        {bannerUrl ? (
          <img
            src={bannerUrl}
            alt={`Banner ${brandName}`}
            className="w-full h-full object-cover absolute inset-0"
            style={{ minHeight: 200 }}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950" />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />

        <div
          className="relative z-10 p-6 sm:p-8 flex flex-col justify-end"
          style={{ minHeight: 200 }}
        >
          <div className="flex flex-wrap gap-3 mb-4 text-[10px] text-slate-300 font-semibold">
            <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              <Zap size={10} className="text-yellow-400" fill="currentColor" />{" "}
              Proses Cepat
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              <Headphones size={10} className="text-blue-400" /> Layanan Chat
              24/7
            </span>
            <span className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
              <Shield size={10} className="text-emerald-400" /> Pembayaran Aman!
            </span>
          </div>

          <div className="flex items-end gap-4">
            {iconUrl && (
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-slate-900 shrink-0">
                <img
                  src={iconUrl}
                  alt={brandName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold tracking-widest mb-1">
                Top up
              </p>
              <h1 className="text-2xl sm:text-3xl font-black text-yellow-400 uppercase leading-tight drop-shadow-lg">
                {brandName}
              </h1>
              {companyName && (
                <p className="text-slate-300 text-xs mt-1">{companyName}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 text-[10px] text-center text-slate-400">
        {[
          {
            icon: <Shield size={14} className="text-emerald-400" />,
            text: "Jaminan Layanan",
          },
          {
            icon: <Clock size={14} className="text-blue-400" />,
            text: "Jaminan 24 Jam",
          },
          {
            icon: <CheckCircle size={14} className="text-yellow-400" />,
            text: "Pembayaran Aman",
          },
          {
            icon: <Zap size={14} className="text-orange-400" />,
            text: "Proses Cepat",
          },
        ].map((item, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-1 bg-slate-900/60 border border-slate-800/60 rounded-xl py-2.5 px-2"
          >
            {item.icon}
            <span className="font-semibold">{item.text}</span>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-sm shadow-lg shadow-yellow-500/30">
                1
              </div>
              <h2 className="text-base font-black text-white uppercase tracking-wide">
                Masukkan Data Akun
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

          <div className="bg-blue-600/5 border border-blue-500/10 rounded-2xl p-4 flex gap-3">
            <Info className="text-blue-400 shrink-0 mt-0.5" size={18} />
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Pastikan User ID dan Zone ID sudah benar. Kesalahan input data
              bukan tanggung jawab{" "}
              <span className="text-white font-bold">VegazGameShop</span>.
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center font-black text-slate-950 text-sm shadow-lg shadow-yellow-500/30">
                2
              </div>
              <h2 className="text-base font-black text-white uppercase tracking-wide">
                Pilih Nominal
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

          {selectedProduct && (
            <div className="bg-slate-900/80 border border-yellow-500/20 rounded-2xl p-4 space-y-2">
              <p className="text-[10px] text-yellow-500 font-black uppercase tracking-widest">
                Ringkasan Pesanan
              </p>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Produk</span>
                <span className="text-white font-bold">
                  {selectedProduct.productName}
                </span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Harga</span>
                <span className="text-emerald-400 font-black text-sm">
                  {isMalaysiaMode
                    ? `RM ${(Number(selectedProduct.sellPrice) / exchangeRate).toFixed(2)}`
                    : `Rp ${Number(selectedProduct.sellPrice).toLocaleString("id-ID")}`}
                </span>
              </div>
              {formData.userId && (
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Target ID</span>
                  <span className="text-white font-mono">
                    {formData.userId}
                    {formData.zoneId ? ` (${formData.zoneId})` : ""}
                  </span>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleOrder}
            disabled={!isFormValid || ordering}
            className="w-full group relative overflow-hidden py-4 bg-yellow-500 disabled:opacity-30 disabled:grayscale rounded-2xl transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-yellow-500/20"
          >
            <div className="relative z-10 flex items-center justify-center gap-3 text-slate-950 font-black uppercase tracking-[0.15em] text-sm">
              {ordering ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Memproses...
                </>
              ) : (
                <>
                  <Zap size={18} fill="currentColor" />
                  Beli Sekarang via WhatsApp
                </>
              )}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          </button>

          {!isFormValid && (
            <p className="text-center text-[10px] text-slate-500">
              {!formData.userId
                ? "Masukkan User ID terlebih dahulu"
                : !formData.phone
                  ? "Masukkan No. WhatsApp"
                  : "Pilih nominal top up"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailView;
