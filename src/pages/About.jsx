import { useState, useEffect } from "react";

const ABOUT_DATA_URL = "/assets/data/about.json";

export default function About() {
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("about");
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    fetch(ABOUT_DATA_URL)
      .then((r) => r.json())
      .then((res) => setData(res?.data || res))
      .catch((err) => console.error("About load error:", err));
  }, []);

  const tabs = [
    { id: "about", label: "About" },
    { id: "faq", label: "FAQ" },
    { id: "syarat", label: "Syarat & Ketentuan" },
    { id: "kebijakan", label: "Dasar Privasi" },
  ];

  return (
    <div className="min-h-screen pt-24 md:pt-28 lg:pt-32 pb-20 bg-[url('/assets/background/bg-stripe.webp')] bg-center bg-cover">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-white text-3xl font-bold text-center mb-8 uppercase tracking-widest font-orbitron">
          About / FAQ
        </h1>

        {/* TABS */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold border transition ${
                activeTab === tab.id
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-blue-500/30 text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-blue-900/40 backdrop-blur-md border border-blue-500/20 p-6 rounded-2xl shadow-xl text-white">
          {!data && (
            <p className="text-gray-400 text-center animate-pulse">
              Loading...
            </p>
          )}

          {/* ABOUT */}
          {data && activeTab === "about" && (
            <div className="space-y-4">
              {data.about?.map((text, i) => (
                <p key={i} className="text-gray-200 leading-relaxed">
                  {text}
                </p>
              ))}
              {data.info?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-6">
                  {data.info.map((item, i) => (
                    <div
                      key={i}
                      className="bg-white/5 border border-white/10 p-4 rounded-xl text-center"
                    >
                      <span className="text-[10px] font-bold text-blue-400 uppercase block mb-1">
                        Update
                      </span>
                      <p className="text-xs font-semibold text-gray-200">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* FAQ */}
          {data && activeTab === "faq" && (
            <div className="space-y-3">
              {data.faq?.map((item, i) => (
                <div
                  key={i}
                  className="border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex justify-between items-center p-4 bg-white/5 hover:bg-white/10 transition text-left"
                  >
                    <span className="font-semibold text-sm md:text-base text-white">
                      {item.q}
                    </span>
                    <span
                      className={`transition-transform duration-300 text-blue-400 ${openFaq === i ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>
                  {openFaq === i && (
                    <div className="p-4 text-gray-300 text-sm border-t border-white/10 bg-white/5">
                      {item.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* SYARAT */}
          {data && activeTab === "syarat" && (
            <div>
              <h3 className="font-bold text-blue-400 mb-4 flex items-center gap-2">
                📋 Terma & Syarat Penggunaan
              </h3>
              <ul className="space-y-3">
                {data.syarat?.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-200"
                  >
                    <span className="text-blue-400 mt-1">✔</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* KEBIJAKAN */}
          {data && activeTab === "kebijakan" && (
            <div>
              <h3 className="font-bold text-blue-400 mb-4 flex items-center gap-2">
                🛡 Dasar Privasi & Data
              </h3>
              <div className="grid gap-3">
                {data.kebijakan?.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 bg-blue-500/10 rounded-lg border-l-4 border-blue-400 text-xs text-gray-200 leading-relaxed"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
