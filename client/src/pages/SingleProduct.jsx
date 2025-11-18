import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import "../style/single-product.css";
import { CartContext } from "../context/cartContext";

const SingleProduct = () => {
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const URL = `http://localhost:3000/api/products/${id}`;
  const { addInCart } = useContext(CartContext);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(URL);
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      const data = response.data.data;
      setProduct(data);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (!product) {
    return <h1>Product not found</h1>;
  }

  return (
    <div className="single-main">
      <div className="single-image">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="single-info">
        <h2 className="single-title">{product.title}</h2>
        <span className="single-price">${product.price}</span>
        {product.description && (
          <p className="single-description">{product.description}</p>
        )}
        <button className="add-cart-btn" onClick={() => addInCart(product)}>
          Add in cart
        </button>
      </div>
    </div>
  );
};

export default SingleProduct;
