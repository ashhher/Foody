import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage, AuthCallbackPage, UserProfilePage } from "@/pages";
import { ProtectedRoute } from "@/auth";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      {/* auth protected route */}
      <Route element={<ProtectedRoute />}>
        <Route path="/user-profile" element={<UserProfilePage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
