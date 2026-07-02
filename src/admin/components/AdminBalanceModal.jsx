import React, { useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { KeyRound, X, AlertCircle } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

/* ─── OTP cells ────────────────────────────────────────────────────── */
const OtpInput = ({ value, onChange, length = 6 }) => {
  const refs = useRef([]);
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);
  const handle = (i, e) => {
    if (e.key === "Backspace") { onChange(digits.map((d, j) => (j === i ? "" : d)).join("")); if (i > 0) refs.current[i - 1]?.focus(); }
    else if (/^\d$/.test(e.key)) { onChange(digits.map((d, j) => (j === i ? e.key : d)).join("")); if (i < length - 1) refs.current[i + 1]?.focus(); }
  };
  return (
    <div className="flex gap-2 justify-center">
      {digits.map((d, i) => (
        <input key={i} ref={(el) => (refs.current[i] = el)} type="password" inputMode="numeric" maxLength={1} value={d}
          onChange={() => { }} onKeyDown={(e) => handle(i, e)}
          className="w-10 h-12 text-center text-lg font-mono font-bold border-2 rounded-xl focus:outline-none transition-colors bg-slate-50 text-slate-800"
          style={{ borderColor: d ? "#3b82f6" : "#e2e8f0" }} />
      ))}
    </div>
  );
};

const AdminBalanceModal = ({ user, onClose }) => {
  const { adminCheckBalance } = useAdmin();
  const [diamondPassword, setDiamondPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [balance, setBalance] = useState(null);

  const handleVerify = async () => {
    setLoading(true);
    setError("");
    const result = await adminCheckBalance(user.userId, diamondPassword);
    setLoading(false);
    
    if (result.success) {
      setBalance(result.balance);
    } else {
      setError(result.message || "Incorrect Diamond Password. Please try again.");
      setDiamondPassword("");
    }
  };

  const dollar = (n) => "$" + Math.abs(n).toLocaleString("en-IN", { minimumFractionDigits: 2 });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl relative p-6">
        <button onClick={onClose} className="absolute top-4 right-4 w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors">
          <X size={14} />
        </button>

        {balance === null ? (
          <>
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center mb-4">
              <KeyRound size={22} className="text-indigo-600" />
            </div>
            <h3 className="text-base font-semibold text-slate-800 mb-1">Check Balance</h3>
            <p className="text-sm text-slate-500 mb-6">Enter Diamond Password for <strong>{user.fullName}</strong>.</p>
            <div className="mb-4">
              <OtpInput value={diamondPassword} onChange={(v) => { setDiamondPassword(v); setError(""); }} length={4} />
            </div>
            {error && <div className="flex items-center justify-center gap-1.5 text-red-600 text-xs mb-3"><AlertCircle size={13} /> {error}</div>}
            <button onClick={handleVerify} disabled={diamondPassword.length < 4 || loading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 disabled:text-slate-400 text-white text-sm font-medium rounded-xl transition-colors">
              {loading ? "Verifying..." : "Confirm Diamond Password"}
            </button>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="text-sm text-slate-500 mb-2">Available Balance</div>
            <div className="text-4xl font-bold text-slate-900 mb-6">{dollar(balance)}</div>
            <button onClick={onClose} className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-medium rounded-xl transition-colors">
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBalanceModal;
