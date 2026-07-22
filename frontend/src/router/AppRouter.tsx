import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/login-page/LoginPage";
import RegisterPage from "../pages/auth/register-page/RegisterPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ProductsPage from "../pages/products/ProductsPage";
import CategoriesPage from "../pages/categories/CategoriesPage";
import MovementsPage from "../pages/movements/MovementsPage";
import UsersPage from "../pages/users/UsersPage";
import ProfilePage from "../pages/profile/ProfilePage";
import ProtectedRoute from "./ProtectedRoute";
import type { JSX } from "react/jsx-runtime";

function AppRouter(): JSX.Element {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/movements" element={<MovementsPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Only admin */}
        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/users" element={<UsersPage />} />
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default AppRouter;
