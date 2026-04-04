import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/home";
import Stock from "./pages/stock";
import Region from "./pages/Region";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/check-region" element={<Region />} />
        <Route path="*" element={<div>404 Not Found GO BACK!</div>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
