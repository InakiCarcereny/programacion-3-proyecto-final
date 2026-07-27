import type { JSX } from "react";

import {
  Archive,
  LayoutDashboard,
  Shapes,
  UndoDot,
  User,
  Users,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";

export function Navbar(): JSX.Element {
  const { user } = useAuth();

  const navItems = [
    { label: "Dashboard", icon: <LayoutDashboard />, path: "/dashboard" },
    { label: "Productos", icon: <Archive />, path: "/productos" },
    { label: "Movimientos", icon: <UndoDot />, path: "/movimientos" },
    { label: "Categorías", icon: <Shapes />, path: "/categorias" },
    ...(user?.role === "admin"
      ? [{ label: "Usuarios", icon: <Users />, path: "/usuarios" }]
      : []),
    { label: "Perfil", icon: <User />, path: "/perfil" },
  ];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "navbar-list-item active" : "navbar-list-item"
            }
          >
            <span className="navbar-list-item-icon">{item.icon}</span>
            <span className="navbar-list-item-label">{item.label}</span>
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}
