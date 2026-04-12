const API_BASE = "https://apivgz.vegazgameshop.com";

export const ASSET_BASE = API_BASE;

export async function apiGet(url) {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json();
}

export function getImageUrl(path) {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  return `${ASSET_BASE}/uploads/${path}`;
}
