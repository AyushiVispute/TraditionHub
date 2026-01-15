import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Explore from "../pages/explore/Explore";
import PlaceDetail from "../pages/explore/PlaceDetail";
import AddPlace from "../pages/admin/AddPlace";
import Login from "../pages/auth/Login";
import AdminRoute from "./AdminRoute"; 
import Register from "../pages/auth/Register";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/places/:id" element={<PlaceDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />


      {/* 🔒 Admin-only route */}
      <Route
        path="/admin/add-place"
        element={
          <AdminRoute>
            <AddPlace />
          </AdminRoute>
        }
       />
    </Routes>
  );
};
 

export default AppRoutes;
