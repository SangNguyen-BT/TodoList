import { Navigate } from "react-router-dom";

const ProtectedRoute = (props) => {
  const { userName, children } = props;

  if (!userName) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default ProtectedRoute;
