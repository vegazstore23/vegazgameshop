import { QrCode, Wallet } from "lucide-react";

export default function JokiPayment({
  selectedPayment,
  setSelectedPayment,
  formatPrice,
  totalPrice,
}) {
  const methods = [
    {
      id: "qris",
      name: "QRIS (All Payment)",
      icon: <QrCode className="text-blue-400" />,
    },
    {
      id: "ewallet",
      name: "E-Wallet (OVO, DANA, GoPay)",
      icon: <Wallet className="text-blue-400" />,
    },
  ];

  return (
    <div className="bg-[#282830] rounded-2xl p-5 sm:p-6 shadow-lg border border-white/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center font-bold text-white text-sm">
          5
        </div>
        <h2 className="text-base font-bold text-white">Pilih Pembayaran</h2>
      </div>
      <div className="space-y-3">
        {methods.map((method) => (
          <div
            key={method.id}
            onClick={() => setSelectedPayment(method.id)}
            className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
              selectedPayment === method.id
                ? "bg-blue-500/10 border-blue-500"
                : "bg-[#383842]/50 border-white/5 hover:bg-[#383842]"
            }`}
          >
            <div className="flex items-center gap-3">
              {method.icon}
              <span className="text-sm font-bold text-white">
                {method.name}
              </span>
            </div>
            <span className="text-xs text-blue-400 font-bold">
              {formatPrice(totalPrice)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
