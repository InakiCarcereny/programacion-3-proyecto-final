import { useEffect, useState, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import { getProductsService } from "../../services/product";
import type { Product } from "../../types/product";

import "./AddMovementFormSelectInput.css";

interface AddMovementFormSelectInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export function AddMovementFormSelectInput({
  value,
  onChange,
  error,
}: AddMovementFormSelectInputProps): JSX.Element {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!token) return;
    getProductsService(token).then(setProducts).catch(console.error);
  }, [token]);

  return (
    <div className="add-movement-form-select-container">
      <label htmlFor="productId" className="add-movement-form-label">
        PRODUCTO
      </label>

      <select
        id="productId"
        name="productId"
        className={`add-movement-form-select ${error ? "add-movement-form-select--error" : ""}`}
        value={value}
        onChange={onChange}
      >
        <option value="">Selecciona un producto</option>

        {products.map((product) => (
          <option key={product.id} value={product.id}>
            {product.name} (Stock: {product.stock})
          </option>
        ))}
      </select>

      {error && <p className="add-movement-form-input-error">{error}</p>}
    </div>
  );
}
