import { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  Search,
  CreditCard,
  Home,
  Car,
  Briefcase,
  PiggyBank,
  TrendingUp,
  DollarSign,
  Shield,
  CheckCircle,
  Globe,
  MapPin,
  Share2,
  ExternalLink,
  Mail,
  MessageCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Plane,
  Banknote,
  Hash,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn, FaPinterestP } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/AuthContext";

/* ── Chase octagon SVG logo (white version) ── */
const ChaseLogo = ({ color = "#fff", size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <path d="M16 28h20v8H16z" fill={color} />
    <path d="M28 8h8v20h-8z" fill={color} />
    <path d="M28 36h20v8H28z" fill={color} />
    <path d="M8 16h8v20H8z" fill={color} />
    <path d="M48 28h8v20h-8z" fill={color} />
  </svg>
);

const ChaseLandingPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [chooseSlide, setChooseSlide] = useState(0);

  const [formData, setFormData] = useState({
    userId: "",
    password: "",
  });

  const { userLogin, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setErrorMsg("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!formData.userId || !formData.password) {
      setErrorMsg("Please enter both User ID and Password.");
      return;
    }
    const result = await userLogin(formData.userId, formData.password);
    if (result.success) {
      toast.success(result.message || "Login Successful");
      navigate("/profile");
    } else {
      setErrorMsg(result.message || "Login failed. Please try again.");
      toast.error(result.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-white font-[Inter,system-ui,sans-serif] text-[#333] overflow-x-hidden">

      {/* ══════════ MAIN HEADER ══════════ */}
      <header className="bg-white w-full border-b border-[#e8e8e8] flex flex-col">
        <div className="w-full px-6 md:px-44">
          {/* Row 1: Top Links & Utilities */}
          <div className="flex items-center justify-between h-[42px] text-[13px] font-medium text-[#4a4a4a]">
            <div className="flex items-center gap-4 md:gap-7 h-full">
              <a className="h-full flex items-center border-b-[4px] border-[#0060f0] text-[#111] font-bold cursor-pointer pt-[4px]">Personal</a>
              <button onClick={() => navigate("/business")} className="h-full flex items-center cursor-pointer hover:underline pt-[4px]">Business</button>
              <a className="h-full flex items-center cursor-pointer hover:underline pt-[4px]">Commercial</a>
            </div>
            <div className="hidden md:flex items-center gap-6">
              <a className="cursor-pointer hover:underline">Schedule a meeting</a>
              <a className="cursor-pointer hover:underline flex items-center gap-1">Customer service <ChevronDown size={14} strokeWidth={2.5} /></a>
              <a className="cursor-pointer hover:underline">Español</a>
              <button className="cursor-pointer flex items-center"><Search size={22} className="text-[#111]" strokeWidth={1.5} /></button>
            </div>
            <div className="flex md:hidden items-center gap-3">
              <button className="cursor-pointer flex items-center"><Search size={20} className="text-[#111]" strokeWidth={1.5} /></button>
            </div>
          </div>
          
          {/* Row 2: Logo */}
          <div className="py-2.5">
            <img src="https://www.chase.com/content/dam/unified-assets/logo/chase/chase-logo/additional-file-formats/logo_chase_headerfooter.svg" alt="Chase Logo" className="h-[28px] object-contain" />
          </div>

          {/* Row 3: Bottom Links */}
          <div className="flex items-center gap-[28px] pb-4 pt-1 text-[15px] text-[#111] overflow-x-auto whitespace-nowrap scrollbar-none">
            <a className="cursor-pointer hover:underline">Checking</a>
            <a className="cursor-pointer hover:underline">Savings & CDs</a>
            <a className="cursor-pointer hover:underline">Credit cards</a>
            <a className="cursor-pointer hover:underline">Home loans</a>
            <a className="cursor-pointer hover:underline">Auto</a>
            <a className="cursor-pointer hover:underline">Investing by J.P. Morgan</a>
            <a className="cursor-pointer hover:underline">Education & goals</a>
            <a className="cursor-pointer hover:underline">Travel</a>
          </div>
        </div>
      </header>

      {/* ══════════ HERO + LOGIN ══════════ */}
      <section className="relative overflow-hidden bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.2)), url('/hero-img.png')" }}>

        <div className="relative z-10 max-w-[1200px] mx-auto px-6 py-12 flex flex-col lg:flex-row items-center gap-10 lg:gap-12">
          {/* Left — Card + Promo */}
          <div className="flex-1 flex flex-col sm:flex-row items-center gap-6">
            {/* Credit Card Mock */}
            <img 
              src="/sapphire-pref-LTO.webp" 
              alt="Chase Sapphire Preferred Credit Card" 
              className="w-[220px] sm:w-[260px] h-auto object-contain flex-shrink-0 drop-shadow-2xl"
            />

            {/* Promo text */}
            <div className="text-white max-w-md text-center sm:text-left">
              <h2 className="text-[35px] font-bold leading-tight mb-3">
                Earn <span className="line-through">75,000</span> 100,000 bonus<br />points
              </h2>
              <p className="text-white text-md text-semibold leading-relaxed mb-4 mx-auto sm:mx-0">
               Enjoy benefits like 5x points on Chase Travel℠, and 3x points on gas stations, dining, and vacation homes at top brands.
              </p>
              <button className="text-white bg-green-700 px-6 py-1.5 rounded text-[18px] font-semibold hover:bg-green-900 hover:text-white transition-colors cursor-pointer">
                See details
              </button>
            </div>
          </div>

          {/* Right — Login Box */}
          <div className="bg-white rounded p-4 w-full max-w-[340px] flex-shrink-0 relative z-10" style={{boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}}>
            <form onSubmit={handleSubmit} className="flex flex-col">
              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-1 rounded text-xs mb-2 flex items-center">
                  <AlertCircle size={14} /> {errorMsg}
                </div>
              )}

              {/* Username */}
              <div className="mb-5 mt-2">
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="Username"
                  autoComplete="username"
                  className="w-full pb-1 border-b border-[#888] text-[15px] text-[#333] outline-none focus:border-[#0060f0] bg-transparent transition-colors placeholder:text-[#555]"
                />
              </div>

              {/* Password */}
              <div className="mb-2 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  autoComplete="current-password"
                  className="w-full pb-1 pr-12 border-b border-[#888] text-[15px] text-[#333] outline-none focus:border-[#0060f0] bg-transparent transition-colors placeholder:text-[#555]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 bottom-2 text-[#0060f0] text-[14px] font-semibold hover:underline cursor-pointer bg-white"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Remember & Token */}
              <div className="flex items-center justify-between mb-5">
                <label className="flex items-center gap-2 text-[13px] text-[#555] cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 border border-[#888] rounded-[3px] accent-[#0060f0] cursor-pointer"
                  />
                  Remember username
                </label>
                <a className="text-[#0060f0] text-[13px] cursor-pointer flex items-center hover:underline">
                  Use token <ChevronRight size={16} />
                </a>
              </div>

              {/* Sign in button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-1.5 bg-[#0060f0] hover:bg-[#004dcf] text-white text-[16px] font-semibold rounded-[4px] transition-colors flex items-center justify-center gap-1 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign in"
                )}
              </button>
              
              {/* Or separator */}
              <div className="flex items-center justify-center my-1">
                <div className="h-[1px] bg-[#0060f0] w-full max-w-[140px]" />
                <span className="px-2 text-[#0060f0] text-[14px]">Or</span>
                <div className="h-[1px] bg-[#0060f0] w-full max-w-[140px]" />
              </div>

              {/* Passwordless sign in */}
              <button
                type="button"
                className="w-full py-1.5 bg-white border border-[#0060f0] text-[#0060f0] hover:bg-[#f0f6ff] text-[16px] font-semibold rounded-[4px] transition-colors mb-5 cursor-pointer"
              >
                Passwordless sign in
              </button>

              {/* Links */}
              <div className="flex flex-col gap-3 text-[13.5px]">
                <a className="text-[#0060f0] cursor-pointer flex items-center hover:underline">
                  Forgot username/password? <ChevronRight size={16} />
                </a>
                <a className="text-[#0060f0] cursor-pointer flex items-center hover:underline">
                  Not Enrolled? Sign Up Now. <ChevronRight size={16} />
                </a>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════ CHOOSE SECTION ══════════ */}
      <section className="py-3 text-center max-w-[1200px] mx-auto">
        <h2 className="text-[34px] font-semibold text-[#444] mb-12">Choose what's right for you</h2>
        <div className="overflow-hidden pb-4">
          <div className="flex transition-transform duration-500 ease-in-out"
               style={{ transform: `translateX(-${chooseSlide * 100}%)` }}>
            {/* Slide 1 */}
            <div className="flex-none w-full grid grid-cols-3 md:flex md:justify-center gap-y-6 gap-x-2 md:gap-14 px-4">
              {[
                { icon: Briefcase, label: "Business" },
                { icon: CreditCard, label: "Credit cards" },
                { icon: Banknote, label: "Checking" },
                { icon: Plane, label: "Travel" },
                { icon: PiggyBank, label: "Savings" },
                { icon: Home, label: "Home loans" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3 cursor-pointer group w-full max-w-[110px] md:w-[130px] mx-auto">
                  <div className="flex items-center justify-center text-[#444] transition-transform group-hover:-translate-y-1">
                    <Icon size={38} strokeWidth={1.2} />
                  </div>
                  <span className="text-[13px] md:text-[15px] text-[#0060f0] font-normal group-hover:underline text-center">{label}</span>
                </div>
              ))}
            </div>
            {/* Slide 2 */}
            <div className="flex-none w-full grid grid-cols-3 md:flex md:justify-center gap-y-6 gap-x-2 md:gap-14 px-4">
              {[
                { icon: Car, label: "Auto" },
                { icon: TrendingUp, label: "Investing" },
                { icon: DollarSign, label: "Mortgages" },
                { icon: Shield, label: "Protection" },
                { icon: Globe, label: "International" },
                { icon: CreditCard, label: "Commercial" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-3 cursor-pointer group w-full max-w-[110px] md:w-[130px] mx-auto">
                  <div className="flex items-center justify-center text-[#444] transition-transform group-hover:-translate-y-1">
                    <Icon size={38} strokeWidth={1.2} />
                  </div>
                  <span className="text-[13px] md:text-[15px] text-[#0060f0] font-normal group-hover:underline text-center">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Navigation */}
        <div className="flex items-center justify-center gap-5 mt-8">
          <button 
            onClick={() => setChooseSlide(0)} 
            className={`text-[#0060f0] cursor-pointer hover:bg-gray-50 p-1.5 rounded-full transition-colors ${chooseSlide === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
            disabled={chooseSlide === 0}
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>
          <div className="flex gap-2.5 items-center">
            <button aria-label="Slide 1" onClick={() => setChooseSlide(0)} className={`w-[11px] h-[11px] rounded-full cursor-pointer transition-colors ${chooseSlide === 0 ? 'bg-[#0060f0]' : 'border border-[#0060f0]'}`} />
            <button aria-label="Slide 2" onClick={() => setChooseSlide(1)} className={`w-[11px] h-[11px] rounded-full cursor-pointer transition-colors ${chooseSlide === 1 ? 'bg-[#0060f0]' : 'border border-[#0060f0]'}`} />
          </div>
          <button 
            onClick={() => setChooseSlide(1)} 
            className={`text-[#0060f0] cursor-pointer hover:bg-gray-50 p-1.5 rounded-full transition-colors ${chooseSlide === 1 ? 'opacity-40 cursor-not-allowed' : ''}`}
            disabled={chooseSlide === 1}
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>
        </div>
      </section>

      {/* ══════════ PRODUCT CARDS ══════════ */}
      <section className="px-6 pb-12 max-w-[1200px] mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="border border-[#d4d4d4] flex flex-col min-h-[360px] bg-white">
            <div className="bg-[#022851] text-white p-7 flex items-start justify-between h-[150px]">
              <h3 className="text-[24px] font-medium leading-tight max-w-[150px]">Earn more<br />than ever</h3>
              <Plane size={60} strokeWidth={1.2} />
            </div>
            <div className="p-7 flex flex-col flex-1">
              <p className="text-[25px] text-[#222] font-semibold mb-4">Chase Sapphire Preferred®</p>
              <p className="text-[16px] leading-relaxed text-gray-500 font-bold flex-1 mb-14">
                Enjoy benefits like 5x points on Chase Travel℠, and 3x points on gas stations, dining, and vacation homes at top brands.
              </p>
              <button className="bg-[#005bf0] text-white w-full max-w-[200px] py-2.5 rounded text-[15px] font-medium hover:bg-[#004dcf] transition-colors cursor-pointer">
                See details
              </button>
            </div>
          </div>

          {/* Card 2 */}
           <div className="border border-[#d4d4d4] flex flex-col min-h-[360px] bg-white">
            <div className="bg-[#022851] text-white p-7 flex items-start justify-between h-[150px]">
              <h3 className="text-[24px] font-medium leading-tight max-w-[150px]">Travel Protection<br />Benefits</h3>
              <Shield size={40} strokeWidth={1.2} />
            </div>
            <div className="p-7 flex flex-col flex-1">
              <p className="text-[17px] text-[#222] font-semibold mb-4">Chase Sapphire Preferred®</p>
              <p className="text-[14.5px] leading-relaxed text-[#333] flex-1 mb-8">
                The most comprehensive suite of travel protections in its class, including trip delay reimbursement and baggage delay.
              </p>
              <button className="bg-[#005bf0] text-white w-full max-w-[200px] py-2.5 rounded text-[15px] font-medium hover:bg-[#004dcf] transition-colors cursor-pointer">
                See details
              </button>
            </div>
          </div>

          {/* Card 3 */}
           <div className="border border-[#d4d4d4] flex flex-col min-h-[360px] bg-white">
            <div className="bg-[#022851] text-white p-7 flex items-start justify-between h-[150px]">
              <h3 className="text-[24px] font-medium leading-tight max-w-[150px]">See if you are<br />preapproved</h3>
              <CreditCard size={40} strokeWidth={1.2} />
            </div>
            <div className="p-7 flex flex-col flex-1">
              <p className="text-[17px] text-[#222] font-semibold mb-4">Chase Sapphire Preferred®</p>
              <p className="text-[14.5px] leading-relaxed text-[#333] flex-1 mb-8">
                Click here to see if you have a preapproved offer available – with no impact to your credit score
              </p>
              <button className="bg-[#005bf0] text-white w-full max-w-[200px] py-2.5 rounded text-[15px] font-medium hover:bg-[#004dcf] transition-colors cursor-pointer">
                See details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ PROMO SECTION 1 ══════════ */}
      <section className="py-14 px-6 max-w-[1200px] mx-auto border-b border-[#e8e8e8]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="bg-[#005eb8] text-white w-full max-w-[480px] h-[280px] rounded-lg flex flex-col justify-center items-center text-center p-6 shadow-sm">
              <h2 className="text-[34px] font-bold leading-none mb-1">Enjoy a</h2>
              <div className="text-[100px] font-extrabold leading-none tracking-tight my-2">
                $125
              </div>
              <h2 className="text-[44px] font-bold leading-none">bonus</h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left max-w-md">
            <h3 className="text-[26px] font-semibold text-[#333] mb-4">Get a $125 bonus for your teen</h3>
            <p className="text-[15px] text-[#444] leading-relaxed mb-6">
              When you open a Chase High School Checking℠ account together with qualifying activities.
            </p>
            <button className="bg-[#1b8a2e] hover:bg-[#157724] text-white px-5 py-2.5 rounded text-[15px] font-medium transition-colors cursor-pointer">
              Learn more
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ PROMO SECTION 2 ══════════ */}
      <section className="py-14 max-w-[1200px] mx-auto border-b border-[#e8e8e8]">
        <div className="flex flex-col-reverse md:flex-row justify-between items-center gap-10 md:gap-16">
          <div className="w-full md:w-1/2 text-center md:text-left md:pl-10 max-w-md">
            <h3 className="text-[26px] font-semibold text-[#333] mb-4">Accept payments anytime, anywhere</h3>
            <p className="text-[15px] text-[#444] leading-relaxed mb-6">
              Make sure you're prepared for every sale, wherever your customers want to pay. Process credit cards anywhere in the U.S.
            </p>
            <button className="bg-[#1b8a2e] hover:bg-[#157724] text-white px-5 py-2.5 rounded text-[15px] font-medium transition-colors cursor-pointer">
              Learn more
            </button>
          </div>
          <div className="w-full md:w-1/2 flex justify-center md:justify-start">
            <img 
              src="pos-tap-to-pay-bakery-rt.avif" 
              alt="Accept payments anywhere" 
              className="w-full max-w-[480px] h-[280px] object-cover rounded-xl shadow-md"
            />
          </div>
        </div>
      </section>

      {/* ══════════ PROMO SECTION 3 ══════════ */}
      <section className=" py-14 max-w-[1200px] mx-auto border-b border-[#e8e8e8]">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 md:gap-16">
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <div className="bg-[#f2f4f5] text-[#333] border-b-[20px] border-[#c6a083] w-full max-w-[480px] h-[280px] rounded-lg flex flex-col justify-center items-center text-center p-6 shadow-sm overflow-hidden">
              <h2 className="text-[26px] font-medium text-[#444] leading-none mb-1 mt-4">Earn up to</h2>
              <div className="text-[95px] font-bold text-[#3a3a3a] leading-none tracking-tight my-2">
                $1,000
              </div>
              <h2 className="text-[26px] font-medium text-[#444] leading-none">cash bonus</h2>
            </div>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-left max-w-md">
            <h3 className="text-[26px] font-semibold text-[#333] mb-4">Commission-free online trades – plus a bonus</h3>
            <p className="text-[15px] text-[#444] leading-relaxed mb-6">
              This is an invitation to get up to $1,000 when you open and fund a J.P. Morgan Self-Directed Investing account—an investing experience that puts you in control.
            </p>
            <button className="bg-[#1b8a2e] hover:bg-[#157724] text-white px-5 py-2.5 rounded text-[15px] font-medium transition-colors cursor-pointer">
              Continue
            </button>
          </div>
        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-white border-t-[3px] border-[#0a3778] pt-12 pb-6 px-6">
        {/* Logo */}
        <div className="py-2.5 max-w-[1200px] mx-auto flex items-center gap-2 mb-10">
            <img src="https://www.chase.com/content/dam/unified-assets/logo/chase/chase-logo/additional-file-formats/logo_chase_headerfooter.svg" alt="Chase Logo" className="h-[28px] object-contain" />
          </div>

        {/* Columns row 1 */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Checking Accounts</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              Choose the <a className="text-[#0060f0] underline cursor-pointer">checking account</a> that works best for you. See our <a className="text-[#0060f0] underline cursor-pointer">Chase Total Checking®</a> offer for new customers. Make purchases with your debit card, and bank from almost anywhere by phone, tablet or computer and more than 14,000 ATMs and 5,000 branches.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Savings Accounts & CDs</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              It's never too early to begin saving. <a className="text-[#0060f0] underline cursor-pointer">Open a savings account</a> or open a Certificate of Deposit (<a className="text-[#0060f0] underline cursor-pointer">see interest rates</a>) and start saving your money.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Credit Cards</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              Chase <a className="text-[#0060f0] underline cursor-pointer">credit cards</a> can help you buy the things you need. Many of our cards <a className="text-[#0060f0] underline cursor-pointer">offer rewards</a> that can be redeemed for <a className="text-[#0060f0] underline cursor-pointer">cash back</a> or <a className="text-[#0060f0] underline cursor-pointer">travel-related</a> perks. With so many options, it can be easy to find a card that matches your lifestyle. Plus, with Credit Journey you can get a <a className="text-[#0060f0] underline cursor-pointer">free credit score</a>!
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Mortgages</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              Apply for a <a className="text-[#0060f0] underline cursor-pointer">mortgage</a> or <a className="text-[#0060f0] underline cursor-pointer">refinance your mortgage</a> with Chase. View today's <a className="text-[#0060f0] underline cursor-pointer">mortgage rates</a> or calculate what you can afford with our <a className="text-[#0060f0] underline cursor-pointer">mortgage calculator</a>. Visit our <a className="text-[#0060f0] underline cursor-pointer">Education Center</a> for homebuying tips and more.
            </p>
          </div>
        </div>

        {/* Columns row 2 */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Auto</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              <a className="text-[#0060f0] underline cursor-pointer">Chase Auto</a> is here to help you get the right car. Apply for <a className="text-[#0060f0] underline cursor-pointer">auto financing</a> for a new or used car with Chase. Use the <a className="text-[#0060f0] underline cursor-pointer">payment calculator</a> to estimate monthly payments. Check out the <a className="text-[#0060f0] underline cursor-pointer">Chase Auto Education Center</a> to get car guidance from a trusted source.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Chase for Business</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              With <a className="text-[#0060f0] underline cursor-pointer">Chase for Business</a> you'll receive all-in-one services and guidance from a team of business professionals. Explore <a className="text-[#0060f0] underline cursor-pointer">business checking</a>, simplify payments acceptance with <a className="text-[#0060f0] underline cursor-pointer">merchant services</a>, and consider <a className="text-[#0060f0] underline cursor-pointer">small business loans</a> or <a className="text-[#0060f0] underline cursor-pointer">business credit cards</a> for help with growth. You can also visit our <a className="text-[#0060f0] underline cursor-pointer">business resource center</a>.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Sports & Entertainment</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              Chase gives you access to unique sports, entertainment and culinary events through <a className="text-[#0060f0] underline cursor-pointer">Chase Experiences</a> and our exclusive partnerships such as the <a className="text-[#0060f0] underline cursor-pointer">US Open</a>, <a className="text-[#0060f0] underline cursor-pointer">Madison Square Garden</a> and <a className="text-[#0060f0] underline cursor-pointer">Chase Center</a>.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Chase Security Center</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              Our <a className="text-[#0060f0] underline cursor-pointer">suite of security features</a> can <a className="text-[#0060f0] underline cursor-pointer">help you protect</a> your info, money and give you peace of mind. See how we're dedicated to helping <a className="text-[#0060f0] underline cursor-pointer">protect you</a>, your accounts and your loved ones from <a className="text-[#0060f0] underline cursor-pointer">financial abuse</a>. Also, <a className="text-[#0060f0] underline cursor-pointer">learn about the common tricks scammers are using</a> to help you stay one step ahead of them. If you see unauthorized charges or believe your account was compromised contact us right away to <a className="text-[#0060f0] underline cursor-pointer">report fraud</a>.
            </p>
          </div>
        </div>

        {/* Columns row 3 */}
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">About Chase</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              Chase serves millions of people with a broad range of products. <a className="text-[#0060f0] underline cursor-pointer">Chase online</a> lets you manage your Chase accounts, view statements, monitor activity, pay bills or transfer funds securely from one central place. To learn more, visit the <a className="text-[#0060f0] underline cursor-pointer">Banking Education Center</a>. For questions or concerns, please contact <a className="text-[#0060f0] underline cursor-pointer">Chase customer service</a> or let us know about <a className="text-[#0060f0] underline cursor-pointer">Chase complaints and feedback</a>. View the <a className="text-[#0060f0] underline cursor-pointer">Chase Community Reinvestment Act Public File</a> for the bank's latest CRA rating and other CRA-related information.
            </p>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Investing by J.P. Morgan</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              Partner with a global leader who puts your financial needs first. <a className="text-[#0060f0] underline cursor-pointer">Invest on your own</a> or <a className="text-[#0060f0] underline cursor-pointer">work with an advisor</a> — we have the <a className="text-[#0060f0] underline cursor-pointer">products</a>, <a className="text-[#0060f0] underline cursor-pointer">technology</a> and <a className="text-[#0060f0] underline cursor-pointer">investment education</a>, to help you grow your wealth. Visit a J.P. Morgan <a className="text-[#0060f0] underline cursor-pointer">Wealth Management Branch</a> or check out our latest online investing <a className="text-[#0060f0] underline cursor-pointer">features</a>, <a className="text-[#0060f0] underline cursor-pointer">offers, promotions, and coupons</a>.
            </p>
            <p className="text-[10px] font-bold text-[#333] mt-3">INVESTMENT AND INSURANCE PRODUCTS ARE:</p>
            <ul className="text-[10px] font-bold text-[#333] mt-2 ml-4 list-disc space-y-1">
              <li>NOT FDIC INSURED</li>
              <li>NOT INSURED BY ANY FEDERAL GOVERNMENT AGENCY</li>
              <li>NOT A DEPOSIT OR OTHER OBLIGATION OF, OR GUARANTEED BY, JPMORGAN CHASE BANK, N.A. OR ANY OF ITS AFFILIATES</li>
              <li>SUBJECT TO INVESTMENT RISKS, INCLUDING POSSIBLE LOSS OF THE PRINCIPAL AMOUNT INVESTED</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[13px] font-bold text-[#333] mb-4 pb-2 border-b border-[#e8e8e8]">Chase Private Client</h4>
            <p className="text-[11.5px] text-[#333] leading-[1.6]">
              Get more from a personalized relationship offering <a className="text-[#0060f0] underline cursor-pointer">no everyday banking fees</a>, priority service from a <a className="text-[#0060f0] underline cursor-pointer">dedicated team</a> and <a className="text-[#0060f0] underline cursor-pointer">special perks and benefits</a>. Connect with a Chase Private Client Banker at your nearest <a className="text-[#0060f0] underline cursor-pointer">Chase branch</a> to learn about eligibility requirements and all available benefits.
            </p>
            <p className="text-[10px] font-bold text-[#333] mt-3">INVESTMENT AND INSURANCE PRODUCTS ARE:</p>
            <ul className="text-[10px] font-bold text-[#333] mt-2 ml-4 list-disc space-y-1">
              <li>NOT A DEPOSIT</li>
              <li>NOT FDIC INSURED</li>
              <li>NOT INSURED BY ANY FEDERAL GOVERNMENT AGENCY</li>
              <li>NO BANK GUARANTEE</li>
              <li>MAY LOSE VALUE</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="max-w-[1200px] mx-auto border-[#e8e8e8] mb-6" />

        {/* Bottom */}
        <div className="max-w-[1200px] mx-auto pb-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-8">
            <div className="flex flex-col gap-3">
              <span className="text-[12px] font-bold text-[#333]">Other Products & Services:</span>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[11px]">
                {["Deposit Account Agreements", "Mobile Banking", "Online Banking", "Student Center", "Zelle®"].map((t) => (
                  <a key={t} className="text-[#0060f0] cursor-pointer hover:underline underline-offset-2">{t}</a>
                ))}
              </div>
            </div>
            
            <div className="flex gap-5 items-center">
              {[FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn, FaPinterestP].map((Icon, i) => (
                <a key={i} className="text-[#555] hover:text-[#0060f0] transition-colors cursor-pointer text-[18px]">
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 text-[10.5px] text-[#555] leading-[1.6]">
            <div className="flex-1">
              "Chase," "JPMorgan," "JPMorganChase," the JPMorgan Chase logo and the Octagon Symbol are trademarks of JPMorgan Chase Bank, N.A. JPMorgan Chase Bank, N.A. is a wholly-owned subsidiary of JPMorgan Chase & Co.
            </div>
            
            <div className="flex-1">
              Bank deposit accounts, such as checking and savings, may be subject to approval. Deposit products and related services are offered by JPMorgan Chase Bank, N.A. Member FDIC.
            </div>

            <div className="flex-[1.5] flex flex-col gap-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {["Customer Service", "J.P. Morgan", "JPMorganChase", "Media Center", "Careers"].map(t => (
                  <a key={t} className="cursor-pointer hover:underline underline-offset-2">{t}</a>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {["Site Map", "Privacy", "Security", "Terms of Use", "Accessibility", "AdChoices"].map(t => (
                  <a key={t} className="cursor-pointer hover:underline underline-offset-2">{t}</a>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
                <a onClick={() => navigate("/admin-login")} className="cursor-pointer hover:underline underline-offset-2 text-[#0060f0] font-medium">Admin Login</a>
                <a className="cursor-pointer hover:underline underline-offset-2">Give feedback</a>
                <span className="text-[#555]">Member FDIC</span>
                <span className="flex items-center gap-1.5"><Home size={12} className="text-[#555]" /> Equal Housing Opportunity</span>
              </div>
            </div>
          </div>

          <div className="text-[10.5px] text-[#555] mt-12">
            © 2026 JPMorgan Chase & Co.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChaseLandingPage;
