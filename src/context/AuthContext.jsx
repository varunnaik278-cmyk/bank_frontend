import { createContext, useContext, useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    try {
      const storedAdmin = localStorage.getItem("admin");

      if (!storedAdmin || storedAdmin === "undefined") {
        return null;
      }

      return JSON.parse(storedAdmin);
    } catch (error) {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    try {
      setLoading(true);

      const { data } = await api.post("/admin/login", {
        email,
        password,
      });

      if (data.success) {
        setAdmin(data.data.admin);

        localStorage.setItem(
          "admin",
          JSON.stringify(data.data.admin)
        );

        localStorage.setItem(
          "token",
          data.data.token
        );

        toast.success(data.message || "Login Successful");

        return {
          success: true,
          message: data.message,
        };
      }

      toast.error(data.message || "Login Failed");

      return {
        success: false,
        message: data.message,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Login Failed";

      toast.error(message);

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };
  const logout = async () => {
    try {
      await api.get("/admin/logout");

      toast.success("Logout Successful");
    } catch (error) {
      toast.error("Logout Failed");
      console.log(error);
    } finally {
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
      setAdmin(null);
    }
  };

  const userLogin = async (userId, password) => {
    try {
      setLoading(true);

      const { data } = await api.post("/user/login", {
        userId,
        password,
      });


      if (data.success) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.data.user)
        );

        localStorage.setItem(
          "userToken",
          data.data.token
        );

        return {
          success: true,
          message: data.message,
        };
      }

      return {
        success: false,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Login Failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const requestOtp = async (email) => {
    try {
      setLoading(true);

      const { data } = await api.post(
        "user/request-otp",
        { email }
      );

      if (data.success) {
        toast.success(
          data.message ||
          "OTP sent successfully"
        );

        return {
          success: true,
          message: data.message,
        };
      }

      toast.error(
        data.message ||
        "Failed to send OTP"
      );

      return {
        success: false,
        message: data.message,
      };
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Failed to send OTP";

      toast.error(message);

      return {
        success: false,
        message,
      };
    } finally {
      setLoading(false);
    }
  };

  const userLogout = async () => {
    try {
      await api.get("/user/logout");
      toast.success("Logout Successful");
    } catch (error) {
      toast.error("Logout Failed");
    } finally {
      localStorage.removeItem("user");
      localStorage.removeItem("userToken");
      window.location.href = "/";
    }
  };

  const verifyOtp = async (email, otp) => {
    try {
      setLoading(true);
      const { data } = await api.post("/user/verify-otp", { email, otp });
      if (data.success) {
        if (data.data?.token) {
          localStorage.setItem("userToken", data.data.token);
        }
        if (data.data?.user) {
          localStorage.setItem("user", JSON.stringify(data.data.user));
        }
        toast.success(data.message || "OTP verified successfully");
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "OTP Verification Failed" };
    } finally {
      setLoading(false);
    }
  };

  const getProfile = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/user/profile");
      if (data.success) {
        return { success: true, user: data.data.user };
      }
      return { success: false, message: data.message };
    } catch (error) {
      if (error.response?.status === 403) {
         return { success: false, locked: true, message: error.response?.data?.message };
      }
      return { success: false, message: error.response?.data?.message || "Failed to get profile" };
    } finally {
      setLoading(false);
    }
  };

  const checkBalance = async (userId, pin) => {
    try {
      setLoading(true);
      const { data } = await api.post("/user/checkBalance", { userId, pin });
      if (data.success) {
        return { success: true, balance: data.balance || data.data?.balance };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to check balance" };
    } finally {
      setLoading(false);
    }
  };
  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        login,
        logout,
        userLogin,
        userLogout,
        requestOtp,
        verifyOtp,
        getProfile,
        checkBalance,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return context;
};