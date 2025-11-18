import { Routes, Route } from "react-router-dom";
import ProtectedRouter from "./ProtectedRouter";
import {
  Login,
  Signup,
  Cart,
  Profile,
  CreateProduct,
  Home,
  Products,
  SingleProduct,
  MyProduct,
} from "../pages";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<SingleProduct />} />
      <Route
        path="/cart"
        element={
          <ProtectedRouter>
            <Cart />
          </ProtectedRouter>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRouter>
            <Profile />
          </ProtectedRouter>
        }
      />
      <Route
        path="/profile/my-products"
        element={
          <ProtectedRouter>
            <MyProduct />
          </ProtectedRouter>
        }
      />

      <Route
        path="/addProduct"
        element={
          <ProtectedRouter>
            <CreateProduct />
          </ProtectedRouter>
        }
      />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;
