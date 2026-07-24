import type { JSX } from "react/jsx-runtime";
import "./FilterBar.css";

interface FilterBarProps {
  totalProducts: number;
}

export function FilterBar({ totalProducts }: FilterBarProps): JSX.Element {
  return (
    <div className="filter-bar">
      <span className="filter-label">Filters:</span>
      <select className="filter-select">
        <option>All Categories</option>
        <option>Electrónica</option>
        <option>Indumentaria</option>
        <option>Alimentos y Bebidas</option>
        <option>Herramientas</option>
        <option>Librería</option>
      </select>
      <select className="filter-select">
        <option>Stock Status</option>
        <option>In Stock</option>
        <option>Low Stock</option>
        <option>Out of Stock</option>
      </select>
      <div className="filter-spacer" />
      <p className="filter-results">
        Showing <strong>1 - {totalProducts}</strong> of {totalProducts} results
      </p>
    </div>
  );
}
