import SearchBoards from '../components/boards/SearchBoards';
import {
  useGetBoardsQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useGetBoardQuery,
} from '../store/api/boards-api';

import { BoardFormData } from '../schemas/board.schema';
import { useModal } from '../hooks/useModal';
import Modal from '../components/Modal';
import CreateBoardForm from '../components/boards/CreateBoardForm';
import ConfirmModal from '../components/ConfirmModal';
import { useState } from 'react';
import UpdateBoardForm from '../components/boards/UpdateBoardForm';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import { BoardType } from '../types/board.type';
import Board from '../components/boards/Board';

const BoardsPage = () => {
  const [searchedHashedId, setSearchedHashedId] = useState<string | null>(null);

  const {
    data: singleBoard,
    error: singleBoardError,
    isLoading: singleBoardLoading,
  } = useGetBoardQuery(searchedHashedId!, {
    skip: !searchedHashedId,
  });

  const {
    data: allBoards,
    error: allBoardsError,
    isLoading: allBoardsLoading,
  } = useGetBoardsQuery(5);

  const [createBoard] = useCreateBoardMutation();
  const [updateBoard] = useUpdateBoardMutation();
  const [deleteBoard] = useDeleteBoardMutation();

  const [boardToUpdate, setBoardToUpdate] = useState<BoardFormData | null>(
    null
  );
  const [boardToDelete, setBoardToDelete] = useState<string | null>(null);

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

  const onUpdate = (boardHashedId: string) => {
    const board = allBoards?.find((b) => b.hashedId === boardHashedId);
    if (board) {
      setBoardToUpdate({ name: board.name });
      openUpdateModal();
    }
  };

  const onDelete = (boardHashedId: string) => {
    setBoardToDelete(boardHashedId);
    openDeleteModal();
  };

  const handleCreateBoard = async (data: BoardFormData) => {
    try {
      await createBoard(data).unwrap();
      closeCreateModal();
    } catch (error) {
      console.error('Create failed:', error);
    }
  };

  const handleUpdateBoard = async (data: BoardFormData) => {
    if (!boardToUpdate) return;
    try {
      const boardId = allBoards?.find(
        (b) => b.name === boardToUpdate.name
      )?.hashedId;
      if (!boardId) throw new Error('Board id not found');
      await updateBoard({ hashedId: boardId, data }).unwrap();
      closeUpdateModal();
      setBoardToUpdate(null);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleDeleteBoard = async (id: string) => {
    try {
      await deleteBoard(id).unwrap();
      setBoardToDelete(null);
      closeDeleteModal();
    } catch (error) {
      console.error('Delete failed:', error);
    }
  };

  const handleSearchById = (hashedId: string) => {
    setSearchedHashedId(hashedId);
  };

  const boardsToRender = searchedHashedId
    ? singleBoard
      ? [singleBoard]
      : []
    : allBoards;

  if (singleBoardLoading || allBoardsLoading) return <Loading />;

  return (
    <div>
      <SearchBoards
        onCreateClick={openCreateModal}
        onSearchById={handleSearchById}
      />

      {isCreateModalOpen && (
        <Modal onClose={closeCreateModal}>
          <CreateBoardForm
            onSubmit={handleCreateBoard}
            onCancel={closeCreateModal}
          />
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

      {singleBoardError || allBoardsError ? (
        <ErrorMessage message="No boards were found. Check entered Id" />
      ) : (
        <div className="max-h-[600px] overflow-y-auto border border-gray-200 rounded p-4">
          {boardsToRender &&
            boardsToRender.map((board: BoardType) => (
              <Board
                key={board.hashedId}
                hashedId={board.hashedId}
                name={board.name}
                tasksCount={board.tasks.length}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
        </div>
      )}

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
