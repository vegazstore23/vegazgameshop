import { useEffect, useState } from "react";
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
        <AccountCard key={acc.id} acc={acc} type="home" />
      ))}
    </div>
  );
}
