import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ArrowDownCircle, ArrowUpCircle } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const TransactionModal = ({ user, onClose, onSuccess }) => {
  const { postTransaction } = useAdmin();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: "Deposit",
    amount: "",
    remark: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.amount || Number(formData.amount) <= 0) {
      toast.error("Please enter a valid amount greater than 0");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        userId: user.userId,
        type: formData.type,
        amount: Number(formData.amount),
        remark: formData.remark,
      };

      const result = await postTransaction(payload);

      if (result.success) {
        toast.success(result.message || "Transaction posted successfully");
        onSuccess();
        onClose();
      } else {
        toast.error(result.message || "Transaction failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* User Summary */}
      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Posting to</p>
          <p className="font-semibold text-slate-800">{user.fullName}</p>
          <p className="text-xs text-slate-500 font-mono mt-0.5">{user.accountNumber || user.userId}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-500">Current Balance</p>
          <p className="font-bold text-[#004c8f] text-lg">${user.currentBalance?.toLocaleString() || "0"}</p>
        </div>
      </div>

      {/* Transaction Type */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Transaction Type</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "Deposit" })}
            className={`flex items-center justify-center gap-2 py-3 border rounded-xl font-medium transition ${
              formData.type === "Deposit"
                ? "bg-green-50 border-green-500 text-green-700 shadow-sm"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <ArrowDownCircle size={18} />
            Deposit
          </button>
          
          <button
            type="button"
            onClick={() => setFormData({ ...formData, type: "Withdrawal" })}
            className={`flex items-center justify-center gap-2 py-3 border rounded-xl font-medium transition ${
              formData.type === "Withdrawal"
                ? "bg-red-50 border-red-500 text-red-700 shadow-sm"
                : "border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <ArrowUpCircle size={18} />
            Withdrawal
          </button>
        </div>
      </div>

      {/* Amount & Remark */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Amount ($) *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">$</span>
            <input
              type="number"
              name="amount"
              required
              min="1"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-3 text-lg font-semibold border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent transition"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Remark / Narration</label>
          <input
            type="text"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            placeholder="e.g. Cash Deposit, Fee Deduction"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent transition"
          />
        </div>
      </div>

      {/* Warning for Withdrawal */}
      {formData.type === "Withdrawal" && Number(formData.amount) > user.currentBalance && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg">
          <strong>Warning:</strong> Amount exceeds current balance. Transaction may be rejected.
        </div>
      )}

      {/* Footer */}
      <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-2 text-white rounded-lg font-medium transition flex items-center justify-center min-w-[140px] ${
            formData.type === "Deposit" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"
          }`}
        >
          {loading ? "Processing..." : `Post ${formData.type}`}
        </button>
      </div>
    </form>
  );
};

export default TransactionModal;
