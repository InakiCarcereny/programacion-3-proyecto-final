interface AddMovementFormData {
  productId: string;
  type: "ingreso" | "egreso" | "";
  quantity: string;
  description: string;
}

export function validateAddMovementForm(
  formData: AddMovementFormData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!formData.productId) {
    errors.productId = "Debés seleccionar un producto.";
  }

  if (!formData.type) {
    errors.type = "Debés seleccionar un tipo de movimiento.";
  }

  if (!formData.quantity) {
    errors.quantity = "La cantidad es obligatoria.";
  } else if (
    isNaN(Number(formData.quantity)) ||
    Number(formData.quantity) <= 0
  ) {
    errors.quantity = "La cantidad debe ser un número mayor a 0.";
  }

  if (formData.description && formData.description.length > 250) {
    errors.description = "La descripción no puede superar los 250 caracteres.";
  }

  return errors;
}
