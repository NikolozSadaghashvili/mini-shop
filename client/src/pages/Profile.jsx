import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import "../style/profile.css";
const Profile = () => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <h1>USER NOT FOUND</h1>;
  }
  return (
    <div className="profile-container">
      <img
        src={
          user?.image
            ? user.image
            : "https://static.vecteezy.com/system/resources/previews/046/409/821/non_2x/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg"
        }
        alt="User profile avatar"
        className="profile-avatar"
      />

      <h1 className="profile-name">სახელი: {user?.name}</h1>
      <span className="profile-email">Email: {user?.email}</span>

      <Link to="/profile/my-products" className="my-products-link">
        My Products
      </Link>
    </div>
  );
};

export default Profile;
