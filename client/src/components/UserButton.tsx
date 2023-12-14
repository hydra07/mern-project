import {
  DropdownMenu,
  DropdownMenuArrow,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { DropdownMenuContent } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { User } from '../redux/interface';
import { AppDispatch, RootState } from '../redux/store';
import { getProfile, logout } from '../redux/user/userSlice';

const UserButton = () => {
  const token = useSelector((state: RootState) => state.user.token);
  const dispatch = useDispatch<AppDispatch>();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchProfile = async () => {
      const action = await dispatch(getProfile());
      const fetchUser = action.payload;
      setUser(fetchUser.user);
    };
    fetchProfile();
  }, [dispatch, token]);

  return (
    <div className="flex items-center justify-end">
      {user ? (
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="dropdown-trigger inline-flex items-center focus: outline-none">
              <img
                // src={`data:image/png;base64,${user?.avatar}`}
                src={user?.avatar as string}
                alt=""
                className="w-10 h-10 rounded-full mr-4"
              />
              {user.name ? (
                <h4 className="text-start">{user?.name}</h4>
              ) : (
                <h4 className="text-start">{user?.email}</h4>
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dropdown-content rounded shadow-md bg-black text-white w-[310px] focus: outline-none">
              <DropdownMenuArrow className="dropdown-arrow" />
              <Link
                to="/profile"
                className="dropdown-item block py-2 px-4 hover:bg-gray-900 focus: outline-none text-center w-full"
              >
                Profile
              </Link>
              <button
                className="dropdown-item block py-2 px-4 hover:bg-gray-900 focus: outline-none text-center w-full"
                onClick={() => dispatch(logout())}
              >
                Logout
              </button>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="flex">
          <button className=" hover:bg-gray-900 text-white font-bold py-2 px-3 rounded mr-3">
            <Link to="/login">Login</Link>
          </button>

          <button className=" hover:bg-gray-900 text-white font-bold py-2 px-3 rounded">
            <Link to="/signup">Register</Link>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserButton;
