import { useAuth0 } from "@auth0/auth0-react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();

  // need to check if isLoading otherwise isAuthenticated will be false at first and will always redirect to home page
  if (isLoading) {
    return null;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to={"/"} replace />;
};

export default ProtectedRoute;
