import { useEffect, useState } from "react";
import { apiGet } from "../services/api";

import StockProfileBanner from "../components/stock/StockProfileBanner";
import TierFilter from "../components/stock/TierFilter";
import SearchSortBar from "../components/stock/SearchSortBar";
import FilterChips from "../components/stock/FilterChips";
import AccountCard from "../components/ui/AccountCard";
import Pagination from "../components/stock/Paginations";
import Advantages from "../components/stock/Advantages";

import mainBg from "../assets/background/background.webp";
import bg1 from "../assets/background/bg-akun.webp";
import bg2 from "../assets/background/bg-mengkilat.webp";

export default function Stock() {
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentSort, setCurrentSort] = useState("newest");
  const [currentMinPrice, setCurrentMinPrice] = useState(1);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(200);
  const [activeTier, setActiveTier] = useState("entry");

  const [accounts, setAccounts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 10;

  async function loadStock() {
    try {
      const params = new URLSearchParams({
        page: currentPage,
        limit: perPage,
        sort: "oldest",
        minPrice: currentMinPrice,
        maxPrice: currentMaxPrice,
      });
      if (currentSearch) params.append("search", currentSearch);

      const result = await apiGet(`/api/account?${params.toString()}`);
      const payload = result.data || {};
      let rawData = payload.data || [];

      const sorted = rawData.sort((a, b) => {
        const statusOrder = { Available: 1, Reserved: 2, Hold: 3, Sold: 4 };
        const orderA = statusOrder[a.status] || 1;
        const orderB = statusOrder[b.status] || 1;

        if (orderA !== orderB) return orderA - orderB;

        return new Date(a.createdAt) - new Date(b.createdAt);
      });

      setAccounts(sorted);
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

  return (
    <div className="min-h-screen bg-[#141414]">
      <StockProfileBanner />

      <div
        className="bg-cover bg-center bg-no-repeat border-t border-white/10"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="space-y-8">
            <div className="bg-blue-900/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-white/5">
              <TierFilter
                setActiveTier={setActiveTier}
                setCurrentMinPrice={setCurrentMinPrice}
                setCurrentMaxPrice={setCurrentMaxPrice}
                setCurrentPage={setCurrentPage}
              />

              <SearchSortBar
                setCurrentSearch={setCurrentSearch}
                currentSort={currentSort}
                setCurrentSort={setCurrentSort}
              />
            </div>

            <FilterChips
              activeTier={activeTier}
              setActiveTier={setActiveTier}
              currentSort={currentSort}
            />

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
              {accounts.map((item, i) => (
                <AccountCard key={item.id} item={item} index={i} />
              ))}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
              {accounts.map((item) => (
                <AccountCard key={item.id} acc={item} type="stock" />
              ))}
            </div>
            <Advantages />
          </div>
        </div>
      </div>
    </div>
  );
}
