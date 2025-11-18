import React, { useContext } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";

import "../style/header.css";
import { Link } from "react-router-dom";

import { CartContext } from "../context/cartContext";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { cartCount } = useContext(CartContext);
  const { user, logout } = useContext(AuthContext);

  return (
    <header className="header">
      {/* Logo მარცხნივ */}
      <div className="header-left">
        <Link to="/" className="title">
          MINI-SHOP
        </Link>
      </div>

      {/* Menu შუაში */}
      <nav className="header-center">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/products" className="nav-link">
          Products
        </Link>
        {user && (
          <Link to="/cart" className="nav-link">
            Cart 🛒
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
        )}
      </nav>

      {/* User მარჯვნივ */}
      <div className="header-right">
        {user ? (
          <>
            <span className="nav-user">Hi, {user.name}</span>
            <button className="nav-logout" onClick={logout}>
              Logout
            </button>
            <div className="profile-wrapper">
              <Link to="/profile" className="profile-icon">
                <FaRegUserCircle />
                <span className="tooltip">Profile</span>
              </Link>
            </div>
            <div className="add-product-wrapper">
              <Link to="/addProduct" className="add-product-icon">
                <IoMdAddCircleOutline />
                <span className="tooltip">Add Product</span>
              </Link>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
