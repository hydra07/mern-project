import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-opacity-50 backdrop-blur-lg bg-gray-700 text-white py-4 fixed w-full z-10">
      <div className="container mx-auto shadow-sm">
        <nav className="flex justify-between items-center max-w-6xl mx-auto p-3">
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Register</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
