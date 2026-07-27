import { useState, type JSX } from "react";

import "./RegisterForm.css";

import {
  BuildingIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  ArrowRight,
} from "lucide-react";

import { RegisterFormInput } from "../register-form-input/RegisterFormInput";
import { useAuth } from "../../context/AuthContext";
import { validateRegisterForm } from "../../utils/validateRegisterForm";
import { useNavigate } from "react-router-dom";

export function RegisterForm(): JSX.Element {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [error, setError] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError({});

    const validationErrors = validateRegisterForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      await register(
        formData.fullName,
        formData.company,
        formData.email,
        formData.password,
      );
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError({ general: err.message });
      }
    }
  };

  return (
    <form className="register-form" onSubmit={onSubmit}>
      <div className="register-form-grid">
        <RegisterFormInput
          id="fullName"
          name="fullName"
          label="NOMBRE COMPLETO"
          type="text"
          placeholder="Juan Pérez"
          icon={<UserIcon color="currentColor" />}
          value={formData.fullName}
          onChange={handleChange}
          error={error.fullName}
        />

        <RegisterFormInput
          id="company"
          name="company"
          label="EMPRESA"
          type="text"
          placeholder="Logística S.A."
          icon={<BuildingIcon color="currentColor" />}
          value={formData.company}
          onChange={handleChange}
          error={error.company}
        />
      </div>

      <RegisterFormInput
        id="email"
        name="email"
        label="CORREO ELECTRÓNICO"
        type="email"
        placeholder="juan.perez@empresa.com"
        icon={<MailIcon color="currentColor" />}
        value={formData.email}
        onChange={handleChange}
        error={error.email}
      />

      <div className="register-form-grid">
        <RegisterFormInput
          id="password"
          name="password"
          label="CONTRASEÑA"
          type="password"
          placeholder="••••••••"
          icon={<LockIcon color="currentColor" />}
          value={formData.password}
          onChange={handleChange}
          error={error.password}
        />

        <RegisterFormInput
          id="confirmPassword"
          name="confirmPassword"
          label="CONFIRMAR CONTRASEÑA"
          type="password"
          placeholder="••••••••"
          icon={<LockIcon color="currentColor" />}
          value={formData.confirmPassword}
          onChange={handleChange}
          error={error.confirmPassword}
        />
      </div>

      <div>
        <input
          id="acceptTerms"
          name="acceptTerms"
          type="checkbox"
          checked={formData.acceptTerms}
          onChange={handleChange}
        />

        <label htmlFor="acceptTerms" className="register-form-terms">
          Acepto los{" "}
          <a className="register-form-terms-link" href="#">
            Términos y Condiciones
          </a>{" "}
          y la{" "}
          <a className="register-form-terms-link" href="#">
            Política de Privacidad
          </a>{" "}
          de Inventory Pro.
        </label>

        {error.acceptTerms && (
          <p className="register-form-error">{error.acceptTerms}</p>
        )}
      </div>

      {error.general && <p className="register-form-error">{error.general}</p>}

      <button className="submit-button" type="submit">
        Crear cuenta
        <ArrowRight color="#ffffff" />
      </button>
    </form>
  );
}
