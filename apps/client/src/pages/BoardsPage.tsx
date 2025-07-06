import Board from '../components/boards/Board';
import SearchBoards from '../components/boards/SearchBoards';
import { useBoards } from '../hooks/useBoards';
import { boardService } from '../services/board.service';

import { BoardFormData } from '../schemas/board.schema';
import { useModal } from '../hooks/useModal';
import Modal from '../components/Modal';
import BoardForm from '../components/boards/BoardForm';
import ConfirmModal from '../components/ConfirmModal';
import { useState } from 'react';
import UpdateBoardForm from '../components/boards/UpdateBoardForm';

const BoardsPage = () => {
  const { boards, isLoading, error, refetch } = useBoards();
  const [boardToUpdate, setBoardToUpdate] = useState<BoardFormData | null>(
    null
  );
  const [boardToDelete, setBoardToDelete] = useState<number | null>(null);

  const {
    isOpen: isCreateModalOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  const {
    isOpen: isUpdateModalOpen,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModal();

  const {
    isOpen: isDeleteModalOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const onUpdate = (boardId: number) => {
    const board = boards?.find((b) => b.id === boardId);
    if (board) {
      setBoardToUpdate({ name: board.name });
      openUpdateModal();
    }
  };

  const onDelete = (id: number) => {
    setBoardToDelete(id);
    openDeleteModal();
  };

  const handleCreateBoard = async (data: BoardFormData) => {
    try {
      await boardService.createBoard(data);
      closeCreateModal();
      await refetch();
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  const handleUpdateBoard = async (data: BoardFormData) => {
    if (!boardToUpdate) return;

    try {
      const boardId = boards?.find((b) => b.name === boardToUpdate.name)?.id;

      if (!boardId) {
        console.error('Board id not found');
        return;
      }

      await boardService.updateBoard(boardId, data);
      closeUpdateModal();
      setBoardToUpdate(null);
      await refetch();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteBoard = async (id: number) => {
    try {
      console.log('deleteing board with id ', id);
      await boardService.deleteBoard(id);
      await refetch();
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Oops, something wrong happened: {error}</p>;

  return (
    <div>
      <SearchBoards onCreateClick={openCreateModal} />

      {isCreateModalOpen && (
        <Modal onClose={closeCreateModal}>
          <BoardForm onSubmit={handleCreateBoard} onCancel={closeCreateModal} />
        </Modal>
      )}

      {isUpdateModalOpen && boardToUpdate && (
        <Modal
          onClose={() => {
            closeUpdateModal();
            setBoardToUpdate(null);
          }}
        >
          <UpdateBoardForm
            defaultValues={boardToUpdate}
            onSubmit={handleUpdateBoard}
            onCancel={() => {
              closeUpdateModal();
              setBoardToUpdate(null);
            }}
          />
        </Modal>
      )}

      <div className="max-h-[600px] overflow-y-auto border border-gray-200 rounded p-4">
        {boards &&
          boards.map((board) => (
            <Board
              key={board.id}
              id={board.id}
              name={board.name}
              tasksCount={board.tasks.length}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
      </div>

      {isDeleteModalOpen && boardToDelete !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this board?"
          id={boardToDelete}
          onConfirm={async () => {
            await handleDeleteBoard(boardToDelete);
            setBoardToDelete(null);
            closeDeleteModal();
          }}
          onCancel={() => {
            setBoardToDelete(null);
            closeDeleteModal();
          }}
        />
      )}
    </div>
  );
};

export default BoardsPage;
