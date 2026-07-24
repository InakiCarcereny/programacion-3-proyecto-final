import type { JSX } from "react";

import { RegisterForm } from "../register-form/RegisterForm";

import "./RegisterFormSection.css";

export function RegisterFormSection(): JSX.Element {
  return (
    <section className="register-form-section">
      <div className="register-form-container">
        <header className="register-form-header">
          <h2 className="register-form-title">Crear cuenta</h2>

          <p className="register-form-description">
            Comienza hoy mismo tu prueba gratuita de 14 días.
          </p>
        </header>

        <RegisterForm />

        <footer className="register-form-footer">
          <span className="register-form-footer-text">
            ¿Ya tienes una cuenta?{" "}
            <a className="register-form-footer-link" href="/iniciar-sesion">
              Inicia sesión
            </a>
          </span>

          <span className="register-form-footer-rights">
            © 2026 Inventory Pro. Todos los derechos reservados.
          </span>
        </footer>
      </div>
    </section>
  );
}
