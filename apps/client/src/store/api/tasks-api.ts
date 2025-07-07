import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TaskFormData } from '../../schemas/task.schema';
import { Task } from '../../types/board.type';

export const tasksApi = createApi({
  reducerPath: 'tasksApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Task'],
  endpoints: (builder) => ({
    getTasks: builder.query<Task[], string>({
      query: (boardId) => `boards/${boardId}/tasks`,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Task' as const, id })),
              { type: 'Task', id: 'LIST' },
            ]
          : [{ type: 'Task', id: 'LIST' }],
    }),
    createTask: builder.mutation<Task, { boardId: string; data: TaskFormData }>(
      {
        query: ({ boardId, data }) => ({
          url: `boards/${boardId}/tasks`,
          method: 'POST',
          body: { boardId, ...data },
        }),
        invalidatesTags: [{ type: 'Task', id: 'LIST' }],
      },
    ),
    updateTask: builder.mutation<
      Task,
      { boardId: string; taskId: number; data: Partial<TaskFormData> }
    >({
      query: ({ boardId, taskId, data }) => ({
        url: `boards/${boardId}/tasks/${taskId}`,
        method: 'PATCH',
        body: { boardId, ...data },
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
        { type: 'Task', id: 'LIST' },
      ],
    }),
    deleteTask: builder.mutation<number, { boardId: string; taskId: number }>({
      query: ({ boardId, taskId }) => ({
        url: `boards/${boardId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, { taskId }) => [
        { type: 'Task', id: taskId },
      ],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
