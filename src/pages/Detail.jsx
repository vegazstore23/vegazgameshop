import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGet } from "../services/api";

import mainBg from "../assets/background/background.webp";
import bg1 from "../assets/background/bg-vegaz2.webp";
import bg2 from "../assets/background/bg-akun.webp";
import bg3 from "../assets/background/bg-transaksi.webp";

const ASSET_BASE = "https://apivgz.vegazgameshop.com";

const Detail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDescOpen, setIsDescOpen] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const result = await apiGet(`/api/account/${id}`);
        setAccount(result.data);
      } catch (err) {
        console.error("Error loading detail:", err);
      }
    };
    loadDetail();
  }, [id]);

  if (!account)
    return <div className="text-white text-center pt-20">Loading...</div>;

  const images = account.AccountImages?.map((img) => img.image) || [];
  const mainPrice = Number(account.price);
  const originalPrice = mainPrice * 1.3;

  const handleOrder = () => {
    const message = `Halo Admin, saya tertarik dengan account\n\nTitle: ${account.title}\nCode: ${account.code}\nHarga: RM ${mainPrice.toFixed(2)}\n\nApakah Masih tersedia?`;
    window.open(
      `https://wa.me/60XXXXXXXXXX?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <main className="pt-20 pb-16 min-h-screen bg-{bg1} bg-center bg-cover">
      {/* NAVIGATION */}
      <section className="mb-6 py-4 bg-gradient-to-r from-blue-800 to-blue-600 rounded-2xl max-w-7xl mx-auto px-4 shadow-lg flex gap-2">
        <Link
          to="/stock"
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-3 rounded-xl border border-white/20 transition"
        >
          <span>Back Stock</span>
        </Link>
        <Link
          to="/"
          className="flex-1 flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 py-3 rounded-xl border border-white/20 transition"
        >
          <span>Back Home</span>
        </Link>
      </section>

      {/* GALLERY & DETAIL */}
      <section className="grid md:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
        {/* GALLERY */}
        <div className="flex flex-col gap-4 p-6 bg-[#0d2d6b]/80 backdrop-blur-xl border border-blue-400/20 rounded-3xl">
          <div className="relative">
            <img
              src={
                images[currentIndex]?.startsWith("http")
                  ? images[currentIndex]
                  : `${ASSET_BASE}/uploads/${images[currentIndex]}`
              } //
              className="w-full aspect-[4/5] object-cover rounded-2xl transition-opacity duration-300"
              alt="Main"
            />
            <span
              className={`absolute top-4 right-4 px-4 py-1 rounded-full text-xs font-bold uppercase ${account.status === "sold" ? "bg-red-500" : "bg-green-500"}`}
            >
              {account.status}
            </span>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((img, index) => (
              <div
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 aspect-[4/5] rounded-md overflow-hidden border-2 cursor-pointer transition-all ${index === currentIndex ? "border-green-500 opacity-100" : "border-transparent opacity-50"}`}
              >
                <img
                  src={
                    images[currentIndex]?.startsWith("http")
                      ? images[currentIndex]
                      : `${ASSET_BASE}/uploads/${images[currentIndex]}`
                  } //
                  className="w-full h-full object-cover"
                  alt="Thumb"
                />
              </div>
            ))}
          </div>
        </div>

        {/* INFO */}
        <div className="p-6 bg-[#021d4a]/60 backdrop-blur-xl border border-blue-400/20 rounded-3xl">
          <h1 className="text-2xl font-black mb-4">{account.title}</h1>
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="bg-green-600 py-3 rounded-xl text-center font-bold">
              TERSEDIA
            </div>
            <div className="bg-blue-500 py-3 rounded-xl text-center font-bold">
              CODE: {account.code}
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-sm text-gray-400">Harga</p>
              <div className="text-3xl font-black text-green-500">
                RM {mainPrice.toFixed(2)}
              </div>
            </div>
            <div className="bg-red-900/50 px-4 py-2 rounded-xl">
              <span className="text-red-500 line-through font-bold">
                RM {originalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          {/* DESCRIPTION TOGGLE */}
          <div className="mb-6">
            <button
              onClick={() => setIsDescOpen(!isDescOpen)}
              className="text-blue-400 font-bold mb-2"
            >
              Description {isDescOpen ? "▲" : "▼"}
            </button>
            {isDescOpen && (
              <div className="bg-blue-500/10 border border-blue-400/30 p-4 rounded-xl text-sm text-gray-200">
                {account.description || "-"}
              </div>
            )}
          </div>

          <button
            onClick={handleOrder}
            className="w-full bg-green-500 hover:bg-green-600 py-4 rounded-2xl font-black transition transform active:scale-95"
          >
            ORDER VIA WHATSAPP
          </button>
        </div>
      </section>

      {/* MOBILE FLOATING BAR */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-[#021d4a]/95 backdrop-blur-xl border-t border-blue-400/20 md:hidden z-50">
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-xs text-blue-200 uppercase">Harga</span>
            <div className="text-lg font-black text-green-400">
              RM {mainPrice.toFixed(2)}
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="bg-green-500 px-6 py-2 rounded-xl font-bold"
          >
            ORDER NOW
          </button>
        </div>
      </div>
    </main>
  );
};

export default Detail;
