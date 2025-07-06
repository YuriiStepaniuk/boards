import { useCallback, useEffect, useState } from 'react';
import { Board } from '../types/board.type';
import { boardService } from '../services/board.service';

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchBoards = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await boardService.getBoards();
      setBoards(data);
      setError(null);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch boards');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  return { boards, isLoading, error, refetch: fetchBoards };
};
