import { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import LoadingScreen from "./components/ui/LoadingScreen";
import ScrollToTop from "./components/ScrollTop";
import { LanguageCurrencyProvider } from "./components/context/LanguageCurrencyContext";

import Home from "./pages/Home";
import Topup from "./pages/Topup";
import Stock from "./pages/Stock";
import Detail from "./pages/Detail";
import Region from "./pages/Region";
import Joki from "./pages/Joki";
import JokiDetail from "./pages/JokiGameDetail";
import Calculator from "./pages/Calculator";
import About from "./pages/About";
import DetailView from "./components/topup/DetailView";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const pageTitles = {
      "/": "VegazGameShop — Platform Jual Beli & Topup Games Terpercaya",
      "/topup": "Topup Games Termurah 100% | VegazGameShop",
      "/stock": "Stok Akaun MLBB Premium & Murah | VegazGameShop",
      "/check-region": "Cek Region ID MLBB | VegazGameShop",
      "/joki": "Joki GameBooster Terpadu | VegazGameShop",
      "/calculator-mlbb": "Kalkulator Winrate & Gacha MLBB | VegazGameShop",
      "/about": "Tentang Kami, FAQ & Bantuan | VegazGameShop",
    };

    if (location.pathname.startsWith("/detail/")) {
      document.title = "Detail Akaun MLBB ";
    } else if (location.pathname.startsWith("/topup/")) {
      document.title = "Topup Game Pilihan ";
    } else if (location.pathname.startsWith("/joki/")) {
      document.title = "Game Booster Pilihan ";
    } else {
      document.title = pageTitles[location.pathname] || "VegazGameShop";
    }
  }, [location.pathname]);

  return (
    <LanguageCurrencyProvider>
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <MainLayout key="main">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/topup" element={<Topup />} />
              <Route path="/topup/:slug" element={<DetailView />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/check-region" element={<Region />} />
              <Route path="/joki" element={<Joki />} />
              <Route path="/joki/:slug" element={<JokiDetail />} />
              <Route path="/calculator-mlbb" element={<Calculator />} />
              <Route path="/about" element={<About />} />
              <Route
                path="*"
                element={
                  <div className="min-h-screen flex flex-col items-center justify-center text-white gap-4">
                    <h1 className="text-6xl font-black text-blue-400 font-orbitron">
                      404
                    </h1>
                    <p className="text-gray-400">Page on Maintenance!.</p>
                    <a
                      href="/"
                      className="bg-blue-600 px-6 py-2 rounded-xl hover:bg-blue-500 transition font-bold"
                    >
                      Back To Home
                    </a>
                  </div>
                }
              />
            </Routes>
          </MainLayout>
        )}
      </AnimatePresence>
    </LanguageCurrencyProvider>
  );
}

export default App;
