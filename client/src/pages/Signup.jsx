import React, { useState } from "react";
import "../style/login.css"; // იგივე CSS, როგორც Login-ში
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Signup = () => {
  const URL = "http://localhost:3000/api/auth/signup";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const createAccount = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(URL, { name, email, password });
      const isSuccess = response.data.success;
      if (isSuccess) {
        toast.success(response.data.message);
        setName("");
        setEmail("");
        setPassword("");
        navigate("/login");
      }
    } catch (error) {
      const errorMessage = error.response.data.message || error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={createAccount}>
        <h2>Create Account</h2>
        <input
          type="text"
          placeholder="Enter Name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Create Account</button>
      </form>
      <span className="login-switch">
        You have an account? <Link to="/login">Login</Link>
      </span>
    </div>
  );
};

export default Signup;
