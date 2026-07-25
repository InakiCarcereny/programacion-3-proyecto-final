import type { JSX } from "react/jsx-runtime";
import { Archive, TriangleAlert, Shapes, Wallet } from "lucide-react";
import type { Product } from "../../types/product";
import { ProductSummaryCard } from "../product-summary-card/ProductSummaryCard";
import "./MetricsCards.css";

interface MetricsCardsProps {
  products: Product[];
}

export function MetricsCards({ products }: MetricsCardsProps): JSX.Element {
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock < 10).length;
  const totalCategories = new Set(products.map((p) => p.categoryId)).size;
  const inventoryValue = products.reduce(
    (sum, p) => sum + p.price * p.stock,
    0,
  );

  return (
    <div className="cards-container">
      <ProductSummaryCard
        icon={<Archive size={24} />}
        title="Productos Total"
        value={totalProducts}
        badgeText={
          totalProducts > 0
            ? `+${Math.round(totalProducts * 0.12)}%`
            : undefined
        }
        badgeType="success"
        bgColor="#dbe1ff"
        iconColor="#004ac6"
      />
      <ProductSummaryCard
        icon={<TriangleAlert size={24} />}
        title="Bajo Stock"
        value={lowStockProducts}
        badgeText="Critico"
        badgeType="danger"
        bgColor="#dae2fd"
        iconColor="#3f465c"
      />
      <ProductSummaryCard
        icon={<Shapes size={24} />}
        title="Categorias"
        value={`${totalCategories} Activas`}
        bgColor="#4edea3"
        iconColor="#005236"
      />
      <ProductSummaryCard
        icon={<Wallet size={24} />}
        title="Valor total de Inventario"
        value={`$${inventoryValue.toLocaleString()}`}
        bgColor="#2563eb"
        iconColor="#e1e6fe"
      />
    </div>
  );
}
