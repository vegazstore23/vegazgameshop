import { Link } from "react-router-dom";
import { ArrowLeft, Home, Share2 } from "lucide-react";

export default function DetailNavigation() {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Vegaz Game Shop",
        url: window.location.href,
      });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-4 mb-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Back Button with Advanced Hover */}
          <Link
            to="/stock"
            className="group relative flex items-center gap-3 bg-[#0d2147]/60 hover:bg-blue-600/30 px-6 py-3 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-xl shadow-xl active:scale-90"
          >
            <ArrowLeft
              size={20}
              className="text-blue-400 group-hover:-translate-x-1.5 transition-transform duration-300"
            />
            <div className="flex flex-col">
              <span className="text-[9px] text-blue-300 font-black uppercase tracking-[0.2em] leading-none mb-1">
                Return to
              </span>
              <span className="text-white font-black text-xs uppercase tracking-tight">
                Marketplace
              </span>
            </div>
          </Link>

          {/* Quick Home Icon */}
          <Link
            to="/"
            className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 transition-all duration-300 text-gray-400 hover:text-white active:scale-90 flex items-center justify-center"
            title="Home"
          >
            <Home size={20} />
          </Link>
        </div>

        {/* Share Button Mobile Friendly */}
        <button
          onClick={handleShare}
          className="p-4 bg-white/5 hover:bg-blue-500/20 rounded-2xl border border-white/10 transition-all text-blue-400 active:scale-90"
        >
          <Share2 size={20} />
        </button>
      </div>
    </section>
  );
}
