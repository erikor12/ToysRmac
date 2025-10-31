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
              message1 = "Estás viendo una versión de prueba. Algunos datos pueden ser ficticios y algunas funciones pueden no estar completas."
              message2 = "También es posible que la aplicación tarde en cargar los datos de la API (Productos y clientes), esto es un problema se debe a que Render la relentiza despues de 15 minutos de inactividad debido a las limitaciones del plan gratuito"
              message3 = "Para solucionar esto, simplemente haz que aparezca el error de HTTP 500, espera un minuto y recarga la página."
            />
            <App />
          </SearchProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);