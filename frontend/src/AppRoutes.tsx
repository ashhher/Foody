import { Route, Routes, Navigate } from "react-router-dom";
import { HomePage, AuthCallbackPage, UserProfilePage } from "@/pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/auth-callback" element={<AuthCallbackPage />} />
      <Route path="/user-profile" element={<UserProfilePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
