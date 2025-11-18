import React, { useEffect, useState } from "react";
import ProductCart from "../components/ProductCard";
import "../style/products-main.css";
import { toast } from "react-toastify";
import axios from "axios";

const Products = () => {
  const URL = "http://localhost:3000/api/products";

  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(URL);
      if (!response.data.success) {
        toast.error(response.data.message);
        return;
      }
      const allProduct = await response.data.data;
      setProducts(allProduct);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="product-main">
      {products.map((product) => (
        <ProductCart key={product._id} product={product} />
      ))}
    </div>
  );
};

export default Products;
