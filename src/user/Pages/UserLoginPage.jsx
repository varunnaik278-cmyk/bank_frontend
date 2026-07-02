import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  Building2,
  ShieldCheck,
  Smartphone,
  Clock,
  Headphones,
  Info,
  Fingerprint,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

const BankLoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDevice, setRememberDevice] = useState(false);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const { userLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await userLogin(
      formData.userId,
      formData.password
    );

    if (result.success) {
      toast.success(result.message);
      navigate("/profile");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="flex w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl">
        {/* Left Panel */}
        <div className="hidden lg:flex flex-col justify-between w-96 shrink-0 bg-[#0a2540] text-white p-10">
          <div>
            <div className="flex items-center gap-3 mb-12">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                <Building2
                  size={20}
                  className="text-white"
                />
              </div>

              <span className="text-base font-medium tracking-wide">
                FirstNational Bank
              </span>
            </div>

            <h1 className="text-3xl font-medium leading-snug mb-4">
              Online banking,
              <br />
              built around you.
            </h1>

            <p className="text-sm text-white/60 leading-relaxed mb-10">
              Manage your accounts, transfer funds,
              pay bills, and track your financial
              health — all from one secure place.
            </p>

            <div className="flex flex-col gap-4">
              {[
                {
                  icon: ShieldCheck,
                  text: "256-bit SSL encryption on all sessions",
                },
                {
                  icon: Smartphone,
                  text: "Two-factor authentication enabled",
                },
                {
                  icon: Clock,
                  text: "24/7 fraud monitoring & alerts",
                },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3"
                >
                  <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center shrink-0">
                    <Icon
                      size={16}
                      className="text-blue-400"
                    />
                  </div>

                  <span className="text-sm text-white/75">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex items-center gap-3">
            <Headphones
              size={16}
              className="text-white/40"
            />

            <span className="text-xs text-white/40">
              Need help? Call{" "}
              <strong className="text-white/65">
                1-800-555-0100
              </strong>
            </span>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-white p-10 flex flex-col justify-center">
          <div className="mb-8">
            <p className="text-xs font-medium text-blue-600 tracking-widest uppercase mb-1">
              Secure sign-in
            </p>

            <h2 className="text-2xl font-medium text-slate-800 mb-1">
              Welcome back
            </h2>

            <p className="text-sm text-slate-500">
              Enter your credentials to access your
              account.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* User ID */}
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1.5 tracking-wide">
                Customer ID / Username
              </label>

              <div className="relative">
                <User
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="e.g. USER003"
                  required
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-medium text-slate-500 tracking-wide">
                  Password
                </label>
              </div>

              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-9 pr-10 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff size={16} />
                  ) : (
                    <Eye size={16} />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Device */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="remember"
                checked={rememberDevice}
                onChange={(e) =>
                  setRememberDevice(
                    e.target.checked
                  )
                }
                className="w-4 h-4 accent-blue-600 cursor-pointer"
              />

              <label
                htmlFor="remember"
                className="text-sm text-slate-500 cursor-pointer"
              >
                Remember this device for 30 days
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#0a2540] hover:bg-[#0d3060] text-white text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-60"
            >
              <Lock size={15} />

              {loading
                ? "Signing In..."
                : "Sign in securely"}
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">
                or
              </span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-sm rounded-lg transition-colors duration-200"
            >
              <Fingerprint
                size={16}
                className="text-blue-600"
              />
              Sign in with biometrics
            </button>
          </form>

          <div className="mt-5 flex items-start gap-2.5 bg-slate-50 rounded-lg p-3 border border-slate-100">
            <Info
              size={15}
              className="text-slate-400 shrink-0 mt-0.5"
            />

            <p className="text-xs text-slate-500 leading-relaxed">
              We will never ask for your full
              password or PIN via email or phone.
              If in doubt, call us directly.
            </p>
          </div>

          <p className="text-center text-xs text-slate-400 mt-6">
            Protected by FDIC. © 2026
            FirstNational Bank.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BankLoginPage;