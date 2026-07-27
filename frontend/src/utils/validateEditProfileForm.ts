interface EditProfileFormData {
  firstName: string;
  lastName: string;
  phone: string;
}

export function validateEditProfileForm(
  formData: EditProfileFormData,
  avatarFile: File | null,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "El nombre es obligatorio.";
  } else if (formData.firstName.length > 100) {
    errors.firstName = "El nombre no puede superar los 100 caracteres.";
  }

  if (!formData.lastName.trim()) {
    errors.lastName = "El apellido es obligatorio.";
  } else if (formData.lastName.length > 100) {
    errors.lastName = "El apellido no puede superar los 100 caracteres.";
  }

  if (formData.phone && !/^\+?[\d\s\-()]{6,20}$/.test(formData.phone)) {
    errors.phone = "El teléfono no es válido.";
  }

  if (avatarFile) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(avatarFile.type)) {
      errors.avatar = "Solo se permiten imágenes JPG, PNG o WEBP.";
    } else if (avatarFile.size > 2 * 1024 * 1024) {
      errors.avatar = "La imagen no puede superar los 2MB.";
    }
  }

  return errors;
}
