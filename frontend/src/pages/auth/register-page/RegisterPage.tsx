import type { JSX } from "react";

import "./RegisterPage.css";

import { RegisterContentSection } from "../../../components/register-content-section/RegisterContentSection";
import { RegisterFormSection } from "../../../components/register-form-section/RegisterFormSection";

function RegisterPage(): JSX.Element {
  return (
    <div className="register-container">
      <RegisterContentSection />

      <RegisterFormSection />
    </div>
  );
}

export default RegisterPage;
