import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authContext";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // sau <Spinner /> dacă vrei

  return isAuthenticated ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
