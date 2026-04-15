import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiGet } from "../../services/api";
import AccountCard from "../ui/AccountCard";

export default function FeaturedAccounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    fetchAccounts();
  }, []);

  async function fetchAccounts() {
    try {
      const res = await apiGet("/api/public/account?limit=4");
      const data = Array.isArray(res)
        ? res
        : res?.data?.data || res?.data || [];
      setAccounts(data);
    } catch (err) {
      console.error("Featured error:", err);
    }
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {accounts.map((acc) => (
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
