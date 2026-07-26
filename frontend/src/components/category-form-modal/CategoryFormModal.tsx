import { useRef, type JSX } from "react";

import "./CategoryFormModal.css";
import { X } from "lucide-react";
import { CategoryForm } from "../category-form/CategoryForm";

export interface CategoryFormData {
  id: number;
  name: string;
  description: string;
}

export function CategoryFormModal({
  isOpen,
  editingCategory,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  editingCategory: CategoryFormData | null;
  onClose: () => void;
  onSuccess: () => void;
}): JSX.Element | null {
  const modalRef = useRef<HTMLDivElement | null>(null);

  if (!isOpen) return null;

  return (
    <div className="modal-background">
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h4 className="modal-title">
            {editingCategory ? "Editar Categoría" : "Crear Nueva Categoría"}
          </h4>

          <button className="modal-close-button" onClick={onClose}>
            <X />
          </button>
        </div>

        <CategoryForm
          editingCategory={editingCategory}
          onClose={onClose}
          onSuccess={onSuccess}
        />
      </div>
    </div>
  );
}
