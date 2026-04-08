import { useState, useEffect } from "react";

let cachedConfig = null;
let fetchPromise = null;

async function fetchAppConfig() {
  if (cachedConfig) return cachedConfig;
  if (fetchPromise) return fetchPromise;

  fetchPromise = fetch("https://api.vegazgameshop.com/api/public/app-config")
    .then((res) => {
      if (!res.ok) throw new Error("app-config failed");
      return res.json();
    })
    .then((json) => {
      cachedConfig = json?.data ?? {};
      return cachedConfig;
    })
    .catch((err) => {
      console.error("useAppConfig:", err);
      fetchPromise = null;
      return {};
    });

  return fetchPromise;
}

export function useAppConfig() {
  const [config, setConfig] = useState(cachedConfig ?? {});
  const [loading, setLoading] = useState(!cachedConfig);

  useEffect(() => {
    if (cachedConfig) {
      setConfig(cachedConfig);
      setLoading(false);
      return;
    }
    fetchAppConfig().then((data) => {
      setConfig(data);
      setLoading(false);
    });
  }, []);

  const contacts = config?.contacts ?? [];

  function getByRole(role) {
    return contacts.find(
      (c) => Array.isArray(c.roles) && c.roles.includes(role),
    );
  }

  function getWaHref(role, defaultText = "") {
    const c = getByRole(role);
    if (!c) return "#";
    const phone = c.value.replace(/\D/g, "");
    return defaultText
      ? `https://wa.me/${phone}?text=${encodeURIComponent(defaultText)}`
      : `https://wa.me/${phone}`;
  }

  return { config, loading, contacts, getByRole, getWaHref };
}
