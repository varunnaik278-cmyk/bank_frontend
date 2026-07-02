import React, { useState } from "react";
import { Eye, EyeOff, User, Lock, Shield, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChaseLogo = ({ color = "#0060f0", size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className="inline-block">
    <path d="M16 28h20v8H16z" fill={color} />
    <path d="M28 8h8v20h-8z" fill={color} />
    <path d="M28 36h20v8H28z" fill={color} />
    <path d="M8 16h8v20H8z" fill={color} />
    <path d="M48 28h8v20h-8z" fill={color} />
  </svg>
);

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await login(
        formData.email,
        formData.password
      );

      if (result?.success) {
        toast.success("Welcome back, Administrator");
        navigate("/admin-login/dashboard");
      } else {
        toast.error(result?.message || "Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast.error("An error occurred during authentication.");
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col font-sans bg-[#f4f6f9] relative"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(2, 24, 43, 0.85) 0%, rgba(2, 24, 43, 0.95) 100%), url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      {/* ══════════ SECURE HEADER ══════════ */}
      <header className="w-full bg-[#02182b]/50 border-b border-[#ffffff10] py-4 px-6 backdrop-blur-md relative z-10">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3 select-none">
            {/* <ChaseLogo color="#ffffff" size={24} /> */}
            <div className="flex flex-col">
              <span className="text-[14px] font-bold tracking-[0.2em] text-white">JPMORGAN CHASE & CO.</span>
              <span className="text-[9px] font-semibold text-[#8a9ba8] tracking-wider -mt-0.5">ADMINISTRATIVE INTERFACE</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[11px] font-medium text-[#00b37e] bg-[#00b37e]/10 border border-[#00b37e]/30 px-3 py-1 rounded-full uppercase tracking-wider select-none">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00b37e] animate-pulse"></span>
            SSL Secure 256-Bit
          </div>
        </div>
      </header>

      {/* ══════════ MAIN LOGIN PORTAL ══════════ */}
      <main className="flex-1 flex items-center justify-center px-4 py-12 relative z-10">
        <div className="w-full max-w-[420px] bg-[#0c2340]/90 backdrop-blur-xl border border-[#ffffff15] shadow-[0_24px_64px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden transition-all duration-300">
          
          {/* Card Accent Top Bar */}
          <div className="h-[4px] bg-gradient-to-r from-[#0060f0] via-[#00a3e0] to-[#0060f0]"></div>

          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-[22px] font-semibold text-white tracking-wide">
                System Sign In
              </h2>
              <p className="text-[13px] text-[#8a9ba8] mt-1.5">
                Authorized Personnel Only
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* User ID */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-[#8a9ba8] uppercase tracking-wider">
                  User Email ID
                </label>
                <div className="relative border-b-2 border-[#1f3a52] focus-within:border-[#0060f0] transition-colors py-1 flex items-center">
                  <User size={16} className="text-[#8a9ba8] mr-3" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter Admin Email"
                    required
                    className="w-full bg-transparent text-[15px] text-white placeholder-gray-500 outline-none"
                    autoComplete="username"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5">
                <label className="text-[12px] font-semibold text-[#8a9ba8] uppercase tracking-wider">
                  System Password
                </label>
                <div className="relative border-b-2 border-[#1f3a52] focus-within:border-[#0060f0] transition-colors py-1 flex items-center justify-between">
                  <div className="flex items-center flex-1">
                    <Lock size={16} className="text-[#8a9ba8] mr-3" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      required
                      className="w-full bg-transparent text-[15px] text-white placeholder-gray-500 outline-none"
                      autoComplete="current-password"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#00a3e0] text-[13px] font-semibold hover:underline bg-transparent px-1 cursor-pointer select-none"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Remember Username */}
              <div className="flex items-center justify-between mt-1">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-transparent text-[#0060f0] focus:ring-0 focus:ring-offset-0 cursor-pointer" 
                  />
                  <span className="text-[13px] text-[#8a9ba8]">Remember Username</span>
                </label>
                <a href="#" className="text-[#00a3e0] text-[13px] hover:underline flex items-center gap-0.5">
                  Forgot Credentials?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0060f0] hover:bg-[#004dcf] disabled:bg-[#1b2b3a] disabled:text-gray-500 text-white py-3 rounded text-[15px] font-semibold tracking-wider transition-all duration-300 cursor-pointer mt-4 shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Establishing Session...
                  </>
                ) : (
                  "Authenticate"
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#ffffff08] flex items-center gap-2 justify-center text-[12px] text-[#8a9ba8]">
              <Shield size={14} className="text-[#00b37e]" />
              Multi-Factor Authentication Required Next
            </div>
          </div>
        </div>
      </main>

      {/* ══════════ SECURE FOOTER ══════════ */}
      <footer className="bg-[#011424] border-t border-[#ffffff08] text-[#8a9ba8] py-8 px-6 text-[12px] relative z-10">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex flex-col gap-1 text-center md:text-left">
            <span className="text-[11px] font-semibold text-white">SYSTEM NOTICE & WARNING</span>
            <p className="max-w-[650px] leading-relaxed text-[#708090]">
              This is a private computer system. Access is strictly limited to authorized administrators. All activities on this system are logged and monitored. Unauthorized access attempts are subject to criminal prosecution.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-2 md:mt-0 text-[11.5px]">
            <a href="#" className="hover:underline hover:text-white">Security Center</a>
            <a href="#" className="hover:underline hover:text-white">System Policy</a>
            <a href="#" className="hover:underline hover:text-white">Terms & Disclosures</a>
            <span className="text-gray-600">|</span>
            <span className="text-[#00b37e]">JPMC Node: Active</span>
          </div>
        </div>
        <div className="max-w-[1200px] mx-auto text-center mt-6 pt-4 border-t border-[#ffffff04] text-[11px] text-gray-500">
          © {new Date().getFullYear()} JPMorgan Chase & Co. All Rights Reserved. For Internal Use Only.
        </div>
      </footer>
    </div>
  );
};

export default AdminLogin;