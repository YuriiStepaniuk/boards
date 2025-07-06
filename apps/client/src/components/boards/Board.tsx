import { Link } from 'react-router-dom';
import { route } from '../../types/route';

interface BoardProps {
  id: number;
  name: string;
  tasksCount: number;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({
  id,
  name,
  tasksCount,
  onUpdate,
  onDelete,
}) => {
  return (
    <Link
      to={`${route.BOARDS}/${id}`}
      className="flex items-center justify-between bg-white p-4 rounded shadow mb-3 mx-24 hover:bg-gray-100 transition cursor-pointer"
    >
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>Current number of tasks: {tasksCount}</p>
      </div>

      <div className="flex space-x-2 ml-4">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onUpdate(id);
          }}
          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
        >
          Update
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(id);
          }}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </Link>
  );
};

export default Board;
