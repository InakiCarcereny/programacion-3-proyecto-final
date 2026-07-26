import type { JSX } from "react/jsx-runtime";
import { Plus } from "lucide-react";
import "./PageHeader.css";

interface PageHeaderProps {
  onAddProduct?: () => void;
}

export function PageHeader({ onAddProduct }: PageHeaderProps): JSX.Element {
  return (
    <div className="page-header">
      <h1 className="page-title">Catalogo de Productos</h1>

      <div className="header-actions">
        <button className="btn-primary" onClick={onAddProduct}>
          <Plus size={20} />
          Añadir Producto
        </button>
      </div>
    </div>
  );
}
