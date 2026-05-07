import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import StockProfileBanner from "../components/stock/StockProfileBanner";
import TierFilter from "../components/stock/TierFilter";
import SearchSortBar from "../components/stock/SearchSortBar";
import FilterChips from "../components/stock/FilterChips";
import AccountCard from "../components/ui/AccountCard";
import Pagination from "../components/stock/Paginations";
import Advantages from "../components/stock/Advantages";
import bg1 from "../assets/background/bg-akun.webp";

export default function Stock() {
  const [currentSort, setCurrentSort] = useState("newest");
  const [currentMinPrice, setCurrentMinPrice] = useState(null);
  const [currentMaxPrice, setCurrentMaxPrice] = useState(null);
  const [activeTier, setActiveTier] = useState(null);

  const [accounts, setAccounts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentSearch, setCurrentSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [waAdmin, setWaAdmin] = useState("");

  // Key untuk trigger remount SearchSortBar (reset input + dropdown state)
  const [searchSortResetKey, setSearchSortResetKey] = useState(0);

  // retryTrigger: increment untuk paksa useEffect jalankan semula API call
  // tanpa mengubah state filter lain (digunakan oleh butang "Cuba Semula")
  const [retryTrigger, setRetryTrigger] = useState(0);

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await apiGet("/api/contact");
        const admin = res?.data?.find(
          (c) => c.isActive && c.roles?.includes("order"),
        );
        if (admin) setWaAdmin(admin.value);
      } catch (err) {
        console.error(err);
      }
    }
    fetchContact();
  }, []);

  // ROOT CAUSE FIX:
  // Pola useCallback + useEffect([loadStock]) sebelum ini menyebabkan stale closure —
  // iaitu loadStock yang di-cache boleh megang nilai state lama (terutama bila
  // setCurrentSort dan setCurrentPage dipanggil serentak dan React batch kedua-duanya).
  //
  // Penyelesaian: Definisikan fetchStock TERUS dalam useEffect dengan dependency
  // eksplisit pada nilai state sebenar. Ini memastikan setiap kali mana-mana
  // state berubah, fungsi fetch dibuat semula dengan nilai terkini — tiada stale closure.
  //
  // `cancelled` flag menghalang race condition: jika user klik sort 2x pantas,
  // response pertama tidak akan overwrite response kedua yang lebih baru.
  useEffect(() => {
    document.title = "Stock Account MLBB Update | VegazGameShop";

    let cancelled = false;

    async function fetchStock() {
      setLoading(true);
      setError(null);

      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: 12,
          sort: currentSort,
        });

        if (currentMinPrice !== null)
          params.append("minPrice", currentMinPrice);
        if (currentMaxPrice !== null)
          params.append("maxPrice", currentMaxPrice);
        if (currentSearch) params.append("search", currentSearch);

        const result = await apiGet(`/api/account?${params.toString()}`);

        // Jangan update state kalau request ini sudah dibatalkan
        if (!cancelled) {
          setAccounts(result.data?.data || []);
          setTotalPages(result.data?.totalPages || 1);
        }
      } catch (err) {
        console.error("Stock Load Error:", err);
        if (!cancelled) {
          setError("Gagal memuatkan senarai akaun. Sila cuba semula.");
          setAccounts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchStock();

    // Cleanup: tandakan request lama sebagai batal bila dependency berubah
    return () => {
      cancelled = true;
    };
  }, [
    currentPage,
    currentSearch,
    currentSort,
    currentMinPrice,
    currentMaxPrice,
    retryTrigger, // Increment ini dari butang "Cuba Semula" untuk re-fetch
  ]);

  const handleTierSelect = (tier, min, max) => {
    if (activeTier === tier) {
      setActiveTier(null);
      setCurrentMinPrice(null);
      setCurrentMaxPrice(null);
      setCurrentSort("newest");
      setCurrentSearch("");
      setSearchSortResetKey((prev) => prev + 1);
      setCurrentPage(1);
    } else {
      setActiveTier(tier);
      setCurrentMinPrice(min);
      setCurrentMaxPrice(max);
      setCurrentSort("newest");
      setCurrentSearch("");
      setSearchSortResetKey((prev) => prev + 1);
      setCurrentPage(1);
    }
  };

  const handleClearTier = () => {
    setActiveTier(null);
    setCurrentMinPrice(null);
    setCurrentMaxPrice(null);
    setCurrentSort("newest");
    setCurrentSearch("");
    setSearchSortResetKey((prev) => prev + 1);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#141414]">
      <StockProfileBanner />
      <div
        className="bg-cover bg-center border-t border-white/10"
        style={{ backgroundImage: `url(${bg1})` }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12 space-y-8">
          <div className="bg-blue-900/90 rounded-3xl p-6 border border-white/5 shadow-2xl">
            <TierFilter activeTier={activeTier} onSelect={handleTierSelect} />

            <SearchSortBar
              key={searchSortResetKey}
              setCurrentSearch={(val) => {
                setCurrentSearch(val);
                setCurrentPage(1);
              }}
              currentSort={currentSort}
              setCurrentSort={(s) => {
                setCurrentSort(s);
                setCurrentPage(1);
              }}
            />
          </div>

          <FilterChips
            activeTier={activeTier}
            currentSort={currentSort}
            onClearTier={handleClearTier}
            onClearSort={() => {
              setCurrentSort("newest");
              setCurrentPage(1);
            }}
          />

          {/* UI ralat — tunjuk bila API gagal */}
          {!loading && error && (
            <div className="bg-red-500/10 border border-red-500/50 p-10 rounded-2xl text-center animate-in fade-in zoom-in duration-300">
              <p className="text-red-400 font-bold mb-2 text-lg uppercase tracking-tighter">
                Ralat Memuatkan Data!
              </p>
              <p className="text-white/60 text-sm mb-4">{error}</p>
              <button
                onClick={() => setRetryTrigger((prev) => prev + 1)}
                className="mt-2 px-6 py-2 bg-red-500/20 hover:bg-red-500/40 border border-red-500/50 text-red-300 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
              >
                Cuba Semula
              </button>
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-white/5 rounded-2xl h-48 animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && !error && accounts.length === 0 && (
            <div className="bg-orange-500/10 border border-orange-500/50 p-10 rounded-2xl text-center animate-in fade-in zoom-in duration-300">
              <p className="text-orange-400 font-bold mb-2 text-lg uppercase tracking-tighter">
                {activeTier
                  ? "Tiada akaun tersedia dalam tier ini!"
                  : "Tiada akaun ditemui!"}
              </p>
              <p className="text-white/60 text-sm">
                {activeTier
                  ? "Sila tetapkan semula penapis tier atau cuba tier yang lain."
                  : "Cuba ubah kata kunci carian atau tetapkan semula penapis anda."}
              </p>
              {activeTier && (
                <button
                  onClick={handleClearTier}
                  className="mt-4 px-6 py-2 bg-orange-500/20 hover:bg-orange-500/40 border border-orange-500/50 text-orange-300 rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                >
                  Tetapkan Semula Penapis
                </button>
              )}
            </div>
          )}

          {!loading && !error && accounts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {accounts.map((item) => (
                <AccountCard
                  key={item.id}
                  acc={item}
                  type="stock"
                  waAdmin={waAdmin}
                />
              ))}
            </div>
          )}

          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Advantages />
        </div>
      </div>
    </div>
  );
}
