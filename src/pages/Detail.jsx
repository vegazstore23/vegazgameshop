import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../services/api";

import DetailNavigation from "../components/detail/DetailNavigation";
import DetailGallery from "../components/detail/DetailGallery";
import DetailInfo from "../components/detail/DetailInfo";
import BottomPriceBar from "../components/detail/BottomPriceBar";
import TutorBeli from "../components/detail/DetailTutor";

import mainBg from "../assets/background/background.webp";
import bgAkun from "../assets/background/bg-akun.webp";

const Detail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
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
    window.scrollTo(0, 0);

    document.title = "Loading... | VegazGameShop";
  }, [id]);

  useEffect(() => {
    if (account) {
      document.title = `${
        account.title || account.name || "Detail Account"
      } | VegazGameShop`;
    }
  }, [account]);

  if (!account) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-400 font-black tracking-[0.3em] text-xs uppercase animate-pulse">
          Memuatkan Data...
        </span>
      </div>
    );
  }

  const images = [];
  if (account.image) images.push(account.image);
  if (account.AccountImages) {
    account.AccountImages.forEach((img) => images.push(img.image));
  }

  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      <main
        className="min-h-screen bg-black/60 backdrop-blur-sm border-x border-white/5"
        style={{
          backgroundImage: `url(${bgAkun})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          paddingTop: "var(--header-height, 5rem)",
          paddingBottom: "9rem",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
          <div className="mb-6 animate-in fade-in slide-in-from-top duration-500">
            <DetailNavigation />
          </div>

          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 lg:gap-10">
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-left duration-700 delay-100">
              <DetailGallery images={images} status={account.status} />
            </div>

            <div className="lg:col-span-5 animate-in fade-in slide-in-from-right duration-700 delay-200">
              <DetailInfo
                account={account}
                isDescOpen={isDescOpen}
                setIsDescOpen={setIsDescOpen}
              />
            </div>
          </section>

          <div className="border-t border-white/5">
            <TutorBeli />
          </div>
        </div>
      </main>

      <BottomPriceBar account={account} />
    </div>
  );
};

export default Detail;
