import axios from 'axios';
import { Task } from '../types/board.type';
import { TaskFormData } from '../schemas/task.schema';

class TaskService {
  async getTasksByBoardId(boardId: number): Promise<Task[]> {
    const response = await axios.get(
      `http://localhost:3001/boards/${boardId}/tasks`
    );
    return response.data;
  }

  async createTask(boardId: number, data: TaskFormData): Promise<Task> {
    const payload = { ...data, boardId };
    const response = await axios.post(
      `http://localhost:3001/boards/${boardId}/tasks`,
      payload
    );
    return response.data;
  }

  async updateTask(
    boardId: number,
    taskId: number,
    data: Partial<TaskFormData>
  ): Promise<Task> {
    const payload = { ...data, boardId };
    const response = await axios.patch(
      `http://localhost:3001/boards/${boardId}/tasks/${taskId}`,
      payload
    );
    return response.data;
  }

  async deleteTask(boardId: number, taskId: number): Promise<void> {
    await axios.delete(
      `http://localhost:3001/boards/${boardId}/tasks/${taskId}`
    );
  }
}

export const taskService = new TaskService();
