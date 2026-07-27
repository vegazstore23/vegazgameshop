const API_BASE = "https://apivgz.vegazgameshop.com";

export const ASSET_BASE = API_BASE;

export async function apiGet(url) {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json();
}

// Fungsi POST baru dengan nama apiFetch biar cocok sama DetailView.jsx kamu yang lama
export async function apiFetch(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body,
  });

  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json();
}

// Kita sediain juga apiPost yang lebih simpel sebagai alternatif
export async function apiPost(url, data) {
  const res = await fetch(`${API_BASE}${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json();
}

export function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${ASSET_BASE}/uploads/${path}`;
}
