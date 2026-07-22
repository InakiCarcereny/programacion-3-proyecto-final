import type { JSX } from "react";

import "./LoginPage.css";

import { LoginContentSection } from "../../../components/login-content-section/LoginContentSection";
import { LoginFormSection } from "../../../components/login-form-section/LoginFormSection";

function LoginPage(): JSX.Element {
  return (
    <div className="login-container">
      <LoginContentSection />

      <LoginFormSection />
    </div>
  );
}

export default LoginPage;
