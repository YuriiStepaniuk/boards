interface TaskProps {
  title: string;
  description: string;
  status: string;
  onUpdateTask: () => void;
  onDeleteTask: () => void;
}

const TaskComponent: React.FC<TaskProps> = ({
  title,
  description,
  status,
  onUpdateTask,
  onDeleteTask,
}) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="text-sm px-2 py-1 rounded bg-blue-100 text-blue-800">
          {status.replace('_', ' ')}
        </span>
      </div>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex space-x-2">
        <button
          onClick={onUpdateTask}
          className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 transition"
        >
          Update
        </button>
        <button
          onClick={onDeleteTask}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskComponent;
