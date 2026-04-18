import { Navigate, useLocation } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but not admin
  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // Admin access granted
  return children;
};

export default AdminRoute;

