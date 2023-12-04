import { Link } from 'react-router-dom';
import UserButton from './UserButton';
const Header = () => {
  return (
    <header className="bg-gray-700 bg-opacity-50 backdrop-blur-lg text-white py-4 fixed w-full z-10">
      <div className="container mx-auto shadow-sm flex justify-between items-center">
        <nav className="max-w-6xl p-3">
          <Link to="/" className="text-white">
            Home
          </Link>
        </nav>
        <UserButton />
      </div>
    </header>
  );
};

export default Header;
