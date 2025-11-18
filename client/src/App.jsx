import { Routes } from "react-router-dom";
import { Header } from "./components";
import { ToastContainer } from "react-toastify";
import { CartProvider } from "./context/cartContext";
import { AuthProvider } from "./context/AuthContext";

import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Header />
          <AppRoutes />
        </CartProvider>
      </AuthProvider>
      <ToastContainer position="bottom-left" autoClose={1500} theme="dark" />
    </>
  );
}

export default App;
