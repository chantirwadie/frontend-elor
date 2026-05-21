import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from '../components/common/Loading';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user || user.role !== 'ADMIN') {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminRoute;
