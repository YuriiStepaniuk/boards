import axios from 'axios';
import { Task } from '../../types/board.type';
import { TaskFormData } from '../../schemas/task.schema';

const API_URL = process.env.REACT_APP_API_URL;

export const getTasks = (boardId: number) =>
  axios.get<Task[]>(`${API_URL}/boards/${boardId}/tasks`);

export const postTask = (boardId: number, data: TaskFormData) =>
  axios.post<Task>(`${API_URL}/boards/${boardId}/tasks`, data);

export const patchTask = (
  boardId: number,
  taskId: number,
  data: Partial<TaskFormData>
) => axios.patch<Task>(`${API_URL}/boards/${boardId}/tasks/${taskId}`, data);

export const removeTask = (boardId: number, taskId: number) =>
  axios.delete(`${API_URL}/boards/${boardId}/tasks/${taskId}`);
