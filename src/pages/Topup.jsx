import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import CatalogView from "../components/topup/CatalogView";

const createSlug = (text) => {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
};

const Topup = () => {
  const [brands, setBrands] = useState([]);
  const [activeTab, setActiveTab] = useState("topup_games");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadKatalogData = async () => {
      setLoading(true);
      try {
        const res = await apiGet("/api/topup/categories");
        let allBrands = [];
        if (res.data) {
          Object.values(res.data).forEach((arr) => {
            allBrands = [...allBrands, ...arr];
          });
        }
        setBrands(allBrands);
      } catch (err) {
        console.error("Gagal load brand ke katalog:", err);
      } finally {
        setLoading(false);
      }
    };
    loadKatalogData();
  }, []);

  const handleSelectGame = (brand) => {
    const brandName = brand.brandName || brand.name || brand;
    const brandSlug = createSlug(brandName);

     navigate(`/topup/${brandSlug}`, {
      state: {
        selectedBrand: brand,
        activeTab: activeTab,
      },
    });
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-24 text-center text-slate-400 animate-pulse font-medium text-sm">
        Memuat Katalog Games Vegazgameshop...
      </div>
    );
  }

  return (
    <div className="py-6 text-white min-h-screen bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#020617] to-[#020617]">
      <CatalogView
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        brands={brands}
        onSelectGame={handleSelectGame}
      />
    </div>
  );
};

export default Topup;
