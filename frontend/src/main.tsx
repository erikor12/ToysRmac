import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./contexts/cartcontext";
import "./index.css";
import { AuthProvider } from "./contexts/authcontext";
import { SearchProvider } from "./contexts/searchcontext";

import DemoAlert from "./components/DemoAlert";
import "./components/demoalert.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <SearchProvider>
            <DemoAlert
              localStorageKey = "seenDemoAlert_v1"
              title = "Aviso: Página de prueba"
              message = "Estás viendo una versión de prueba. Algunos datos pueden ser ficticios y algunas funciones pueden no estar completas."
            />
            <App />
          </SearchProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);