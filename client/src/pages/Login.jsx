import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css"; // ცალკე CSS ფაილი
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const URL = "http://localhost:3000/api/auth/login";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const loginUser = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please Fill all input");
      return;
    }
    try {
      const response = await axios.post(URL, { email, password });
      const { success, message, token, user } = response.data;
      if (success) {
        toast.success(message);
        setEmail("");
        setPassword("");
        navigate("/");
        login(user, token);
        return;
      }
    } catch (error) {
      const errorMessage = error.response.data.message || error.message;
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={loginUser}>
        <h2>Login</h2>
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
        <button type="submit">LOGIN</button>
      </form>
      <span className="login-switch">
        You don't have an account? <Link to="/signup">Register</Link>
      </span>
    </div>
  );
};

export default Login;
