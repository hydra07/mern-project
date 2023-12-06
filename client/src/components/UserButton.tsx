import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../redux/store';
import { logout } from '../redux/user/userSlice';

const UserButton = () => {
  const user = useSelector((state: RootState) => state.user.currentUser);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex items-center justify-end">
      {user && user.email ? (
        <div className="flex items-center">
          <div className="text-gray-300 text-sm mr-2">
            Welcome, {user.email}
          </div>
          <button
            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-3 rounded"
            onClick={() => dispatch(logout())}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="flex">
          <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-3 rounded mr-2">
            <Link to="/login">Login</Link>
          </button>

          <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-3 rounded">
            <Link to="/signup">Register</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserButton;
