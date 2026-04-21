import { useState, useEffect } from "react"; // Tambahkan ini agar tidak error
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // Untuk efek transisi loading

import MainLayout from "./layouts/MainLayout";
import LoadingScreen from "./components/ui/LoadingScreen";
import ScrollToTop from "./components/ScrollTop"; // Pastikan helper scroll ini ada

import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Detail from "./pages/Detail";
import Region from "./pages/Region";
import Calculator from "./pages/Calculator";
import About from "./pages/About";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Simulasi loading aset/data selama 2 detik
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* ScrollToTop memastikan layar kembali ke atas setiap pindah halaman */}
      <ScrollToTop />

      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" />
        ) : (
          <MainLayout key="main">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/detail/:id" element={<Detail />} />
              <Route path="/check-region" element={<Region />} />
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
    </>
  );
}

export default App;
