interface LoginFormData {
  email: string;
  password: string;
}

export function validateLoginForm(
  formData: LoginFormData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!formData.email.trim()) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  if (!formData.password) {
    errors.password = "La contraseña es obligatoria.";
  }

  return errors;
}
