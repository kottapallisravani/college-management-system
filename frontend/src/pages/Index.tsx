import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to the unified login page on initial load
  return <Navigate to="/login" replace />;
};

export default Index;
