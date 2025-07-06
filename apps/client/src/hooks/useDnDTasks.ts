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
      setDndTasks((prevDndTasks) => {
        const grouped = groupTasksByStatus(tasks);
        const isSame = Object.keys(grouped).every(
          (status) =>
            JSON.stringify(grouped[status as TaskStatus]) ===
            JSON.stringify(prevDndTasks[status as TaskStatus])
        );
        return isSame ? prevDndTasks : grouped;
      });
    }
  }, [tasks]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;
    const taskId = parseInt(draggableId);

    // Clone state for manipulation
    const updatedTasks = { ...dndTasks };

    if (sourceStatus === destStatus) {
      // Reorder inside the same column
      const tasksInColumn = Array.from(updatedTasks[sourceStatus]);
      const taskIndex = tasksInColumn.findIndex((t) => t.id === taskId);
      const [movedTask] = tasksInColumn.splice(taskIndex, 1);
      tasksInColumn.splice(destination.index, 0, movedTask);

      updatedTasks[sourceStatus] = tasksInColumn;
      setDndTasks(updatedTasks);

      // Optionally call onStatusChange only if you want to persist order
    } else {
      // Move between columns - update status
      const sourceTasks = Array.from(updatedTasks[sourceStatus]);
      const destTasks = Array.from(updatedTasks[destStatus]);

      const taskIndex = sourceTasks.findIndex((t) => t.id === taskId);
      const [movedTask] = sourceTasks.splice(taskIndex, 1);
      const newTask = { ...movedTask, status: destStatus };

      destTasks.splice(destination.index, 0, newTask);

      updatedTasks[sourceStatus] = sourceTasks;
      updatedTasks[destStatus] = destTasks;

      setDndTasks(updatedTasks);

      if (onStatusChange) {
        try {
          onStatusChange(taskId, destStatus);
        } catch (error) {
          console.error('Failed to update task status', error);
        }
      }
    }
  };

  return { dndTasks, onDragEnd };
};
