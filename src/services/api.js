const API_BASE = "https://api.vegazgameshop.com";

export const ASSET_BASE = API_BASE;

export async function apiGet(url) {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error("API error");
  return res.json();
}
