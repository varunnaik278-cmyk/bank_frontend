import { Outlet } from "react-router-dom";

const UserProtectedRoute = () => {
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default UserProtectedRoute