import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRouter = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRouter;
