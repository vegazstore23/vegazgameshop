import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Region from "./pages/Region";
import Detail from "./pages/Detail";

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/check-region" element={<Region />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<div>404 Not Found GO BACK!</div>} />
      </Routes>
    </MainLayout>
  );
}

export default App;
