import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

interface ProtectedRouteProps {
  allowedRoles?: Array<"employee" | "admin">;
  children: React.ReactElement;
}

const normalizeRole = (role?: string) => (role ? role.toString().toLowerCase() : "");

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const { isAuthenticated, user } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0) {
    const userRole = normalizeRole(user?.role);
    const allowed = allowedRoles.map((r) => r.toLowerCase());
    if (!allowed.includes(userRole)) {
      // If authenticated but role not allowed, send to home or a 403 page
      return <Navigate to="/" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
