import React, { useState, useEffect } from "react";
import { Users, DollarSign, ArrowUpRight, ArrowDownRight, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useAdmin } from "../../context/AdminContext";

const AdminDashboard = () => {
  const { getDashboardStats } = useAdmin();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalBalance: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getDashboardStats();
        if (result.success && result.data.users) {
          const users = result.data.users;
          const totalUsers = users.length;
          const totalBalance = users.reduce((acc, user) => acc + (user.currentBalance || 0), 0);
          const totalDeposits = users.reduce((acc, user) => acc + (user.totalDeposit || 0), 0);
          const totalWithdrawals = users.reduce((acc, user) => acc + (user.totalWithdrawal || 0), 0);

          setStats({
            totalUsers,
            totalBalance,
            totalDeposits,
            totalWithdrawals,
          });
        } else {
          toast.error(result.message || "Failed to fetch dashboard statistics");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [getDashboardStats]);

  const statCards = [
    {
      title: "Total Customers",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Vault Balance",
      value: `$${stats.totalBalance.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Total Deposits",
      value: `$${stats.totalDeposits.toLocaleString()}`,
      icon: ArrowUpRight,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Withdrawals",
      value: `$${stats.totalWithdrawals.toLocaleString()}`,
      icon: ArrowDownRight,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#004c8f]">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm mt-1">
          Welcome to the CHASE ADMIN Control Panel. Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 transition hover:shadow-md"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">{stat.title}</p>
                <h3 className="text-2xl font-bold text-slate-800 mt-1">
                  {loading ? (
                    <Activity size={20} className="animate-spin text-slate-400" />
                  ) : (
                    stat.value
                  )}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100">
          <h3 className="text-lg font-semibold text-[#004c8f]">Quick Actions</h3>
        </div>
        <div className="p-6">
          <Link
            to="/admin/users"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#004c8f] hover:bg-blue-800 text-white font-medium rounded-lg transition shadow-sm"
          >
            <Users size={18} />
            Manage Customers & Transactions
          </Link>
          <p className="text-sm text-slate-500 mt-3 max-w-lg">
            Navigate to the User Management portal to register new bank accounts, view existing profiles, post manual deposits, and process withdrawals.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;