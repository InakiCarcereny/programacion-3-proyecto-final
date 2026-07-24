import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";

import "./ProductsPage.css";
import { getProductsService } from "../../services/product";
import type { Product } from "../../types/product";
import { PageHeader } from "../products/components/page-header/PageHeader";
import { MetricsCards } from "../products/components/metric-cards/MetricsCards";

function ProductsPage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getProductsService()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <main className="product-content">
        <p>Cargando productos...</p>
      </main>
    );
  if (error)
    return (
      <main className="product-content">
        <p>Error: {error}</p>
      </main>
    );

  return (
    <main className="product-content">
      <PageHeader />
      <MetricsCards products={products} />
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price} - Stock: {product.stock}
          </li>
        ))}
      </ul>
    </main>
  );
}

export default ProductsPage;
