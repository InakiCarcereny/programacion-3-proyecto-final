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
import { DashboardLayout } from "../layouts/dashboard-layout/DashboardLayout";
import type { JSX } from "react/jsx-runtime";

function AppRouter(): JSX.Element {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Navigate to="/iniciar-sesion" />} />
      <Route path="/iniciar-sesion" element={<LoginPage />} />
      <Route path="/registro" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/productos" element={<ProductsPage />} />
          <Route path="/categorias" element={<CategoriesPage />} />
          <Route path="/movimientos" element={<MovementsPage />} />
          <Route path="/perfil" element={<ProfilePage />} />

          {/* Only admin */}
          <Route element={<ProtectedRoute role="admin" />}>
            <Route path="/usuarios" element={<UsersPage />} />
          </Route>
        </Route>
      </Route>

      {/* 404 */}
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default AppRouter;
