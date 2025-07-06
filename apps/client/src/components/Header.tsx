const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-4 shadow-xl">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-tight">Boards App</h1>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <a
                href="#"
                className="hover:text-blue-200 transition duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-200 transition duration-300"
              >
                Boards
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-blue-200 transition duration-300"
              >
                Settings
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
