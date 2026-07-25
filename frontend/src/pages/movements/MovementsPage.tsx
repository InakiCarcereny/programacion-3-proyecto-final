import { useCallback, useEffect, useMemo, useState, type JSX } from "react";
import {
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  UndoDot,
} from "lucide-react";

import "./MovementsPage.css";
import { useAuth } from "../../context/AuthContext";
import { useModal } from "../../context/ModalContext";
import { getMovementsService } from "../../services/movements";
import type { Movement } from "../../types/movements";

const PAGE_SIZE = 8;

function formatDate(date?: Date): string {
  if (!date) return "-";
  return new Date(date).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function MovementsPage(): JSX.Element {
  const { token } = useAuth();
  const { open } = useModal();
  const [movements, setMovements] = useState<Movement[]>([]);
  const [filter, setFilter] = useState<"all" | "ingreso" | "egreso">("all");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMovements = useCallback((): void => {
    if (!token) return;

    getMovementsService(token)
      .then((data) => {
        setMovements(
          [...data].sort(
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

  useEffect(() => {
    fetchMovements();
  }, [fetchMovements]);

  const totalIngresos = movements
    .filter((m) => m.type === "ingreso")
    .reduce((acc, m) => acc + m.quantity, 0);
  const totalEgresos = movements
    .filter((m) => m.type === "egreso")
    .reduce((acc, m) => acc + m.quantity, 0);
  const netMovement = totalIngresos - totalEgresos;

  const filteredMovements = useMemo(() => {
    return movements.filter((movement) => {
      const matchesType = filter === "all" || movement.type === filter;
      const matchesSearch = (movement.product?.name ?? "")
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [movements, filter, search]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredMovements.length / PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const paginatedMovements = filteredMovements.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const handleFilterChange = (value: "all" | "ingreso" | "egreso"): void => {
    setFilter(value);
    setPage(1);
  };

  return (
    <div className="movements-page">
      <div className="movements-page-header">
        <div>
          <h2 className="movements-page-title">Movimientos</h2>
          <p className="movements-page-subtitle">
            Historial de ingresos y egresos de stock
          </p>
        </div>

        <button
          className="movements-page-add-button"
          onClick={() => open("add-movement", fetchMovements)}
        >
          <Plus size={20} color="#ffffff" />
          Registrar Movimiento
        </button>
      </div>

      <div className="movements-page-stats">
        <div className="movements-page-stat-card">
          <span className="movements-page-stat-icon movements-page-stat-icon-ingreso">
            <ArrowUpCircle size={18} />
          </span>
          <div>
            <p className="movements-page-stat-label">Total ingresos</p>
            <p className="movements-page-stat-value">{totalIngresos} u.</p>
          </div>
        </div>

        <div className="movements-page-stat-card">
          <span className="movements-page-stat-icon movements-page-stat-icon-egreso">
            <ArrowDownCircle size={18} />
          </span>
          <div>
            <p className="movements-page-stat-label">Total egresos</p>
            <p className="movements-page-stat-value">{totalEgresos} u.</p>
          </div>
        </div>

        <div className="movements-page-stat-card">
          <span className="movements-page-stat-icon movements-page-stat-icon-net">
            <UndoDot size={18} />
          </span>
          <div>
            <p className="movements-page-stat-label">Movimiento neto</p>
            <p className="movements-page-stat-value">
              {netMovement >= 0 ? "+" : ""}
              {netMovement} u.
            </p>
          </div>
        </div>
      </div>

      <div className="movements-page-toolbar">
        <div className="movements-page-search">
          <Search size={16} color="#6e7191" />
          <input
            type="text"
            placeholder="Buscar por producto..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="movements-page-filters">
          <button
            className={`movements-page-filter-button ${filter === "all" ? "active" : ""}`}
            onClick={() => handleFilterChange("all")}
          >
            Todos
          </button>

          <button
            className={`movements-page-filter-button ${filter === "ingreso" ? "active" : ""}`}
            onClick={() => handleFilterChange("ingreso")}
          >
            Ingresos
          </button>

          <button
            className={`movements-page-filter-button ${filter === "egreso" ? "active" : ""}`}
            onClick={() => handleFilterChange("egreso")}
          >
            Egresos
          </button>
        </div>
      </div>

      <div className="movements-page-table-container">
        {loading && (
          <p className="movements-page-message">Cargando movimientos...</p>
        )}

        {!loading && error && (
          <p className="movements-page-message movements-page-message-error">
            {error}
          </p>
        )}

        {!loading && !error && filteredMovements.length === 0 && (
          <div className="movements-page-empty">
            <UndoDot size={40} color="#c7c9d6" />
            <p className="movements-page-message">
              No se encontraron movimientos.
            </p>
          </div>
        )}

        {!loading && !error && filteredMovements.length > 0 && (
          <>
            <table className="movements-page-table">
              <thead>
                <tr>
                  <th>Producto</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Descripción</th>
                  <th>Fecha</th>
                </tr>
              </thead>

              <tbody>
                {paginatedMovements.map((movement) => (
                  <tr key={movement.id}>
                    <td>
                      {movement.product?.name ??
                        `Producto #${movement.productId}`}
                    </td>
                    <td>
                      <span
                        className={`movements-page-badge ${
                          movement.type === "ingreso"
                            ? "movements-page-badge-ingreso"
                            : "movements-page-badge-egreso"
                        }`}
                      >
                        {movement.type === "ingreso" ? (
                          <ArrowUpCircle size={14} />
                        ) : (
                          <ArrowDownCircle size={14} />
                        )}
                        {movement.type === "ingreso" ? "Ingreso" : "Egreso"}
                      </span>
                    </td>
                    <td
                      className={
                        movement.type === "ingreso"
                          ? "movements-page-quantity-in"
                          : "movements-page-quantity-out"
                      }
                    >
                      {movement.type === "ingreso" ? "+" : "-"}
                      {movement.quantity}
                    </td>
                    <td>{movement.description ?? "-"}</td>
                    <td>{formatDate(movement.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="movements-page-pagination">
              <span className="movements-page-pagination-info">
                Mostrando {(currentPage - 1) * PAGE_SIZE + 1} a{" "}
                {Math.min(currentPage * PAGE_SIZE, filteredMovements.length)} de{" "}
                {filteredMovements.length} movimientos
              </span>

              <div className="movements-page-pagination-controls">
                <button
                  className="movements-page-pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeft size={16} />
                </button>

                <span className="movements-page-pagination-current">
                  {currentPage} / {totalPages}
                </span>

                <button
                  className="movements-page-pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MovementsPage;
