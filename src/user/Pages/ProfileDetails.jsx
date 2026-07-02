import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Shield, Lock, Unlock,
  User, Clock, CheckCircle2, AlertCircle,
  ArrowDownCircle, ArrowUpCircle, Building2, Mail,
  MapPin, Hash, X, Copy, Check, Smartphone, CreditCard, KeyRound,
  LogOut, Search, Bell, Menu, ChevronDown, PlusCircle, ArrowRightLeft, FileText, Settings, Banknote, Briefcase,
  ChevronRight, ChevronLeft, Printer, Download, Eye, EyeOff, Info, HelpCircle, Filter
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const SESSION_SECS = 180;

const dollar = (n) => {
  if (n === undefined || n === null) return "$0.00";
  return "$" + Math.abs(n).toLocaleString("en-US", { minimumFractionDigits: 2 });
};

const maskAcct = (num) => {
  if (!num) return "";
  const cleaned = String(num).replace(/\s/g, "");
  return "•••• •••• •••• " + cleaned.slice(-4);
};

/* ─── Chase Octagon Logo ─────────────────────────────────────────── */
const ChaseOctagonLogo = () => (
  <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current text-white shrink-0">
    <path d="M12 0L2.12 9.88v4.24L12 24l9.88-9.88V9.88L12 0zm0 3.24l6.64 6.64H12V3.24zm0 17.52l-6.64-6.64H12v6.64zm-6.64-8.76l6.64-6.64v6.64H5.36zm13.28 0H12V5.36l6.64 6.64z"/>
  </svg>
);

/* ─── Countdown Hook ───────────────────────────────────────────────── */
const useCountdown = (initialSeconds, onExpire) => {
  const [timeLeft, setTimeLeft] = useState(initialSeconds);
  const ref = useRef(null);
  const start = useCallback((remainingSeconds = initialSeconds) => {
    setTimeLeft(remainingSeconds);
    clearInterval(ref.current);
    ref.current = setInterval(() => {
      setTimeLeft((t) => { if (t <= 1) { clearInterval(ref.current); onExpire?.(); return 0; } return t - 1; });
    }, 1000);
  }, [initialSeconds, onExpire]);
  const stop = useCallback(() => { clearInterval(ref.current); setTimeLeft(initialSeconds); }, [initialSeconds]);
  useEffect(() => () => clearInterval(ref.current), []);
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");
  return { pct: (timeLeft / initialSeconds) * 100, label: `${mm}:${ss}`, start, stop };
};

/* ─── OTP Cells ────────────────────────────────────────────────────── */
const OtpInput = ({ value, onChange, length = 4 }) => {
  const refs = useRef([]);
  const digits = value.split("").concat(Array(length).fill("")).slice(0, length);
  const handle = (i, e) => {
    if (e.key === "Backspace") {
      onChange(digits.map((d, j) => (j === i ? "" : d)).join(""));
      if (i > 0) refs.current[i - 1]?.focus();
    }
    else if (/^\d$/.test(e.key)) {
      onChange(digits.map((d, j) => (j === i ? e.key : d)).join(""));
      if (i < length - 1) refs.current[i + 1]?.focus();
    }
  };
  return (
    <div className="flex gap-3 justify-center">
      {digits.map((d, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="password"
          inputMode="numeric"
          maxLength={1}
          value={d}
          onChange={() => { }}
          onKeyDown={(e) => handle(i, e)}
          className="w-12 h-14 text-center text-2xl font-mono font-bold border rounded-lg focus:outline-none transition-all bg-slate-50 text-slate-800 border-slate-300 focus:border-[#0b4ea2] focus:bg-white focus:ring-2 focus:ring-[#0b4ea2]/20"
        />
      ))}
    </div>
  );
};

