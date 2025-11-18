import { useContext } from "react";
import "../style/products-main.css";
import { toast } from "react-toastify";
import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/AuthContext";
import { MdMore } from "react-icons/md";
import { Link } from "react-router";

const ProductCard = ({ product }) => {
  const { addInCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const { _id, title, price, image, description } = product;
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h4>{title}</h4>
      <span>{price}</span>
      {description && <p className="description">{description}</p>}
      <div className="product-actions">
        <button
          className="add-cart-btn"
          onClick={() => {
            addInCart(product);
          }}
        >
          Add to Cart
        </button>

        <Link to={`/products/${_id}`} className="more-icon">
          <MdMore size={24} />
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
