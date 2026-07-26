import type { JSX } from "react";

import "./RegisterPage.css";

import { RegisterContentSection } from "../../../components/register-content-section/RegisterContentSection";
import { RegisterFormSection } from "../../../components/register-form-section/RegisterFormSection";
import { Helmet } from "react-helmet-async";

function RegisterPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Inventory Pro | Registrarse</title>
        <meta name="description" content="Registrarse en Inventory Pro" />
      </Helmet>

      <div className="register-container">
        <RegisterContentSection />

        <RegisterFormSection />
      </div>
    </>
  );
}

export default RegisterPage;
