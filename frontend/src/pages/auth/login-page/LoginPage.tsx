import type { JSX } from "react";

import "./LoginPage.css";

import { LoginContentSection } from "../../../components/login-content-section/LoginContentSection";
import { LoginFormSection } from "../../../components/login-form-section/LoginFormSection";
import { Helmet } from "react-helmet-async";

function LoginPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Inventory Pro | Iniciar sesión</title>
        <meta name="description" content="Iniciar sesión en Inventory Pro" />
      </Helmet>

      <div className="login-container">
        <LoginContentSection />

        <LoginFormSection />
      </div>
    </>
  );
}

export default LoginPage;
