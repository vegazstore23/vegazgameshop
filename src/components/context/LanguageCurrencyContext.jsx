import React, { createContext, useContext, useState, useEffect } from "react";
import { id } from "../locales/id";
import { my } from "../locales/my";
import { en } from "../locales/en";
import { apiGet } from "../../services/api";

const LanguageCurrencyContext = createContext();

const dictionary = { ID: id, MY: my, EN: en };

export function LanguageCurrencyProvider({ children }) {
  const [lang, setLang] = useState(
    () => localStorage.getItem("vgz_lang") || "MY",
  );

  // State rate dinamis dari database admin-dashboard
  const [rateMYR, setRateMYR] = useState(3500);

  useEffect(() => {
    localStorage.setItem("vgz_lang", lang);
  }, [lang]);

  // Ambil rate kurs terbaru dari backend settings admin
  useEffect(() => {
    async function fetchSettingsRate() {
      try {
        const res = await apiGet("/api/settings");
        if (res?.data?.exchangeRateMYR) {
          setRateMYR(Number(res.data.exchangeRateMYR));
        }
      } catch (err) {
        console.error("Gagal memuat kurs admin:", err);
      }
    }
    fetchSettingsRate();
  }, []);

  const t = (page, key) => {
    return (
      dictionary[lang]?.[page]?.[key] || dictionary["MY"]?.[page]?.[key] || key
    );
  };

  const rateIDRToUSD = 18500;

  const formatPrice = (priceInIDR) => {
    const amount = Number(priceInIDR) || 0;

    if (lang === "ID") {
      return `Rp ${amount.toLocaleString("id-ID")}`;
    }

    if (lang === "EN") {
      const priceUSD = amount / rateIDRToUSD;
      return `$ ${priceUSD.toFixed(2)}`;
    }

    // Menggunakan rateMYR dinamis dari database admin-dashboard
    const priceMYR = amount / rateMYR;
    return `RM ${priceMYR.toFixed(2)}`;
  };

  return (
    <LanguageCurrencyContext.Provider
      value={{ lang, setLang, formatPrice, t, rateMYR }}
    >
      {children}
    </LanguageCurrencyContext.Provider>
  );
}

export const useLangCurr = () => useContext(LanguageCurrencyContext);
