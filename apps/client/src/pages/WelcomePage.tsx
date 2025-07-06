import { Link } from 'react-router-dom';
import { route } from '../types/route';

const WelcomePage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg p-10 my-16 shadow-lg">
      <h1 className="text-5xl font-extrabold mb-6 text-center">
        Welcome to Boards App
      </h1>
      <p className="text-xl mb-8 text-center">
        Organize your tasks easily, track progress, and collaborate effectively.
      </p>
      <div className="flex justify-center">
        <Link
          to={route.BOARDS}
          className="px-8 py-4 bg-white text-blue-700 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default WelcomePage;
