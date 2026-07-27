import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { ModalProvider } from "./context/ModalContext.tsx";
import { SearchProvider } from "./context/SearchContext.tsx";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <ModalProvider>
            <SearchProvider>
              <App />
            </SearchProvider>
          </ModalProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
);
