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

  const [rateMYR, setRateMYR] = useState(3600);
  const [rateUSD, setRateUSD] = useState(15000);

  useEffect(() => {
    localStorage.setItem("vgz_lang", lang);
  }, [lang]);

  useEffect(() => {
    async function fetchSettingsRate() {
      try {
        const res = await apiGet("/api/settings");
        if (res?.data?.exchangeRateMYR) {
          setRateMYR(Number(res.data.exchangeRateMYR));
        }
        if (res?.data?.exchangeRateUSD) {
          setRateUSD(Number(res.data.exchangeRateUSD));
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

  const formatPrice = (priceInIDR) => {
    const amount = Number(priceInIDR) || 0;
    if (!amount) return lang === "ID" ? "Rp 0" : lang === "EN" ? "$ 0" : "RM 0";

    if (lang === "ID") {
      return `Rp ${amount.toLocaleString("id-ID")}`;
    }

    if (lang === "EN") {
      const rawUSD = amount / rateUSD;
      const roundedUSD = Math.round(rawUSD / 5) * 5;
      return `$ ${roundedUSD}`;
    }

    const rawMYR = amount / rateMYR;
    const roundedMYR = Math.round(rawMYR / 5) * 5;
    return `RM ${roundedMYR}`;
  };

  return (
    <LanguageCurrencyContext.Provider
      value={{ lang, setLang, formatPrice, t, rateMYR, rateUSD }}
    >
      {children}
    </LanguageCurrencyContext.Provider>
  );
}

export const useLangCurr = () => useContext(LanguageCurrencyContext);
