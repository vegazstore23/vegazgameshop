import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SocialIcon({ type }) {
  switch (type?.toLowerCase()) {
    case "instagram":
    case "ig":
      return (
        <svg
          className="w-4 h-4 text-pink-500 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm5 5a5 5 0 110 10 5 5 0 010-10zm6.5-.9a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
        </svg>
      );
    case "whatsapp":
    case "wa":
      return (
        <svg
          className="w-4 h-4 text-green-500 shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.148-.67-1.611-.918-2.21-.242-.584-.488-.505-.67-.514-.173-.008-.372-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.937 3.659 1.432 5.628 1.433h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg
          className="w-4 h-4 text-white shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.59-1.01V14.5c.01 2.44-.92 4.91-2.84 6.46-1.92 1.54-4.66 1.83-6.86 1.06-2.2-.77-3.91-2.81-4.23-5.11-.32-2.3.65-4.75 2.54-6.16 1.89-1.41 4.54-1.61 6.61-.73V14.1c-1.11-.53-2.52-.45-3.52.33-.99.78-1.29 2.19-.77 3.32.52 1.13 1.91 1.69 3.09 1.34 1.17-.35 1.91-1.6 1.89-2.81V0h.02z" />
        </svg>
      );
    case "discord":
      return (
        <svg
          className="w-4 h-4 text-[#5865F2] shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 11.721 11.721 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.052-.102.001-.226-.112-.269a13.194 13.194 0 0 1-1.873-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.291a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.196.373.291a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.874.892.077.077 0 0 0-.11.269c.352.699.764 1.365 1.226 1.994a.078.078 0 0 0 .084.028 19.83 19.83 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z" />
        </svg>
      );
    case "telegram":
      return (
        <svg
          className="w-4 h-4 text-[#26A5E4] shrink-0"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M11.944 0C5.346 0 0 5.346 0 11.944c0 6.598 5.346 11.944 11.944 11.944 6.598 0 11.944-5.346 11.944-11.944C23.888 5.346 18.542 0 11.944 0zm5.206 8.19c-.164 1.711-1.547 9.584-1.749 10.634-.147.773-.438 1.033-.713 1.058-.598.056-1.052-.392-1.632-.772-.907-.594-1.419-.963-2.298-1.542-1.015-.67-.357-1.038.222-1.638.152-.157 2.788-2.557 2.839-2.772.006-.028.012-.131-.05-.187-.063-.055-.155-.036-.223-.021-.096.022-1.623 1.032-4.581 3.031-.433.298-.826.444-1.178.434-.386-.01-1.127-.221-1.678-.4-.676-.22-1.214-.338-1.167-.714.024-.196.293-.398.807-.607 3.166-1.378 5.276-2.289 6.327-2.633 3.007-1.002 3.633-1.177 4.04-1.184.09 0 .29.022.42.128.11.088.14.207.155.297.01.07.02.24 0 .4z" />
        </svg>
      );
    default:
      return <span className="text-sm shrink-0">🔗</span>;
  }
}

export default function Footer() {
  const [shop, setShop] = useState({
    name: "VEGAZGAMESHOP",
    description:
      "VegazGameShop - Platform Nombor 1 Asia untuk Membeli dan Menjual Akaun Permainan Popular.",
    footerText: "",
  });
  const [socials, setSocials] = useState([]);
  const [services, setServices] = useState([]);
  const [sellHref, setSellHref] = useState("#");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://apivgz.vegazgameshop.com/api/public/app-config");
        const json = await res.json();

        /* Shop settings */
        const shopData = json?.data?.shop ?? {};
        setShop({
          name: shopData.name ?? "VEGAZGAMESHOP",
          description: shopData.description ?? "",
          footerText: shopData.footerText ?? "",
        });

        /* Contacts — single array, filtered client-side */
        const contacts = json?.data?.contacts ?? [];

        // Social links: category === "social"
        setSocials(contacts.filter((c) => c.category === "social"));

        // Customer service: category === "contact" AND roles includes "service"
        setServices(
          contacts.filter(
            (c) =>
              c.category === "contact" &&
              Array.isArray(c.roles) &&
              c.roles.includes("service"),
          ),
        );

        // Jual akun button: roles includes "order"
        const orderContact = contacts.find(
          (c) => Array.isArray(c.roles) && c.roles.includes("order"),
        );
        if (orderContact) {
          const phone = orderContact.value.replace(/\D/g, "");
          setSellHref(
            `https://wa.me/${phone}?text=Halo%20Vegaz,%20saya%20ingin%20jual%20account%20game`,
          );
        }
      } catch (err) {
        console.error("Footer: failed to fetch app-config", err);
      }
    }
    load();
  }, []);

  return (
    <footer className="relative text-gray-300 pt-20 pb-10 overflow-hidden bg-[#0d1b4b]">
      {/* ── Layered background ───────────────────── */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1535] via-[#0d1b4b] to-[#091230]" />
        <div className="absolute -top-40 left-[-10%] w-[140%] h-[300px] bg-emerald-500/20 blur-[120px] rotate-[-4deg]" />
        <div className="absolute -bottom-40 right-[-10%] w-[140%] h-[300px] bg-blue-500/15 blur-[120px] rotate-[4deg]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* ── 5-column grid ───────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <img
                src="/assets/logo/vegazgameshop.png"
                className="h-7 md:h-8"
                alt="VegazGameShop"
              />
            </Link>
            <p className="text-xs md:text-sm text-gray-400 leading-relaxed max-w-xs">
              {shop.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs md:text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              {[
                { to: "/", label: "Home" },
                { to: "/stock", label: "Stock" },
                { to: "/topup", label: "Top Up" },
                { to: "/calculator", label: "Calculator" },
                { to: "/about", label: "About / FAQ" },
                { to: "/#contactWrapper", label: "Contact" },
              ].map(({ to, label }) => (
                <li key={label}>
                  <Link to={to} className="hover:text-blue-400 transition">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs md:text-sm uppercase tracking-wider">
              Social Media
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              {socials.length === 0 && (
                <li className="text-gray-600 italic">—</li>
              )}
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.value}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-blue-400 break-all"
                  >
                    <SocialIcon type={s.type} />
                    <span className="truncate max-w-[140px]">
                      {s.label || s.value}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-xs md:text-sm uppercase tracking-wider">
              Customer Service
            </h4>
            <ul className="space-y-2 text-xs md:text-sm">
              {services.length === 0 && (
                <li className="text-gray-600 italic">—</li>
              )}
              {services.map((c) => (
                <li key={c.id}>
                  <a
                    href={`https://wa.me/${c.value.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 hover:text-green-400"
                  >
                    <span className="text-green-400 shrink-0">💬</span>
                    <span>{c.label || c.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Jual Akun CTA */}
          <div className="col-span-2 md:col-span-1">
            <a
              href={sellHref}
              target="_blank"
              rel="noreferrer"
              className="block bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-5 text-white shadow-lg hover:scale-[1.02] transition"
            >
              <div className="font-bold text-sm md:text-lg uppercase">
                JUAL AKUN
              </div>
              <div className="text-[11px] md:text-sm opacity-90 italic">
                Vegaz menerima jual urgent
              </div>
            </a>
          </div>
        </div>

        {/* ── Bottom copyright ─────────────────────── */}
        <div className="border-t border-white/10 mt-14 pt-6 text-center text-xs md:text-sm text-gray-500">
          © {new Date().getFullYear()} {shop.name}. All rights reserved.
          {shop.footerText && (
            <span className="block mt-1 opacity-70">{shop.footerText}</span>
          )}
        </div>
      </div>
    </footer>
  );
}
