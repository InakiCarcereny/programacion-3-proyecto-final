import { useState, type JSX } from "react";

import "./AddMovementForm.css";
import { AddProductFormInput } from "../add-product-form-input/AddProductFormInput";
import { AddMovementFormSelectInput } from "../add-movement-form-select-input/AddMovementFormSelectInput";
import {
  ALargeSmall,
  ArrowDownCircle,
  ArrowUpCircle,
  Layers,
} from "lucide-react";
import { useModal } from "../../context/ModalContext";
import { useAuth } from "../../context/AuthContext";
import { validateAddMovementForm } from "../../utils/validateAddMovementForm";
import { createMovementService } from "../../services/movements";

export function AddMovementForm(): JSX.Element {
  const { token } = useAuth();
  const { close, onSuccess } = useModal();
  const [error, setError] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    productId: "",
    type: "ingreso" as "ingreso" | "egreso",
    quantity: "",
    description: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError({});

    const validationErrors = validateAddMovementForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      await createMovementService(token, {
        productId: Number(formData.productId),
        quantity: Number(formData.quantity),
        type: formData.type,
        description: formData.description || undefined,
      });

      onSuccess?.();
      close();
    } catch (err) {
      if (err instanceof Error) {
        setError({ general: err.message });
      }
    }
  };

  return (
    <form className="add-movement-form" onSubmit={onSubmit}>
      <AddMovementFormSelectInput
        value={formData.productId}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, productId: e.target.value }))
        }
        error={error.productId}
      />

      <div className="add-movement-form-row">
        <div className="add-movement-form-type-container">
          <span className="add-movement-form-label">TIPO DE MOVIMIENTO</span>

          <div className="add-movement-form-type-options">
            <button
              type="button"
              className={`add-movement-form-type-button ${
                formData.type === "ingreso" ? "active-ingreso" : ""
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, type: "ingreso" }))
              }
            >
              <ArrowUpCircle size={18} />
              Ingreso
            </button>

            <button
              type="button"
              className={`add-movement-form-type-button ${
                formData.type === "egreso" ? "active-egreso" : ""
              }`}
              onClick={() =>
                setFormData((prev) => ({ ...prev, type: "egreso" }))
              }
            >
              <ArrowDownCircle size={18} />
              Egreso
            </button>
          </div>

          {error.type && (
            <span className="add-movement-form-input-error">{error.type}</span>
          )}
        </div>

        <AddProductFormInput
          id="quantity"
          name="quantity"
          type="number"
          placeholder="0"
          label="CANTIDAD"
          icon={<Layers />}
          value={formData.quantity}
          onChange={handleChange}
          error={error.quantity}
        />
      </div>

      <AddProductFormInput
        id="description"
        name="description"
        type="text"
        placeholder="Motivo del movimiento (opcional)..."
        label="DESCRIPCIÓN"
        icon={<ALargeSmall />}
        value={formData.description}
        onChange={handleChange}
        error={error.description}
      />

      {error.general && (
        <span className="add-movement-form-input-error">{error.general}</span>
      )}

      <div className="add-movement-form-footer">
        <button
          onClick={close}
          type="button"
          className="add-movement-form-cancel-button"
        >
          Cancelar
        </button>

        <button type="submit" className="add-movement-form-submit-button">
          Registrar Movimiento
        </button>
      </div>
    </form>
  );
}
