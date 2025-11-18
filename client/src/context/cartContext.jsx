import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router";

const initialCart = JSON.parse(localStorage.getItem("cartItems")) || [];
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(initialCart);
  const [cartCount, setCartCount] = useState(cartItems.length);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const addInCart = (product) => {
    if (!user) {
      toast.info("Please enter login");
      navigate("/login");
      return;
    }
    const { _id, price, title, image } = product;
    const findItem = cartItems.find((item) => item._id === _id);
    if (!findItem) {
      setCartCount((nowCart) => nowCart + 1);
      const newCart = { _id, price, title, image, quantity: 1 };
      setCartItems((nowCart) => [...nowCart, newCart]);

      toast.success("Product add in cart");
      return;
    }
    const findIndex = cartItems.findIndex((item) => item._id === _id);
    const updateCart = [...cartItems];
    updateCart[findIndex].quantity += 1;
    toast.success("Product quantity increased");
    setCartItems(updateCart);
  };

  const decrementItem = (product) => {
    const { _id, quantity } = product;
    if (quantity === 1) {
      const filterItems = cartItems.filter((element) => element._id !== _id);
      setCartItems(filterItems);
      setCartCount(filterItems.length);
      toast.info("Item removed from cart");
      return;
    }
    const updateCart = [...cartItems];
    const findIndex = cartItems.findIndex((element) => element._id === _id);
    updateCart[findIndex].quantity -= 1;
    toast.info("Item quantity decreased");
    setCartItems(updateCart);
  };

  const removeItem = (id) => {
    const filterItems = cartItems.filter((element) => element._id !== id);
    setCartItems(filterItems);
    setCartCount(filterItems.length);
    toast.info("Item removed from cart");
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartCount, addInCart, cartItems, decrementItem, removeItem }}
    >
      {children}
    </CartContext.Provider>
  );
};
