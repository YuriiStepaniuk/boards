import { TaskStatus } from '../enums/task-status.enum';

export type BoardType = {
  hashedId: string;
  name: string;
  tasks: Task[];
};

export type Task = {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
};
