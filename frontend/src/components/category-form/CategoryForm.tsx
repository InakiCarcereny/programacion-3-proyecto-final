import { useState, type JSX } from "react";
import { useAuth } from "../../context/AuthContext";
import "./CategoryForm.css";
import { API_URL } from "../../lib/api";

export interface FormErrors {
  [key: string]: string;
}

export interface FormData {
  name: string;
  description: string;
}

export function CategoryForm({
  editingCategory,
  onClose,
  onSuccess,
}: {
  editingCategory?: { id: number; name: string; description: string } | null;
  onClose?: () => void;
  onSuccess?: () => void;
}): JSX.Element {
  const { token, user } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    name: editingCategory?.name ?? "",
    description: editingCategory?.description ?? "",
  });
  const [error, setError] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error[name]) {
      setError((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.name.trim()) {
      errors.name = "El nombre es obligatorio.";
    } else if (formData.name.length > 100) {
      errors.name = "El nombre no puede superar los 100 caracteres.";
    }

    if (
      formData.description !== undefined &&
      typeof formData.description !== "string"
    ) {
      errors.description = "La descripción debe ser un texto.";
    } else if (formData.description?.length > 250) {
      errors.description =
        "La descripción no puede superar los 250 caracteres.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<boolean> => {
    e.preventDefault();
    setError({});

    if (!token) {
      setError({ general: "No estás autenticado" });
      return false;
    }

    if (!validateForm()) {
      return false;
    }

    setIsSubmitting(true);
    try {
      const body = { ...formData, companyId: user?.companyId };

      const isEditing = !!editingCategory;
      const url = isEditing
        ? `${API_URL}/api/categories/${editingCategory.id}`
        : `${API_URL}/api/categories`;

      const response = await fetch(url, {
        method: isEditing ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        let errorMessage = isEditing
          ? "Error al editar la categoría"
          : "Error al crear la categoría";
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // response body might be empty (502 etc)
        }
        throw new Error(errorMessage);
      }

      try {
        await response.json();
      } catch {
        // skip parse errors on empty responses
      }
      onSuccess?.();
      onClose?.();
      return true;
    } catch (err) {
      if (err instanceof Error) {
        setError({ general: err.message });
      }
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <div className="category-form-group">
        <label className="category-form-label" htmlFor="name">
          Nombre de la categoría
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Electrónicos, Ropa, etc."
          value={formData.name}
          onChange={handleChange}
          className={`category-form-input ${error.name ? "error" : ""}`}
          disabled={isSubmitting}
        />
        {error.name && <p className="category-form-error">{error.name}</p>}
      </div>

      <div className="category-form-group">
        <label className="category-form-label" htmlFor="description">
          Descripción (opcional)
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Describe esta categoría..."
          value={formData.description}
          onChange={handleChange}
          className="category-form-textarea"
          rows={3}
          disabled={isSubmitting}
        />
      </div>

      <div className="category-form-footer">
        <button
          type="button"
          onClick={onClose}
          className="category-form-cancel-button"
          disabled={isSubmitting}
        >
          Cancelar
        </button>

        <button
          type="submit"
          className="category-form-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? editingCategory
              ? "Guardando..."
              : "Creando..."
            : editingCategory
              ? "Guardar Cambios"
              : "Crear Categoría"}
        </button>
      </div>
    </form>
  );
}
