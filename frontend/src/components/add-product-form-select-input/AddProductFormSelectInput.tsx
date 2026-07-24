import { useEffect, useState, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import { getCategoriesService } from "../../services/category";
import type { Category } from "../../types/category";

import "./AddProductFormSelectInput.css";

interface AddProductFormSelectInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  error?: string;
}

export function AddProductFormSelectInput({
  value,
  onChange,
  error,
}: AddProductFormSelectInputProps): JSX.Element {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    if (!token) return;
    getCategoriesService(token).then(setCategories).catch(console.error);
  }, [token]);

  return (
    <div className="add-product-form-select-container">
      <label htmlFor="category" className="add-product-form-label">
        CATEGORÍA
      </label>

      <select
        id="category"
        name="category"
        className={`add-product-form-select ${error ? "add-product-form-select--error" : ""}`}
        value={value}
        onChange={onChange}
      >
        <option value="">Selecciona una categoría</option>

        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>

      {error && <p className="input-error">{error}</p>}
    </div>
  );
}
