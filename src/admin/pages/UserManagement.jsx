import React, { useState, useEffect } from "react";
import { Plus, Search, Edit, Trash2, DollarSign, Activity } from "lucide-react";
import { toast } from "react-hot-toast";
import { useAdmin } from "../../context/AdminContext";

import UserFormModal from "../components/UserFormModal";
import TransactionModal from "../components/TransactionModal";
import AdminBalanceModal from "../components/AdminBalanceModal";
import Modal from "../../ui/Modal";

const UserManagement = () => {
  const { users, loading, fetchUsers, deleteUser } = useAdmin();

  const [search, setSearch] = useState("");

  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false);
  const [isBalanceModalOpen, setIsBalanceModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      const result = await fetchUsers();
      if (!result.success) {
        toast.error(result.message || "Failed to fetch users");
      }
    };
    loadUsers();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    const result = await deleteUser(id);
    if (result.success) {
      toast.success(result.message || "User deleted successfully");
      fetchUsers();
    } else {
      toast.error(result.message || "Failed to delete user");
    }
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setIsUserModalOpen(true);
  };

  const openCreateModal = () => {
    setSelectedUser(null);
    setIsUserModalOpen(true);
  };

  const openTransactionModal = (user) => {
    setSelectedUser(user);
    setIsTransactionModalOpen(true);
  };

  const openBalanceModal = (user) => {
    setSelectedUser(user);
    setIsBalanceModalOpen(true);
  };

  const filteredUsers = users.filter((u) =>
    u.fullName?.toLowerCase().includes(search.toLowerCase()) ||
    u.userId?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#004c8f]">Business Account Management</h1>
          <p className="text-slate-500 text-sm mt-1">
            Manage all corporate banking accounts, update details, and post transactions.
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-[#004c8f] hover:bg-blue-800 text-white px-5 py-2.5 rounded-lg font-medium transition shadow-sm"
        >
          <Plus size={18} />
          Create New User
        </button>
      </div>

      {/* Filters/Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />
          <input
            type="text"
            placeholder="Search by company name, ID, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004c8f] focus:border-transparent transition"
          />
        </div>
        <div className="text-sm text-slate-500 font-medium">
          Total Users: <span className="text-[#004c8f] font-bold">{filteredUsers.length}</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4">Company Name</th>
                <th className="px-6 py-4">User ID</th>
                <th className="px-6 py-4">Account No</th>
                <th className="px-6 py-4">Balance ($)</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    <Activity className="animate-spin inline-block mr-2" size={20} />
                    Loading users...
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                    No users found matching your search.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50/80 transition group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {user.bankLogo ? (
                          <img
                            src={user.bankLogo}
                            alt={user.bankName}
                            className="w-8 h-8 rounded-full object-cover border border-slate-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">
                            {user.fullName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <p className="font-semibold text-slate-800">{user.fullName}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-700">{user.userId}</td>
                    <td className="px-6 py-4 text-slate-600">{user.accountNumber || "N/A"}</td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#004c8f]">${user.currentBalance?.toLocaleString() || "0"}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          user.isActive
                            ? "bg-green-100 text-green-700 border border-green-200"
                            : "bg-red-100 text-red-700 border border-red-200"
                        }`}
                      >
                        {user.isActive ? "Active" : "Disabled"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          onClick={() => openBalanceModal(user)}
                          title="Check Balance"
                          className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-md transition border border-transparent hover:border-indigo-200"
                        >
                          <Activity size={18} />
                        </button>
                        <button
                          onClick={() => openTransactionModal(user)}
                          title="Post Transaction"
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-md transition border border-transparent hover:border-green-200"
                        >
                          <DollarSign size={18} />
                        </button>
                        <button
                          onClick={() => openEditModal(user)}
                          title="Edit User"
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-md transition border border-transparent hover:border-blue-200"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          title="Delete User"
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-md transition border border-transparent hover:border-red-200"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isUserModalOpen}
        onClose={() => setIsUserModalOpen(false)}
        title={selectedUser ? "Edit User Details" : "Create New User"}
        size="2xl"
      >
        <UserFormModal
          user={selectedUser}
          onClose={() => setIsUserModalOpen(false)}
          onSuccess={fetchUsers}
        />
      </Modal>

      <Modal
        isOpen={isTransactionModalOpen}
        onClose={() => setIsTransactionModalOpen(false)}
        title="Post Transaction"
        size="md"
      >
        <TransactionModal
          user={selectedUser}
          onClose={() => setIsTransactionModalOpen(false)}
          onSuccess={fetchUsers}
        />
      </Modal>

      {isBalanceModalOpen && (
        <AdminBalanceModal 
          user={selectedUser} 
          onClose={() => setIsBalanceModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default UserManagement;
