import { Route } from "react-router-dom";
import UserProtectedRoute from "./userProtected.route";
import ProfileDetails from "../user/Pages/ProfileDetails";
import ChaseLandingPage from "../user/Pages/ChaseLandingPage";
import ChaseBusinessLandingPage from "../user/Pages/ChaseBusinessLandingPage";
import ChaseBusinessLoginPage from "../user/Pages/ChaseBusinessLoginPage";

const UserRoutes = (
  <>
    {/* Landing / Login */}
    <Route path="/login" element={<ChaseLandingPage />} />
    <Route path="/business" element={<ChaseBusinessLandingPage />} />
    <Route path="/business/login" element={<ChaseBusinessLoginPage />} />

    {/* Protected */}
    <Route element={<UserProtectedRoute />}>
      <Route path="/profile" element={<ProfileDetails />} />
    </Route>
  </>
);

export default UserRoutes;