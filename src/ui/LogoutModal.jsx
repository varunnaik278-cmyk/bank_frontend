import { LogOut, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LogoutModal = ({ onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/admin");
  };

  return (
    <div className="w-full">
      <div className="mt-4 text-center">
        <h2 className="text-lg font-semibold text-slate-800">
          Logout Account
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Are you sure you want to logout from your account?
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button
          onClick={onClose}
          className="h-11 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-sm font-medium text-slate-700"
        >
          Cancel
        </button>

        <button
          onClick={handleLogout}
          className="h-11 rounded-xl bg-red-600 hover:bg-red-700 text-white text-sm font-semibold"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default LogoutModal;