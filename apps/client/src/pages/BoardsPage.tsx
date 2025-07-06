import Board from '../components/boards/Board';
import SearchBoards from '../components/boards/SearchBoards';
import { useBoards } from '../hooks/useBoards';

const BoardsPage = () => {
  const { boards, isLoading, error } = useBoards();

  // Mock update handler
  const onUpdate = (id: number) => {
    console.log(`Update board with id: ${id}`);
    // TODO: Add update logic here
  };

  // Mock delete handler
  const onDelete = (id: number) => {
    console.log(`Delete board with id: ${id}`);
    // TODO: Add delete logic here
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oops, something wrong happened: {error}</p>;

  return (
    <div>
      <SearchBoards />
      {boards &&
        boards.map((board) => (
          <Board
            key={board.id}
            name={board.name}
            tasksCount={board.tasks.length}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
    </div>
  );
};

export default BoardsPage;
