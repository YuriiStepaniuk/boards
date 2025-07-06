import { useState, useEffect } from 'react';
import { DropResult } from '@hello-pangea/dnd';
import { Task } from '../types/board.type';
import { TaskStatus } from '../enums/task-status.enum';
import { groupTasksByStatus } from '../utils/task.utils';

type GroupedTasks = Record<TaskStatus, Task[]>;

export const useDnDTasks = (
  tasks: Task[] | null,
  onStatusChange?: (taskId: number, newStatus: TaskStatus) => void
) => {
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

  const onDragEnd = async (result: DropResult) => {
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
      const newTask = { ...movedTask, status: destStatus };
      destTasks.splice(destination.index, 0, newTask);

      setDndTasks((prev) => ({
        ...prev,
        [sourceStatus]: sourceTasks,
        [destStatus]: destTasks,
      }));

      if (onStatusChange) {
        await onStatusChange(newTask.id, destStatus);
      }
    }
  };

  return { dndTasks, onDragEnd, setDndTasks };
};
