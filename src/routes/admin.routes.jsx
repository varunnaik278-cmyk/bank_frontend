import { Route } from "react-router-dom";

import AdminLayout from "../admin/layouts/AdminLayout";
import AdminDashboard from "../admin/pages/AdminDashboard";
import UserManagement from "../admin/pages/UserManagement";
import ProtectedRoute from "./protected.route";
import AdminLoginPage from "../admin/pages/AdminLoginPage";

const AdminRoutes = (
  <Route path="/admin">
    {/* Public Route */}
    <Route index element={<AdminLoginPage />} />

    {/* Protected Routes */}
    <Route element={<ProtectedRoute />}>
      <Route element={<AdminLayout />}>
        {/* Dashboard */}
        <Route path="dashboard" element={<AdminDashboard />} />
        {/* User Management */}
        <Route path="users" element={<UserManagement />} />
      </Route>
    </Route>
  </Route>
);

export default AdminRoutes;
