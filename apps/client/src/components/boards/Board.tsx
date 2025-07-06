interface BoardProps {
  name: string;
  tasksCount: number;
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

const Board: React.FC<BoardProps> = ({
  name,
  tasksCount,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded shadow mb-3 mx-24">
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{name}</h3>
        <p>Current number of tasks: {tasksCount}</p>
      </div>

      <div className="flex space-x-2 ml-4">
        <button
          onClick={() => onUpdate}
          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
        >
          Update
        </button>
        <button
          onClick={() => onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Board;
