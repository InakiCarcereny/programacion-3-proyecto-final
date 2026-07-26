import { useState, useEffect, useCallback, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import { CategoryCard } from "../category-card/CategoryCard";
import "./CategoryGrid.css";
import { useSearch } from "../../context/SearchContext";

export interface CategoryAPI {
  id: number;
  name: string;
  description: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface ProductAPI {
  id: number;
  categoryId: number;
  stock: number;
}

export interface CategoryCardData extends CategoryAPI {
  totalStock: number;
  isActive: boolean;
}

export function CategoryGrid({
  refreshTrigger = 0,
  onEditRequest,
}: {
  refreshTrigger?: number;
  onEditRequest?: (category: CategoryCardData) => void;
}): JSX.Element {
  const { token } = useAuth();
  const { query } = useSearch();
  const [categories, setCategories] = useState<CategoryCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesData, productsData] = await Promise.all([
        fetch("/api/categories", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Error al cargar categorías");
            return res.json();
          })
          .catch(() => [] as CategoryAPI[]),
        fetch("/api/products", {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Error en productos");
            return res.json();
          })
          .catch(() => [] as ProductAPI[]),
      ]);

      const safeCategories: CategoryAPI[] = Array.isArray(categoriesData)
        ? categoriesData
        : [];

      const safeProducts: ProductAPI[] = Array.isArray(productsData)
        ? productsData
        : [];

      const enrichedCategories = safeCategories.map((category) => {
        const categoryProducts = safeProducts.filter(
          (product) => product.categoryId === category.id,
        );

        const totalStock = categoryProducts.reduce(
          (sum, product) => sum + (Number(product.stock) || 0),
          0,
        );

        return {
          ...category,
          totalStock,
          isActive: totalStock > 0,
        };
      });

      setCategories(enrichedCategories);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al cargar categorías";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      await fetchCategories();
    };

    void loadCategories();
  }, [refreshTrigger, fetchCategories]);

  const filteredCategories = categories.filter(
    (category) =>
      !query ||
      category.name.toLowerCase().includes(query.toLowerCase()) ||
      category.description?.toLowerCase().includes(query.toLowerCase()),
  );

  const deleteCategory = async (id: number): Promise<void> => {
    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorMessage = "Error al eliminar categoría";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // body vacío
      }
      throw new Error(errorMessage);
    }
  };

  const handleEdit = (category: CategoryCardData): void => {
    if (onEditRequest) {
      onEditRequest(category);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    setDeleteError(null);
    try {
      await deleteCategory(id);
      await fetchCategories();
    } catch (error) {
      if (error instanceof Error) {
        setDeleteError(error.message);
      }
    }
  };

  if (loading) {
    return <div className="loading-state">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  return (
    <div>
      {deleteError && <p className="categories-error">{deleteError}</p>}
      <div className="categories-grid">
        {filteredCategories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
}
