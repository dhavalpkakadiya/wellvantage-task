import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const userData = localStorage.getItem("userData");

  return userData ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
