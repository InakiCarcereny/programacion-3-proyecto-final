import { useState, useEffect, useCallback, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import { CategoryCard } from "../category-card/CategoryCard";
import "./CategoryGrid.css";

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
  const { token, user } = useAuth();
  const companyId = user?.companyId;
  const [categories, setCategories] = useState<CategoryCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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
        fetch(`/api/products?category=${companyId}`, {
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
      console.error(errorMessage, error);
    } finally {
      setLoading(false);
    }
  }, [token, companyId]);

  useEffect(() => {
    const loadCategories = async (): Promise<void> => {
      await fetchCategories();
    };

    void loadCategories();
  }, [refreshTrigger, fetchCategories]);

  const deleteCategory = async (id: number): Promise<any> => {
    const response = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ companyId: user?.companyId }),
    });

    if (!response.ok) {
      let errorMessage = "Error al eliminar categoría";
      try {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      } catch {
        // body vacío (502 etc)
      }
      throw new Error(errorMessage);
    }

    try {
      return await response.json();
    } catch {
      return null;
    }
  };

  const handleEdit = (category: any): void => {
    if (onEditRequest) {
      onEditRequest(category);
    }
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (
      window.confirm("¿Estás seguro de que deseas eliminar esta categoría?")
    ) {
      try {
        await deleteCategory(id);
        fetchCategories();
      } catch {
        alert("Error al eliminar categoría");
      }
    }
  };

  const handleViewDetails = (id: number): void => {
    console.log("Ver detalles de categoría:", id);
    alert(`Ver detalles de la categoría ${id}`);
  };

  if (loading) {
    return <div className="loading-state">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="error-state">Error: {error}</div>;
  }

  return (
    <div className="categories-grid">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onViewDetails={handleViewDetails}
        />
      ))}
    </div>
  );
}
