import type { JSX } from "react/jsx-runtime";
import type { Product } from "../../../../types/product";
import "./ProductTable.css";

interface ProductTableProps {
  products: Product[];
}

function EditIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="currentColor"
    >
      <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-56Z" />
    </svg>
  );
}

function DeleteIcon(): JSX.Element {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="20px"
      viewBox="0 -960 960 960"
      width="20px"
      fill="currentColor"
    >
      <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
    </svg>
  );
}

function getStockStatus(stock: number): { label: string; className: string } {
  if (stock <= 0)
    return { label: "Out of Stock", className: "stock-badge-out-of-stock" };
  if (stock <= 10)
    return { label: "Low Stock", className: "stock-badge-low-stock" };
  return { label: "In Stock", className: "stock-badge-in-stock" };
}

function getCategoryName(product: Product): string {
  return product.category?.name ?? `ID: ${product.categoryId}`;
}

export function ProductTable({ products }: ProductTableProps): JSX.Element {
  return (
    <table className="product-table">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>ID</th>
          <th>Category</th>
          <th>Price</th>
          <th>Stock Level</th>
          <th className="actions-cell">Actions</th>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="24px"
                        viewBox="0 -960 960 960"
                        width="24px"
                        fill="currentColor"
                      >
                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm40-80h480L570-480 450-320l-90-120-120 160Z" />
                      </svg>
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
                  <span className="stock-quantity">{product.stock} units</span>
                </div>
              </td>
              <td className="actions-cell">
                <div className="actions-container">
                  <button className="action-btn" title="Edit">
                    <EditIcon />
                  </button>
                  <button
                    className="action-btn action-btn-danger"
                    title="Delete"
                  >
                    <DeleteIcon />
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
