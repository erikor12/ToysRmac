import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CartProvider } from "./contexts/cartcontext";
import "./index.css";
import { AuthProvider } from "./contexts/authcontext";
import { SearchProvider } from "./contexts/searchcontext";


createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <SearchProvider>
            <App />
          </SearchProvider>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);

