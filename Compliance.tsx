
import React from 'react';
import { Sale } from '../types';

interface ComplianceProps {
  sales: Sale[];
}

const Compliance: React.FC<ComplianceProps> = ({ sales }) => {
  const exportToCSV = () => {
    if (sales.length === 0) return alert("No sales data to export.");

    const headers = ["Sale ID", "Date", "Time", "Items", "Total Amount", "Payment Method"];
    const rows = sales.map(s => [
      s.id.slice(0, 8),
      new Date(s.timestamp).toLocaleDateString(),
      new Date(s.timestamp).toLocaleTimeString(),
      s.items.map(i => `${i.productName} (x${i.quantity})`).join("; "),
      s.totalAmount,
      s.paymentMethod
    ]);

    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Royale_Sales_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-[#3E4A34]">Records & Reports</h2>
      
      <div className="bg-white p-6 rounded-3xl border border-[#E5E1D8] shadow-sm">
        <h3 className="text-sm font-bold text-[#3E4A34] mb-2">Accountant Friendly Exports</h3>
        <p className="text-xs text-[#7C8B71] leading-relaxed mb-6">
          Download your sales history in CSV format compatible with Microsoft Excel, Google Sheets, and standard accounting software.
        </p>
        
        <button 
          onClick={exportToCSV}
          className="w-full bg-[#3E4A34] text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg active:scale-95 transition-all"
        >
          <span>📥</span> Download Sales (CSV)
        </button>
      </div>

      <div className="space-y-4">
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#A09E97]">Recent History</h3>
        {sales.length === 0 ? (
          <p className="text-center py-10 text-sm italic text-[#A09E97]">No sales recorded yet.</p>
        ) : (
          <div className="bg-white rounded-2xl border border-[#E5E1D8] overflow-hidden">
            <div className="max-h-[300px] overflow-y-auto">
              {sales.slice().reverse().map((sale, idx) => (
                <div key={sale.id} className={`p-4 flex justify-between items-center ${idx !== sales.length - 1 ? 'border-b border-[#F4F1EA]' : ''}`}>
                  <div>
                    <p className="text-xs font-bold">UGX {sale.totalAmount.toLocaleString()}</p>
                    <p className="text-[10px] text-[#7C8B71]">
                      {new Date(sale.timestamp).toLocaleDateString()} • {sale.paymentMethod.replace('_', ' ')}
                    </p>
                  </div>
                  <div className="text-[10px] text-[#A09E97] font-mono">
                    #{sale.id.slice(0, 8)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compliance;
