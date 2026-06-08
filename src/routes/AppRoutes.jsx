import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Foods from "../pages/Foods";
import FoodDetails from "../pages/FoodDetails";
import AddFood from "../pages/AddFood";
import EditFood from "../pages/EditFood";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import Favorites from "../pages/Favorites";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/foods" element={<Foods />} />

      <Route
        path="/foods/:id"
        element={<FoodDetails />}
      />

      <Route
        path="/add-food"
        element={
          <ProtectedRoute>
            <AddFood />
          </ProtectedRoute>
        }
      />

      <Route
        path="/edit-food/:id"
        element={
          <ProtectedRoute>
            <EditFood />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={<Favorites />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/logout"
        element={<Logout />}
      />
    </Routes>
  );
}

export default AppRoutes;