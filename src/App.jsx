import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Detail from "./pages/Detail";
import Region from "./pages/Region";
import Calculator from "./pages/Calculator";
import About from "./pages/About";

function App() {
  return (
    <MainLayout>
      <Routes>
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
              <h1 className="text-6xl font-black text-blue-400">404</h1>
              <p className="text-gray-400">Halaman tidak ditemukan.</p>
              <a
                href="/"
                className="bg-blue-600 px-6 py-2 rounded-xl hover:bg-blue-500 transition"
              >
                Kembali ke Home
              </a>
            </div>
          }
        />
      </Routes>
    </MainLayout>
  );
}

export default App;
