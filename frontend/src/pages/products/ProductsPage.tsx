import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";

import "./ProductsPage.css";
import { getProductsService } from "../../services/product";
import type { Product } from "../../types/product";
import { PageHeader } from "../products/components/page-header/PageHeader";
import { MetricsCards } from "../products/components/metric-cards/MetricsCards";
import { FilterBar } from "../products/components/filter-bar/FilterBar";
import { ProductTable } from "../products/components/product-table/ProductTable";
import { Pagination } from "../products/components/pagination/Pagination";
import { useModal } from "../../context/ModalContext";

const PAGE_SIZE = 10;

function getStockStatus(stock: number): string {
  if (stock <= 0) return "Out of Stock";
  if (stock <= 10) return "Low Stock";
  return "In Stock";
}

function ProductsPage(): JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStock, setSelectedStock] = useState("Stock Status");
  const { open } = useModal();

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

  const categories = [
    ...new Set(
      products.map((p) => p.category?.name).filter(Boolean) as string[],
    ),
  ];

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All Categories" ||
      p.category?.name === selectedCategory;

    const matchStock =
      selectedStock === "Stock Status" ||
      getStockStatus(p.stock) === selectedStock;

    return matchCategory && matchStock;
  });

  const totalPages = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(1, totalPages));
  const start = (safePage - 1) * PAGE_SIZE;
  const paginatedProducts = filteredProducts.slice(start, start + PAGE_SIZE);
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
      <PageHeader onAddProduct={() => open("add-product")} />
      <MetricsCards products={products} />
      <FilterBar
        totalProducts={products.length}
        filteredCount={filteredProducts.length}
        categories={categories}
        selectedCategory={selectedCategory}
        selectedStock={selectedStock}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
        onStockChange={(stock) => {
          setSelectedStock(stock);
          setCurrentPage(1);
        }}
      />
      <div className="product-table-wrapper">
        <ProductTable products={paginatedProducts} />
        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </main>
  );
}

export default ProductsPage;
