import { useRef, type JSX } from "react";

import "./CategoryFormModal.css";
import { useModal } from "../../context/ModalContext";
import { X } from "lucide-react";
import { CategoryForm } from "../category-form/CategoryForm";

export function CategoryFormModal(): JSX.Element | null {
  const { type, data, close } = useModal();
  const editingCategory =
    type === "category-form"
      ? (data as { id: number; name: string; description: string } | null)
      : null;
  const modalRef = useRef<HTMLDivElement | null>(null);

  if (type !== "category-form") return null;

  return (
    <div className="modal-background">
      <div className="modal-container" ref={modalRef}>
        <div className="modal-header">
          <h4 className="modal-title">
            {editingCategory ? "Editar Categoría" : "Crear Nueva Categoría"}
          </h4>

          <button className="modal-close-button" onClick={close}>
            <X />
          </button>
        </div>

        <CategoryForm editingCategory={editingCategory} />
      </div>
    </div>
  );
}
