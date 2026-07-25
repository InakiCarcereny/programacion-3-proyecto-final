import type { JSX } from "react/jsx-runtime";
import type { Product } from "../../../../types/product";
import { ProductSummaryCard } from "../../../products/components/product-summary-card/ProductSummaryCard";
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
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M200-80q-33 0-56.5-23.5T120-160v-451q-18-11-29-28.5T80-680v-120q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v120q0 23-11 40.5T840-611v451q0 33-23.5 56.5T760-80H200Zm0-520v440h560v-440H200Zm-40-80h640v-120H160v120Zm200 280h240v-80H360v80Zm120 20Z" />
          </svg>
        }
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
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m40-120 440-760 440 760H40Zm138-80h604L480-720 178-200Zm330.5-51.5Q520-263 520-280t-11.5-28.5Q497-320 480-320t-28.5 11.5Q440-297 440-280t11.5 28.5Q463-240 480-240t28.5-11.5ZM440-360h80v-200h-80v200Zm40-100Z" />
          </svg>
        }
        title="Bajo Stock"
        value={lowStockProducts}
        badgeText="Critical"
        badgeType="danger"
        bgColor="#dae2fd"
        iconColor="#3f465c"
      />
      <ProductSummaryCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z" />
          </svg>
        }
        title="Categorias"
        value={`${totalCategories} Active`}
        bgColor="#4edea3"
        iconColor="#005236"
      />
      <ProductSummaryCard
        icon={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="M560-440q-50 0-85-35t-35-85q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35ZM280-320q-33 0-56.5-23.5T200-400v-320q0-33 23.5-56.5T280-800h560q33 0 56.5 23.5T920-720v320q0 33-23.5 56.5T840-320H280Zm80-80h400q0-33 23.5-56.5T840-480v-160q-33 0-56.5-23.5T760-720H360q0 33-23.5 56.5T280-640v160q33 0 56.5 23.5T360-400Zm440 240H120q-33 0-56.5-23.5T40-240v-440h80v440h680v80ZM280-400v-320 320Z" />
          </svg>
        }
        title="Valor total de Inventario"
        value={`$${inventoryValue.toLocaleString()}`}
        bgColor="#2563eb"
        iconColor="#e1e6fe"
      />
    </div>
  );
}
