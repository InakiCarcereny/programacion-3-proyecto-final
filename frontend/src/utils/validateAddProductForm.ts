interface AddProductFormData {
  name: string;
  price: string;
  stock: string;
  category: string;
  description: string;
  image: File | null;
}

export function validateAddProductForm(
  formData: AddProductFormData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!formData.name.trim()) {
    errors.name = "El nombre del producto es obligatorio.";
  } else if (formData.name.length > 150) {
    errors.name = "El nombre no puede superar los 150 caracteres.";
  }

  if (!formData.price) {
    errors.price = "El precio es obligatorio.";
  } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
    errors.price = "El precio debe ser un número mayor a 0.";
  }

  if (!formData.stock) {
    errors.stock = "El stock es obligatorio.";
  } else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
    errors.stock = "El stock debe ser un número positivo.";
  }

  if (!formData.category) {
    errors.category = "Debés seleccionar una categoría.";
  }

  if (formData.description && formData.description.length > 250) {
    errors.description = "La descripción no puede superar los 250 caracteres.";
  }

  if (formData.image) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(formData.image.type)) {
      errors.image = "Solo se permiten imágenes JPG, PNG o WEBP.";
    } else if (formData.image.size > 2 * 1024 * 1024) {
      errors.image = "La imagen no puede superar los 2MB.";
    }
  }

  return errors;
}
