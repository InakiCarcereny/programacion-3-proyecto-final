import type { JSX } from "react";

import { LoginForm } from "../login-form/LoginForm";

import "./LoginFormSection.css";

export function LoginFormSection(): JSX.Element {
  return (
    <section className="login-form-section">
      <div className="login-form-container">
        <header className="login-form-header">
          <h2 className="login-form-title">Bienvenido de nuevo</h2>

          <p className="login-form-description">
            Ingresa tus credenciales para acceder a tu panel.
          </p>
        </header>

        <LoginForm />

        <footer className="login-form-footer">
          <span className="login-form-footer-text">
            ¿No tienes una cuenta?{" "}
            <a className="login-form-footer-link" href="/registro">
              Regístrate
            </a>
          </span>

          <span className="login-form-footer-rights">
            © 2026 Inventory Pro. Todos los derechos reservados.
          </span>
        </footer>
      </div>
    </section>
  );
}
