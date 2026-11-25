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

export const sendToChat = (contactValue, message, isTelegram = false) => {
  const encodedMsg = encodeURIComponent(message);

  if (isTelegram) {
    const username = contactValue.replace("@", "");
    window.open(`https://t.me/${username}`, "_blank");
  } else {
    const cleanWA = contactValue.replace(/\D/g, "");
    window.open(`https://wa.me/${cleanWA}?text=${encodedMsg}`, "_blank");
  }
};

// Helper internal untuk menghapus 'www.' dan memastikan format murni 'https://'
const cleanUrl = (rawUrl = "") => {
  if (!rawUrl) return "";
  return rawUrl.replace(/^https?:\/\/(www\.)?/, "https://");
};

export const generateMessage = (source, data = {}) => {
  switch (source) {
    case "topup":
      return (
        `Halo Admin Vegaz, saya mahu order TopUp:\n\n` +
        `🎮 Game: ${data.brandName}\n` +
        `📦 Produk: ${data.productName}\n` +
        `🆔 SERVER: ${data.userId}${data.zoneId ? ` (${data.zoneId})` : ""}\n` +
        `👤 Nickname: ${data.nickname || "-"}\n` +
        `💳 Payment: ${data.paymentMethod}\n` +
        `📞 No WASSAP: ${data.phone}\n` +
        `💰 Total: ${data.totalPrice}\n\n` +
        `Mohon instruksi pembayarannya. Terima kasih!`
      );

    case "joki":
      return (
        `Halo Admin Vegaz, saya order Joki:\n\n` +
        `🎮 Game: ${data.gameName}\n` +
        `📌 Tipe: ${data.jokiType}\n` +
        `📋 Paket: ${data.detailJoki}\n` +
        `👤 ID/Nick: ${data.userId}\n` +
        `🔑 Login Via: ${data.loginType}\n` +
        `📞 WA Kustomer: ${data.phone}\n` +
        `💰 Total: ${data.totalPrice}\n\n` +
        `Mohon proses pembayaran via ${data.paymentMethod}. Terima kasih!`
      );

    case "account_buy":
      let promoInfo = "";
      if (data.promoCode) {
        promoInfo = `\n🎟 Promo Dipakai: *${data.promoCode}*`;
      }

      let referralInfo = "";
      if (data.referral) {
        referralInfo = `\n📢 Tahu dari: *${data.referral}*`;
      }

      let refInfo = "";
      if (data.priceRefMYR) {
        refInfo = `\n🏷 Ref Stok: *${data.priceRefMYR}*`;
      }

      const formattedUrl = cleanUrl(data.url);

      return (
        `Halo Admin Vegaz, saya berminat nak beli account ini:\n\n` +
        `🚀 Unit: *${data.title}*\n` +
        `🆔 Code: *${data.code}*\n` +
        `💰 Harga: *${data.price}*${refInfo}${promoInfo}${referralInfo}\n` +
        `🔗 Link: ${formattedUrl}\n\n` +
        `Adakah masih tersedia dan nak detail pembayaran?`
      );

    case "general_buy":
      return (
        `Halo Admin VegazGameShop,\n\nSaya ingin membeli akun:\n` +
        `*Produk:* ${data.title}\n` +
        `*Harga:* ${data.price}\n\n` +
        `Apakah stok ini masih tersedia?`
      );

    case "account_sell":
      return (
        `Halo Admin VegazGameShop,\n\nSaya ingin menjual akun:\n` +
        `*Nickname:* ${data.nickname || "-"}\n` +
        `*Rank:* ${data.rank || "-"}\n` +
        `*Total Skin:* ${data.skinCount || "-"}\n` +
        `*Harga:* Rp ${data.askingPrice || "-"}`
      );

    default:
      return `Halo Admin, saya butuh bantuan terkait layanan VegazGameShop.`;
  }
};

export const handleWhatsAppChat = async (targetRole, type, data = {}) => {
  const contact = await getContactByRole(targetRole);

  if (!contact) {
    alert("Kontak admin tidak tersedia saat ini.");
    return;
  }

  const isWhatsapp = contact.type === "whatsapp";

  let source = "default";
  if (type === "beli") source = "general_buy";
  if (type === "jual") source = "account_sell";

  const payload = {
    title: data.title || data.name,
    price: data.price ? `Rp ${data.price.toLocaleString("id-ID")}` : "-",
    ...data,
  };

  const message = generateMessage(source, payload);
  sendToChat(contact.value, message, !isWhatsapp);
};
