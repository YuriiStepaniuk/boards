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
import { taskService } from '../services/task.service';
import { useEffect, useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import { Task } from '../types/board.type';
import UpdateTaskForm from '../components/board/UpdateTaskForm';
import { useAppDispatch, useAppSelector } from '../store/storeHooks';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from '../store/slices/tasks-slice';

export default function BoardPage() {
  const { id } = useParams();
  const boardId = id ? parseInt(id, 10) : NaN;

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

  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

  const {
    isOpen: isDeleteOpen,
    openModal: openDeleteModal,
    closeModal: closeDeleteModal,
  } = useModal();

  const [taskToDelete, setTaskToDelete] = useState<number | null>(null);

  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const isLoading = useAppSelector((state) => state.tasks.loading);
  const error = useAppSelector((state) => state.tasks.error);

  useEffect(() => {
    if (boardId) dispatch(fetchTasks(boardId));
  }, [boardId, dispatch]);

  const handleStatusChange = async (taskId: number, newStatus: TaskStatus) => {
    try {
      await taskService.updateTask(boardId, taskId, { status: newStatus });
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const { dndTasks, onDragEnd } = useDnDTasks(tasks, handleStatusChange);

  const handleCreateTask = async (data: TaskFormData) => {
    try {
      if (!boardId) return;
      await dispatch(createTask({ boardId, data })).unwrap();
      closeCreateModal();
    } catch (error) {
      console.error('Create task failed:', error);
    }
  };

  const handleUpdateTask = (taskId: number) => {
    const allTasks = Object.values(dndTasks).flat();
    const task = allTasks.find((t) => t.id === taskId);
    if (task) {
      setTaskToUpdate(task);
      openUpdateModal();
    }
  };

  const handleUpdateSubmit = async (data: TaskFormData) => {
    try {
      if (!boardId || !taskToUpdate) return;
      await dispatch(
        updateTask({ boardId, taskId: taskToUpdate.id, data })
      ).unwrap();
      closeUpdateModal();
      setTaskToUpdate(null);
    } catch (error) {
      console.error('Update task failed:', error);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTaskToDelete(taskId);
    openDeleteModal();
  };

  const confirmDeleteTask = async () => {
    try {
      if (!boardId || taskToDelete === null) return;
      await dispatch(deleteTask({ boardId, taskId: taskToDelete })).unwrap();
      closeDeleteModal();
      setTaskToDelete(null);
    } catch (error) {
      console.error('Delete task failed:', error);
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
            onSubmit={handleCreateTask}
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
            onUpdateTask={handleUpdateTask}
            onDeleteTask={handleDeleteTask}
          />
        ))}
      </div>

      {isUpdateOpen && taskToUpdate && (
        <Modal
          onClose={() => {
            closeUpdateModal();
            setTaskToUpdate(null);
          }}
        >
          <UpdateTaskForm
            defaultValues={{
              title: taskToUpdate.title,
              description: taskToUpdate.description,
            }}
            onSubmit={handleUpdateSubmit}
            onCancel={() => {
              closeUpdateModal();
              setTaskToUpdate(null);
            }}
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