/* ─── Modal Shell ──────────────────────────────────────────────────── */
const Modal = ({ onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
    <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden border border-slate-200">
      <div className="bg-[#0b4ea2] p-4 flex justify-between items-center text-white">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Shield size={20} className="animate-pulse" /> Security Verification
        </h3>
        <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition-all">
          <X size={18} />
        </button>
      </div>
      {children}
    </div>
  </div>
);

/* ─── OTP Modal ────────────────────────────────────────────────────── */
const OtpModal = ({ onClose, onSuccess, title, subtitle, userEmail }) => {
  const [phase, setPhase] = useState("send");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const { requestOtp, verifyOtp, loading } = useAuth();

  const handleRequestOtp = async () => {
    setError("");
    const result = await requestOtp(userEmail);
    if (result.success) {
      setPhase("enter");
    } else {
      setError(result.message || "Failed to send OTP code. Please try again.");
    }
  };

  const handleVerify = async () => {
    setError("");
    const result = await verifyOtp(userEmail, otp);
    if (result.success) {
      onSuccess();
      onClose();
    } else {
      setError(result.message || "Incorrect OTP. Please try again.");
      setOtp("");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
            <Smartphone size={28} className="text-[#0b4ea2]" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
          <p className="text-sm text-slate-500 mb-8 max-w-[300px] leading-relaxed">{subtitle}</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mb-6 bg-red-50 border border-red-100 p-3 rounded-lg">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {phase === "send" && (
          <button
            onClick={handleRequestOtp}
            disabled={loading}
            className="w-full py-3.5 bg-[#0b4ea2] hover:bg-[#0b428c] text-white text-base font-semibold rounded-md shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-55 cursor-pointer"
          >
            {loading ? "Sending OTP..." : "Send Verification Code"}
          </button>
        )}
        {phase === "enter" && (
          <div className="space-y-6">
            <OtpInput value={otp} onChange={(v) => { setOtp(v); setError(""); }} length={4} />

            <button
              onClick={handleVerify}
              disabled={otp.length < 4 || loading}
              className="w-full py-3.5 bg-[#0b4ea2] hover:bg-[#0b428c] disabled:bg-slate-200 disabled:text-slate-400 text-white text-base font-semibold rounded-md shadow-sm transition-all active:scale-[0.98] cursor-pointer animate-fade-in"
            >
              {loading ? "Verifying..." : "Verify Identity"}
            </button>
            <button
              onClick={handleRequestOtp}
              disabled={loading}
              className="w-full text-center text-sm font-semibold text-[#0b4ea2] hover:underline cursor-pointer pt-2"
            >
              Resend OTP Code
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};

/* ─── PIN Modal ────────────────────────────────────────────────────── */
const PinModal = ({ onClose, onSuccess, userId }) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const { checkBalance, loading } = useAuth();

  const handleVerify = async () => {
    setError("");
    const result = await checkBalance(userId, pin);
    if (result.success) {
      onSuccess(result.balance);
      onClose();
    } else {
      setError(result.message || "Incorrect PIN or Diamond Password. Please try again.");
      setPin("");
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="p-8">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-4 border border-blue-100">
            <KeyRound size={28} className="text-[#0b4ea2]" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Enter PIN</h3>
          <p className="text-sm text-slate-500 mb-8 max-w-[280px] leading-relaxed">Please input your 4-digit security PIN</p>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm mb-6 bg-red-50 border border-red-100 p-3 rounded-lg">
            <AlertCircle size={16} className="shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-6">
          <OtpInput value={pin} onChange={(v) => { setPin(v); setError(""); }} length={4} />

          <button
            onClick={handleVerify}
            disabled={pin.length < 4 || loading}
            className="w-full py-3.5 bg-[#0b4ea2] hover:bg-[#0b428c] disabled:bg-slate-200 disabled:text-slate-400 text-white text-base font-semibold rounded-md shadow-sm transition-all active:scale-[0.98] cursor-pointer"
          >
            {loading ? "Verifying..." : "Confirm Code"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

/* ─── Mock Transfer Money Modal ────────────────────────────────────── */
const TransferModal = ({ onClose, currentBalance, onTransferSuccess }) => {
  const [step, setStep] = useState("form");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [remark, setRemark] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!toAccount || !amount) {
      setError("Please fill in all required fields.");
      return;
    }
    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }
    if (Number(amount) > currentBalance) {
      setError("Insufficient balance.");
      return;
    }
    setStep("pin");
  };

  const handleVerify = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onTransferSuccess(Number(amount), remark || "Funds Transfer");
      setStep("success");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#0b4ea2] p-4 flex justify-between items-center text-white">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <ArrowRightLeft size={20} /> Transfer Funds
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          {step === "form" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="flex items-center gap-2 text-red-600 text-sm bg-red-50 border border-red-100 p-3 rounded-lg">
                  <AlertCircle size={16} className="shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">From Account</label>
                <div className="bg-slate-50 border border-slate-200 rounded p-2.5 text-sm font-semibold text-slate-700">
                  Chase Business Complete Banking® (...5190)
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">To Account (Account number / Payee)</label>
                <input
                  type="text"
                  value={toAccount}
                  onChange={(e) => { setToAccount(e.target.value); setError(""); }}
                  placeholder="Enter Account Number or Payee Name"
                  className="w-full border border-slate-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#0b4ea2] focus:ring-1 focus:ring-[#0b4ea2]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Amount ($)</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setError(""); }}
                  placeholder="0.00"
                  className="w-full border border-slate-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#0b4ea2] focus:ring-1 focus:ring-[#0b4ea2] font-semibold"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Memo / Remark</label>
                <input
                  type="text"
                  value={remark}
                  onChange={(e) => setRemark(e.target.value)}
                  placeholder="Description (optional)"
                  className="w-full border border-slate-300 rounded p-2.5 text-sm focus:outline-none focus:border-[#0b4ea2] focus:ring-1 focus:ring-[#0b4ea2]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#0b4ea2] hover:bg-[#0b428c] text-white font-semibold rounded shadow-sm hover:shadow transition-all cursor-pointer mt-2"
              >
                Continue
              </button>
            </form>
          )}

          {step === "pin" && (
            <div className="space-y-6 text-center">
              <div>
                <h4 className="font-bold text-slate-700">Verify Transaction PIN</h4>
                <p className="text-xs text-slate-500 mt-1">Please enter your 4-digit PIN code to authorize the transfer of {dollar(Number(amount))}.</p>
              </div>
              <OtpInput value={pin} onChange={(v) => { setPin(v); setError(""); }} length={4} />
              {error && <div className="text-red-500 text-xs mt-2">{error}</div>}
              <div className="flex gap-3">
                <button
                  onClick={() => setStep("form")}
                  className="flex-1 py-3 border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold rounded transition-all cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={handleVerify}
                  disabled={pin.length < 4 || loading}
                  className="flex-1 py-3 bg-[#0b4ea2] hover:bg-[#0b428c] text-white font-semibold rounded shadow transition-all cursor-pointer"
                >
                  {loading ? "Verifying..." : "Authorize"}
                </button>
              </div>
            </div>
          )}

          {step === "success" && (
            <div className="space-y-6 text-center py-4">
              <div className="w-16 h-16 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-600 shadow-sm animate-bounce">
                <CheckCircle2 size={36} />
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-800">Transfer Successful</h4>
                <p className="text-sm text-slate-500 mt-2">Your payment of <span className="font-bold text-slate-800">{dollar(Number(amount))}</span> has been successfully sent to <span className="font-bold text-slate-800">{toAccount}</span>.</p>
                <p className="text-xs text-slate-400 mt-1">Ref ID: TXN-{Math.floor(100000000 + Math.random() * 900000000)}</p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-[#0b4ea2] hover:bg-[#0b428c] text-white font-semibold rounded shadow transition-all cursor-pointer"
              >
                Close Window
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ─── Mock Statements Modal ────────────────────────────────────────── */
const StatementsModal = ({ onClose }) => {
  const statements = [
    { name: "Statement June 2026", date: "June 30, 2026", size: "2.4 MB" },
    { name: "Statement May 2026", date: "May 31, 2026", size: "2.3 MB" },
    { name: "Statement April 2026", date: "April 30, 2026", size: "2.5 MB" },
    { name: "Statement March 2026", date: "March 31, 2026", size: "2.4 MB" },
    { name: "Statement February 2026", date: "February 28, 2026", size: "2.1 MB" },
    { name: "Statement January 2026", date: "January 31, 2026", size: "2.6 MB" },
  ];

  const handleDownload = (name) => {
    toast.success(`Downloaded: ${name}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-lg rounded-lg shadow-2xl overflow-hidden border border-slate-200">
        <div className="bg-[#0b4ea2] p-4 flex justify-between items-center text-white">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FileText size={20} /> e-Statements
          </h3>
          <button onClick={onClose} className="hover:bg-white/20 p-1.5 rounded-full transition-all">
            <X size={18} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-sm text-slate-500 mb-4">Select a statement month to download your official PDF transaction statement.</p>
          <div className="divide-y divide-slate-100 max-h-96 overflow-y-auto">
            {statements.map((s, idx) => (
              <div key={idx} className="flex justify-between items-center py-3.5 hover:bg-slate-50 px-2 rounded transition-all">
                <div>
                  <h4 className="text-sm font-semibold text-slate-700">{s.name}</h4>
                  <p className="text-xs text-slate-400 mt-0.5">Closing Date: {s.date} • {s.size}</p>
                </div>
                <button
                  onClick={() => handleDownload(s.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b4ea2] hover:bg-[#0b428c] text-white text-xs font-semibold rounded shadow transition-all cursor-pointer"
                >
                  <Download size={12} /> Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

/* ─── Profile details details box row ────────────────────────────── */
const DetailItem = ({ icon: Icon, label, value, mono = false, copy = false }) => {
  const [copied, setCopied] = useState(false);
  const doCopy = () => {
    if (value) {
      navigator.clipboard?.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };
  return (
    <div className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <Icon size={16} className="text-[#0b4ea2] shrink-0" />
        <div className="min-w-0">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{label}</p>
          <p className={`text-sm font-semibold text-slate-700 truncate ${mono ? "font-mono tracking-wide" : ""}`}>
            {value || "N/A"}
          </p>
        </div>
      </div>
      {copy && value && (
        <button
          onClick={doCopy}
          className="text-slate-400 hover:text-[#0b4ea2] hover:bg-blue-50 p-1.5 rounded transition-all shrink-0"
          title="Copy"
        >
          {copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
        </button>
      )}
    </div>
  );
};

/* ─── Offers List ──────────────────────────────────────────────────── */
const CHASE_OFFERS = [
  { id: 1, logo: "TU", merchant: "thredUP", cashBack: "10% Cash back", timeLeft: "28d left", status: "New", color: "bg-emerald-600 text-white" },
  { id: 2, logo: "MM", merchant: "Misfits Market", cashBack: "5% Cash back", timeLeft: "11d left", status: "New", color: "bg-amber-600 text-white" },
  { id: 3, logo: "SB", merchant: "Starbucks Coffee", cashBack: "15% Cash back", timeLeft: "4d left", status: "Ending soon", color: "bg-[#00704A] text-white" },
  { id: 4, logo: "CV", merchant: "Chevron Gas", cashBack: "3% Cash back", timeLeft: "19d left", status: "New", color: "bg-blue-600 text-white" },
  { id: 5, logo: "AM", merchant: "Amazon Business", cashBack: "8% Cash back", timeLeft: "15d left", status: "Popular", color: "bg-orange-500 text-white" },
];

/* ─── Main Component ───────────────────────────────────────────────── */
const ProfileDetails = () => {
  const { userLogout, getProfile } = useAuth();
  const [userProfile, setUserProfile] = useState(null);
  const localUser = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);

  const [acctVerified, setAcctVerified] = useState(false);
  const [acctModal, setAcctModal] = useState(false);
  const [balUnlocked, setBalUnlocked] = useState(false);
  const [pinModal, setPinModal] = useState(false);
  const [balance, setBalance] = useState(0);

  // Redesign additional states
  const [showDetailsBlock, setShowDetailsBlock] = useState(false);
  const [offerIndex, setOfferIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [expandedTxId, setExpandedTxId] = useState(null);
  const [localTrans, setLocalTrans] = useState([]);

  // Modals state
  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [statementsModalOpen, setStatementsModalOpen] = useState(false);

  const loadProfile = useCallback(async () => {
    const result = await getProfile();
    if (result.success) {
      setUserProfile({ ...result.user, isLocked: false });
    } else if (result.locked) {
      setUserProfile({ ...localUser, isLocked: true });
    } else {
      toast.error(result.message || "Failed to load profile");
    }
  }, [getProfile, localUser]);

  useEffect(() => {
    loadProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Session Expired Trigger */
  const handleAcctExpire = useCallback(() => {
    setAcctVerified(false);
    setBalUnlocked(false);
    setLocalTrans([]); // reset local transaction modifications
    setShowDetailsBlock(false);
    loadProfile();
  }, [loadProfile]);

  const { pct: acctPct, label: acctLabel, start: acctStart, stop: acctStop } = useCountdown(SESSION_SECS, handleAcctExpire);
  const barColor = acctPct > 50 ? "#16a34a" : acctPct > 20 ? "#ea580c" : "#dc2626";

  useEffect(() => {
    if (userProfile && userProfile.isLocked === false) {
      setAcctVerified(true);
      setShowDetailsBlock(true);
      let remaining = SESSION_SECS;
      if (userProfile.profileUnlockedUntil) {
        const diff = Math.floor((new Date(userProfile.profileUnlockedUntil).getTime() - Date.now()) / 1000);
        remaining = diff > 0 ? diff : 0;
      }
      if (remaining > 0) acctStart(remaining);
      else handleAcctExpire();
    } else {
      setAcctVerified(false);
      setBalUnlocked(false);
      acctStop();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const doAcctUnlock = () => {
    setAcctVerified(true);
    acctStart();
    loadProfile();
    setShowDetailsBlock(true);
  };

  const doAcctLock = () => {
    acctStop();
    setAcctVerified(false);
    setBalUnlocked(false);
    setShowDetailsBlock(false);
    setLocalTrans([]);
    toast.success("Session secured and locked.");
  };

  const handleBalanceUnlock = (fetchedBalance) => {
    setBalance(fetchedBalance);
    setBalUnlocked(true);
    toast.success("Balance details unlocked.");
  };

  const toggleBalanceShow = () => {
    if (!acctVerified) {
      setAcctModal(true);
      return;
    }
    if (balUnlocked) {
      setBalUnlocked(false);
    } else {
      setPinModal(true);
    }
  };

  const handleAccountRoutingToggle = () => {
    if (!acctVerified) {
      setAcctModal(true);
    } else {
      setShowDetailsBlock((prev) => !prev);
    }
  };

  const handleMockTransferSuccess = (amount, remark) => {
    setBalance((prev) => prev - amount);
    const newTx = {
      type: "Withdrawal",
      amount,
      remark,
      createdAt: new Date().toISOString()
    };
    setLocalTrans((prev) => [newTx, ...prev]);
    toast.success("Simulation Transfer Completed!");
  };

  const activeUser = userProfile || localUser;
  const initials = activeUser?.fullName?.split(" ").map((w) => w[0]).join("").slice(0, 2) || "BU";
  const rawTransactions = activeUser?.transactions || [];

  // Slide Carousel controls
  const nextOffers = () => {
    setOfferIndex((prev) => (prev + 2 >= CHASE_OFFERS.length ? 0 : prev + 2));
  };
  const prevOffers = () => {
    setOfferIndex((prev) => (prev - 2 < 0 ? CHASE_OFFERS.length - (CHASE_OFFERS.length % 2 === 0 ? 2 : 1) : prev - 2));
  };

  // Transaction formatting & filters with running balance calculation
  const calculatedTransactions = useMemo(() => {
    let list = [...rawTransactions];

    // Prepend mock transaction history
    if (localTrans.length > 0) {
      list = [...localTrans, ...list];
    }

    // Sort ascending to calculate running balance correctly (oldest to newest)
    list.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

    let currentRunning = balance;
    const finalCalculated = [];

    // Calculate running balance backwards from the latest current balance
    for (let i = list.length - 1; i >= 0; i--) {
      const t = list[i];
      finalCalculated.unshift({
        ...t,
        id: t._id || `mock-${i}-${t.createdAt}`,
        runningBalance: currentRunning,
      });

      if (t.type === "Deposit") {
        currentRunning -= t.amount;
      } else {
        currentRunning += t.amount;
      }
    }

    // Sort descending (newest first) for ledger display
    finalCalculated.reverse();

    // Apply filters
    return finalCalculated.filter((t) => {
      const matchesSearch = (t.remark || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterType === "All" ||
        (filterType === "Deposits" && t.type === "Deposit") ||
        (filterType === "Withdrawals" && t.type === "Withdrawal");
      return matchesSearch && matchesFilter;
    });
  }, [rawTransactions, localTrans, balance, searchQuery, filterType]);

  const handleRowClick = (txId) => {
    setExpandedTxId((prev) => (prev === txId ? null : txId));
  };

  const handleDebitCardSetup = () => {
    toast("Debit card settings are managed by your account administrator.", { icon: "ℹ️" });
  };

  const handleScamAlertClick = () => {
    toast.success("Redirecting to Chase Fraud & Scam Prevention Hub...");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans antialiased text-slate-800 pb-16">
      
      {/* ══════════ CHASE HEADER ══════════ */}
      <header className="bg-[#0b4ea2] text-white shadow-md relative z-30 select-none">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-1.5 hover:bg-white/10 rounded transition-all">
              <Menu size={20} />
            </button>
            <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
              <img
                src="/Chase_ForBusiness_2026.avif"
                alt="Chase for Business Logo"
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold text-white/90 h-full">
            <a className="hover:text-white border-b-4 border-white py-4.5 cursor-pointer">Accounts</a>
            <a className="hover:text-white border-b-4 border-transparent hover:border-white/40 py-4.5 cursor-pointer">Pay & transfer</a>
            <a className="hover:text-white border-b-4 border-transparent hover:border-white/40 py-4.5 cursor-pointer">Plan & track</a>
            <a className="hover:text-white border-b-4 border-transparent hover:border-white/40 py-4.5 cursor-pointer">Investments</a>
            <a className="hover:text-white border-b-4 border-transparent hover:border-white/40 py-4.5 cursor-pointer">Benefits & travel</a>
            <a className="hover:text-white border-b-4 border-transparent hover:border-white/40 py-4.5 cursor-pointer">Security & privacy</a>
            <a className="hover:text-white border-b-4 border-transparent hover:border-white/40 py-4.5 cursor-pointer text-white/70">Explore products</a>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center gap-3">
            <button className="p-2 hover:bg-white/10 rounded transition-all" title="Search">
              <Search size={18} />
            </button>
            <button className="p-2 hover:bg-white/10 rounded transition-all relative" title="Notifications">
              <Bell size={18} />
              <span className="absolute top-1 right-1 bg-[#d9381e] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center scale-90 border border-[#0b4ea2]">
                3
              </span>
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-white/10 select-none">
              <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center font-bold text-xs shadow-inner">
                {initials}
              </div>
              <button 
                onClick={userLogout}
                className="hover:text-blue-200 text-sm font-semibold flex items-center gap-1 transition-all cursor-pointer py-1 px-2 hover:bg-white/5 rounded"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ══════════ SECURE SESSION TIMEOUT BAR ══════════ */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-6 py-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${acctVerified ? "bg-green-600 animate-pulse" : "bg-amber-500"}`}></div>
            <p className="text-slate-600 font-medium">
              {acctVerified 
                ? "Secure customer details and ledger session active." 
                : "Secure session required to view full account numbers and transactions."}
            </p>
          </div>

          {acctVerified ? (
            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded-md">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Auto-locks in</span>
                <span className="font-mono font-bold text-[#0b4ea2]">{acctLabel}</span>
                <div className="w-16 h-1.5 bg-slate-200 rounded-full overflow-hidden ml-1.5">
                  <div className="h-full transition-all duration-1000" style={{ width: `${acctPct}%`, background: barColor }} />
                </div>
              </div>
              <button 
                onClick={doAcctLock} 
                className="text-[#0b4ea2] hover:text-[#0b428c] font-bold border border-slate-200 hover:bg-slate-50 px-3 py-1 rounded-md transition-all cursor-pointer"
              >
                Lock Session
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setAcctModal(true)} 
              className="bg-[#0b4ea2] hover:bg-[#0b428c] text-white font-bold px-4 py-1.5 rounded shadow-sm transition-all text-center cursor-pointer shrink-0"
            >
              Verify Identity (OTP)
            </button>
          )}
        </div>
      </div>

      {/* ══════════ MAIN CONTENT CONTAINER ══════════ */}
      <main className="max-w-[1280px] mx-auto px-4 lg:px-6 mt-6">
        
        {/* Navigation / Page Header */}
        <div className="flex flex-col gap-1 mb-5">
          <button 
            onClick={() => window.history.back()} 
            className="flex items-center gap-1 text-[#0b4ea2] hover:underline text-xs font-bold w-fit cursor-pointer"
          >
            <ChevronLeft size={16} /> Back
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-2">
            <div>
              <h2 className="text-xl font-bold text-slate-800 tracking-wide">
                {(activeUser?.bankName || "PREMIER PLUS CKG").toUpperCase()} (...{activeUser?.accountNumber?.slice(-4) || "5190"})
              </h2>
            </div>
            
            <button 
              onClick={handleAccountRoutingToggle}
              className="flex items-center gap-1.5 text-[#0b4ea2] hover:underline text-sm font-bold w-fit cursor-pointer bg-blue-50/50 hover:bg-blue-50 px-3 py-1.5 rounded"
            >
              <Info size={16} /> Account & routing number <ChevronDown size={14} className={`transition-transform duration-300 ${showDetailsBlock ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* ─── ACCOUNT DETAILS DRAWER ─── */}
        {acctVerified && showDetailsBlock && (
          <div className="bg-white border border-slate-200/80 rounded-lg p-5 mb-6 shadow-sm animate-fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-1">
            <div className="col-span-full border-b border-slate-100 pb-2 mb-2 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Business Checking Details</span>
              <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase">Unlocked</span>
            </div>
            <DetailItem icon={Building2} label="Business Entity" value={activeUser?.fullName} />
            <DetailItem icon={Hash} label="Routing Number (IFSC)" value={activeUser?.ifscCode} mono copy />
            <DetailItem icon={CreditCard} label="Account Number" value={activeUser?.accountNumber} mono copy />
            <DetailItem icon={MapPin} label="Branch Address" value={activeUser?.bankAddress} />
            <DetailItem icon={Mail} label="Customer Email Address" value={activeUser?.email} />
            <DetailItem icon={Shield} label="Status" value={activeUser?.isActive ? "Active (Valid)" : "Suspended"} />
          </div>
        )}

        {/* ══════════ BALANCE SECTION ══════════ */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            {/* Left Balance display */}
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-slate-800 font-mono">
                    {acctVerified && balUnlocked ? dollar(balance) : "$ ••,•••.••"}
                  </h1>
                  <button 
                    onClick={toggleBalanceShow} 
                    className="p-2 hover:bg-slate-50 rounded-full transition-all text-[#0b4ea2]"
                    title={balUnlocked ? "Hide Balance" : "Show Balance"}
                  >
                    {acctVerified && balUnlocked ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wide">Available Balance</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-3 border-t border-slate-100">
                <div>
                  <p className="text-sm font-semibold text-slate-700 font-mono">
                    {acctVerified && balUnlocked ? dollar(balance) : "$ ••,•••.••"}
                  </p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Present balance</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-green-600 font-mono">
                    {acctVerified ? "+" + dollar(activeUser?.totalDeposit || 0) : "+$ ••,•••.••"}
                  </p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Deposits this month</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-700 font-mono">
                    {acctVerified ? "-" + dollar(activeUser?.totalWithdrawal || 0) : "-$ ••,•••.••"}
                  </p>
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Withdrawals this month</p>
                </div>
              </div>

              {/* Status Tags */}
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span>Debit card coverage:</span>
                  <span className="font-bold">Off</span>
                  <button onClick={handleDebitCardSetup} className="text-[#0b4ea2] hover:underline font-bold">
                    Set up &gt;
                  </button>
                </div>
                <div className="flex items-center gap-1.5">
                  <span>Overdraft protection:</span>
                  <span className="font-bold">Off</span>
                  <button onClick={handleDebitCardSetup} className="text-[#0b4ea2] hover:underline font-bold">
                    Set up &gt;
                  </button>
                </div>
              </div>
            </div>

            {/* Right Buttons Actions */}
            <div className="flex flex-wrap lg:flex-col gap-3 lg:w-48 shrink-0">
              <button 
                onClick={() => acctVerified ? setStatementsModalOpen(true) : setAcctModal(true)}
                className="flex-1 lg:w-full py-2.5 border border-[#0b4ea2] hover:bg-blue-50 text-[#0b4ea2] font-semibold rounded text-sm transition-all text-center shadow-sm cursor-pointer"
              >
                Statements
              </button>
              <button 
                onClick={() => toast.success("Paperless delivery status active!")}
                className="flex-1 lg:w-full py-2.5 border border-[#0b4ea2] hover:bg-blue-50 text-[#0b4ea2] font-semibold rounded text-sm transition-all text-center shadow-sm cursor-pointer"
              >
                Paperless
              </button>
              <button 
                onClick={() => acctVerified ? (balUnlocked ? setTransferModalOpen(true) : setPinModal(true)) : setAcctModal(true)}
                className="flex-1 lg:w-full py-2.5 bg-[#0b4ea2] hover:bg-[#0b428c] text-white font-semibold rounded text-sm transition-all text-center shadow-sm cursor-pointer"
              >
                Transfer money
              </button>
              <button 
                onClick={() => toast("Contact customer service at 1-800-CHASE for details.", { icon: "📞" })}
                className="flex-1 lg:w-full py-2.5 border border-slate-300 hover:bg-slate-50 text-slate-600 font-semibold rounded text-sm transition-all text-center cursor-pointer"
              >
                More &gt;
              </button>
            </div>

          </div>
        </div>

        {/* ══════════ OFFERS & BANNER GRID ══════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
          
          {/* Scam Alert (Left) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 flex gap-4 items-start shadow-sm">
            <div className="w-12 h-12 bg-blue-50 border border-blue-100 rounded-full flex items-center justify-center text-[#0b4ea2] shrink-0">
              <Info size={24} className="animate-pulse" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-slate-800 text-sm">Smart people of all ages are getting scammed</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Be vigilant. Fraudsters impersonate financial groups. Get the latest info on avoiding modern security scams.
              </p>
              <button 
                onClick={handleScamAlertClick} 
                className="text-[#0b4ea2] hover:underline font-bold text-xs flex items-center gap-1.5 cursor-pointer pt-1"
              >
                See latest scams <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Chase Offers Carousel (Right) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between shadow-sm select-none">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-sm">Chase Offers</h3>
                <p className="text-[11px] text-slate-400">Add merchant deals to your card and get cash back</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#0b4ea2] bg-blue-50 px-2 py-0.5 rounded">52 available</span>
                <div className="flex items-center border border-slate-200 rounded overflow-hidden">
                  <button onClick={prevOffers} className="p-1 hover:bg-slate-50 border-r border-slate-200 text-slate-500 transition-all">
                    <ChevronLeft size={14} />
                  </button>
                  <button onClick={nextOffers} className="p-1 hover:bg-slate-50 text-slate-500 transition-all">
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Slider cards (shows 2) */}
            <div className="grid grid-cols-2 gap-3">
              {CHASE_OFFERS.slice(offerIndex, offerIndex + 2).map((offer) => (
                <div key={offer.id} className="border border-slate-100 rounded-lg p-3 hover:border-slate-300 transition-all flex items-start gap-2 bg-slate-50/50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${offer.color}`}>
                    {offer.logo}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-xs font-bold text-slate-700 truncate">{offer.merchant}</p>
                    <p className="text-xs font-bold text-[#0b4ea2] truncate">{offer.cashBack}</p>
                    <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
                      <span>{offer.timeLeft}</span>
                      <span className="bg-green-100 text-green-700 font-bold px-1 rounded-sm uppercase tracking-wide transform scale-90">
                        {offer.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ══════════ TRANSACTIONS LEDGER ══════════ */}
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
          
          {/* Header & Filters */}
          <div className="p-5 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <h3 className="text-lg font-bold text-slate-800">Transactions</h3>

            <div className="flex flex-wrap items-center gap-3">
              
              {/* Dropdown Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Showing</span>
                <select 
                  value={filterType} 
                  onChange={(e) => setFilterType(e.target.value)}
                  className="border border-slate-200 rounded px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-white focus:outline-none focus:border-[#0b4ea2]"
                >
                  <option value="All">All transactions</option>
                  <option value="Deposits">Deposits</option>
                  <option value="Withdrawals">Withdrawals</option>
                </select>
              </div>

              {/* Search input */}
              <div className="relative w-44 sm:w-56">
                <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search description..." 
                  className="w-full pl-8 pr-2.5 py-1.5 border border-slate-200 rounded text-xs focus:outline-none focus:border-[#0b4ea2] focus:ring-1 focus:ring-[#0b4ea2] placeholder-slate-400 text-slate-700"
                />
              </div>

              {/* Utility Icons */}
              <div className="flex items-center gap-1 border-l border-slate-200 pl-3">
                <button 
                  onClick={() => toast.success("Ledger printed successfully.")}
                  className="p-2 hover:bg-slate-50 rounded text-slate-500 transition-all" 
                  title="Print Ledger"
                >
                  <Printer size={16} />
                </button>
                <button 
                  onClick={() => toast.success("CSV Statement exported successfully.")}
                  className="p-2 hover:bg-slate-50 rounded text-slate-500 transition-all" 
                  title="Export to CSV"
                >
                  <Download size={16} />
                </button>
              </div>

            </div>
          </div>

          {/* Ledger Table */}
          <div className="relative">
            {!acctVerified ? (
              
              /* LOCKED SCREEN OVERLAY */
              <div className="py-20 flex flex-col items-center justify-center text-center bg-slate-50/50 px-4">
                <div className="w-16 h-16 bg-white border border-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400 shadow-sm">
                  <Lock size={26} />
                </div>
                <h4 className="text-base font-bold text-slate-700 mb-1">Ledger Details Locked</h4>
                <p className="text-xs text-slate-500 max-w-sm leading-relaxed mb-5">
                  Verify your identity using One-Time Password (OTP) validation to unlock historical transactions and routing codes.
                </p>
                <button 
                  onClick={() => setAcctModal(true)}
                  className="bg-[#0b4ea2] hover:bg-[#0b428c] text-white font-bold text-xs px-6 py-2.5 rounded shadow transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Unlock size={14} /> Verify Identity
                </button>
              </div>

            ) : (
              
              /* LEDGER TABLE DATA */
              <div className="overflow-x-auto select-none">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider">
                      <th className="py-3 px-5">Date</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4">Type</th>
                      <th className="py-3 px-4 text-right">Amount</th>
                      <th className="py-3 px-5 text-right">Balance</th>
                      <th className="py-3 px-4 w-10"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {calculatedTransactions.map((t) => {
                      const isExpanded = expandedTxId === t.id;
                      const dateStr = new Date(t.createdAt).toLocaleDateString("en-US", {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      });

                      return (
                        <tr 
                          key={t.id} 
                          onClick={() => handleRowClick(t.id)}
                          className="hover:bg-slate-50/70 transition-all cursor-pointer"
                        >
                          <td className="py-3.5 px-5 font-medium text-slate-500 whitespace-nowrap">
                            {dateStr}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-slate-800">
                            {t.remark || "INTEREST PAYMENT"}
                          </td>
                          <td className="py-3.5 px-4 text-slate-500">
                            {t.type === "Deposit" ? "Deposit" : "ACH debit"}
                          </td>
                          <td className={`py-3.5 px-4 text-right font-bold ${t.type === "Deposit" ? "text-green-600" : "text-slate-800"}`}>
                            {t.type === "Deposit" ? "+" : "−"}{dollar(t.amount)}
                          </td>
                          <td className="py-3.5 px-5 text-right font-mono font-semibold text-slate-700 whitespace-nowrap">
                            {balUnlocked ? dollar(t.runningBalance) : "•••• ••••"}
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-400">
                            <ChevronRight size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-90" : ""}`} />
                          </td>
                        </tr>
                      );
                    })}

                    {calculatedTransactions.length === 0 && (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-slate-500 font-semibold">
                          No transactions found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* ─── Expandable Details Panel Overlay ─── */}
        {acctVerified && expandedTxId && (
          (() => {
            const tx = calculatedTransactions.find(t => t.id === expandedTxId);
            if (!tx) return null;
            return (
              <div className="bg-[#f8fafc] border-x border-b border-slate-200 p-4 animate-fade-in flex flex-col gap-3 text-[11px] text-slate-500 rounded-b-xl border-t shadow-inner -mt-px mb-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                  <span className="font-bold text-slate-400 uppercase tracking-wide">Transaction Details</span>
                  <button onClick={() => setExpandedTxId(null)} className="text-[#0b4ea2] hover:underline font-bold cursor-pointer">
                    Collapse details
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider">Transaction ID</span>
                    <span className="font-mono text-slate-700 font-bold">{tx.id}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider">Posting Status</span>
                    <span className="font-bold text-green-600 flex items-center gap-1 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Posted (Settled)
                    </span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider">Posting Channel</span>
                    <span className="font-bold text-slate-700">{tx.type === "Deposit" ? "Electronic Deposit / ACH" : "Web ACH Transfer"}</span>
                  </div>
                  <div>
                    <span className="block font-bold text-slate-400 uppercase tracking-wider">Date Initiated</span>
                    <span className="font-bold text-slate-700">{new Date(tx.createdAt).toLocaleString("en-US")}</span>
                  </div>
                </div>
              </div>
            );
          })()
        )}

      </main>

      {/* ══════════ MODALS PORTAL ══════════ */}
      {acctModal && (
        <OtpModal 
          userEmail={activeUser?.email} 
          onClose={() => setAcctModal(false)} 
          onSuccess={doAcctUnlock} 
          title="Verify Security Code" 
          subtitle="To display sensitive routing codes and transaction ledger files, type the 4-digit code sent to your email address." 
        />
      )}
      
      {pinModal && (
        <PinModal 
          userId={activeUser?.userId} 
          onClose={() => setPinModal(false)} 
          onSuccess={handleBalanceUnlock} 
        />
      )}

      {transferModalOpen && (
        <TransferModal 
          onClose={() => setTransferModalOpen(false)} 
          currentBalance={balance}
          onTransferSuccess={handleMockTransferSuccess}
        />
      )}

      {statementsModalOpen && (
        <StatementsModal 
          onClose={() => setStatementsModalOpen(false)} 
        />
      )}

    </div>
  );
};

export default ProfileDetails;