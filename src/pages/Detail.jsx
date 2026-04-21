import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../services/api";

// Pastikan import komponen baru ini benar path-nya
import DetailNavigation from "../components/detail/DetailNavigation";
import DetailGallery from "../components/detail/DetailGallery";
import DetailInfo from "../components/detail/DetailInfo";
import BottomPriceBar from "../components/detail/BottomPriceBar";

// Import Background Aset (Sesuaikan path dengan Stock.jsx kamu)
import mainBg from "../assets/background/background.webp";
import bgAkun from "../assets/background/bg-akun.webp";

const Detail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  // HAPUS: currentIndex dan setCurrentIndex (Sudah di-handle Swiper)
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
    // WAJIB: Agar saat buka detail, layar otomatis di paling atas
    window.scrollTo(0, 0);
  }, [id]);

  if (!account)
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center gap-4">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-blue-400 font-black tracking-[0.3em] text-xs uppercase animate-pulse">
          Synchronizing Data...
        </span>
      </div>
    );

  // Gabungkan Thumbnail Utama dan Gallery Images
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
      {/* MAIN WRAPPER
        pt-32: Ngasih ruang buat HEADER yang fixed biar ga nabrak navigasi.
        pb-40: Ngasih ruang di bawah buat BOTTOM BAR biar ga nempel konten.
        backdrop-blur-sm: Efek blur tipis pada background utama.
      */}
      <main
        className="pt-32 pb-40 min-h-screen bg-black/60 backdrop-blur-sm border-x border-white/5"
        style={{
          backgroundImage: `url(${bgAkun})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* CONTAINER UTAMA: Pembatas lebar konten agar rapi di tengah */}
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          {/* Section 1: Navigasi (Back, Home, Share) */}
          <div className="mb-8 animate-in fade-in slide-in-from-top duration-500">
            <DetailNavigation />
          </div>

          {/* Section 2: Grid Konten (Gallery & Info) */}
          <section className="grid lg:grid-cols-12 gap-8 md:gap-10">
            {/* Kolom Kiri: Gallery (Lebih Lebar) */}
            <div className="lg:col-span-7 animate-in fade-in slide-in-from-left duration-700 delay-100">
              <DetailGallery images={images} status={account.status} />
            </div>

            {/* Kolom Kanan: Info (Lebih Ramping) */}
            <div className="lg:col-span-5 animate-in fade-in slide-in-from-right duration-700 delay-200">
              <DetailInfo
                account={account}
                isDescOpen={isDescOpen}
                setIsDescOpen={setIsDescOpen}
              />
            </div>
          </section>
        </div>
      </main>

      {/* FIXED COMPONENT: Bottom Price Bar */}
      <BottomPriceBar account={account} />
    </div>
  );
};

export default Detail;
