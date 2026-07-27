import { Pencil, Trash2, ArrowRight, Package } from "lucide-react";
import "./CategoryCard.css";
import type { JSX } from "react";

export interface CategoryCardData {
  id: number;
  name: string;
  description: string;
  totalStock: number;
  isActive: boolean;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface CategoryCardProps {
  category: CategoryCardData;
  onEdit: (category: CategoryCardData) => void;
  onDelete: (id: number) => void;
}

const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Ahora";
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours}h atrás`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d atrás`;
};

export function CategoryCard({
  category,
  onEdit,
  onDelete,
}: CategoryCardProps): JSX.Element {
  return (
    <div className="category-card">
      <div className="card-header">
        <div className="icon-wrapper">
          <Package size={28} strokeWidth={2} />
        </div>
        <div className="card-actions">
          <button
            className="edit-btn"
            onClick={() => onEdit(category)}
            aria-label="Editar categoría"
          >
            <Pencil size={18} />
          </button>
          <button
            className="delete-btn"
            onClick={() => onDelete(category.id)}
            aria-label="Eliminar categoría"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <div className="card-body">
        <h3 className="card-title">{category.name}</h3>
        <p className="card-meta">
          {category.totalStock} artículos en stock{" "}
          <span className="dot">•</span>{" "}
          {category.isActive ? (
            <span className="status-active">Activa</span>
          ) : (
            <span className="status-inactive">Inactiva</span>
          )}
        </p>
      </div>

      <hr className="card-divider" />

      <div className="card-footer">
        <span className="last-updated">
          Última actualización: {getTimeAgo(category.updatedAt)}
        </span>
        <button className="arrow-btn">
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
