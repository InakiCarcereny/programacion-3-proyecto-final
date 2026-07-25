import { useRef, type JSX } from "react";

import "./AddMovementModal.css";
import { useModal } from "../../context/ModalContext";
import { useCloseOnEscape } from "../../hooks/useCloseOnEscape";
import { useOutsideClick } from "../../hooks/useClickOutside";
import { X } from "lucide-react";
import { AddMovementForm } from "../add-movement-form/AddMovementForm";

export function AddMovementModal(): JSX.Element {
  const { isOpen, type, close } = useModal();
  const modalRef = useRef<HTMLDivElement | null>(null);

  useCloseOnEscape(close, isOpen);
  useOutsideClick(modalRef, close, isOpen);

  return (
    <>
      {isOpen && type === "add-movement" && (
        <div className="modal-background">
          <div className="modal-container" ref={modalRef}>
            <div className="modal-header">
              <h4 className="modal-title">Registrar Movimiento</h4>

              <button className="modal-close-button" onClick={close}>
                <X />
              </button>
            </div>

            <AddMovementForm />
          </div>
        </div>
      )}
    </>
  );
}
