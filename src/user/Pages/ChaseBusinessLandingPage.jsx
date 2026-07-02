
import { Search, ChevronDown, MessageCircle, ArrowRight, Home } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn, FaPinterestP } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ChaseBusinessLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white font-sans text-[#333]">
      {/* ══════════ TOP NAV ══════════ */}
      <div className="border-b border-[#e8e8e8]">
        <div className="max-w-[1400px] mx-auto px-6 py-2 flex justify-between items-center text-[13px]">
          <div className="flex gap-6">
            <button onClick={() => navigate("/login")} className="hover:underline text-[#333] cursor-pointer">Personal</button>
            <a href="#" className="font-bold border-b-[3px] border-[#0060f0] pb-1.5 -mb-[10px] text-[#333]">Business</a>
            <a href="#" className="hover:underline text-[#333]">Commercial</a>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#" className="hover:underline flex items-center gap-1 text-[#333]">Customer service <ChevronDown size={14} /></a>
            <a href="#" className="hover:underline text-[#333]">Español</a>
            <button className="text-[#333] hover:text-[#0060f0]"><Search size={18} /></button>
          </div>
        </div>
      </div>

      {/* ══════════ MAIN HEADER ══════════ */}
      <header className="max-w-[1400px] mx-auto px-6 py-4 flex justify-between items-center bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
          <img 
            src="https://www.chase.com/content/dam/unified-assets/logo/chase/chase-logo/additional-file-formats/logo_chase_headerfooter.svg" 
            alt="Chase Logo" 
            className="h-6 filter brightness-0" 
          />
          <span className="text-xl font-bold tracking-tight text-[#333]">for BUSINESS</span>
          <span className="text-[10px] font-bold align-top ml-0.5">SM</span>
        </div>
        
        <nav className="hidden lg:flex items-center gap-6 text-[15px] font-medium text-[#444]">
          <a href="#" className="hover:underline decoration-2 underline-offset-4">Checking & more</a>
          <a href="#" className="hover:underline decoration-2 underline-offset-4">Loans & financing</a>
          <a href="#" className="hover:underline decoration-2 underline-offset-4">Accept credit/debit cards</a>
          <a href="#" className="hover:underline decoration-2 underline-offset-4">Business credit cards</a>
          <a href="#" className="hover:underline decoration-2 underline-offset-4">Help & support</a>
          <a href="#" className="hover:underline decoration-2 underline-offset-4">Resource center</a>
        </nav>

        <button 
          onClick={() => navigate("/business/login")}
          className="bg-[#0060f0] hover:bg-[#004dcf] text-white px-5 py-2 rounded text-[15px] font-medium transition-colors cursor-pointer"
        >
          Sign in
        </button>
      </header>

      {/* ══════════ HERO SECTION ══════════ */}
      <section className="bg-[#022851] text-white">
        <div className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Hero Left (Text & Image) */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-4xl lg:text-5xl font-light mb-5 tracking-tight">Chase for Business</h1>
            <p className="text-[17px] leading-relaxed mb-10 max-w-lg">
              From banking to payment acceptance to credit cards and local support, we offer flexible solutions to help you go far.
            </p>
            <div className="relative w-full h-[300px] lg:h-[400px] rounded-sm overflow-hidden">
              <img 
                src="B0925-6361900_Hero-600x400_FF.avif" 
                alt="Warehouse worker" 
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Hero Middle (Promo Card 1) */}
          <div className="lg:col-span-3 bg-white text-[#333] p-4 flex flex-col h-full shadow-lg">
            <div className="bg-[#0060f0] text-white p-6 text-center border-y-8 border-white shadow-[0_0_0_2px_#022851] mb-6">
              <h2 className="text-[26px] font-medium leading-tight">Earn up to</h2>
              <div className="text-[60px] font-bold leading-none my-1">$500</div>
            </div>
            <div className="px-2 flex-1 flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#666] mb-3">NEW BUSINESS CUSTOMERS</p>
              <h3 className="text-xl font-semibold mb-3">Keep moving forward with Chase</h3>
              <p className="text-[14px] text-[#555] mb-6 flex-1">
                Open a new Chase Business Complete Checking® account with qualifying activities.
              </p>
              <button className="bg-[#0060f0] hover:bg-[#004dcf] text-white w-full py-2.5 rounded text-[15px] font-medium transition-colors cursor-pointer">
                Open account
              </button>
            </div>
          </div>

          {/* Hero Right (Promo Card 2) */}
          <div className="lg:col-span-3 bg-white text-[#333] flex flex-col h-full shadow-lg">
            <img 
              src="pos-tap-to-pay-bakery-rt.avif" 
              alt="Payment terminal" 
              className="w-full h-[220px] object-cover p-2 pb-0"
            />
            <div className="px-6 py-6 flex-1 flex flex-col">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#666] mb-3">PAYMENT SOLUTIONS</p>
              <h3 className="text-[19px] font-semibold mb-3 leading-tight">Accept payments anytime, anywhere</h3>
              <p className="text-[14px] text-[#555] mb-6 flex-1 leading-relaxed">
                Make sure you're prepared for every sale, wherever your customers want to pay. Process credit cards anywhere in the U.S.
              </p>
              <button className="bg-[#0060f0] hover:bg-[#004dcf] text-white w-full py-2.5 rounded text-[15px] font-medium transition-colors cursor-pointer">
                Learn more
              </button>
            </div>
          </div>
          
        </div>
      </section>

      {/* ══════════ QUICK FINDER SECTION ══════════ */}
      <section className="bg-white py-20 px-6 border-b border-[#e8e8e8]">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl font-medium mb-12">Let us help you find what you're looking for</h2>
          
          <div className="flex flex-col gap-6 max-w-[600px] mx-auto">
            <div className="flex items-center gap-4 text-left">
              <span className="w-32 font-bold text-[#333] text-[15px] text-right">I am looking for</span>
              <div className="flex-1 relative border-b border-dashed border-[#ccc] pb-1">
                <select className="w-full appearance-none bg-transparent text-[#0060f0] font-medium text-[16px] outline-none cursor-pointer">
                  <option>Choose an option</option>
                  <option>Business checking accounts</option>
                  <option>Business credit cards</option>
                  <option>Payment processing</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0060f0]" size={16} />
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-left">
              <span className="w-32 font-bold text-[#333] text-[15px] text-right">to</span>
              <div className="flex-1 relative border-b border-dashed border-[#ccc] pb-1">
                <select className="w-full appearance-none bg-transparent text-[#0060f0] font-medium text-[16px] outline-none cursor-pointer">
                  <option>Choose an option</option>
                  <option>Manage everyday expenses</option>
                  <option>Earn rewards</option>
                  <option>Take payments from customers</option>
                </select>
                <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0060f0]" size={16} />
              </div>
            </div>

            <div className="mt-8 pt-10 border-t border-dashed border-[#ccc]">
              <button className="bg-[#999] text-white px-8 py-2.5 rounded text-[15px] font-medium cursor-not-allowed">
                Explore solutions
              </button>
            </div>
          </div>

          <p className="text-[11px] text-[#666] mt-12 max-w-3xl mx-auto">
            Recommendations will show up here once your selections are made. Some or all documents, services, web pages or correspondence may be available in English only.
          </p>
        </div>
      </section>

      {/* ══════════ OFFERINGS GRID ══════════ */}
      <section className="bg-white py-20 px-6 border-b border-[#e8e8e8]">
        <div className="max-w-[1400px] mx-auto">
          <h2 className="text-3xl font-medium mb-12 max-w-2xl">
            Or, get started with some of our business banking offerings and solutions
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Card 1 */}
            <div className="flex flex-col">
              <img 
                src="https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80" 
                alt="Credit Card" 
                className="w-full h-[180px] object-cover mb-4"
              />
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#666] mb-3">INK BUSINESS PREFERRED®</p>
              <h3 className="text-xl font-bold mb-3 leading-tight">
                New Offer: Earn <span className="line-through font-normal text-[#666]">90,000</span> <br/>100,000 bonus points
              </h3>
              <p className="text-[12px] text-[#555] mb-6 flex-1 leading-relaxed">
                Plus, earn 3x points on eligible shipping and select business categories with Ink Business Preferred®. Terms apply.
              </p>
              <button className="bg-[#0060f0] hover:bg-[#004dcf] text-white w-full max-w-[180px] py-2 rounded text-[15px] font-medium transition-colors cursor-pointer">
                See details
              </button>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80" 
                alt="Payment Terminal" 
                className="w-full h-[180px] object-cover mb-4"
              />
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#666] mb-3">PAYMENT SOLUTIONS</p>
              <h3 className="text-[19px] font-semibold mb-3 leading-tight">Accept payments anytime, anywhere</h3>
              <p className="text-[12px] text-[#555] mb-6 flex-1 leading-relaxed">
                Make sure you're prepared for every sale, wherever your customers want to pay. Process credit cards anywhere in the U.S.
              </p>
              <button className="bg-[#0060f0] hover:bg-[#004dcf] text-white w-full max-w-[180px] py-2 rounded text-[15px] font-medium transition-colors cursor-pointer">
                Learn more
              </button>
            </div>

            {/* Card 3 */}
            <div className="flex flex-col">
              <div className="w-full h-[180px] bg-gradient-to-br from-slate-200 to-slate-300 relative mb-4 p-4 flex flex-col justify-center items-center text-center">
                <span className="bg-[#022851] text-white text-[10px] font-bold px-2 py-1 tracking-widest absolute top-2">NEW CARDMEMBER OFFER</span>
                <div className="mt-4 text-[#333]">
                  <p className="text-sm font-semibold">Earn</p>
                  <p className="text-2xl font-bold"><span className="line-through font-normal text-sm">150,000</span> 200,000</p>
                  <p className="text-sm font-semibold">bonus points</p>
                </div>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#666] mb-3">SAPPHIRE RESERVE FOR BUSINESS℠</p>
              <h3 className="text-[19px] font-semibold mb-3 leading-tight">Enjoy $7,000+ in value your first year</h3>
              <p className="text-[12px] text-[#555] mb-6 flex-1 leading-relaxed">
                Plus, earn 8x points on Chase Travel℠ and take advantage of our airport lounge network. Terms apply.
              </p>
              <button className="bg-[#0060f0] hover:bg-[#004dcf] text-white w-full max-w-[180px] py-2 rounded text-[15px] font-medium transition-colors cursor-pointer">
                See details
              </button>
            </div>

            {/* Card 4 */}
            <div className="flex flex-col">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80" 
                alt="Colleagues working" 
                className="w-full h-[180px] object-cover mb-4"
              />
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#666] mb-3">KNOWLEDGE CENTER</p>
              <h3 className="text-[19px] font-semibold mb-3 leading-tight">Explore the Knowledge Center</h3>
              <p className="text-[12px] text-[#555] mb-6 flex-1 leading-relaxed">
                View articles, videos and more to help you start, manage or grow your business.
              </p>
              <button className="bg-[#0060f0] hover:bg-[#004dcf] text-white w-full max-w-[180px] py-2 rounded text-[15px] font-medium transition-colors cursor-pointer mt-auto">
                Continue
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════ AWARDS & QUICK LINKS ══════════ */}
      <section className="bg-white py-20 px-6 border-b border-[#e8e8e8]">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          
          <div>
            <h2 className="text-3xl font-medium mb-6 leading-tight">Ranked #1 in small business online banking <sup className="text-lg text-[#0060f0]">1</sup></h2>
            <p className="text-[17px] font-semibold mb-10 leading-relaxed text-[#333]">
              The Chase for Business online banking platform earned this distinction for offering the most comprehensive set of online banking features deemed important by small business users.
            </p>
            <p className="text-[11px] text-[#666] mb-6">by Barlow Research Associates, Inc.</p>
            <a href="#" className="text-[#0060f0] font-semibold hover:underline">Learn more</a>
          </div>

          <div className="flex flex-col gap-8 border-l-2 border-[#0060f0] pl-8">
            <div>
              <h3 className="text-xl font-bold mb-3">Business Checking</h3>
              <p className="text-[14px] text-[#555] mb-3 leading-relaxed">
                Whatever your business size or industry, we offer checking solutions that are built to meet your needs, support your visions, and keep you moving forward.
              </p>
              <a href="#" className="text-[#0060f0] font-medium text-sm flex items-center gap-1 hover:underline">Continue <ArrowRight size={14} /></a>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Payment Solutions</h3>
              <p className="text-[14px] text-[#555] mb-3 leading-relaxed">
                A complete suite of merchant services to accept credit cards, made simple and secure.
              </p>
              <a href="#" className="text-[#0060f0] font-medium text-sm flex items-center gap-1 hover:underline">Continue <ArrowRight size={14} /></a>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-3">Business Credit Cards</h3>
              <p className="text-[14px] text-[#555] mb-3 leading-relaxed">
                Find the best business credit card for you. Get rewarded on expenses with new cardmember bonus offers, and by earning cash back rewards, airline miles, or credit card reward points on all your business purchases.
              </p>
              <a href="#" className="text-[#0060f0] font-medium text-sm flex items-center gap-1 hover:underline">Continue <ArrowRight size={14} /></a>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════ LINKEDIN BANNER ══════════ */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-[1200px] mx-auto bg-[#022851] rounded-lg overflow-hidden flex flex-col md:flex-row shadow-xl relative">
          
          <div className="absolute top-0 right-0 bottom-0 w-1/2 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 -translate-y-1/2 right-10 w-[500px] h-[500px] border-[1px] border-white/20 rounded-full" />
            <div className="absolute top-1/2 -translate-y-1/2 -right-10 w-[600px] h-[600px] border-[1px] border-white/10 rounded-full" />
          </div>

          <div className="w-full md:w-1/2 p-12 lg:p-16 flex flex-col justify-center text-white relative z-10">
            <h2 className="text-3xl font-semibold mb-6 leading-tight">Join our LinkedIn<br/>community</h2>
            <p className="text-[15px] mb-6 leading-relaxed text-white/90">
              Get news and insights to guide your business journey by following us on LinkedIn.
            </p>
            <p className="text-[13px] mb-8 text-white/80">
              Explore our helpful content today.
            </p>
            <button className="bg-[#0060f0] hover:bg-[#004dcf] text-white max-w-[160px] py-2.5 rounded font-semibold transition-colors cursor-pointer">
              Follow us
            </button>
          </div>

          <div className="w-full md:w-1/2 p-10 flex items-center justify-center relative z-10 bg-[#022851]">
             <div className="bg-[#0060f0] rounded-2xl p-10 text-center shadow-2xl relative">
                <p className="text-white text-xl font-medium mb-2">Follow us on</p>
                <h3 className="text-white text-5xl font-bold mb-4 tracking-tight">LinkedIn</h3>
                <div className="bg-white text-[#0060f0] text-sm font-bold py-1.5 px-4 rounded-full inline-block">
                  @Chase for Business
                </div>
                {/* Speech bubble tail */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-[#0060f0] rotate-45 transform origin-top-left -z-10" />
             </div>
          </div>

        </div>
      </section>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="bg-white border-t-[3px] border-[#0a3778] pt-12 pb-16 px-6">
        <div className="max-w-[1400px] mx-16">
          {/* Logo */}
          <div className="flex flex-col items-start mb-10 select-none">
            <img 
              src="https://www.chase.com/content/dam/unified-assets/logo/chase/chase-logo/additional-file-formats/logo_chase_headerfooter.svg" 
              alt="Chase Logo" 
              className="h-6 filter brightness-0" 
            />
            <span className="text-lg font-bold tracking-tight text-[#333] mt-1">
              <span className="italic font-serif font-normal lowercase mr-0.5">for</span>BUSINESS<sup className="text-[9px] font-bold">®</sup>
            </span>
          </div>

          {/* Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {/* Column 1 */}
            <div className="flex flex-col gap-10">
              <div>
                <h4 className="text-[13px] font-bold text-[#333]">Business Checking</h4>
                <div className="w-8 h-[2px] bg-[#0a3778] mt-2 mb-3"></div>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  Chase offers a variety of <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">business checking accounts</a> for small, mid-sized and large businesses. Compare our <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">business checking solutions</a> to help you find the right checking account for you.
                </p>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#333]">Business Savings</h4>
                <div className="w-8 h-[2px] bg-[#0a3778] mt-2 mb-3"></div>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  Chase offers a variety of <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">business savings accounts</a> including Total Savings, Premier Savings and a <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">business CD</a>. <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">Compare savings accounts</a> to help you find the right business savings account for you.
                </p>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#333]">Retirement Plans</h4>
                <div className="w-8 h-[2px] bg-[#0a3778] mt-2 mb-3"></div>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  Help your employees plan, save, and invest for their future with <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">401(k) plan</a> solutions. J.P. Morgan's low cost retirement plans are built for you and your employees.
                </p>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col gap-10">
              <div>
                <h4 className="text-[13px] font-bold text-[#333]">Business Loans</h4>
                <div className="w-8 h-[2px] bg-[#0a3778] mt-2 mb-3"></div>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  Finance your small business with <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">business loans</a> from Chase. Find a variety of financing options including <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">SBA loans</a>, commercial financing and a <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">business line of credit</a> to invest in the future of your business.
                </p>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#333]">Business Debit Cards</h4>
                <div className="w-8 h-[2px] bg-[#0a3778] mt-2 mb-3"></div>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  A convenient way to pay and access ATMs – money is deducted right from your <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">business checking account</a>. Make deposits and withdrawals at the ATM with your <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">business debit card</a>.
                </p>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col gap-10">
              <div>
                <h4 className="text-[13px] font-bold text-[#333]">Business Credit Cards</h4>
                <div className="w-8 h-[2px] bg-[#0a3778] mt-2 mb-3"></div>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  Find and apply for the Chase for Business credit card best suited for your business. Compare the benefits of <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">Chase for Business credit cards</a>.
                </p>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#333]">Commercial Banking</h4>
                <div className="w-8 h-[2px] bg-[#0a3778] mt-2 mb-3"></div>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">Commercial Banking</a> provides credit, financing, treasury and payment solutions tailored for <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">large corporations</a>, <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">midsize businesses</a>, <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">startups in the innovation economy</a>, and to domestic and international industry leaders.
                </p>
              </div>
            </div>

            {/* Column 4 */}
            <div className="flex flex-col gap-10">
              <div>
                <h4 className="text-[13px] font-bold text-[#333]">Payment Solutions</h4>
                <div className="w-8 h-[2px] bg-[#0a3778] mt-2 mb-3"></div>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  Accept debit and credit cards with convenient <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">payment solutions</a> wherever you do business. Explore our <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">point-of-sale systems</a>, credit card terminals, invoicing solution and <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">payment gateway</a>. Read <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">reviews</a> from our merchants.
                </p>
              </div>
              <div>
                <h4 className="text-[13px] font-bold text-[#333]">Business Services</h4>
                <div className="w-8 h-[2px] bg-[#0a3778] mt-2 mb-3"></div>
                <p className="text-[12px] text-[#555] leading-relaxed">
                  We're here to help with your <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">business banking needs</a>. From <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">payment processing</a> to <a href="#" className="text-[#0060f0] underline hover:text-[#004dcf]">foreign exchange</a>, Chase Business Banking has solutions and services that work for you.
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-5 items-center mb-8">
            {[FaFacebookF, FaInstagram, FaXTwitter, FaYoutube, FaLinkedinIn, FaPinterestP].map((Icon, i) => (
              <a key={i} href="#" className="text-[#555] hover:text-[#0060f0] transition-colors cursor-pointer text-[18px]">
                <Icon />
              </a>
            ))}
          </div>

          {/* Bottom Copyright and Links */}
          <div className="flex flex-col lg:flex-row justify-between gap-8 lg:gap-12 text-[11px] text-[#555] leading-relaxed pt-6 border-t border-[#e8e8e8]">
            <div className="flex-1 max-w-[600px]">
              "Chase," "JPMorgan," "JPMorgan Chase & Co.," the JPMorgan Chase & Co. logo and the Octagon Symbol are trademarks of JPMorgan Chase Bank, N.A. JPMorgan Chase Bank, N.A. is a wholly-owned subsidiary of JPMorgan Chase & Co.
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#0060f0]">
                {["Customer Service", "J.P. Morgan", "JPMorganChase", "Media Center", "Careers"].map(t => (
                  <a key={t} href="#" className="cursor-pointer hover:underline underline-offset-2 font-medium">{t}</a>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-[#0060f0]">
                {["Site Map", "Privacy", "Security", "Terms of Use", "Accessibility", "AdChoices"].map(t => (
                  <a key={t} href="#" className="cursor-pointer hover:underline underline-offset-2 font-medium">{t}</a>
                ))}
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 items-center text-[#555]">
                <a href="#" className="cursor-pointer hover:underline underline-offset-2 text-[#0060f0] font-medium">Give feedback</a>
                <span>Member FDIC</span>
                <span className="flex items-center gap-1.5"><Home size={12} className="text-[#555]" /> Equal Housing Opportunity</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ChaseBusinessLandingPage;
