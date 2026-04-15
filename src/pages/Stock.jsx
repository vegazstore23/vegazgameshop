import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

import Entry from "../assets/misc/Entry.svg";
import Basic from "../assets/misc/Basic.svg";
import High from "../assets/misc/High.svg";
import Luxury from "../assets/misc/Luxury.svg";
import mainBg from "../assets/background/background.webp";
import bg1 from "../assets/background/bg-vegaz2.webp";
import bg2 from "../assets/background/bg-akun.webp";
import bg3 from "../assets/background/bg-transaksi.webp";

const TIER_LABELS = {
  entry: "Entry RM1–RM100",
  mid: "Mid RM101–RM249",
  mythic: "Mythic RM250–RM400",
  glory: "Glory RM401–RM10,000",
};

const SORT_LABELS = {
  newest: "Latest Upload",
  oldest: "Oldest Upload",
  price_asc: "Price ↑",
  price_desc: "Price ↓",
};

export default function Stock() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentSort, setCurrentSort] = useState("newest");
  const [currentMinPrice, setCurrentMinPrice] = useState(1);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(200);
  const [activeTier, setActiveTier] = useState("entry");

  const [accounts, setAccounts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const perPage = 10;

  // ================= LOAD STOCK =================
  async function loadStock() {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: perPage,
        sort: currentSort,
        minPrice: currentMinPrice,
        maxPrice: currentMaxPrice,
      });

      if (currentSearch) params.append("search", currentSearch);

      const result = await apiGet(`/api/account?${params.toString()}`);
      const payload = result.data || {};

      setAccounts(payload.data || []);
      setTotalPages(payload.totalPages || 1);
    } catch (err) {
      console.log("Stock Load Error:", err);
    }
  }

  useEffect(() => {
    loadStock();
  }, [
    currentPage,
    currentSearch,
    currentSort,
    currentMinPrice,
    currentMaxPrice,
  ]);

  // ================= SEARCH DEBOUNCE =================
  useEffect(() => {
    const delay = setTimeout(() => {
      setCurrentPage(1);
      loadStock();
    }, 300);

    return () => clearTimeout(delay);
  }, [currentSearch]);

  function formatPrice(val) {
    return new Intl.NumberFormat("en-MY", {
      style: "currency",
      currency: "MYR",
      minimumFractionDigits: 2,
    }).format(val);
  }

  function selectTier(tier, min, max) {
    setActiveTier(tier);
    setCurrentMinPrice(min);
    setCurrentMaxPrice(max);
    setCurrentPage(1);
  }

  function clearTier() {
    setActiveTier(null);
    setCurrentMinPrice(0);
    setCurrentMaxPrice(999999);
  }

  function clearSort() {
    setCurrentSort("newest");
  }

  return (
    <div className="pt-24 text-white max-w-7xl mx-auto px-4">
      {/* ================= FILTER BOX ================= */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-6 shadow-xl">
        {/* TIER */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          <button onClick={() => selectTier("entry", 1, 200)}>
            <img src={Entry} />
          </button>
          <button onClick={() => selectTier("mid", 201, 400)}>
            <img src={Basic} />
          </button>
          <button onClick={() => selectTier("mythic", 401, 600)}>
            <img src={High} />
          </button>
          <button onClick={() => selectTier("glory", 601, 10000)}>
            <img src={Luxury} />
          </button>
        </div>

        {/* SEARCH + FILTER */}
        <div className="flex gap-2 mb-2 relative">
          <input
            placeholder="Search..."
            className="w-full bg-gray-200 rounded-full py-2 px-4 text-black"
            onChange={(e) => setCurrentSearch(e.target.value)}
          />

          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-blue-400 px-4 rounded-full"
          >
            Filter
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-12 w-56 bg-blue-900 p-3 rounded-xl">
              {Object.entries(SORT_LABELS).map(([key, label]) => (
                <div
                  key={key}
                  onClick={() => {
                    setCurrentSort(key);
                    setDropdownOpen(false);
                  }}
                  className="cursor-pointer p-2 hover:bg-white/10"
                >
                  {label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ================= FILTER CHIP ================= */}
      <div className="flex gap-2 mt-4">
        {activeTier && (
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
            {TIER_LABELS[activeTier]}
            <button onClick={clearTier}> x</button>
          </span>
        )}

        {currentSort !== "newest" && (
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
            {SORT_LABELS[currentSort]}
            <button onClick={clearSort}> x</button>
          </span>
        )}
      </div>

      {/* ================= LIST ================= */}
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        {accounts.map((item, i) => {
          const img = item.AccountImages?.[0]?.image;

          return (
            <a
              key={item.id}
              href={`/detail/${item.id}`}
              className="group relative rounded-2xl overflow-hidden
              bg-gradient-to-b from-blue-500/90 to-blue-600/90
              border border-white/10
              shadow-lg hover:-translate-y-2 transition"
            >
              {/* BADGE */}
              <div className="absolute top-0 right-0 text-xs px-3 py-1 bg-red-500">
                {i < 2 ? "HOT" : "NEW"}
              </div>

              {/* IMAGE */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={img}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
              </div>

              {/* CONTENT */}
              <div className="p-4 bg-blue-500/40 backdrop-blur flex flex-col gap-2">
                <span className="text-sm bg-black/40 px-2 py-1 rounded">
                  {item.code}
                </span>

                <h3 className="text-sm">{item.title}</h3>

                <span className="text-xl font-bold text-yellow-400">
                  {formatPrice(item.price)}
                </span>

                <button className="bg-green-500 py-2 rounded text-xs">
                  CHECK FULL DETAIL
                </button>
              </div>
            </a>
          );
        })}
      </div>

      {/* ================= PAGINATION ================= */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? "bg-blue-600" : "bg-white/10"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
