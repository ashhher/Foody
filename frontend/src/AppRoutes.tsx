import { Route, Routes, Navigate } from "react-router-dom";
import {
  HomePage,
  AuthCallbackPage,
  UserProfilePage,
  ManageRestaurantPage,
  SearchPage,
} from "@/pages";
import { ProtectedRoute } from "@/auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/search/:city" element={<SearchPage />} />
      {/* auth protected route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<UserProfilePage />} />
        <Route path="/manage-restaurant" element={<ManageRestaurantPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
