import type { JSX } from "react/jsx-runtime";
import { ChevronRight, Download, Plus } from "lucide-react";
import "./PageHeader.css";

interface PageHeaderProps {
  onAddProduct?: () => void;
}

export function PageHeader({ onAddProduct }: PageHeaderProps): JSX.Element {
  return (
    <div className="page-header">
      <div>
        <nav className="breadcrumb">
          <span>Inventario</span>
          <ChevronRight size={14} />
          <span className="breadcrumb-current">Productos</span>
        </nav>
        <h1 className="page-title">Catalogo de Productos</h1>
      </div>
      <div className="header-actions">
        <button className="btn-outline">
          <Download size={20} />
          Exportar CSV
        </button>
        <button className="btn-primary" onClick={onAddProduct}>
          <Plus size={20} />
          Añadir Producto
        </button>
      </div>
    </div>
  );
}
