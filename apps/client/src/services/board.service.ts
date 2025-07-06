import axios from 'axios';
import { Board } from '../types/board.type';

class BoardService {
  private baseUrl = 'http://localhost:3001/boards';

  async getBoards(): Promise<Board[]> {
    const response = await axios.get(this.baseUrl);
    return response.data;
  }

  async getBoard(id: number): Promise<Board> {
    const response = await axios.get(`${this.baseUrl}/${id}`);
    return response.data;
  }

  async createBoard(data: any): Promise<Board> {
    const response = await axios.post(this.baseUrl, data);
    return response.data;
  }

  async updateBoard(id: number, data: any): Promise<Board> {
    const response = await axios.put(`${this.baseUrl}/${id}`, data);
    return response.data;
  }

  async deleteBoard(id: number): Promise<void> {
    await axios.delete(`${this.baseUrl}/${id}`);
  }
}

export const boardService = new BoardService();
