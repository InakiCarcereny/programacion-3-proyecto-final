import { Archive, Plus, LogOut } from "lucide-react";
import type { JSX } from "react";

import "./Sidebar.css";
import { Navbar } from "../navbar/Navbar";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";

export function Sidebar(): JSX.Element {
  const { user, logout } = useAuth();
  const { open } = useModal();

  return (
    <aside className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-header">
          <span className="icon-container">
            <Archive color="#ffffff" />
          </span>

          <div className="sidebar-header-text-container">
            <h1 className="sidebar-header-title">Inventory Pro</h1>

            <span className="sidebar-header-company">{user?.companyName}</span>
          </div>
        </div>

        <Navbar />
      </div>

      <div className="sidebar-footer">
        <button
          className="sidebar-add-product-button"
          onClick={() => open("add-product")}
        >
          <Plus size={20} color="#ffffff" />

          <span className="sidebar-add-product-button-text">
            Agregar Producto
          </span>
        </button>

        <button className="sidebar-logout-button" onClick={logout}>
          <LogOut size={20} color="#434655" />
          <span className="sidebar-logout-button-text">Cerrar sesión</span>
        </button>
      </div>
    </aside>
  );
}
