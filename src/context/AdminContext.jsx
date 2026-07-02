import React, { createContext, useContext, useState, useCallback } from "react";
import api from "../services/api";

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/user/all");
      if (data.success) {
        setUsers(data.data.users || []);
      }
      return data;
    } catch (error) {
      console.error("Fetch Users Error:", error);
      return { success: false, message: error.response?.data?.message || "Failed to fetch users" };
    } finally {
      setLoading(false);
    }
  }, []);

  const createUser = async (dataForm) => {
    try {
      const { data } = await api.post("/user/create", dataForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "An error occurred" };
    }
  };

  const updateUser = async (id, updateData) => {
    try {
      const { data } = await api.put(`/user/update/${id}`, updateData);
      return data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "An error occurred" };
    }
  };

  const deleteUser = async (id) => {
    try {
      const { data } = await api.delete(`/user/delete/${id}`);
      return data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "An error occurred" };
    }
  };

  const postTransaction = async (payload) => {
    try {
      const { data } = await api.post("/user/transaction", payload);
      return data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "An error occurred" };
    }
  };

  const adminCheckBalance = async (userId, diamondPassword) => {
    try {
      const { data } = await api.post("/user/admin/checkBalance", { userId, diamondPassword });
      return { success: true, balance: data.data.balance };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "An error occurred" };
    }
  };

  
  const getDashboardStats = async () => {
    try {
      const { data } = await api.get("/user/all");
      return data;
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "An error occurred" };
    }
  };

  return (
    <AdminContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
        createUser,
        updateUser,
        deleteUser,
        postTransaction,
        adminCheckBalance,
        getDashboardStats,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
