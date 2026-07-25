import { useEffect, useState, type JSX, type ReactNode } from "react";
import {
  Archive,
  ArrowDownCircle,
  ArrowUpCircle,
  CircleAlert,
  DollarSign,
  TriangleAlert,
} from "lucide-react";

import "./DashboardPage.css";
import { useAuth } from "../../context/AuthContext";
import { getProductsService } from "../../services/product";
import { getMovementsService } from "../../services/movements";
import type { Product } from "../../types/product";
import type { Movement } from "../../types/movements";
import { LOW_STOCK_THRESHOLD } from "../../lib/constants";

interface Metric {
  label: string;
  value: string;
  icon: ReactNode;
  background: string;
  badge?: { text: string; tone: "warning" | "danger" };
}

function formatDate(date?: Date): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function formatCurrency(value: number): string {
  return value.toLocaleString("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  });
}

function DashboardPage(): JSX.Element {
  const { token, user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    Promise.all([getProductsService(token), getMovementsService(token)])
      .then(([productsData, movementsData]) => {
        setProducts(productsData);
        setMovements(
          [...movementsData].sort(
            (a, b) =>
              new Date(b.createdAt ?? 0).getTime() -
              new Date(a.createdAt ?? 0).getTime(),
          ),
        );
        setError(null);
      })
      .catch((err) => {
        if (err instanceof Error) setError(err.message);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const totalStockValue = products.reduce(
    (acc, product) => acc + product.price * product.stock,
    0,
  );
  const lowStockProducts = products.filter(
    (product) => product.stock > 0 && product.stock < LOW_STOCK_THRESHOLD,
  );
  const outOfStockProducts = products.filter((product) => product.stock === 0);
  const recentMovements = movements.slice(0, 5);

  const topLowStock = [...outOfStockProducts, ...lowStockProducts].slice(0, 4);

  const metrics: Metric[] = [
    {
      label: "Productos totales",
      value: products.length.toString(),
      icon: <Archive size={20} color="#004ac6" />,
      background: "#e6edfb",
    },
    {
      label: "Valor de stock",
      value: formatCurrency(totalStockValue),
      icon: <DollarSign size={20} color="#004ac6" />,
      background: "#e6edfb",
    },
    {
      label: "Alertas de stock bajo",
      value: lowStockProducts.length.toString(),
      icon: <TriangleAlert size={20} color="#d97706" />,
      background: "#fef3e2",
      badge:
        lowStockProducts.length > 0
          ? { text: "Atención", tone: "warning" }
          : undefined,
    },
    {
      label: "Sin stock",
      value: outOfStockProducts.length.toString(),
      icon: <CircleAlert size={20} color="#dc2626" />,
      background: "#fef2f2",
      badge:
        outOfStockProducts.length > 0
          ? { text: "Crítico", tone: "danger" }
          : undefined,
    },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-page-header">
        <div>
          <h2 className="dashboard-page-title">
            Bienvenido de nuevo
            {user?.profile?.firstName ? ` ${user.profile.firstName}` : ""}
          </h2>
          <p className="dashboard-page-subtitle">
            Estado en tiempo real de las instalaciones de {user?.companyName}
          </p>
        </div>
      </div>

      {loading && (
        <p className="dashboard-page-message">Cargando información...</p>
      )}

      {!loading && error && (
        <p className="dashboard-page-message dashboard-page-message-error">
          {error}
        </p>
      )}

      {!loading && !error && (
        <>
          <div className="dashboard-page-metrics">
            {metrics.map((metric) => (
              <div className="dashboard-page-card" key={metric.label}>
                <div className="dashboard-page-card-top">
                  <span
                    className="dashboard-page-card-icon"
                    style={{ backgroundColor: metric.background }}
                  >
                    {metric.icon}
                  </span>

                  {metric.badge && (
                    <span
                      className={`dashboard-page-card-badge dashboard-page-card-badge-${metric.badge.tone}`}
                    >
                      {metric.badge.text}
                    </span>
                  )}
                </div>

                <p className="dashboard-page-card-label">{metric.label}</p>
                <p className="dashboard-page-card-value">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="dashboard-page-grid">
            <div className="dashboard-page-section">
              <h3 className="dashboard-page-section-title">
                Últimos movimientos
              </h3>

              {recentMovements.length === 0 ? (
                <p className="dashboard-page-message">
                  Todavía no hay movimientos registrados.
                </p>
              ) : (
                <table className="dashboard-page-table">
                  <tbody>
                    {recentMovements.map((movement) => (
                      <tr key={movement.id}>
                        <td>
                          {movement.product?.name ??
                            `Producto #${movement.productId}`}
                        </td>
                        <td>
                          <span
                            className={`dashboard-page-badge ${
                              movement.type === "ingreso"
                                ? "dashboard-page-badge-ingreso"
                                : "dashboard-page-badge-egreso"
                            }`}
                          >
                            {movement.type === "ingreso" ? (
                              <ArrowUpCircle size={13} />
                            ) : (
                              <ArrowDownCircle size={13} />
                            )}
                            {movement.type === "ingreso" ? "+" : "-"}
                            {movement.quantity}
                          </span>
                        </td>
                        <td className="dashboard-page-table-date">
                          {formatDate(movement.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="dashboard-page-section">
              <h3 className="dashboard-page-section-title">Top stock bajo</h3>

              {topLowStock.length === 0 ? (
                <p className="dashboard-page-message">
                  Todos los productos tienen stock suficiente.
                </p>
              ) : (
                <div className="dashboard-page-low-stock-list">
                  {topLowStock.map((product) => {
                    const percent = Math.min(
                      100,
                      Math.round(
                        (product.stock / (LOW_STOCK_THRESHOLD * 2)) * 100,
                      ),
                    );
                    const isOut = product.stock === 0;

                    return (
                      <div
                        className="dashboard-page-low-stock-item"
                        key={product.id}
                      >
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="dashboard-page-low-stock-thumb"
                          />
                        ) : (
                          <div className="dashboard-page-low-stock-thumb dashboard-page-low-stock-thumb-fallback">
                            <Archive size={16} color="#c7c9d6" />
                          </div>
                        )}

                        <div className="dashboard-page-low-stock-info">
                          <div className="dashboard-page-low-stock-row">
                            <span className="dashboard-page-low-stock-name">
                              {product.name}
                            </span>
                            <span
                              className="dashboard-page-low-stock-count"
                              style={{ color: isOut ? "#dc2626" : "#d97706" }}
                            >
                              {product.stock} en stock
                            </span>
                          </div>

                          <div className="dashboard-page-progress-track">
                            <div
                              className="dashboard-page-progress-fill"
                              style={{
                                width: `${percent}%`,
                                backgroundColor: isOut ? "#dc2626" : "#d97706",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default DashboardPage;
