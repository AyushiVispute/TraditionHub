import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "../pages/home/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Explore from "../pages/explore/Explore";
import Planner from "../pages/planner/Planner";
import NotFound from "../pages/notfound/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Core Features */}
        <Route path="/explore" element={<Explore />} />
        <Route path="/planner" element={<Planner />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
