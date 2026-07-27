interface AddUserFormData {
  fullName: string;
  email: string;
  password: string;
  profileId: string;
}

export function validateAddUserForm(
  formData: AddUserFormData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  const [firstName, ...rest] = formData.fullName.trim().split(" ");
  const lastName = rest.join(" ");

  if (!firstName) {
    errors.fullName = "El nombre completo es obligatorio.";
  } else if (!lastName) {
    errors.fullName = "Ingresá nombre y apellido.";
  }

  if (!formData.email.trim()) {
    errors.email = "El email es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "El email no es válido.";
  }

  if (!formData.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (formData.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  if (!formData.profileId) {
    errors.profileId = "Seleccioná un rol.";
  }

  return errors;
}
