import { TaskStatus } from '../enums/task-status.enum';

export type Board = {
  id: number;
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
