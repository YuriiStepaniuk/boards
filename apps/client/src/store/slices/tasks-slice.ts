import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Task } from '../../types/board.type';
import { TaskFormData } from '../../schemas/task.schema';
import { RootState } from '../store';
import { getTasks, patchTask, postTask, removeTask } from '../api/tasks-api';

const setLoading = (state: TasksState) => {
  state.loading = true;
  state.error = null;
};

const setError = (state: TasksState, action: any, msg: string) => {
  state.loading = false;
  state.error = action.error?.message || msg;
};

export const fetchTasks = createAsyncThunk<Task[], number>(
  'tasks/fetchTasks',
  async (boardId) => {
    const res = await getTasks(boardId);
    return res.data;
  }
);

export const createTask = createAsyncThunk<
  Task,
  { boardId: number; data: TaskFormData }
>('tasks/createTask', async ({ boardId, data }) => {
  const res = await postTask(boardId, data);
  return res.data;
});

export const updateTask = createAsyncThunk<
  Task,
  { boardId: number; taskId: number; data: Partial<TaskFormData> }
>('tasks/updateTask', async ({ boardId, taskId, data }) => {
  const res = await patchTask(boardId, taskId, data);
  return res.data;
});

export const deleteTask = createAsyncThunk<
  number,
  { boardId: number; taskId: number }
>('tasks/deleteTask', async ({ boardId, taskId }) => {
  await removeTask(boardId, taskId);
  return taskId;
});

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, setLoading)
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) =>
        setError(state, action, 'Failed to fetch tasks')
      )

      // createTask
      .addCase(createTask.pending, setLoading)
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) =>
        setError(state, action, 'Failed to create task')
      )

      // updateTask
      .addCase(updateTask.pending, setLoading)
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) state.tasks[index] = action.payload;
      })
      .addCase(updateTask.rejected, (state, action) =>
        setError(state, action, 'Failed to update task')
      )

      // deleteTask
      .addCase(deleteTask.pending, setLoading)
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) =>
        setError(state, action, 'Failed to delete task')
      );
  },
});

export const selectTasks = (state: RootState) => state.tasks.tasks;
export const selectLoading = (state: RootState) => state.tasks.loading;
export const selectError = (state: RootState) => state.tasks.error;

export default tasksSlice.reducer;
