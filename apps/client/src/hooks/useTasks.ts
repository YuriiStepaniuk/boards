import { useCallback, useEffect, useState } from 'react';
import { Task } from '../types/board.type';
import { taskService } from '../services/task.service';

export const useTasks = (boardId: number) => {
  const [tasks, setTasks] = useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await taskService.getTasksByBoardId(boardId);
      setTasks(data);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch tasks');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, isLoading, error, refetch: fetchTasks };
};
