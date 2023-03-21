import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  if (window.sessionStorage.getItem("currentUser")) {
    return children;
  }
  return <Navigate to={"/"} />;
}
export default ProtectedRoute;
