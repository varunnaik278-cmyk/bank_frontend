import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AdminRoutes from "./admin.routes";
import UserRoutes from "./user.routes";


// Test 
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default Route */}
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />
        {AdminRoutes}
        {UserRoutes}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;