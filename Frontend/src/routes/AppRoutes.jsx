import { Routes, Route } from "react-router-dom";

import Home from "../pages/home/Home";
import Explore from "../pages/explore/Explore";
import PlaceDetail from "../pages/explore/PlaceDetail";

import AddPlace from "../pages/admin/AddPlace";
import AdminDashboard from "../pages/admin/AdminDashboard";
import DeletePlace from "../pages/admin/DeletePlace";
import EditPlace from "../pages/admin/EditPlace";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Planner from "../pages/planner/Planner";
import AIGuide from "../pages/guide/AIGuide";

import Guides from "../pages/guide/Guides";
import GuideDetails from "../pages/guide/GuideDetails";

import ToiManager from "../components/admin/ToiManager";
import Preferences from "../pages/preferences/Preferences";

import AdminRoute from "./AdminRoute";
import MyGuideBookings from "../pages/guide/MyGuideBookings";
import GuideBookingRequests from "../pages/guide/GuideBookingRequests";
import GuideManager from "../pages/admin/GuideManager";
import GuideForm from "../pages/admin/GuideForm";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Public routes */}
      <Route path="/" element={<Home />} />

      <Route path="/explore" element={<Explore />} />

      <Route
        path="/places/:id"
        element={<PlaceDetail />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/planner"
        element={<Planner />}
      />
    <Route
  path="/my-guide-requests"
  element={<MyGuideBookings />}
/>
      <Route
        path="/ai-guide"
        element={<AIGuide />}
      />

      {/* Local Guides */}
      <Route
        path="/guides"
        element={<Guides />}
      />

      <Route
        path="/guides/:id"
        element={<GuideDetails />}
      />

      {/* Preferences */}
      <Route
        path="/preferences"
        element={<Preferences />}
      />

      {/* Admin */}
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

      <Route
        path="/admin/tois"
        element={
          <AdminRoute>
            <ToiManager />
          </AdminRoute>
        }
      />
     <Route
  path="/guide-booking-requests"
  element={
    <AdminRoute>
      <GuideBookingRequests />
    </AdminRoute>
  }
/>
<Route
  path="/admin/guides"
  element={
    <AdminRoute>
      <GuideManager />
    </AdminRoute>
  }
/>
<Route
  path="/admin/guides/add"
  element={
    <AdminRoute>
      <GuideForm />
    </AdminRoute>
  }
/>

<Route
  path="/admin/guides/edit/:id"
  element={
    <AdminRoute>
      <GuideForm />
    </AdminRoute>
  }
/>


    </Routes>
  );
  
};


export default AppRoutes;