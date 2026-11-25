import React, { createContext, useContext, useState, useEffect } from "react";
import { id } from "../locales/id";
import { my } from "../locales/my";
import { en } from "../locales/en";
import { apiGet } from "../../services/api";

const LanguageCurrencyContext = createContext();

const dictionary = { ID: id, MY: my, EN: en };

// Bahasa -> mata uang
const LANG_TO_CURRENCY = { ID: "IDR", MY: "MYR", EN: "USD" };

const DEFAULT_RATES = {
  rateMYRtoIDR: 4500,
  rateMYRtoUSD: 0.25,
  idrRoundingStep: 1000,
};

const positive = (v) => {
  const n = Number(v);
  return v !== null && v !== undefined && v !== "" && Number.isFinite(n) && n > 0
    ? n
    : null;
};

// Ambil object konfigurasi kurs dari response /public/app-config (data.shop)
// atau /settings (data langsung).
const parseRates = (res) => {
  const src = res?.data?.shop || res?.data || {};
  return {
    // fallback berantai: rateMYRtoIDR -> exchangeRateMYR (legacy) -> 4500
    rateMYRtoIDR:
      positive(src.rateMYRtoIDR) ??
      positive(src.exchangeRateMYR) ??
      DEFAULT_RATES.rateMYRtoIDR,
    rateMYRtoUSD: positive(src.rateMYRtoUSD) ?? DEFAULT_RATES.rateMYRtoUSD,
    idrRoundingStep: Math.max(
      1,
      Math.round(positive(src.idrRoundingStep) ?? DEFAULT_RATES.idrRoundingStep),
    ),
  };
};

export function LanguageCurrencyProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("vgz_lang") || "MY",
  );

  const [rates, setRates] = useState(DEFAULT_RATES);

  useEffect(() => {
    localStorage.setItem("vgz_lang", lang);
  }, [lang]);

  useEffect(() => {
    let cancelled = false;
    async function fetchSettingsRate() {
      try {
        let res;
        try {
          res = await apiGet("/api/public/app-config");
        } catch {
          res = await apiGet("/api/settings");
        }
        if (!cancelled) setRates(parseRates(res));
      } catch (err) {
        console.error("Gagal memuat kurs admin:", err);
      }
    }
    fetchSettingsRate();
    return () => {
      cancelled = true;
    };
  }, []);

  const { rateMYRtoIDR, rateMYRtoUSD, idrRoundingStep } = rates;
  const currency = LANG_TO_CURRENCY[lang] || "MYR";

  const t = (page, key) => {
    return (
      dictionary[lang]?.[page]?.[key] || dictionary["MY"]?.[page]?.[key] || key
    );
  };

  const fmtMYR = (val) => {
    const n = Math.round((Number(val) || 0) * 100) / 100;
    return `RM ${Number.isInteger(n) ? n : n.toFixed(2)}`;
  };
  const fmtIDR = (val) =>
    `Rp ${Math.round(Number(val) || 0).toLocaleString("id-ID")}`;
  const fmtUSD = (val) => `$${Number(Number(val) || 0).toFixed(2)}`;

  // HARGA AKUN MLBB: baca langsung dari backend, JANGAN hitung ulang dari IDR.
  // Fallback hanya untuk response lama yang belum punya `prices`.
  const formatAccountPrice = (account, overrideCurrency) => {
    const curr = overrideCurrency || currency;
    const p = account?.prices?.[curr];
    const priceMYR = positive(account?.priceMYR);

    if (curr === "MYR") {
      let val = positive(p) ?? priceMYR;
      if (val === null && positive(account?.price)) {
        val = Math.ceil(Number(account.price) / rateMYRtoIDR);
      }
      return fmtMYR(val ?? 0);
    }

    if (curr === "IDR") {
      return fmtIDR(positive(p) ?? positive(account?.price) ?? 0);
    }

    // USD
    let usd = positive(p);
    if (usd === null) {
      const myr =
        priceMYR ??
        (positive(account?.price)
          ? Math.ceil(Number(account.price) / rateMYRtoIDR)
          : 0);
      usd = myr * rateMYRtoUSD;
    }
    return fmtUSD(usd);
  };

  // HARGA IDR UMUM (Top-up, Joki, flash_sale_price): konversi pakai kurs admin.
  const formatPrice = (idrAmount, overrideCurrency) => {
    const curr = overrideCurrency || currency;
    const amount = Number(idrAmount) || 0;

    if (curr === "IDR") return fmtIDR(amount);

    if (curr === "USD") {
      return fmtUSD((amount / rateMYRtoIDR) * rateMYRtoUSD);
    }

    // MYR: bulatkan ke atas kelipatan RM 0.50 supaya tidak ada sen berantakan
    const cleanMyr = Math.ceil((amount / rateMYRtoIDR) * 2) / 2;
    return fmtMYR(cleanMyr);
  };

  return (
    <LanguageCurrencyContext.Provider
      value={{
        lang,
        setLang,
        currency,
        t,
        formatPrice,
        formatAccountPrice,
        rateMYRtoIDR,
        rateMYRtoUSD,
        idrRoundingStep,
        // alias kompatibilitas untuk file lain yang masih memakai nama lama
        rateMYR: rateMYRtoIDR, // IDR per 1 MYR
        rateUSD: rateMYRtoUSD > 0 ? rateMYRtoIDR / rateMYRtoUSD : 18000, // IDR per 1 USD
      }}
    >
      {children}
    </LanguageCurrencyContext.Provider>
  );
}

export const useLangCurr = () => useContext(LanguageCurrencyContext);
