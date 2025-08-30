import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = () => {
  const { token, role, loading } = useAuth();

  if (loading) return null;

  if (!token || !role || role.trim().toUpperCase() !== "ADMIN") {
    console.log("Redirecting to login. Role:", role);
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;