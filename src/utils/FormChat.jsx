import { apiGet } from "../services/api";


export const getContactByRole = async (targetRole) => {
  try {
    const res = await apiGet("/api/contact");
    if (res?.success && Array.isArray(res.data)) {

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

export const handleWhatsAppChat = async (targetRole, type, data = {}) => {
  const contact = await getContactByRole(targetRole);

  if (!contact) {
    alert("Kontak admin tidak tersedia saat ini.");
    return;
  }

  const targetValue = contact.value;
  const isWhatsapp = contact.type === "whatsapp";

  let message = "";

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
    const username = targetValue.replace("@", "");
    window.open(`https://t.me/${username}`, "_blank");
  }
};
