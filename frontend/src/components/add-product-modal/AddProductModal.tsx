import { useRef, type JSX } from "react";

import "./AddProductModal.css";
import { useModal } from "../../context/ModalContext";
import { useCloseOnEscape } from "../../hooks/useCloseOnEscape";
import { useOutsideClick } from "../../hooks/useClickOutside";
import { X } from "lucide-react";
import { AddProductForm } from "../add-product-form/AddProductForm";
import type { Product } from "../../types/product";

export function AddProductModal(): JSX.Element {
  const { isOpen, type, close, data } = useModal();
  const modalRef = useRef<HTMLDivElement | null>(null);
  const product = data as Product | undefined;

  useCloseOnEscape(close, isOpen);
  useOutsideClick(modalRef, close, isOpen);

  return (
    <>
      {isOpen && (type === "add-product" || type === "edit-product") && (
        <div className="modal-background">
          <div className="modal-container" ref={modalRef}>
            <div className="modal-header">
              <h4 className="modal-title">
                {type === "edit-product"
                  ? "Editar Producto"
                  : "Añadir Nuevo Producto"}
              </h4>

              <button className="modal-close-button" onClick={close}>
                <X />
              </button>
            </div>

            <AddProductForm product={product} />
          </div>
        </div>
      )}
    </>
  );
}
