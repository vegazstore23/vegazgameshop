import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet} from "../services/api";
import {
  Coins,
  Layers,
  ToggleLeft,
  ToggleRight,
  ShoppingCart,
} from "lucide-react";

import JokiBanner from "../components/joki/JokiBanner";
import JokiDescription from "../components/joki/JokiDescription";
import JokiForm from "../components/joki/JokiForm";
import JokiCalculator from "../components/joki/JokiCalculator";

export default function Joki() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const formRef = useRef(null);
  const catalogRef = useRef(null);

  const [mlbbGame, setMlbbGame] = useState(null);
  const [jokiType, setJokiType] = useState("unit");
  const [loading, setLoading] = useState(false);
  const [isValidSlug, setIsValidSlug] = useState(true);

  const [currency, setCurrency] = useState("MYR");
  const [exchangeRate, setExchangeRate] = useState(3200);

  const [variants, setVariants] = useState([]);
  const [startRankIdx, setStartRankIdx] = useState(0);
  const [totalStarsOrdered, setTotalStarsOrdered] = useState(5);
  const [minOrderRequired, setMinOrderRequired] = useState(5);

  const [selectedPkg, setSelectedPkg] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [waAdmin, setWaAdmin] = useState("");

  const [accountData, setAccountData] = useState({
    userId: "",
    password: "",
    loginType: "Moonton",
    notes: "",
  });

  useEffect(() => {
    async function fetchContact() {
      try {
        const res = await apiGet("/api/contact");
        const admin = res.data?.find(
          (c) => c.isActive && c.roles?.includes("order"),
        );
        if (admin) setWaAdmin(admin.value);
      } catch (err) {
        console.error(err);
      }
    }
    fetchContact();
  }, []);

  useEffect(() => {
    async function loadRate() {
      try {
        const res = await apiGet("/admin/topup/exchange-rate");
        if (res?.data?.myr) setExchangeRate(Number(res.data.myr));
      } catch (err) {
        console.error(err);
      }
    }
    loadRate();
  }, []);

  useEffect(() => {
    const loadMlbbBySlug = async () => {
      setLoading(true);
      try {
        const res = await apiGet("/joki/games/all");
        const activeGames = res.data || [];

        let targetGame = activeGames.find(
          (g) =>
            g.slug === slug ||
            slug === "joki-mlbb" ||
            g.slug?.toLowerCase().includes("mlbb"),
        );

        if (!targetGame && activeGames.length > 0) targetGame = activeGames[0];
        if (!targetGame) {
          setIsValidSlug(false);
          setLoading(false);
          return;
        }

        setMlbbGame(targetGame);
        setIsValidSlug(true);

        const resVar = await apiGet(
          `/joki/variants/${targetGame.id}?type=unit`,
        );
        let fetchedVariants = resVar.data || [];

        const sortedVariants = fetchedVariants.sort(
          (a, b) =>
            (a.sortOrder || a.sort_order || 0) -
            (b.sortOrder || b.sort_order || 0),
        );

        setVariants(sortedVariants);

        if (sortedVariants.length > 0) {
          const adminMinOrder =
            Number(sortedVariants[0]?.maxUnit || sortedVariants[0]?.max_unit) ||
            5;
          setMinOrderRequired(adminMinOrder);
          setTotalStarsOrdered(adminMinOrder);
        }
        setStartRankIdx(0);
      } catch (err) {
        setIsValidSlug(false);
      } finally {
        setLoading(false);
      }
    };
    if (slug) loadMlbbBySlug();
  }, [slug]);

  useEffect(() => {
    if (jokiType === "package") {
      setTotalPrice(selectedPkg ? Number(selectedPkg.price) : 0);
      return;
    }
    if (!variants || variants.length === 0 || !variants[startRankIdx]) {
      setTotalPrice(0);
      return;
    }
    const currentPricePerStar = Number(variants[startRankIdx].price) || 0;
    setTotalPrice(totalStarsOrdered * currentPricePerStar);
  }, [jokiType, startRankIdx, totalStarsOrdered, variants, selectedPkg]);

  const formatCurrency = (amountInIDR) => {
    if (currency === "MYR") {
      return `RM ${(Number(amountInIDR) / exchangeRate).toLocaleString("ms-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `Rp ${Number(amountInIDR).toLocaleString("id-ID")}`;
  };

  const handleSubmitOrder = async () => {
    if (!accountData.userId.trim() || !accountData.password.trim()) {
      alert("Harap lengkapi User ID dan Password Akun Anda!");
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (jokiType === "package" && !selectedPkg) {
      alert("Harap pilih salah satu Paket Joki Borongan!");
      catalogRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      return;
    }

    const orderPayload = {
      gameId: mlbbGame?.id,
      gameName: mlbbGame?.name || "Mobile Legends",
      userId: accountData.userId,
      password: accountData.password,
      loginType: accountData.loginType,
      notes: accountData.notes,
      jokiType: jokiType,
      currency: currency,
      totalPrice: totalPrice,
      variantId: jokiType === "unit" ? variants[startRankIdx]?.id : null,
      starsCount: jokiType === "unit" ? totalStarsOrdered : null,
      packageId: jokiType === "package" ? selectedPkg?.id : null,
    };

    try {
      const res = await apiGet("/api/joki/orders", orderPayload);

      if (res?.data) {
        alert("Pesanan joki berhasil dibuat! Menghubungkan ke WhatsApp...");
        if (waAdmin) {
          const cleanWA = waAdmin.replace(/\D/g, "");
          const detailJoki =
            jokiType === "unit"
              ? `⭐ Per Bintang: ${variants[startRankIdx]?.name} (${totalStarsOrdered} Bintang)`
              : `📦 Paket Borongan: ${selectedPkg?.name}`;

          const message = `Halo Admin Vegaz, saya telah membuat order joki baru:\n\n🎮 Game: ${orderPayload.gameName}\n📌 Metode: ${jokiType === "unit" ? "Satuan (Bintang)" : "Borongan"}\n📋 Detail: ${detailJoki}\n👤 ID Login: ${orderPayload.userId} (${orderPayload.loginType})\n💰 Total Bayar: ${formatCurrency(totalPrice)}\n\nMohon segera diproses, terima kasih!`;

          window.open(
            `https://wa.me/${cleanWA}?text=${encodeURIComponent(message)}`,
            "_blank",
          );
        } else {
          alert(
            "Pesanan tersimpan, namun nomor WhatsApp admin tidak ditemukan.",
          );
        }
      }
    } catch (err) {
      console.error("Error pas submit order joki:", err);
      alert("Gagal memproses order joki, silakan coba lagi.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center font-bold">
        Connecting Vegaz Database...
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-950 text-white pb-16">
      <div className="w-full relative bg-slate-900 border-b border-slate-800">
        <JokiBanner gameData={mlbbGame} />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="flex justify-end mb-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-2 flex items-center gap-3 shadow-xl">
            <span
              className={`text-xs font-black ${currency === "MYR" ? "text-cyan-400" : "text-slate-500"}`}
            >
              🇲🇾 RM (MYR)
            </span>
            <button
              type="button"
              onClick={() =>
                setCurrency((prev) => (prev === "MYR" ? "IDR" : "MYR"))
              }
            >
              {currency === "MYR" ? (
                <ToggleLeft size={36} className="text-blue-500" />
              ) : (
                <ToggleRight size={36} className="text-emerald-500" />
              )}
            </button>
            <span
              className={`text-xs font-black ${currency === "IDR" ? "text-emerald-400" : "text-slate-500"}`}
            >
              🇮🇩 Rp (IDR)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div ref={formRef}>
              <JokiForm
                accountData={accountData}
                setAccountData={setAccountData}
              />
            </div>

            <div ref={catalogRef} className="space-y-6">
              <div className="flex items-center gap-3 px-2 mb-2">
                <div className="w-7 h-7 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center text-blue-400 font-black text-sm">
                  2
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-white">
                  Pilih Katalog Varian Rank & Paket Joki
                </h3>
              </div>

              <JokiCalculator
                jokiType={jokiType}
                setJokiType={setJokiType}
                gameId={mlbbGame?.id || 1}
                variants={variants}
                startRankIdx={startRankIdx}
                setStartRankIdx={setStartRankIdx}
                totalStarsOrdered={totalStarsOrdered}
                setTotalStarsOrdered={setTotalStarsOrdered}
                minOrderRequired={minOrderRequired}
                selectedPkg={selectedPkg}
                setSelectedPkg={setSelectedPkg}
                formatCurrency={formatCurrency}
              />
            </div>
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-24 space-y-6">
            <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
              <h3 className="text-sm font-black uppercase tracking-wider text-white border-b border-slate-800 pb-3">
                Ringkasan Invoice
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Kategori Game</span>
                  <span className="text-white font-medium">
                    {mlbbGame?.name || "Mobile Legends"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Metode Joki</span>
                  <span
                    className={`font-black uppercase ${jokiType === "unit" ? "text-blue-400" : "text-purple-400"}`}
                  >
                    {jokiType === "unit"
                      ? "Per Bintang (Satuan)"
                      : "Borongan (Flat Rate)"}
                  </span>
                </div>

                {jokiType === "unit" ? (
                  variants[startRankIdx] && (
                    <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 mt-2 flex justify-between">
                      <span className="text-slate-400">Target Varian</span>
                      <span className="text-blue-400 font-bold">
                        {variants[startRankIdx]?.name} x{totalStarsOrdered} ★
                      </span>
                    </div>
                  )
                ) : selectedPkg ? (
                  <div className="bg-purple-950/40 border border-purple-900/30 p-3 rounded-xl mt-2 text-center">
                    <p className="text-[10px] text-slate-500 uppercase font-bold">
                      Paket Terpilih
                    </p>
                    <p className="text-purple-400 font-black mt-0.5">
                      {selectedPkg.name}
                    </p>
                  </div>
                ) : (
                  <div className="text-xs text-amber-500 bg-amber-500/5 p-3 border border-amber-500/10 rounded-xl text-center">
                    Belum ada paket borongan dipilih.
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-between items-end">
                <span className="text-xs text-slate-500 font-bold uppercase">
                  Total Bayar
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {formatCurrency(totalPrice)}
                </span>
              </div>

              <button
                type="button"
                onClick={handleSubmitOrder}
                disabled={!waAdmin}
                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3.5 rounded-xl text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <ShoppingCart size={16} />{" "}
                {waAdmin ? "ORDER SEKARANG" : "SEDANG MENYAMBUNG..."}
              </button>
            </div>

            <JokiDescription gameData={mlbbGame} />
          </div>
        </div>
      </div>
    </div>
  );
}
