import { useAuth } from "../context/AuthContext";

const ProfileModal = () => {
  const { admin } = useAuth();

  const initials = admin?.name
    ? admin.name.charAt(0).toUpperCase()
    : "A";

  return (
    <div className="w-full bg-white rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-linear-to-r from-blue-600 to-blue-500 h-20 relative">
        <div className="absolute left-1/2 -bottom-8 -translate-x-1/2">
          <div className="w-16 h-16 rounded-full bg-white p-1 shadow-md">
            <div className="w-full h-full rounded-full bg-blue-100 flex items-center justify-center text-xl font-bold text-blue-700">
              {initials}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="pt-10 pb-5 px-5 text-center">
        <h2 className="text-lg font-bold text-slate-800">
          {admin?.name || "Admin"}
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {admin?.email}
        </p>

        <div className="mt-3 inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
          Administrator
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;