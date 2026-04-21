import { apiGet } from "../services/api";

/**
 * Mengambil data kontak dari backend dan mencari value berdasarkan role
 * @param {string} targetRole - 'order', 'jual', 'cs', 'topup', atau 'midman'
 */
export const getContactByRole = async (targetRole) => {
  try {
    const res = await apiGet("/api/contact");
    if (res?.success && Array.isArray(res.data)) {
      // Mencari item yang array roles-nya mengandung targetRole
      const contact = res.data.find(
        (item) => item.isActive && item.roles.includes(targetRole),
      );
      return contact ? contact : null;
    }
    return null;
  } catch (err) {
    console.error("Gagal mengambil kontak:", err);
    return null;
  }
};

/**
 * Handler utama untuk redirect chat
 */
export const handleWhatsAppChat = async (targetRole, type, data = {}) => {
  const contact = await getContactByRole(targetRole);

  if (!contact) {
    alert("Kontak admin tidak tersedia saat ini.");
    return;
  }

  const targetValue = contact.value; // Bisa nomor WA (6011...) atau username (@vegaz69)
  const isWhatsapp = contact.type === "whatsapp";

  let message = "";

  // Template Pesan
  switch (type) {
    case "beli":
      message = `Halo Admin VegazGameShop,\n\nSaya ingin membeli akun:\n*Produk:* ${data.title || data.name}\n*Harga:* Rp ${data.price?.toLocaleString("id-ID")}\n\nApakah stok ini masih tersedia?`;
      break;
    case "jual":
      message = `Halo Admin VegazGameShop,\n\nSaya ingin menjual akun:\n*Nickname:* ${data.nickname || "-"}\n*Rank:* ${data.rank || "-"}\n*Total Skin:* ${data.skinCount || "-"}\n*Harga:* Rp ${data.askingPrice || "-"}`;
      break;
    default:
      message = `Halo Admin, saya butuh bantuan terkait layanan VegazGameShop.`;
  }

  const encodedMsg = encodeURIComponent(message);

  if (isWhatsapp) {
    window.open(`https://wa.me/${targetValue}?text=${encodedMsg}`, "_blank");
  } else {
    // Jika Telegram (seperti role 'cs' di gambar)
    const username = targetValue.replace("@", "");
    window.open(`https://t.me/${username}`, "_blank");
  }
};
