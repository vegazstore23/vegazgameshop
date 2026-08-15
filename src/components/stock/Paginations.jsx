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
    <div className="flex justify-center items-center gap-1.5 md:gap-2 mt-8 md:mt-12 pb-6 md:pb-10">
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/5 transition text-xs text-white active:scale-95"
      >
        {t("stock", "prevPage") || "Sebelum"}
      </button>

      <div className="flex gap-1 md:gap-2 max-w-[200px] sm:max-w-none overflow-x-auto py-1 scrollbar-none">
        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1;
          return (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`w-7 h-7 md:w-8 md:h-8 rounded-lg text-xs font-bold text-white flex-shrink-0 flex items-center justify-center transition active:scale-95 ${
                currentPage === pageNum
                  ? "bg-blue-600 shadow-lg shadow-blue-500/50 scale-105"
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
        className="px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-blue-600 disabled:opacity-30 disabled:hover:bg-white/5 transition text-xs text-white active:scale-95"
      >
        {t("stock", "nextPage") || "Seterusnya"}
      </button>
    </div>
  );
}
