import type { JSX } from "react/jsx-runtime";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./Pagination.css";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "...")[] = [1];

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  if (total > 1) pages.push(total);

  return pages;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): JSX.Element {
  const startItem = (currentPage - 1) * 10 + 1;
  const endItem = Math.min(currentPage * 10, totalPages * 10);

  return (
    <div className="pagination">
      <p className="pagination-info">
        Pagina{" "}
        <strong>
          {startItem} - {endItem}
        </strong>{" "}
        de {totalPages * 10}
      </p>

      <div className="pagination-buttons">
        <button
          className="pagination-btn pagination-btn-nav"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          <ChevronLeft size={20} />
        </button>

        {getPageNumbers(currentPage, totalPages).map((page, i) =>
          page === "..." ? (
            <span key={`ellipsis-${i}`} className="pagination-ellipsis">
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`pagination-btn ${page === currentPage ? "pagination-btn-active" : ""}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ),
        )}

        <button
          className="pagination-btn pagination-btn-nav"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
