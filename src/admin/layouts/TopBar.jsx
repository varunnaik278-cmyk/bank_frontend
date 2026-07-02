import {
  Menu,
  LogOut,
  Maximize,
  Minimize,
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Modal from "../../ui/Modal";
import ProfileModal from "../../ui/ProfileModal";
import LogoutModal from "../../ui/LogoutModal";
import { useAuth } from "../../context/AuthContext";


const TopBar = ({ setSidebarOpen }) => {
  const { admin } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [logoutview, setLogoutView] = useState(false);

  const dropdownRef = useRef(null);

  const [isFullscreen, setIsFullscreen] =
    useState(false);

  const initials = admin?.name
    ? admin.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
    : "A";

  // Fullscreen Toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Detect Fullscreen Change
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!document.fullscreenElement
      );
    };

    document.addEventListener(
      "fullscreenchange",
      handleFullscreenChange
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  // Close Dropdown Outside Click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(
          event.target
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <motion.header
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
      className="relative z-10 bg-white border-b border-slate-200 px-6 h-16 flex items-center justify-between shrink-0"
    >
      {/* Left */}
      <div className="flex items-center gap-3">
        <motion.button
          whileTap={{ scale: 0.92 }}
          className="lg:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu size={18} />
        </motion.button>

        <h1 className="text-sm md:text-base font-bold text-slate-800">
          Welcome,{" "}
          <span className="text-[#004c8f]">
            {admin?.name || "Admin"}
          </span>
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {/* Fullscreen */}
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={toggleFullscreen}
          className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition cursor-pointer"
        >
          {isFullscreen ? (
            <Minimize size={18} />
          ) : (
            <Maximize size={18} />
          )}
        </motion.button>

        {/* Profile */}
        <div
          className="relative"
          ref={dropdownRef}
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              setProfileOpen(!profileOpen)
            }
            className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-slate-50 transition cursor-pointer"
          >
            <div className="hidden sm:block text-right">
              <p className="text-[13px] font-semibold text-slate-800">
                {admin?.name || "Admin"}
              </p>

              <p className="text-[11px] text-slate-500">
                Administrator
              </p>
            </div>

            <div className="w-10 h-10 rounded-full bg-[#004c8f] border border-[#004c8f] flex items-center justify-center text-white font-semibold">
              {initials}
            </div>
          </motion.button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.2,
                }}
                className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden z-50"
              >
                {/* User Info */}
                <div className="px-4 py-4 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#004c8f] flex items-center justify-center text-white font-bold">
                    {initials}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {admin?.name || "Admin"}
                    </p>

                    <p className="text-xs text-slate-500">
                      {admin?.email}
                    </p>
                  </div>
                </div>

                {/* Profile */}
                <div className="p-2">
                  <button
                    onClick={() =>
                      setOpen(true)
                    }
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-700 transition"
                  >
                    My Profile
                  </button>
                </div>

                {/* Logout */}
                <div className="border-t border-slate-100 p-2">
                  <button
                    onClick={() =>
                      setLogoutView(true)
                    }
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 text-sm font-medium transition"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Profile Modal */}
          <Modal
            isOpen={open}
            onClose={() => setOpen(false)}
            title=""
            size="md"
          >
            <ProfileModal />
          </Modal>

          {/* Logout Modal */}
          <Modal
            isOpen={logoutview}
            onClose={() =>
              setLogoutView(false)
            }
            title=""
            size="sm"
          >
            <LogoutModal
              onClose={() =>
                setLogoutView(false)
              }
            />
          </Modal>
        </div>
      </div>
    </motion.header>
  );
};

export default TopBar;