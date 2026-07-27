import { useEffect, useState } from "react";
import type { JSX } from "react/jsx-runtime";

import "./ProductsPage.css";
import {
  getProductsService,
  deleteProductService,
} from "../../services/product";
import type { Product } from "../../types/product";
import { PageHeader } from "../../components/product-page-header/PageHeader";
import { MetricsCards } from "../../components/product-metric-cards/MetricsCards";
import { FilterBar } from "../../components/product-filter-bar/FilterBar";
import { ProductTable } from "../../components/product-table/ProductTable";
import { Pagination } from "../../components/product-pagination/Pagination";
import { useModal } from "../../context/ModalContext";
import { EditProductModal } from "../../components/edit-product-modal/EditProductModal";
import { useSearch } from "../../context/SearchContext";
import { Helmet } from "react-helmet-async";

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
  const { query } = useSearch();

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

    const matchSearch =
      !query ||
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.category?.name?.toLowerCase().includes(query.toLowerCase());

    return matchCategory && matchStock && matchSearch;
  });

  const handleEdit = (product: Product): void => {
    setEditingProduct(product);
  };
  const handleDelete = async (product: Product): Promise<void> => {
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
    <>
      <Helmet>
        <title>Inventory Pro | Productos</title>
        <meta
          name="description"
          content="Página de productos de Inventory Pro con métricas, filtros y tabla de productos"
        />
      </Helmet>

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
    </>
  );
}

export default ProductsPage;
