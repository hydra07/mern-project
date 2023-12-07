import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { Link } from 'react-router-dom';
// import './Header.css'; // Import your CSS file
import UserButton from './UserButton';

const Header = () => {
  return (
    <header className="bg-gray-950 py-3 text-white sm:px-6 lg:px-8 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <nav className="space-x-4">
          <span className="inline-flex">
            <Link to="/" className=" focus:outline-none">
              {' Home'}
            </Link>
          </span>
          <DropdownMenu>
            <DropdownMenuTrigger className="dropdown-trigger inline-flex items-center focus: outline-none">
              Menu
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-4 w-4 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dropdown-content rounded shadow-md bg-black text-white w-[300px] focus: outline-none">
              <DropdownMenuItem
                className="dropdown-item block py-2 px-4 hover:bg-gray-900 focus: outline-none"
                onClick={() => (window.location.href = '/')}
              >
                <Link to="/" className="text-white font-medium ">
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="dropdown-item block py-2 px-4 hover:bg-gray-900 focus: outline-none">
                <Link to="/profile" className="text-white font-medium ">
                  Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
