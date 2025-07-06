interface TaskProps {
  title: string;
  description: string;
  onUpdate: () => void;
  onDelete: () => void;
}

const Task: React.FC<TaskProps> = ({
  title,
  description,
  onUpdate,
  onDelete,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex space-x-2">
        <button
          onClick={onUpdate}
          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
        >
          Update
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
