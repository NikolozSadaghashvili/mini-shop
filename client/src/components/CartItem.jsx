import React, { useContext } from "react";
import "../style/cart.css";
import { CartContext } from "../context/cartContext";

const CartItem = ({ product }) => {
  const { _id, price, image, title, quantity } = product;
  const { addInCart, decrementItem, removeItem } = useContext(CartContext);

  return (
    <div className="cart-item">
      <img src={image} alt={title} />
      <div className="cart-details">
        <h4>{title}</h4>
        <p>${price}</p>
        <div className="quantity-controls">
          <button onClick={() => decrementItem(product)}>➖</button>
          <span>{quantity}</span>
          <button onClick={() => addInCart(product)}>➕</button>
        </div>
        {quantity > 1 && (
          <span className="total-item-price">
            Product total Price: ${price * quantity}
          </span>
        )}
        <button className="remove-btn" onClick={() => removeItem(_id)}>
          Remove 🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem;
