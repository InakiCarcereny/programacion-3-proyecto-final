import type { JSX } from "react";

import { Archive } from "lucide-react";

import "./RegisterContentSection.css";

import avatar1 from "../../assets/images/avatar-1.jpg";
import avatar2 from "../../assets/images/avatar-2.jpg";
import avatar3 from "../../assets/images/avatar-3.jpg";

const avatars = [avatar1, avatar2, avatar3];

export function RegisterContentSection(): JSX.Element {
  return (
    <section className="register-background">
      <div className="register-content">
        <span className="register-icon-container">
          <Archive color="#044bc4" size={40} />
        </span>

        <h2 className="register-title">Gestión Inteligente de Almacenes</h2>

        <p className="register-description">
          Únete a más de 2.000 empresas que optimizan sus operaciones diarias
          con Inventory Pro. Control total, visibilidad en tiempo real y
          eficiencia operativa.
        </p>
      </div>

      <div className="register-news">
        <div className="register-news-avatars-container">
          {avatars.map((avatar, index) => (
            <img
              key={index}
              src={avatar}
              alt={`Avatar ${index + 1}`}
              className="register-news-avatars"
              style={{ marginLeft: index === 0 ? "0" : "-20px" }}
            />
          ))}
        </div>

        <span className="register-news-text">Nuevos Registros Esta Semana</span>
      </div>
    </section>
  );
}
