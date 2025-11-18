import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useState } from "react";
import "../style/myproducts.css";

const MyProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useContext(AuthContext);
  const URL = "http://localhost:3000/api/products/my-products";

  const fetchMyProducts = async () => {
    try {
      const response = await axios.get(URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      const data = response.data.data;
      setProducts(data);
      console.log(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMyProducts();
  }, []);
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="my-products-container">
      <h1 className="my-products-title">My Products</h1>

      {products.length === 0 ? (
        <p className="no-products">You have no products yet.</p>
      ) : (
        <div className="my-products-grid">
          {products.map((prod) => (
            <div key={prod._id} className="my-product-card">
              <img src={prod.image} alt={prod.title} />
              <h4>{prod.title}</h4>
              <span>${prod.price}</span>
              <p>{prod.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProduct;
