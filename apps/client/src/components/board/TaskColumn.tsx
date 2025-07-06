import { Draggable, Droppable } from '@hello-pangea/dnd';
import { TaskStatus } from '../../enums/task-status.enum';
import { Task } from '../../types/board.type';
import TaskComponent from './Task';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onUpdateTask: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  status,
  tasks,
  onUpdateTask,
  onDeleteTask,
}) => (
  <Droppable droppableId={status}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.droppableProps}
        className={`bg-gray-100 rounded p-4 w-1/3 min-h-[400px] max-h-[600px] overflow-y-auto ${
          snapshot.isDraggingOver ? 'bg-blue-100' : ''
        }`}
      >
        <h2 className="text-xl font-bold mb-4 capitalize">
          {status.replace('_', ' ')}
        </h2>

        {tasks.map((task, index) => (
          <Draggable
            key={task.id}
            draggableId={task.id.toString()}
            index={index}
          >
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <TaskComponent
                  title={task.title}
                  description={task.description}
                  status={task.status}
                  onUpdateTask={() => onUpdateTask(task.id)}
                  onDeleteTask={() => onDeleteTask(task.id)}
                />
              </div>
            )}
          </Draggable>
        ))}

        {provided.placeholder}
      </div>
    )}
  </Droppable>
);

export default TaskColumn;
