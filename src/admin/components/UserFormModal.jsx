import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { Upload, X } from "lucide-react";
import { useAdmin } from "../../context/AdminContext";

const UserFormModal = ({ user, onClose, onSuccess }) => {
  const { createUser, updateUser } = useAdmin();
  const isEditing = !!user;
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    fullName: "",
    userId: "",
    email: "",
    password: "",
    bankName: "State Bank of India",
    bankAddress: "",
    ifscCode: "SBIN0001234",
    accountNumber: "",
    pin: "",
    diamondPassword: "",
    currentBalance: 0,
    isActive: true,
  });

  const [bankLogo, setBankLogo] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        userId: user.userId || "",
        email: user.email || "",
        password: "", // Leave blank on edit unless changing
        bankName: user.bankName || "",
        bankAddress: user.bankAddress || "",
        ifscCode: user.ifscCode || "",
        accountNumber: user.accountNumber || "",
        pin: "", // Pins are not returned usually, so leave blank to not update
        diamondPassword: "",
        currentBalance: user.currentBalance || 0,
        isActive: user.isActive !== false,
      });
      if (user.bankLogo) setLogoPreview(user.bankLogo);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBankLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        // Update user (backend currently only supports JSON without logo update)
        const updateData = { ...formData };
        if (!updateData.password) delete updateData.password;
        if (!updateData.pin) delete updateData.pin;
        if (!updateData.diamondPassword) delete updateData.diamondPassword;

        const result = await updateUser(user._id, updateData);
        if (result.success) {
          toast.success(result.message || "User updated successfully");
          onSuccess();
          onClose();
        } else {
          toast.error(result.message || "Failed to update user");
        }
      } else {
        // Create user
        if (!formData.password || !formData.pin || !formData.diamondPassword) {
          toast.error("Password, PIN, and Diamond Password are required for new users.");
          setLoading(false);
          return;
        }

        const dataForm = new FormData();
        Object.keys(formData).forEach((key) => {
          dataForm.append(key, formData[key]);
        });
        if (bankLogo) {
          dataForm.append("bankLogo", bankLogo);
        }

        const result = await createUser(dataForm);

        if (result.success) {
          toast.success(result.message || "User created successfully");
          onSuccess();
          onClose();
        } else {
          toast.error(result.message || "Failed to create user");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Business Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#004c8f] uppercase tracking-wider border-b border-blue-100 pb-2">
            Business Details
          </h3>
          
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Company Name *</label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Email Address *</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Business Address *</label>
            <textarea
              name="bankAddress"
              required
              rows={2}
              value={formData.bankAddress}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">User ID *</label>
            <input
              type="text"
              name="userId"
              required
              value={formData.userId}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password {isEditing && <span className="text-slate-400 font-normal">(Leave blank to keep current)</span>}
            </label>
            <input
              type="password"
              name="password"
              required={!isEditing}
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
            />
          </div>
        </div>

        {/* Bank & Security Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-[#004c8f] uppercase tracking-wider border-b border-blue-100 pb-2">
            Bank & Security
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account Number</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">IFSC Code</label>
              <input
                type="text"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                4-Digit PIN {isEditing && "*"}
              </label>
              <input
                type="text"
                name="pin"
                maxLength="4"
                required={!isEditing}
                value={formData.pin}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Diamond PIN {isEditing && "*"}
              </label>
              <input
                type="text"
                name="diamondPassword"
                maxLength="4"
                required={!isEditing}
                value={formData.diamondPassword}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Opening Balance ($)</label>
            <input
              type="number"
              name="currentBalance"
              value={formData.currentBalance}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent"
            />
          </div>

          {!isEditing && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Bank Logo (Optional)</label>
              <div 
                className="border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center text-slate-500 hover:bg-slate-50 transition cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {logoPreview ? (
                  <div className="relative">
                    <img src={logoPreview} alt="Preview" className="h-12 object-contain" />
                    <button
                      type="button"
                      onClick={(e) => { e.stopPropagation(); setBankLogo(null); setLogoPreview(""); }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={20} className="mb-2 text-slate-400" />
                    <span className="text-xs">Click to upload logo</span>
                  </>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
            </div>
          )}

          <div className="flex items-center gap-2 mt-4 pt-2">
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="w-4 h-4 text-[#004c8f] rounded focus:ring-[#004c8f]"
            />
            <label htmlFor="isActive" className="text-sm font-medium text-slate-700">
              Account is Active
            </label>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg font-medium transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#004c8f] hover:bg-blue-800 text-white rounded-lg font-medium transition flex items-center justify-center min-w-[120px]"
        >
          {loading ? "Saving..." : isEditing ? "Update User" : "Create User"}
        </button>
      </div>
    </form>
  );
};

export default UserFormModal;
