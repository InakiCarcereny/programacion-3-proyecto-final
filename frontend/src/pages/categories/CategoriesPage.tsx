import { useState, useEffect, useCallback, type JSX } from "react";
import { Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./CategoriesPage.css";

import { CategoryStatsCard } from "../../components/category-stats-card/CategoryStatsCard";
import { CategoryGrid } from "../../components/category-grid/CategoryGrid";
import { CategoryFormModal } from "../../components/category-form-modal/CategoryFormModal";
import type { CategoryFormData } from "../../components/category-form-modal/CategoryFormModal";

interface CategoryData {
  id: number;
  name: string;
  stock: number;
  percentage: number;
}

const SVG_RING_COLORS = ["#004ac6", "#007d55", "#ba1a1a", "#565e74"];

function ProgressRing({
  percentage,
  color,
  label,
  value,
}: {
  percentage: number;
  color: string;
  label: string;
  value: string;
}): JSX.Element {
  return (
    <div className="util-ring-item">
      <div className="util-ring-wrapper">
        <svg className="util-ring-svg" viewBox="0 0 36 36">
          <path
            className="util-ring-bg"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            strokeWidth="3"
          />
          <path
            className="util-ring-fill"
            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={`${percentage}, 100`}
            strokeLinecap="round"
          />
        </svg>
        <div className="util-ring-label">{Math.round(percentage)}%</div>
      </div>
      <div className="util-ring-info">
        <p className="util-ring-name">{label}</p>
        <p className="util-ring-value">{value}</p>
      </div>
    </div>
  );
}

export function CategoriesPage(): JSX.Element {
  const { token } = useAuth();
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [utilData, setUtilData] = useState<CategoryData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] =
    useState<CategoryFormData | null>(null);

  const fetchUtilization = useCallback(async () => {
    if (!token) return;
    try {
      const [categoriesData, productsData] = await Promise.all([
        fetch("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((r) => r.json())
          .catch(() => []),
        fetch("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((r) => r.json())
          .catch(() => []),
      ]);
      const cats = Array.isArray(categoriesData) ? categoriesData : [];
      const prods = Array.isArray(productsData) ? productsData : [];

      const topCategories = cats.map((cat: any) => {
        const categoryProducts = prods.filter(
          (p: any) => Number(p.categoryId) === cat.id,
        );
        const stock = categoryProducts.reduce(
          (sum: number, p: any) => sum + (Number(p.stock) || 0),
          0,
        );
        return { id: cat.id, name: cat.name, stock };
      });

      const maxStock = Math.max(...topCategories.map((c: any) => c.stock), 1);

      setUtilData(
        topCategories.map((c: any) => ({
          id: c.id,
          name: c.name,
          stock: c.stock,
          percentage: (c.stock / maxStock) * 100,
        })),
      );
    } catch {
      // ignore
    }
  }, [token]);

  useEffect(() => {
    const loadUtilization = async (): Promise<void> => {
      await fetchUtilization();
    };

    void loadUtilization();
  }, [fetchUtilization, refreshTrigger]);

  const handleEditRequest = (category: any): void => {
    setEditingCategory({
      id: category.id,
      name: category.name,
      description: category.description,
    });
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleModalSuccess = (): void => {
    setRefreshTrigger((prev): number => prev + 1);
  };

  return (
    <>
      <div className="categories-page">
        <div className="page-header">
          <div className="title-container">
            <h1 className="title">Gestión de categorías</h1>
            <p className="subtitle">
              Organiza y clasifica tus artículos de inventario
            </p>
          </div>
          <button
            className="categories-add-button"
            onClick={() => {
              setEditingCategory(null);
              setIsModalOpen(true);
            }}
          >
            <Plus size={20} />
            Crear categoría
          </button>
        </div>
        <CategoryStatsCard refreshTrigger={refreshTrigger} />
        <CategoryGrid
          refreshTrigger={refreshTrigger}
          onEditRequest={handleEditRequest}
        />

        <div className="util-section">
          <div className="util-header">
            <h3 className="util-title">Utilización de almacenamiento</h3>
          </div>
          <div className="util-grid">
            {utilData.map((cat, i) => (
              <ProgressRing
                key={cat.id}
                percentage={cat.percentage}
                color={SVG_RING_COLORS[i % SVG_RING_COLORS.length]}
                label={cat.name}
                value={`${cat.stock} artículos`}
              />
            ))}
          </div>
        </div>
      </div>

      <CategoryFormModal
        isOpen={isModalOpen}
        editingCategory={editingCategory}
        onClose={handleCloseModal}
        onSuccess={handleModalSuccess}
      />
    </>
  );
}

export default CategoriesPage;
