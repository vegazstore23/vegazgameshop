import React, { useState, useEffect } from "react";
import { apiGet } from "../services/api";
import CatalogView from "../components/topup/CatalogView";
import DetailView from "../components/topup/DetailView";

const Topup = () => {
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [activeTab, setActiveTab] = useState("malaysia");
  const [exchangeRate, setExchangeRate] = useState(3200);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadKatalogData = async () => {
      setLoading(true);
      try {
        // PERBAIKAN: Gunakan awalan /api untuk public endpoint
        const res = await apiGet("/api/topup/categories");
        setBrands(res.data || res || []);
      } catch (err) {
        console.error("Gagal load brand ke katalog:", err);
      } finally {
        setLoading(false);
      }
    };
    loadKatalogData();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center text-slate-400 animate-pulse">
        Memuat Katalog Game...
      </div>
    );
  }

  return (
    <div className="py-8 text-white min-h-screen bg-slate-950">
      {selectedBrand ? (
        <DetailView
          selectedBrand={selectedBrand}
          onBack={() => setSelectedBrand(null)}
          waAdmin="628xxxxxxxxx"
          activeTab={activeTab}
          exchangeRate={exchangeRate}
        />
      ) : (
        <CatalogView
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          brands={brands}
          onSelectGame={(brand) => setSelectedBrand(brand)}
        />
      )}
    </div>
  );
};

export default Topup;
