import { Navigate } from 'react-router-dom';
import { getToken } from './auth';

const PrivateRoute = ({ children }) => {
  const token = getToken();
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

export default PrivateRoute; 