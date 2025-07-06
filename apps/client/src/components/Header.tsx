import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img src="/favicon.ico" alt="Boards App Logo" className="h-10 w-10" />

          <h1 className="text-3xl font-extrabold tracking-tight cursor-pointer">
            Boards App
          </h1>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/"
                className="hover:text-blue-200 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/boards"
                className="hover:text-blue-200 transition duration-300"
              >
                Boards
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
