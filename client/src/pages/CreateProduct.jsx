import React, { useContext, useState } from "react";
import "../style/createProduct.css";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import { data, useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);
  const URL = "http://localhost:3000/api/products";

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        title,
        price,
        description,
      };
      if (image.trim() !== "") {
        newProduct.image = image;
      }

      const response = await axios.post(URL, newProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.data.success) {
        toast.error(response.data.message);
      }

      setTitle("");
      setImage("");
      setDescription("");
      setPrice(0);
      toast.success(response.data.message);
      const ID = response.data.data._id;
      navigate(`/products/${ID}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="create-product-main">
      <form className="create-product-form" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title...."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price...."
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <textarea
          type="text"
          placeholder="Description...."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image URL...."
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
