interface FormData {
  fullName: string;
  company: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export function validateRegisterForm(
  formData: FormData,
): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!formData.fullName.trim()) {
    errors.fullName = "El nombre completo es obligatorio.";
  }

  if (!formData.company.trim()) {
    errors.company = "El nombre de la empresa es obligatorio.";
  }

  if (!formData.email.trim()) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = "El correo electrónico no es válido.";
  }

  if (!formData.password) {
    errors.password = "La contraseña es obligatoria.";
  } else if (formData.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres.";
  }

  if (!formData.confirmPassword) {
    errors.confirmPassword = "Confirmá tu contraseña.";
  } else if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden.";
  }

  if (!formData.acceptTerms) {
    errors.acceptTerms = "Debes aceptar los términos y condiciones.";
  }

  return errors;
}
