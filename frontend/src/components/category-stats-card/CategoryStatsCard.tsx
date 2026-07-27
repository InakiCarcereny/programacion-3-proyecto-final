import { useState, useEffect, useCallback, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import "./CategoryStatsCard.css";
import { API_URL } from "../../lib/api";

interface Metrics {
  categories: number;
  totalStock: number;
}

export function CategoryStatsCard({
  refreshTrigger = 0,
}: {
  refreshTrigger?: number;
}): JSX.Element {
  const { token } = useAuth();
  const [metrics, setMetrics] = useState<Metrics>({
    categories: 0,
    totalStock: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMetrics = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesData, productsData] = await Promise.all([
        fetch(`${API_URL}/api/categories`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Error al cargar categorías");
            return res.json();
          })
          .catch(() => [] as Record<string, unknown>[]),
        fetch(`${API_URL}/api/products`, {
          headers: { Authorization: `Bearer ${token}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Error en productos");
            return res.json();
          })
          .catch(() => [] as Record<string, unknown>[]),
      ]);

      const categoriesCount = Array.isArray(categoriesData)
        ? categoriesData.length
        : 0;

      const safeProducts = Array.isArray(productsData) ? productsData : [];

      const stockCount = safeProducts.reduce(
        (sum, product) =>
          sum + (Number((product as Record<string, unknown>).stock) || 0),
        0,
      );

      setMetrics({
        categories: categoriesCount,
        totalStock: stockCount,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Error al cargar métricas";
      setError(errorMessage);
      console.error(errorMessage, error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      void fetchMetrics();
    }, 0);

    return (): void => clearTimeout(timeoutId);
  }, [fetchMetrics, refreshTrigger]);

  if (loading) {
    return <div className="metrics-loading">Calculando métricas...</div>;
  }

  if (error) {
    return <div className="metrics-error">Error: {error}</div>;
  }

  return (
    <div className="metrics-container">
      <div className="metric-card">
        <h3 className="metric-title">Total de Categorías</h3>
        <p className="metric-value">{metrics.categories}</p>
      </div>

      <div className="metric-card">
        <h3 className="metric-title">Total de Artículos en Stock</h3>
        <p className="metric-value">{metrics.totalStock.toLocaleString()}</p>
      </div>
    </div>
  );
}
