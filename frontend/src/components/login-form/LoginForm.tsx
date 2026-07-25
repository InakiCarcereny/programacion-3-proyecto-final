import { useState, type JSX } from "react";

import "./LoginForm.css";

import { MailIcon, LockIcon, ArrowRight } from "lucide-react";

import { LoginFormInput } from "../login-form-input/LoginFormInput";
import { useAuth } from "../../context/AuthContext";
import { validateLoginForm } from "../../utils/validateLoginForm";
import { useNavigate } from "react-router-dom";

export function LoginForm(): JSX.Element {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { close } = useModal();
  const [error, setError] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const validationErrors = validateLoginForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard");
    } catch (err) {
      if (err instanceof Error) {
        setError({ general: err.message });
      }
    }
  };

  useEffect(() => {
    close();
  }, [close]);

  return (
    <form className="login-form" onSubmit={onSubmit}>
      <div className="login-form-container">
        <LoginFormInput
          id="email"
          name="email"
          type="email"
          placeholder="juan.perez@empresa.com"
          label="CORREO ELECTRÓNICO"
          icon={<MailIcon />}
          value={formData.email}
          onChange={handleChange}
          error={error.email}
        />

        <LoginFormInput
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          label="CONTRASEÑA"
          icon={<LockIcon />}
          value={formData.password}
          onChange={handleChange}
          error={error.password}
        />
      </div>

      {error.general && <p className="login-form-error">{error.general}</p>}

      <button className="submit-button" type="submit">
        Iniciar sesión
        <ArrowRight color="#ffffff" />
      </button>
    </form>
  );
}
