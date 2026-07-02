import { LayoutDashboard, Package, LogOut, X, ShoppingBag, Users, Images } from "lucide-react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import LogoutModal from "../../ui/LogoutModal";
import Modal from "../../ui/Modal";

const NAV_ITEMS = [
  { path: "/admin-login/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/admin-login/users", label: "Manage Users", icon: Users },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {


  const [logoutview, setLogoutView] = useState(false);

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-[#004c8f] text-white flex flex-col transition-transform duration-300
          lg:relative lg:translate-x-0 lg:shrink-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center justify-between px-6 py-1 border-b border-white/10"
        >
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center overflow-hidden">
              <img
                src="/mylogo.png"
                alt="Logo"
                className="w-full h-full object-contain"
                onError={(e) => { e.target.style.display = "none"; }}
              />
            </div>
            <div>
              <p className="text-md font-extrabold tracking-wide leading-tight uppercase">CHASE ADMIN</p>
            </div>
          </div>

          <button
            className="lg:hidden p-1.5 hover:bg-white/10 rounded-lg transition"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={18} />
          </button>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV_ITEMS.map(({ path, label, icon: Icon }, i) => (
            <motion.div
              key={path}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.3, ease: "easeOut" }}
            >
              <NavLink
                to={path}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all
                  ${isActive
                    ? "bg-white text-[#004c8f] shadow-sm"
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                  }`
                }
              >
                <Icon size={18} />
                {label}
              </NavLink>
            </motion.div>
          ))}
        </nav>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
          className="px-4 pb-6"
        >
          <motion.button
            whileHover={{ backgroundColor: "red" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setLogoutView(true)}

            className="w-full flex cursor-pointer items-center gap-3 px-4 py-2.5 bg-red-600 rounded-xl text-sm font-medium text-white"
          >
            <LogOut size={18} />
            Logout
          </motion.button>
        </motion.div>
        <Modal
          isOpen={logoutview}
          onClose={() => setLogoutView(false)}
          title=""
          size="sm">
          <LogoutModal onClose={() => setLogoutView(false)} />
        </Modal>
      </aside>
    </>
  );
};

export default Sidebar;