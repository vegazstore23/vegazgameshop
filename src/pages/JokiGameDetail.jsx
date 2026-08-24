import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGet } from "../services/api";
import {
  Star,
  HeadphonesIcon,
  ShoppingCart,
  ShieldCheck,
  Zap,
  MessageCircle,
  ArrowLeft,
} from "lucide-react";
import { useLangCurr } from "../components/context/LanguageCurrencyContext";

import JokiBanner from "../components/joki/JokiBanner";
import JokiDescription from "../components/joki/JokiDescription";
import JokiForm from "../components/joki/JokiForm";
import JokiPackageGrid from "../components/joki/JokiPackageGrid";
import JokiPromo from "../components/joki/JokiPromo";
import JokiPayment from "../components/joki/JokiPayment";
import JokiContact, { COUNTRY_CODES } from "../components/joki/JokiContact";
import { generateMessage, sendToChat } from "../utils/FormChat";

export default function JokiGameDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { formatPrice, lang, t } = useLangCurr();

  const step3Ref = useRef(null);
  const formRef = useRef(null);

  const [mlbbGame, setMlbbGame] = useState(null);
  const [loading, setLoading] = useState(false);
  const [waAdmin, setWaAdmin] = useState("");

  const [variants, setVariants] = useState([]);
  const [packages, setPackages] = useState([]);

  const [jokiType, setJokiType] = useState("unit");
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState("");
  const [selectedPayment, setSelectedPayment] = useState("");

  const [selectedCountry, setSelectedCountry] = useState(COUNTRY_CODES[0]);
  const [phone, setPhone] = useState("");

  const [accountData, setAccountData] = useState({
    loginType: "Moonton",
    userId: "",
    emailOrHp: "",
    password: "",
    reqHero: "",
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
      } catch (err) {}
    }
    fetchContact();
  }, []);

  useEffect(() => {
    const loadGameData = async () => {
      setLoading(true);
      try {
        const resGames = await apiGet("/api/joki/games");
        const activeGames = resGames.data || [];
        let targetGame = activeGames.find(
          (g) => g.slug === slug || g.id.toString() === slug,
        );

        if (!targetGame && activeGames.length > 0) targetGame = activeGames[0];
        if (!targetGame) {
          setLoading(false);
          return;
        }
        setMlbbGame(targetGame);

        const [resUnit, resPkg] = await Promise.all([
          apiGet(`/api/joki/variants/${targetGame.id}?type=unit`),
          apiGet(`/api/joki/variants/${targetGame.id}?type=package`),
        ]);

        setVariants(
          resUnit.data?.sort(
            (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
          ) || [],
        );
        setPackages(
          resPkg.data?.sort(
            (a, b) => (a.sort_order || 0) - (b.sort_order || 0),
          ) || [],
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) loadGameData();
  }, [slug]);

  const handleSelectItem = (item, type) => {
    setSelectedItem(item);
    setJokiType(type);

    if (type === "unit") {
      setQuantity(item.maxUnit || item.max_unit || 1);
    } else {
      setQuantity(1);
    }

    setTimeout(() => {
      step3Ref.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 150);
  };

  const totalPrice = (selectedItem?.price || 0) * quantity;
  const isFormValid =
    selectedItem &&
    accountData.userId &&
    accountData.password &&
    phone &&
    selectedPayment;

  const handleSubmitOrder = async () => {
    if (!isFormValid) {
      alert("Harap lengkapi Data Akun, Paket, Pembayaran, dan Nomor WhatsApp!");
      return;
    }

    const orderPayload = {
      gameId: mlbbGame?.id,
      gameName: mlbbGame?.name || "Mobile Legends",
      userId: accountData.userId,
      email: accountData.emailOrHp,
      password: accountData.password,
      loginType: accountData.loginType,
      notes: accountData.notes + ` (Req Hero: ${accountData.reqHero})`,
      jokiType,
      currency: lang === "ID" ? "IDR" : "MYR",
      totalPrice,
      variantId: jokiType === "unit" ? selectedItem.id : null,
      starsCount: jokiType === "unit" ? quantity : null,
      packageId: jokiType === "package" ? selectedItem.id : null,
    };

    try {
      const res = await apiGet("/api/joki/orders", orderPayload);
      if (res?.data && waAdmin) {
        const detailJoki =
          jokiType === "unit"
            ? `⭐ Per Bintang: ${selectedItem.name} (${quantity} Bintang)`
            : `📦 Paket Borongan: ${selectedItem.name}`;

        const message = generateMessage("joki", {
          gameName: orderPayload.gameName,
          jokiType: jokiType === "unit" ? "Satuan" : "Borongan",
          detailJoki: detailJoki,
          userId: orderPayload.userId,
          loginType: orderPayload.loginType,
          phone: `${selectedCountry.code}${phone}`,
          totalPrice: formatPrice(totalPrice),
          paymentMethod: selectedPayment,
        });

        sendToChat(waAdmin, message);
      }
    } catch (err) {
      alert("Gagal memproses order joki, silakan coba lagi.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#1c1c22] flex items-center justify-center font-bold text-white">
        Memuat Data Joki...
      </div>
    );

  return (
    <div className="min-h-screen pb-32 lg:pb-10 font-sans bg-[#020617] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#020617] to-[#020617]">
      <div className="w-full relative bg-[#141414]">
        <JokiBanner gameData={mlbbGame} />
      </div>

      <div className="hidden lg:block bg-white/5 border-y border-white/10 py-3 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-10 text-xs text-slate-300">
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} /> Jaminan Layanan
          </span>
          <span className="flex items-center gap-2">
            <MessageCircle size={16} /> Layanan Chat 24/7
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} /> Pembayaran Aman!
          </span>
          <span className="flex items-center gap-2">
            <Zap size={16} /> Proses Cepat & Profesional
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-10 mt-6 lg:mt-0 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* KIRI - STEPS ORDER */}
        <div className="lg:col-span-8 space-y-6">
          <div ref={formRef}>
            <JokiForm
              accountData={accountData}
              setAccountData={setAccountData}
            />
          </div>

          <div className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5">
            <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-4">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white text-sm">
                2
              </div>
              <h2 className="text-base font-bold text-white">
                Pilih Nominal / Paket Joki
              </h2>
            </div>

            {variants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-bold text-slate-300 mb-3">
                  Joki Per Bintang (Satuan)
                </h3>
                <JokiPackageGrid
                  items={variants}
                  selectedItem={selectedItem}
                  onSelect={(item) => handleSelectItem(item, "unit")}
                  formatPrice={formatPrice}
                  type="unit"
                />
              </div>
            )}

            {packages.length > 0 && (
              <div>
                <h3 className="text-sm font-bold text-slate-300 mb-3">
                  Paket Borongan (Flat Rate)
                </h3>
                <JokiPackageGrid
                  items={packages}
                  selectedItem={selectedItem}
                  onSelect={(item) => handleSelectItem(item, "package")}
                  formatPrice={formatPrice}
                  type="package"
                />
              </div>
            )}
          </div>

          <div
            ref={step3Ref}
            className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white text-sm">
                3
              </div>
              <h2 className="text-base font-bold text-white">
                Masukkan Jumlah Pembelian
              </h2>
            </div>
            <div className="flex items-center gap-3 bg-[#383842] rounded-xl p-1 w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg text-white font-bold flex items-center justify-center transition-colors"
              >
                -
              </button>
              <input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, Number(e.target.value)))
                }
                className="w-12 bg-transparent text-center text-white font-bold outline-none"
              />
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-lg text-white font-bold flex items-center justify-center transition-colors"
              >
                +
              </button>
            </div>
          </div>

          <JokiPromo promoCode={promoCode} setPromoCode={setPromoCode} />

          <JokiPayment
            selectedPayment={selectedPayment}
            setSelectedPayment={setSelectedPayment}
            formatPrice={formatPrice}
            totalPrice={totalPrice}
          />

          <JokiContact
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            phone={phone}
            setPhone={setPhone}
          />

          <JokiDescription gameData={mlbbGame} />
        </div>

        {/* KANAN - SIDEBAR SUMMARY */}
        <div className="lg:col-span-4 hidden lg:flex flex-col gap-5 sticky top-24 h-fit">
          <div className="bg-[#282830] rounded-2xl p-5 border border-white/5 flex flex-col items-center shadow-lg">
            <h3 className="text-xs text-slate-400 uppercase font-bold mb-1 w-full text-left">
              Ulasan dan rating
            </h3>
            <div className="flex items-center gap-3 my-2 w-full">
              <span className="text-4xl font-black text-white">4.99</span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-[#FACC15] fill-[#FACC15]"
                  />
                ))}
              </div>
            </div>
            <p className="text-[10px] text-slate-400 w-full">
              Berdasarkan total 136.66rb rating
            </p>
          </div>

          <div className="bg-[#282830] rounded-2xl p-5 border border-white/5 flex items-center gap-4 shadow-lg">
            <HeadphonesIcon size={24} className="text-slate-300" />
            <div>
              <p className="text-sm font-bold text-white">Butuh Bantuan?</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Kamu bisa hubungi admin disini.
              </p>
            </div>
          </div>

          <div className="bg-[#282830] rounded-2xl p-5 border border-white/5 shadow-lg flex flex-col gap-4">
            <div className="bg-[#1c1c22] rounded-xl p-4 border border-white/5">
              <p className="text-xs font-bold text-white mb-3">
                Joki Rank {mlbbGame?.name || "Mobile Legends"}
              </p>
              <p className="text-sm text-blue-400 font-black mb-4">
                {selectedItem ? selectedItem.name : "Belum memilih paket"}
              </p>

              <div className="space-y-2 text-xs border-b border-white/10 pb-3 mb-3">
                <div className="flex justify-between text-slate-300">
                  <span>Harga</span>{" "}
                  <span>{formatPrice(selectedItem?.price || 0)}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Jumlah Pembelian</span> <span>{quantity}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Biaya</span> <span>Rp 0</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-sm font-bold text-white">
                  Total Pembayaran
                </span>
                <span className="text-lg font-black text-blue-500">
                  {formatPrice(totalPrice)}
                </span>
              </div>
            </div>
            <button
              onClick={handleSubmitOrder}
              disabled={!isFormValid}
              className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} />{" "}
              {waAdmin ? "Pesan Sekarang!" : "Menyambung..."}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE CHECKOUT (Muncul di layar kecil) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#282830] border-t border-white/10 z-50 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.5)]">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <div className="flex-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase">
              Total Pembayaran
            </p>
            <p className="text-lg text-blue-500 font-black">
              {formatPrice(totalPrice)}
            </p>
          </div>
          <button
            onClick={handleSubmitOrder}
            disabled={!isFormValid}
            className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black uppercase text-sm rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ShoppingCart size={16} /> Pesan
          </button>
        </div>
      </div>
    </div>
  );
}
