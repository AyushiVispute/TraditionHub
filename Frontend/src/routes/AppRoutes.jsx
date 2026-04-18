import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Explore from "../pages/explore/Explore";
import PlaceDetail from "../pages/explore/PlaceDetail";
import AddPlace from "../pages/admin/AddPlace";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import AdminRoute from "./AdminRoute";
import DeletePlace from "../pages/admin/DeletePlace";
import EditPlace from "../pages/admin/EditPlace";

const AppRoutes = () => {
  return (
    <Routes>

      {/* 🌍 Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/places/:id" element={<PlaceDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔒 Admin routes */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/add-place"
        element={
          <AdminRoute>
            <AddPlace />
          </AdminRoute>
        }
      />
      <Route
  path="/admin/delete-place/:id"
  element={
    <AdminRoute>
      <DeletePlace />
    </AdminRoute>
  }
/>
<Route
  path="/admin/edit/:id"
  element={
    <AdminRoute>
      <EditPlace />
    </AdminRoute>
  }
/>

    </Routes>
  );
};

export default AppRoutes;