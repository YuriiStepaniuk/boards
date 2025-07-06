import axios from 'axios';
import { Task } from '../types/board.type';

class TaskService {
  async getTasksByBoardId(boardId: number): Promise<Task[]> {
    const response = await axios.get(
      `http://localhost:3001/boards/${boardId}/tasks`
    );
    return response.data;
  }

  async createTask(boardId: number, data: any): Promise<Task> {
    const response = await axios.post(
      `http://localhost:3001/boards/${boardId}/tasks`,
      data
    );
    return response.data;
  }

  async updateTask(boardId: number, taskId: number, data: any): Promise<Task> {
    const response = await axios.put(
      `http://localhost:3001/boards/${boardId}/tasks/${taskId}`,
      data
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
