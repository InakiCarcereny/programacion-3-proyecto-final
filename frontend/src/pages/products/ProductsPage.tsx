import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";

import "./ProductsPage.css";
import {
  getProductsService,
  deleteProductService,
} from "../../services/product";
import type { Product } from "../../types/product";
import { PageHeader } from "../products/components/page-header/PageHeader";
import { MetricsCards } from "../../components/product-metric-cards/MetricsCards";
import { FilterBar } from "../../components/product-filter-bar/FilterBar";
import { ProductTable } from "../../components/product-table/ProductTable";
import { Pagination } from "../products/components/pagination/Pagination";
import { useModal } from "../../context/ModalContext";
import { EditProductModal } from "../../components/edit-product-modal/EditProductModal";

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
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const { open } = useModal();

  const fetchProducts = (): void => {
    getProductsService(localStorage.getItem("token"))
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
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

  const handleEdit = (product: Product): void => {
    setEditingProduct(product);
  };

  const handleDelete = async (product: Product): Promise<void> => {
    const confirmed = window.confirm(
      `¿Estás seguro de eliminar "${product.name}"?`,
    );
    if (!confirmed) return;

    try {
      const token = localStorage.getItem("token");
      await deleteProductService(token!, product.id);
      const data = await getProductsService(token!);
      setProducts(data);
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      }
    }
  };

  const handleEditSuccess = (): void => {
    setEditingProduct(null);
    fetchProducts();
  };

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
        <ProductTable
          products={paginatedProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

        <Pagination
          currentPage={safePage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
        {editingProduct && (
          <EditProductModal
            product={editingProduct}
            onClose={() => setEditingProduct(null)}
            onSuccess={handleEditSuccess}
          />
        )}
      </div>
    </main>
  );
}

export default ProductsPage;
