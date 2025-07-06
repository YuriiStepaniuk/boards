import { useEffect, useState } from 'react';
import { Board } from '../types/board.type';
import { boardService } from '../services/board.service';

export const useBoards = () => {
  const [boards, setBoards] = useState<Board[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBoards = async () => {
      setIsLoading(true);
      setError(null);
      try {
        setIsLoading(true);
        const data = await boardService.getBoards();
        setBoards(data);
      } catch (error: any) {
        console.error(error);
        setError(error.message || 'Error loading boards');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBoards();
  }, []);

  return { boards, isLoading, error };
};
