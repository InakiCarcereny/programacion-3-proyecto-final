import type { JSX } from "react/jsx-runtime";
import { Pencil, Trash2, Image } from "lucide-react";
import type { Product } from "../../types/product";
import "./ProductTable.css";

interface ProductTableProps {
  products: Product[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
}

function getStockStatus(stock: number): { label: string; className: string } {
  if (stock <= 0)
    return { label: "Sin Stock", className: "stock-badge-out-of-stock" };
  if (stock <= 10)
    return { label: "Bajo Stock", className: "stock-badge-low-stock" };
  return { label: "Disponible Stock", className: "stock-badge-in-stock" };
}

function getCategoryName(product: Product): string {
  return product.category?.name ?? `ID: ${product.categoryId}`;
}

export function ProductTable({
  products,
  onEdit,
  onDelete,
}: ProductTableProps): JSX.Element {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>ID</th>
          <th>Categoria</th>
          <th>Precio</th>
          <th>Cantidad de Stock</th>
          <th className="actions-cell">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => {
          const status = getStockStatus(product.stock);

          return (
            <tr key={product.id}>
              <td>
                <div className="product-name-cell">
                  <div className="product-image">
                    {product.imageUrl ? (
                      <img src={product.imageUrl} alt={product.name} />
                    ) : (
                      <Image size={24} />
                    )}
                  </div>
                  <span className="product-name-text">{product.name}</span>
                </div>
              </td>
              <td className="price-cell">#{product.id}</td>
              <td>
                <span className="category-badge">
                  {getCategoryName(product)}
                </span>
              </td>
              <td className="price-cell">${product.price.toLocaleString()}</td>
              <td>
                <div className="stock-cell">
                  <span className={`stock-badge ${status.className}`}>
                    <span className="stock-badge-dot" />
                    {status.label}
                  </span>
                  <span className="stock-quantity">
                    {product.stock} unidades
                  </span>
                </div>
              </td>
              <td className="actions-cell">
                <div className="actions-container">
                  <button
                    className="action-btn"
                    title="Edit"
                    onClick={() => onEdit?.(product)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className="action-btn action-btn-danger"
                    title="Delete"
                    onClick={() => onDelete?.(product)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
