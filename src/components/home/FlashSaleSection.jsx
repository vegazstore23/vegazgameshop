import React, { useState, useEffect } from "react";
import {
  RiFlashlightFill,
  RiTimeLine,
  RiFireFill,
  RiVipDiamondFill,
  RiGamepadFill,
  RiRocketFill,
  RiGhostSmileFill, // Icon buat state kosong
} from "react-icons/ri";
import { apiGet } from "../../services/api";

export default function FlashSaleSection() {
  const [flashSales, setFlashSales] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [targetTime, setTargetTime] = useState(null);
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchFlashSales = async () => {
      try {
        const res = await apiGet("/api/flash-sales/active");
        const data = res.data?.data || res.data || [];

        if (isMounted) {
          setFlashSales(data);
          if (data.length > 0) {
            const closestSale = data.reduce((closest, current) => {
              return new Date(current.end_time) < new Date(closest.end_time)
                ? current
                : closest;
            });
            setTargetTime(new Date(closestSale.end_time).getTime());
          }
        }
      } catch (err) {
        console.error("Gagal load flash sale:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchFlashSales();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!targetTime) return;
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ h: 0, m: 0, s: 0 });
      } else {
        const h = Math.floor(distance / (1000 * 60 * 60));
        const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((distance % (1000 * 60)) / 1000);
        setTimeLeft({ h, m, s });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  const pad = (n) => String(n).padStart(2, "0");

  const filteredSales =
    activeTab === "all"
      ? flashSales
      : flashSales.filter((item) => item.item_type === activeTab);

  // Konfigurasi Tabs menggunakan Icons
  const tabs = [
    { id: "all", label: "Semua", icon: <RiFireFill size={14} /> },
    { id: "topup", label: "Topup", icon: <RiVipDiamondFill size={14} /> },
    { id: "account", label: "Akun", icon: <RiGamepadFill size={14} /> },
    { id: "joki", label: "Joki", icon: <RiRocketFill size={14} /> },
  ];

  // Kalau nggak ada Flash Sale sama sekali dari database, sembunyikan section
  if (loading || flashSales.length === 0) return null;

  return (
    <div className="w-full">
      {/* HEADER & TIMER COMPACT */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-5 border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <RiFlashlightFill size={20} className="text-white animate-pulse" />
          </div>
          <div>
            <h3 className="text-white font-orbitron font-bold text-xl uppercase tracking-tighter italic leading-none">
              Limited Deals
            </h3>
            <p className="text-blue-400 text-[10px] font-bold mt-1 uppercase tracking-widest">
              Flash Sale Active
            </p>
          </div>
        </div>

        {/* TIMER */}
        <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-700/50 px-3 py-1.5 rounded-lg w-max">
          <RiTimeLine className="text-slate-400" size={14} />
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest mr-1">
            Ends In
          </span>
          <div className="flex items-center gap-1 text-white font-bold text-sm tabular-nums font-mono">
            <span>{pad(timeLeft.h)}</span>
            <span className="text-blue-500 pb-0.5">:</span>
            <span>{pad(timeLeft.m)}</span>
            <span className="text-blue-500 pb-0.5">:</span>
            <span className="text-amber-400">{pad(timeLeft.s)}</span>
          </div>
        </div>
      </div>

      {/* TABS FILTER */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-500"
                : "bg-slate-800/40 text-slate-400 border border-slate-700/50 hover:text-white hover:bg-slate-800"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* GRID ITEMS & EMPTY STATE */}
      <div className="mt-2">
        {filteredSales.length === 0 ? (
          // TAMPILAN JIKA KOSONG (EMPTY STATE)
          <div className="w-full py-12 flex flex-col items-center justify-center bg-slate-900/40 border border-slate-700/50 border-dashed rounded-2xl">
            <RiGhostSmileFill size={36} className="text-slate-600 mb-3" />
            <p className="text-slate-400 text-sm font-bold uppercase tracking-wide">
              Yah, belum ada promo
            </p>
            <p className="text-slate-500 text-xs mt-1">
              Silakan cek kategori lainnya buat berburu diskon!
            </p>
          </div>
        ) : (
          // TAMPILAN JIKA ADA DATA
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredSales.map((sale) => {
              const detail = sale.product_details;
              if (!detail) return null;

              const title =
                detail.title || detail.productName || detail.name || "Item";
              const origPrice = Number(detail.price || detail.sellPrice || 0);
              const flashPrice = Number(sale.flash_sale_price);

              return (
                <div
                  key={sale.id}
                  className="bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4 flex flex-col justify-between hover:border-blue-500/50 transition cursor-pointer group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="flex items-center gap-1 bg-red-500/10 text-red-500 border border-red-500/20 text-[9px] font-black uppercase px-2 py-1 rounded-md">
                        <RiFlashlightFill size={10} /> {sale.item_type}
                      </span>
                    </div>
                    <h4 className="text-white font-bold text-sm leading-tight group-hover:text-blue-400 transition line-clamp-2">
                      {title}
                    </h4>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800">
                    <p className="text-[10px] text-slate-500 line-through font-mono font-semibold">
                      RM {origPrice.toFixed(2)}
                    </p>
                    <p className="text-yellow-400 font-black text-lg font-mono">
                      RM {flashPrice.toFixed(2)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* GARIS PEMBATAS BAWAH */}
      <div className="w-full mt-8 mb-2">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-600/50 to-transparent w-full" />
      </div>
    </div>
  );
}
