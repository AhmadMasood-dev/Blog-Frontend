import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import Spinner from "../components/atoms/Spinner"; // Assuming you have a Spinner component
function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useContext(AuthContext);

  if (loading) {
    return (
      <div>
        <Spinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
