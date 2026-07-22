import type { JSX } from "react";

import { Archive } from "lucide-react";

import "./LoginContentSection.css";

import dashboardPreview from "../../assets/images/dashboard-preview.jpg";

export function LoginContentSection(): JSX.Element {
  return (
    <section className="login-background">
      <div className="login-content">
        <div className="login-title-container">
          <span className="login-icon-container">
            <Archive color="#044bc4" size={40} />
          </span>

          <h2 className="login-title">Inventory Pro</h2>
        </div>

        <h3 className="login-subtitle">
          Optimiza tu almacén con precisión milimétrica.
        </h3>

        <p className="login-description">
          Accede a la plataforma lide en gestion de activos e inventarios en
          tiempo real.
        </p>
      </div>

      <div className="login-dashboard-preview">
        <span className="login-dashboard-preview-title">DASHBOARD PREVIEW</span>

        <img src={dashboardPreview} alt="Dashboard Preview" />
      </div>
    </section>
  );
}
