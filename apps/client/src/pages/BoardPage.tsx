import { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import { Task } from '../types/board.type';
import { TaskStatus } from '../enums/task-status.enum';
import { groupTasksByStatus } from '../utils/task.utils';
import { useTasks } from '../hooks/useTasks';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

type GroupedTasks = Record<TaskStatus, Task[]>;

export default function BoardPage() {
  const { id } = useParams();
  const boardId = id ? parseInt(id, 10) : NaN;

  const { tasks, isLoading, error, refetch } = useTasks(boardId);

  const [dndTasks, setDndTasks] = useState<GroupedTasks>({
    [TaskStatus.TODO]: [],
    [TaskStatus.IN_PROGRESS]: [],
    [TaskStatus.DONE]: [],
  });

  useEffect(() => {
    if (tasks) {
      setDndTasks(groupTasksByStatus(tasks));
    }
  }, [tasks]);

  const onDragEnd = (result: DropResult) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;

    const sourceTasks = Array.from(dndTasks[sourceStatus]);
    const destTasks =
      sourceStatus === destStatus
        ? sourceTasks
        : Array.from(dndTasks[destStatus]);

    const draggedTaskIndex = sourceTasks.findIndex(
      (task) => task.id.toString() === draggableId
    );
    const [movedTask] = sourceTasks.splice(draggedTaskIndex, 1);

    if (sourceStatus === destStatus) {
      sourceTasks.splice(destination.index, 0, movedTask);

      setDndTasks((prev) => ({
        ...prev,
        [sourceStatus]: sourceTasks,
      }));
    } else {
      movedTask.status = destStatus;
      destTasks.splice(destination.index, 0, movedTask);

      setDndTasks((prev) => ({
        ...prev,
        [sourceStatus]: sourceTasks,
        [destStatus]: destTasks,
      }));
    }
  };

  if (isLoading) return <Loading />;
  if (error || !tasks) return <ErrorMessage />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4">
        {(Object.keys(dndTasks) as TaskStatus[]).map((status) => (
          <Droppable droppableId={status} key={status}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`bg-gray-100 rounded p-4 w-1/3 min-h-[400px] ${
                  snapshot.isDraggingOver ? 'bg-blue-100' : ''
                }`}
              >
                <h2 className="text-xl font-bold mb-4 capitalize">
                  {status.replace('_', ' ')}
                </h2>

                {dndTasks[status].map((task, index) => (
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
                        className={`p-2 mb-2 bg-white rounded shadow cursor-move ${
                          snapshot.isDragging ? 'bg-blue-200' : ''
                        }`}
                      >
                        <p className="font-semibold">{task.title}</p>
                        <p className="text-sm text-gray-600">
                          {task.description}
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
