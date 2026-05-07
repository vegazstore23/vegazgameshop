import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../services/api";
import AccountCard from "../ui/AccountCard";

// ── Skeleton card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-2xl overflow-hidden border border-white/5 animate-pulse">
      <div className="aspect-square bg-white/5" />
      <div className="p-3 space-y-2">
        <div className="h-3 bg-white/5 rounded w-3/4" />
        <div className="h-3 bg-white/5 rounded w-1/2" />
        <div className="h-5 bg-white/5 rounded w-1/3 mt-3" />
      </div>
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState({ onRetry }) {
  return (
    <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center py-16 gap-4 text-center">
      <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-2xl">
        ⚠️
      </div>
      <div>
        <p className="text-white/60 text-sm">Gagal memuatkan akaun</p>
        <p className="text-white/30 text-xs mt-1">
          Semak sambungan internet anda
        </p>
      </div>
      <button
        onClick={onRetry}
        className="text-xs font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest border border-blue-500/30 px-4 py-2 rounded-xl hover:bg-blue-500/10 transition-all"
      >
        Cuba Semula
      </button>
    </div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────
function EmptyState() {
  return (
    <div className="col-span-2 md:col-span-4 flex flex-col items-center justify-center py-16 gap-3 text-center">
      <div className="text-3xl opacity-30">🎮</div>
      <p className="text-white/40 text-sm">
        Tiada akaun tersedia buat masa ini
      </p>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function FeaturedAccounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    setLoading(true);
    setError(false);
    try {
      const res = await apiGet("/api/public/account?limit=4");
      const data = Array.isArray(res)
        ? res
        : res?.data?.data || res?.data || [];
      setAccounts(data);
    } catch (err) {
      console.error("Featured error:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Loading skeleton */}
      {loading &&
        Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}

      {/* Error state */}
      {!loading && error && <ErrorState onRetry={fetchAccounts} />}

      {/* Empty state */}
      {!loading && !error && accounts.length === 0 && <EmptyState />}

      {/* Actual accounts */}
      {!loading &&
        !error &&
        accounts.map((acc) => (
          <Link
            key={acc.id}
            to={`/detail/${acc.id}`}
            className="block hover:no-underline"
          >
            <AccountCard acc={acc} type="home" />
          </Link>
        ))}
    </div>
  );
}
