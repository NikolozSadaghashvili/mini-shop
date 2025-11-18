import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../context/cartContext";
import { CartItem } from "../components";
import "../style/cart.css";

const Cart = () => {
  const { cartItems } = useContext(CartContext);

  if (cartItems.length < 1) {
    return <h2>Cart is Emtry</h2>;
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      {cartItems.map((product) => (
        <CartItem key={product._id} product={product} />
      ))}
      <h2>Total Price : {totalPrice}$</h2>
    </div>
  );
};

export default Cart;
