import { Link } from 'react-router-dom';
import UserButton from './UserButton';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-6 px-4 sm:px-6 lg:px-8 shadow-md fixed w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <nav className="space-x-4">
          <Link to="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link to="/profile" className="text-white hover:text-gray-300">
            Profile
          </Link>
        </nav>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
