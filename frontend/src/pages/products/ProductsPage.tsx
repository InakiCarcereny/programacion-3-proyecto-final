import type { JSX } from "react/jsx-runtime";

import "./ProductsPage.css";
import { ProductSummaryCard } from "../../components/product-summary-card/ProductSummaryCard";

function ProductsPage(): JSX.Element {
  return (
    <main className="product-content">
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
          title="Total Products"
          value="1,284"
          badgeText="+12%"
          badgeType="success"
          bgColor="#dbe1ff"
          iconColor="#004ac6"
        />
        <ProductSummaryCard
          icon="⚠️"
          title="Low Stock"
          value="42"
          badgeText="Critical"
          badgeType="danger"
        />
        <ProductSummaryCard icon="🏷️" title="Categories" value="18 Active" />
        <ProductSummaryCard icon="💰" title="Inventory Value" value="$428.5k" />
      </div>
    </main>
  );
}

export default ProductsPage;
