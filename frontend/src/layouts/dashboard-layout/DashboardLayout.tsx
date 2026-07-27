import type { JSX } from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../components/sidebar/Sidebar";

import "./DashboardLayout.css";
import { AddProductModal } from "../../components/add-product-modal/AddProductModal";
import { AddMovementModal } from "../../components/add-movement-modal/AddMovementModal";
import { Header } from "../../components/header/Header";
import { AddUserModal } from "../../components/add-user-modal/AddUserModal";

export function DashboardLayout(): JSX.Element {
  return (
    <div className="layout">
      <Sidebar />

      <div className="layout-container">
        <div className="layout-content">
          <Header />

          <main className="layout-main">
            <Outlet />
          </main>
        </div>
      </div>

      <AddProductModal />
      <AddMovementModal />
      <AddUserModal />
    </div>
  );
}
