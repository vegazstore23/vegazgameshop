
const ADMIN_WA = "6285175122132";

/**
 * Generate Link WA untuk Pembelian Akun
 * @param {Object} acc - Data objek akun dari database
 */
export const getWaBeliAkun = (acc) => {
  if (!acc) return `https://wa.me/${ADMIN_WA}`;

  // Kalkulasi harga ke IDR seperti di komponen
  const priceIDR = (acc.price * 4100).toLocaleString("id-ID");

  // Format pesan (gunakan \n untuk enter/baris baru)
  const text = `Halo Admin Vegazgameshop! 👋\n\nSaya tertarik untuk membeli akun ini:\n*Kode Akun:* ${acc.code}\n*Judul:* ${acc.title}\n*Harga:* Rp ${priceIDR}\n\nApakah akun ini masih tersedia untuk dibeli?`;

  // encodeURIComponent wajib digunakan agar spasi dan enter terbaca sempurna di URL WA
  return `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;
};

/**
 * Generate Link WA untuk Jual/Titip Akun
 */
export const getWaJualAkun = () => {
  const text = `Halo Admin Vegazgameshop! 👋\n\nSaya ingin menawarkan / menjual akun MLBB saya. Boleh minta informasi syarat dan ketentuannya?`;

  return `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;
};

/**
 * Generate Link WA untuk CS / Pertanyaan Umum
 */
export const getWaTanyaCS = () => {
  const text = `Halo Admin Vegazgameshop! 👋\n\nSaya ada beberapa pertanyaan nih, boleh dibantu?`;

  return `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;
};
