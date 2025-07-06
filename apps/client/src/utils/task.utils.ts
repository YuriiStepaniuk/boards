import { Task } from '../types/board.type';
import { TaskStatus } from '../enums/task-status.enum';

export const groupTasksByStatus = (tasks: Task[]) => ({
  [TaskStatus.TODO]: tasks.filter((t) => t.status === TaskStatus.TODO),
  [TaskStatus.IN_PROGRESS]: tasks.filter(
    (t) => t.status === TaskStatus.IN_PROGRESS
  ),
  [TaskStatus.DONE]: tasks.filter((t) => t.status === TaskStatus.DONE),
});
