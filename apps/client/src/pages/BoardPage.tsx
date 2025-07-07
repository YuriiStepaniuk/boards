import { DragDropContext } from '@hello-pangea/dnd';
import { TaskStatus } from '../enums/task-status.enum';
import { useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';
import TaskColumn from '../components/board/TaskColumn';
import { useDnDTasks } from '../hooks/useDnDTasks';
import { TaskFormData } from '../schemas/task.schema';
import { useModal } from '../hooks/useModal';
import Modal from '../components/Modal';
import CreateTaskForm from '../components/board/CreateTaskForm';
import { useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import { Task } from '../types/board.type';
import UpdateTaskForm from '../components/board/UpdateTaskForm';

import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetTasksQuery,
  useUpdateTaskMutation,
} from '../store/api/tasks-api';

export default function BoardPage() {
  const { id: boardId } = useParams();

  const {
    isOpen: isCreateOpen,
    openModal: openCreateModal,
    closeModal: closeCreateModal,
  } = useModal();

  const {
    isOpen: isUpdateOpen,
    openModal: openUpdateModal,
    closeModal: closeUpdateModal,
  } = useModal();

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery(boardId!, {
    skip: !boardId,
  });

  const [createTask] = useCreateTaskMutation();
  const [updateTask] = useUpdateTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  const handleStatusChange = async (taskId: number, newStatus: TaskStatus) => {
    if (!boardId) return;

    try {
      await updateTask({
        boardId,
        taskId,
        data: { status: newStatus },
      }).unwrap();
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const { dndTasks, onDragEnd } = useDnDTasks(tasks || [], handleStatusChange);

  const handleColumnUpdate = (taskId: number) => {
    const allTasks = Object.values(dndTasks).flat();
    const task = allTasks.find((t) => t.id === taskId);
    if (task) {
      setTaskToUpdate(task);
      openUpdateModal();
    }
  };

  const handleColumnDelete = (taskId: number) => {
    setTaskToDelete(taskId);
    openDeleteModal();
  };

  const handleCreateSubmit = async (data: TaskFormData) => {
    if (!boardId) return;
    try {
      await createTask({ boardId, data }).unwrap();
      closeCreateModal();
    } catch (err) {
      console.error('Create task failed:', err);
    }
  };

  const handleUpdateSubmit = async (data: TaskFormData) => {
    if (!taskToUpdate || !boardId) return;
    try {
      await updateTask({ boardId, taskId: taskToUpdate.id, data }).unwrap();
      closeUpdateModal();
      setTaskToUpdate(null);
    } catch (err) {
      console.error('Update task failed:', err);
    }
  };

  const confirmDeleteTask = async () => {
    if (taskToDelete === null || !boardId) return;
    try {
      await deleteTask({ boardId, taskId: taskToDelete }).unwrap();
      closeDeleteModal();
      setTaskToDelete(null);
    } catch (err) {
      console.error('Delete task failed:', err);
    }
  };

  if (isLoading) return <Loading />;
  if (error || !tasks) return <ErrorMessage />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="mb-4 flex justify-start">
        <button
          onClick={openCreateModal}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          + Create Task
        </button>
      </div>

      {isCreateOpen && (
        <Modal onClose={closeCreateModal}>
          <CreateTaskForm
            onSubmit={handleCreateSubmit}
            onCancel={closeCreateModal}
          />
        </Modal>
      )}

      <div className="flex gap-4 p-4">
        {(Object.keys(dndTasks) as TaskStatus[]).map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={dndTasks[status]}
            onUpdateTask={handleColumnUpdate}
            onDeleteTask={handleColumnDelete}
          />
        ))}
      </div>

      {isUpdateOpen && taskToUpdate && (
        <Modal onClose={closeUpdateModal}>
          <UpdateTaskForm
            defaultValues={{
              title: taskToUpdate.title,
              description: taskToUpdate.description,
            }}
            onSubmit={handleUpdateSubmit}
            onCancel={closeUpdateModal}
          />
        </Modal>
      )}

      {isDeleteOpen && taskToDelete !== null && (
        <ConfirmModal
          message="Are you sure you want to delete this task?"
          id={taskToDelete}
          onConfirm={confirmDeleteTask}
          onCancel={() => {
            setTaskToDelete(null);
            closeDeleteModal();
          }}
        />
      )}
    </DragDropContext>
  );
}
