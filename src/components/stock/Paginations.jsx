import { useLangCurr } from "../context/LanguageCurrencyContext";

export default function Pagination({
  totalPages,
  currentPage,
  setCurrentPage,
  onPageChangeCallback,
}) {
  const { t } = useLangCurr();

  if (totalPages <= 1) return null;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    if (onPageChangeCallback) {
      onPageChangeCallback(); 
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 mt-12 pb-10">
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded bg-white/5 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/5 transition text-xs text-white"
      >
        {t("stock", "prevPage") || "Sebelum"}
      </button>

      <div className="flex gap-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-8 h-8 rounded text-xs text-white flex items-center justify-center transition ${
                currentPage === pageNum
                  ? "bg-blue-600 shadow-lg shadow-blue-500/50 scale-110"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded bg-white/5 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/5 transition text-xs text-white"
      >
        {t("stock", "nextPage") || "Seterusnya"}
      </button>
    </div>
  );
}
