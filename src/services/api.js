const API_BASE = "srv1528270.hstgr.cloud";

export const ASSET_BASE = API_BASE;

export async function apiGet(url) {
  const res = await fetch(`${API_BASE}${url}`);
  if (!res.ok) throw new Error("API error");
  return res.json();
}
