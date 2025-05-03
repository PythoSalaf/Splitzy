import { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const { isConnected } = useContext(AppContext);
  const location = useLocation();

  useEffect(() => {
    if (!isConnected) {
      toast.warn("Please connect your wallet to access this page");
    }
  }, [isConnected, location.pathname]);

  return isConnected ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
