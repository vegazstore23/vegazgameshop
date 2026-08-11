import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet, apiFetch } from "../../services/api";
import OrderForm from "./OrderForm";
import { useLangCurr } from "../context/LanguageCurrencyContext";
import {
  ShieldCheck,
  Zap,
  MessageCircle,
  Star,
  HeadphonesIcon,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

const DetailView = ({ waAdmin = "628xxx" }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { formatPrice, t } = useLangCurr();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [ordering, setOrdering] = useState(false);
  const [brandData, setBrandData] = useState(null);

  const [validationErrors, setValidationErrors] = useState([]);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    zoneId: "",
    phone: "",
  });

  const fixUrl = (url) => {
    if (!url) return "";
    return url.replace(/^http:\/\//i, "https://");
  };

  const rawBrandNameFromSlug = slug ? slug.replace(/-/g, " ") : "";
  const brandName =
    brandData?.brandName || brandData?.name || rawBrandNameFromSlug;
  const iconUrl = fixUrl(brandData?.iconUrl || brandData?.image || null);

  const finalBannerUrl =
    fixUrl(brandData?.bannerUrl) ||
    iconUrl ||
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop";

  useEffect(() => {
    async function loadData() {
      if (!brandName) return;
      setLoading(true);

      try {
        if (!brandData) {
          // Menggunakan /api/topup/categories agar tidak 404
          const resBrands = await apiGet("/api/topup/categories");
          let allBrands = [];
          if (resBrands?.data) {
            Object.values(resBrands.data).forEach((arr) => {
              allBrands = [...allBrands, ...arr];
            });
          } else if (Array.isArray(resBrands)) {
            allBrands = resBrands;
          }

          const found = allBrands.find(
            (b) => b.brandName?.toLowerCase() === brandName.toLowerCase(),
          );
          if (found) setBrandData(found);
        }

        const res = await apiGet(
          `/api/topup/products?brand=${encodeURIComponent(brandName)}`,
        );
        const data = Array.isArray(res) ? res : res?.data || [];
        const activeProducts = data.filter((p) => p.isActive !== false);
        setProducts(activeProducts);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
    window.scrollTo(0, 0);
  }, [brandName]);

  const validateOrder = () => {
    const errors = [];
    const isMLBB = brandName.toLowerCase().includes("mobile legends");

    if (!formData.userId) errors.push(t("topup", "errUserId"));
    if (isMLBB && !formData.zoneId) errors.push(t("topup", "errZoneId"));
    if (!selectedProduct) errors.push(t("topup", "errProduct"));
    if (!selectedPayment) errors.push(t("topup", "errPayment"));
    if (!formData.phone) errors.push(t("topup", "errPhone"));

    if (errors.length > 0) {
      setValidationErrors(errors);
      setIsValidationModalOpen(true);
      return false;
    }
    return true;
  };

  const handleOrder = async () => {
    if (!validateOrder()) return;
    setOrdering(true);

    try {
      await apiFetch("/api/topup/public-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: selectedProduct.id,
          target: formData.userId,
          targetExtra: formData.zoneId || "",
          phone: formData.phone,
          nickname: nickname || "",
          paymentMethod: selectedPayment,
        }),
      });

      const text =
        `Halo Admin Vegaz, saya mahu order TopUp:\n\n` +
        `🎮 Game: ${brandName}\n` +
        `📦 Produk: ${selectedProduct.productName}\n` +
        `🆔 SERVER: ${formData.userId}${formData.zoneId ? ` (${formData.zoneId})` : ""}\n` +
        `👤 Nickname: ${nickname || "-"}\n` +
        `💳 Payment: ${selectedPayment}\n` +
        `📱 No WASSAP: ${formData.phone}\n` +
        `💰 Total: ${formatPrice(selectedProduct.sellPrice)}\n\n` +
        `Mohon instruksi pembayarannya. Terima kasih!`;

      window.open(
        `https://wa.me/${waAdmin}?text=${encodeURIComponent(text)}`,
        "_blank",
      );
    } catch (err) {
      alert("Terjadi kesalahan saat memproses pesanan: " + err.message);
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div className="bg-[#1c1c22] min-h-screen pb-32 lg:pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <button
          onClick={() => navigate("/topup")}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-xs font-bold uppercase tracking-wider">
            {t("topup", "backToCatalog")}
          </span>
        </button>
      </div>

      <div className="relative w-full h-[280px] sm:h-[350px] bg-[#141414] mt-3">
        {finalBannerUrl && (
          <img
            src={finalBannerUrl}
            alt="TopUp Banner"
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1c22] via-[#1c1c22]/80 to-transparent" />

        <div className="absolute bottom-0 left-0 w-full px-4 sm:px-10 lg:px-20 xl:px-32 pb-6 flex items-end gap-5">
          {iconUrl && (
            <img
              src={iconUrl}
              alt={brandName}
              className="w-24 h-24 sm:w-36 sm:h-36 rounded-3xl object-cover bg-slate-900 shadow-2xl border-2 border-white/10 z-10"
            />
          )}
          <div className="z-10 pb-1 capitalize">
            <h1 className="text-xl sm:text-3xl font-black text-white uppercase tracking-wide">
              {brandName}
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              {brandData?.publisher || "Publisher"}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-3 text-[10px] sm:text-xs text-white/90 font-bold">
              <span className="flex items-center gap-1.5">
                <Zap size={14} className="text-[#FACC15]" />{" "}
                {t("topup", "fastProcess")}
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle size={14} className="text-blue-400" />{" "}
                {t("topup", "chatService")}
              </span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck
                  size={14}
                  className="text-blue-500 fill-blue-500/20"
                />{" "}
                {t("topup", "safePayment")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:block bg-white/5 border-y border-white/10 py-3 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-10 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} /> {t("topup", "serviceGuarantee")}
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle size={16} /> {t("topup", "serviceGuarantee24")}
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} /> {t("topup", "trustedPayment")}
          </span>
          <span className="flex items-center gap-2">
            <Zap size={16} /> {t("topup", "fastAutoProcess")}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-10 mt-6 lg:mt-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 space-y-6">
          <OrderForm
            formData={formData}
            setFormData={setFormData}
            nickname={nickname}
            setNickname={setNickname}
            brand={brandName}
            products={products}
            selectedProduct={selectedProduct}
            onSelectProduct={setSelectedProduct}
            loadingProducts={loading}
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            validationErrors={validationErrors}
            isValidationModalOpen={isValidationModalOpen}
            setIsValidationModalOpen={setIsValidationModalOpen}
          />
        </div>

        <div className="lg:col-span-4 hidden lg:flex flex-col gap-5 sticky top-24 h-fit">
          <div className="bg-[#282830] rounded-2xl p-5 border border-white/5 flex flex-col items-center shadow-lg">
            <h3 className="text-xs text-slate-400 uppercase font-bold mb-1 w-full text-left">
              {t("topup", "ratingTitle")}
            </h3>
            <div className="flex items-center gap-3 my-2 w-full">
              <span className="text-4xl font-black text-white">4.99</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-[#FACC15] fill-[#FACC15]"
                  />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 w-full">
              {t("topup", "ratingCount")}
            </p>
          </div>

          <div className="bg-[#282830] rounded-2xl p-5 border border-white/5 flex items-center gap-4 shadow-lg cursor-pointer hover:bg-[#2f2f38] transition-colors">
            <HeadphonesIcon size={24} className="text-slate-300" />
            <div>
              <p className="text-sm font-bold text-white">
                {t("topup", "needHelp")}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {t("topup", "helpDesc")}
              </p>
            </div>
          </div>

          <div className="bg-[#282830] rounded-2xl p-5 border border-white/5 shadow-lg flex flex-col gap-4">
            <div className="bg-[#1c1c22] rounded-xl p-4 min-h-[80px] flex items-center justify-center border border-white/5">
              {selectedProduct ? (
                <div className="text-center">
                  <p className="text-sm text-white font-bold mb-1">
                    {selectedProduct.productName}
                  </p>
                  <p className="text-xl text-[#FACC15] font-black">
                    {formatPrice(selectedProduct.sellPrice)}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center">
                  {t("topup", "noItemSelected")}
                </p>
              )}
            </div>
            <button
              onClick={handleOrder}
              disabled={ordering}
              className="w-full py-3.5 bg-[#FACC15] hover:bg-[#eab308] text-black font-black uppercase text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ShoppingBag size={18} />
              {ordering ? t("topup", "processing") : t("topup", "orderNow")}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE FIXED BOTTOM CHECKOUT */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#282830] border-t border-white/10 z-50 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-md mx-auto">
          <div className="bg-[#1c1c22] rounded-xl p-3 mb-3 border border-white/5 flex items-center justify-center min-h-[60px]">
            {selectedProduct ? (
              <div className="flex justify-between items-center w-full px-2">
                <p className="text-xs text-white font-bold w-1/2 line-clamp-2">
                  {selectedProduct.productName}
                </p>
                <p className="text-base text-[#FACC15] font-black">
                  {formatPrice(selectedProduct.sellPrice)}
                </p>
              </div>
            ) : (
              <p className="text-xs text-slate-400">
                {t("topup", "noItemSelected")}
              </p>
            )}
          </div>

          <button
            onClick={handleOrder}
            disabled={ordering}
            className="w-full py-3 bg-[#FACC15] hover:bg-[#eab308] text-black font-black uppercase text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ShoppingBag size={18} />
            {ordering ? t("topup", "processing") : t("topup", "orderNow")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailView;
