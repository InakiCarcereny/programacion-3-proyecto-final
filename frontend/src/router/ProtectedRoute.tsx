import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
  role?: string;
}

function ProtectedRoute({ role }: ProtectedRouteProps): JSX.Element {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
