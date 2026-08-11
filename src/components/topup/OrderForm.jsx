import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../../services/api";
import { useLangCurr } from "../context/LanguageCurrencyContext";
import {
  Loader2,
  ShieldCheck,
  XCircle,
  ChevronDown,
  Search,
  X,
  Tag,
  QrCode,
  Wallet,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const COUNTRY_CODES = [
  { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  { name: "Malaysia", code: "+60", flag: "🇲🇾" },
  { name: "Singapore", code: "+65", flag: "🇸🇬" },
  { name: "Brunei", code: "+673", flag: "🇧🇳" },
  { name: "Philippines", code: "+63", flag: "🇵🇭" },
  { name: "Thailand", code: "+66", flag: "🇹🇭" },
  { name: "Vietnam", code: "+84", flag: "🇻🇳" },
  { name: "United States", code: "+1", flag: "🇺🇸" },
  { name: "United Kingdom", code: "+44", flag: "🇬🇧" },
  { name: "Japan", code: "+81", flag: "🇯🇵" },
  { name: "South Korea", code: "+82", flag: "🇰🇷" },
  { name: "Australia", code: "+61", flag: "🇦🇺" },
];

const createSlug = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const STATUS = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCESS: "success",
  NOT_FOUND: "not_found",
  ERROR: "error",
};

export default function OrderForm({
  formData,
  setFormData,
  nickname,
  setNickname,
  brand,
  products = [],
  selectedProduct,
  onSelectProduct,
  loadingProducts = false,
  selectedPayment,
  setSelectedPayment,
  validationErrors = [],
  isValidationModalOpen = false,
  setIsValidationModalOpen,
}) {
  const navigate = useNavigate();
  const { lang, formatPrice, t } = useLangCurr();

  const [regionStatus, setRegionStatus] = useState(STATUS.IDLE);
  const [errMsg, setErrMsg] = useState("");
  const [regionResult, setRegionResult] = useState(null);
  const [isCooldown, setIsCooldown] = useState(false);

  const [selectedCountry, setSelectedCountry] = useState(
    lang === "MY"
      ? { name: "Malaysia", code: "+60", flag: "🇲🇾" }
      : { name: "Indonesia", code: "+62", flag: "🇮🇩" },
  );
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");

  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false);

  // Refs Auto-Scroll
  const userIdRef = useRef(null);
  const zoneIdRef = useRef(null);
  const productRef = useRef(null);
  const paymentRef = useRef(null);
  const phoneRef = useRef(null);

  const friendlyError = useCallback((msg = "") => {
    const m = msg.toLowerCase();
    if (m.includes("terlalu banyak") || m.includes("too many"))
      return "Terlalu banyak permintaan. Coba sebentar lagi.";
    if (
      m.includes("tidak valid") ||
      m.includes("invalid") ||
      m.includes("not found")
    )
      return "ID atau Server tidak valid / tidak ditemukan.";
    return "Gagal memverifikasi akun. Periksa kembali ID & Server.";
  }, []);

  const checkAccount = async () => {
    if (!formData.userId) return;

    setRegionStatus(STATUS.LOADING);
    setErrMsg("");
    setNickname("");
    setRegionResult(null);

    try {
      let apiBrand = brand;
      const lowerBrand = brand.toLowerCase();
      if (lowerBrand.includes("mobile legends")) apiBrand = "mlbb";
      else if (lowerBrand.includes("free fire")) apiBrand = "freefire";
      else if (lowerBrand.includes("pubg")) apiBrand = "pubgm";

      const res = await apiGet(
        `/api/region?id=${formData.userId}&serverid=${formData.zoneId || ""}&brand=${encodeURIComponent(apiBrand)}`,
      );

      const data = res.result || res.data;

      if ((res.success || res.status === "success") && data) {
        const nick = data.nickname || data["in-game-nickname"] || data.username;
        const country = data.country || "Unknown";

        setNickname(nick);
        setRegionResult({ username: nick, country });
        setRegionStatus(STATUS.SUCCESS);
      } else {
        setErrMsg(friendlyError(res.message || res.error || "not found"));
        setRegionStatus(STATUS.NOT_FOUND);
      }
    } catch (err) {
      setErrMsg(friendlyError(err.message));
      setRegionStatus(STATUS.ERROR);
    } finally {
      setIsCooldown(true);
      setTimeout(() => setIsCooldown(false), 3000);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const isMLBB = brand.toLowerCase().includes("mobile legends");
      const isReady = isMLBB
        ? formData.userId.length >= 4 && formData.zoneId.length >= 3
        : formData.userId.length >= 4;

      if (isReady && !isCooldown) {
        checkAccount();
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [formData.userId, formData.zoneId]);

  const availablePromos = [];

  const filteredCountries = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      c.code.includes(countrySearch),
  );

  return (
    <div className="space-y-6">
      {/* 1. INPUT ID & SERVER AKUN */}
      <div
        ref={userIdRef}
        className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[#FACC15] rounded flex items-center justify-center font-bold text-black text-sm">
            1
          </div>
          <h2 className="text-base font-bold text-white">
            {t("topup", "step1Title")}
          </h2>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-300 mb-2 block">
                {t("topup", "userIdLabel")}
              </label>
              <input
                type="text"
                placeholder={t("topup", "userIdPlaceholder")}
                value={formData.userId}
                onChange={(e) =>
                  setFormData({ ...formData, userId: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#383842] border-2 border-transparent rounded-xl text-white text-sm outline-none focus:border-[#FACC15] transition-all"
              />
            </div>
            <div ref={zoneIdRef}>
              <label className="text-xs text-slate-300 mb-2 block">
                {t("topup", "zoneIdLabel")}
              </label>
              <input
                type="text"
                placeholder={t("topup", "zoneIdPlaceholder")}
                value={formData.zoneId}
                onChange={(e) =>
                  setFormData({ ...formData, zoneId: e.target.value })
                }
                className="w-full px-4 py-3 bg-[#383842] border-2 border-transparent rounded-xl text-white text-sm outline-none focus:border-[#FACC15] transition-all"
              />
            </div>
          </div>

          {/* STATUS VERIFIKASI REGION */}
          {regionStatus !== STATUS.IDLE && (
            <div className="mt-3">
              {regionStatus === STATUS.LOADING && (
                <div className="bg-slate-800/60 border border-slate-700 rounded-xl p-3 flex items-center gap-3 text-slate-400 text-xs animate-pulse">
                  <Loader2 size={16} className="animate-spin text-amber-400" />
                  {t("topup", "checkingAccount")}
                </div>
              )}

              {regionStatus === STATUS.SUCCESS && regionResult && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 flex items-center justify-between text-xs text-emerald-400">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} />
                    <span className="font-bold text-white">
                      {regionResult.username}
                    </span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[10px] border border-emerald-500/40">
                    {regionResult.country}
                  </span>
                </div>
              )}

              {(regionStatus === STATUS.NOT_FOUND ||
                regionStatus === STATUS.ERROR) && (
                <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-3 flex items-center gap-2 text-rose-400 text-xs">
                  <XCircle size={16} className="shrink-0" />
                  {errMsg}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 2. PILIH NOMINAL / LIST TOPUP */}
      <div
        ref={productRef}
        className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[#FACC15] rounded flex items-center justify-center font-bold text-black text-sm">
            2
          </div>
          <h2 className="text-base font-bold text-white">
            {t("topup", "step2Title")}
          </h2>
        </div>

        {loadingProducts ? (
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
                  onClick={() => onSelectProduct(item)}
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
                      {formatPrice(item.sellPrice)}
                    </span>
                  </div>
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

      {/* 3. QUANTITY */}
      <div className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#FACC15] rounded flex items-center justify-center font-bold text-black text-sm">
            3
          </div>
          <h2 className="text-base font-bold text-white">
            {t("topup", "step3Title")}
          </h2>
        </div>
        <div className="flex items-center gap-3 max-w-xs">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-10 h-10 bg-[#383842] hover:bg-[#484852] text-white font-bold rounded-xl flex items-center justify-center transition-colors"
          >
            -
          </button>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
            className="flex-1 text-center bg-[#383842] border-2 border-transparent rounded-xl text-white text-sm py-2.5 outline-none font-bold"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="w-10 h-10 bg-[#383842] hover:bg-[#484852] text-white font-bold rounded-xl flex items-center justify-center transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* 4. KODE PROMO */}
      <div className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[#FACC15] rounded flex items-center justify-center font-bold text-black text-sm">
            4
          </div>
          <h2 className="text-base font-bold text-white">
            {t("topup", "step4Title")}
          </h2>
        </div>
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={t("topup", "promoPlaceholder")}
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 px-4 py-3 bg-[#383842] border-2 border-transparent rounded-xl text-white text-sm outline-none focus:border-[#FACC15] uppercase placeholder-slate-500"
            />
            <button
              type="button"
              className="px-5 py-3 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl transition-colors"
            >
              {t("topup", "applyPromo")}
            </button>
          </div>
          <button
            type="button"
            onClick={() => setIsPromoModalOpen(true)}
            className="text-xs text-[#FACC15] hover:underline font-bold flex items-center gap-1.5"
          >
            <Tag size={14} /> {t("topup", "useAvailablePromo")}
          </button>
        </div>
      </div>

      {/* 5. METODE PEMBAYARAN */}
      <div
        ref={paymentRef}
        className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[#FACC15] rounded flex items-center justify-center font-bold text-black text-sm">
            5
          </div>
          <h2 className="text-base font-bold text-white">
            {t("topup", "step5Title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            {
              id: "qr_duitnow",
              label: "QR DuitNow",
              icon: <QrCode size={20} className="text-amber-400" />,
            },
            {
              id: "qr_indo",
              label: "QRIS / QR Indo",
              icon: <QrCode size={20} className="text-blue-400" />,
            },
            {
              id: "binance",
              label: "Binance Pay",
              icon: <Wallet size={20} className="text-yellow-400" />,
            },
          ].map((method) => (
            <div
              key={method.id}
              onClick={() => setSelectedPayment(method.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center gap-3 ${
                selectedPayment === method.id
                  ? "bg-[#FACC15]/10 border-[#FACC15] text-white"
                  : "bg-[#383842]/50 border-white/5 text-slate-300 hover:bg-[#383842]"
              }`}
            >
              {method.icon}
              <div>
                <p className="text-xs font-bold">{method.label}</p>
                <p className="text-[10px] text-slate-400">Instan & Otomatis</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. NOMOR WHATSAPP KONTAK */}
      <div
        ref={phoneRef}
        className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-[#FACC15] rounded flex items-center justify-center font-bold text-black text-sm">
            6
          </div>
          <h2 className="text-base font-bold text-white">
            {t("topup", "step6Title")}
          </h2>
        </div>

        <div className="flex gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsCountryOpen(!isCountryOpen)}
              className="h-full px-3 py-3 bg-[#383842] hover:bg-[#484852] rounded-xl text-white text-xs font-bold flex items-center gap-2 border border-transparent transition-colors"
            >
              <span>{selectedCountry.flag}</span>
              <span>{selectedCountry.code}</span>
              <ChevronDown size={14} className="text-slate-400" />
            </button>

            {isCountryOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-[#282830] border border-slate-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto p-2">
                <div className="sticky top-0 bg-[#282830] pb-2 mb-1 border-b border-slate-700">
                  <div className="relative">
                    <Search
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      type="text"
                      placeholder={t("topup", "searchCountry")}
                      value={countrySearch}
                      onChange={(e) => setCountrySearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 bg-[#383842] text-white text-xs rounded-lg outline-none"
                    />
                  </div>
                </div>
                {filteredCountries.length > 0 ? (
                  filteredCountries.map((c) => (
                    <div
                      key={c.code + c.name}
                      onClick={() => {
                        setSelectedCountry(c);
                        setIsCountryOpen(false);
                        setCountrySearch("");
                      }}
                      className="flex items-center justify-between px-3 py-2 hover:bg-[#383842] rounded-lg cursor-pointer text-xs text-slate-200"
                    >
                      <span className="flex items-center gap-2">
                        <span>{c.flag}</span> {c.name}
                      </span>
                      <span className="text-slate-400 font-mono">{c.code}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 text-center py-4">
                    {t("topup", "countryNotFound")}
                  </p>
                )}
              </div>
            )}
          </div>

          <input
            type="number"
            placeholder={t("topup", "phonePlaceholder")}
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            className="flex-1 px-4 py-3 bg-[#383842] border-2 border-transparent rounded-xl text-white text-sm outline-none focus:border-[#FACC15] transition-all placeholder-slate-500"
          />
        </div>
        <p className="text-[10px] text-slate-400 mt-2">
          {t("topup", "phoneHelpText")}
        </p>
      </div>

      {/* POPUP MODAL NOTIFIKASI ERROR / VALIDASI FORM KOSONG */}
      {isValidationModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-[#282830] border border-rose-500/40 w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4 text-center">
            <div className="w-12 h-12 bg-rose-500/20 text-rose-500 rounded-full flex items-center justify-center mx-auto">
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {t("topup", "validationModalTitle")}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {t("topup", "validationModalDesc")}
              </p>
            </div>
            <div className="bg-[#1c1c22] rounded-xl p-3 border border-white/5 text-left space-y-1.5">
              {validationErrors.map((err, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 text-xs text-rose-400"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                  <span>{err}</span>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsValidationModalOpen(false)}
              className="w-full py-3 bg-[#FACC15] hover:bg-[#eab308] text-black font-extrabold text-xs uppercase rounded-xl transition-colors"
            >
              {t("topup", "closeModal")}
            </button>
          </div>
        </div>
      )}

      {/* POPUP MODAL PROMO */}
      {isPromoModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-[#282830] border border-slate-700 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-700 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Tag size={16} className="text-[#FACC15]" />{" "}
                {t("topup", "availablePromoTitle")}
              </h3>
              <button
                type="button"
                onClick={() => setIsPromoModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {availablePromos.length > 0 ? (
                availablePromos.map((promo) => (
                  <div
                    key={promo.code}
                    onClick={() => {
                      setPromoCode(promo.code);
                      setIsPromoModalOpen(false);
                    }}
                    className="p-3 bg-[#383842] hover:bg-[#484852] rounded-xl border border-white/5 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-[#FACC15]">
                        {promo.code}
                      </p>
                      <p className="text-[11px] text-slate-300 mt-0.5">
                        {promo.desc}
                      </p>
                    </div>
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg border border-emerald-500/20">
                      {promo.discount}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs font-medium">
                  {t("topup", "noPromoAvailable")}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
