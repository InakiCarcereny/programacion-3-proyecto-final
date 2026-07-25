import type { JSX } from "react/jsx-runtime";
import "./FilterBar.css";

interface FilterBarProps {
  totalProducts: number;
  filteredCount: number;
  categories: string[];
  selectedCategory: string;
  selectedStock: string;
  onCategoryChange: (category: string) => void;
  onStockChange: (stock: string) => void;
}

export function FilterBar({
  totalProducts,
  filteredCount,
  categories,
  selectedCategory,
  selectedStock,
  onCategoryChange,
  onStockChange,
}: FilterBarProps): JSX.Element {
  return (
    <div className="filter-bar">
      <span className="filter-label">Filtros:</span>
      <select
        className="filter-select"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="All Categories">Todas las categorias</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        className="filter-select"
        value={selectedStock}
        onChange={(e) => onStockChange(e.target.value)}
      >
        <option value="Stock Status">Stock</option>
        <option value="In Stock">Stock Disponible</option>
        <option value="Low Stock">Bajo Stock</option>
        <option value="Out of Stock">Sin Stock</option>
      </select>
      <div className="filter-spacer" />
      <p className="filter-results">
        Mostrando <strong>1 - {filteredCount}</strong> de {totalProducts}{" "}
        resultados
      </p>
    </div>
  );
}
