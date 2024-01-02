import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { RootState } from '../store';

const PrivateRoute = () => {
  // const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const token = useSelector((state: RootState) => state.user.token);
  return token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
