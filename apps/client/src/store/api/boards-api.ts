import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Board } from '../../types/board.type';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/' }),
  tagTypes: ['Board'],
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => 'boards',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Board' as const, id })),
              { type: 'Board', id: 'LIST' },
            ]
          : [{ type: 'Board', id: 'LIST' }],
    }),
    getBoard: builder.query<Board, number>({
      query: (id) => `boards/${id}`,
      providesTags: (result, error, id) => [{ type: 'Board', id }],
    }),
    createBoard: builder.mutation<Board, Partial<Board>>({
      query: (data) => ({
        url: 'boards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),
    updateBoard: builder.mutation<Board, { id: number; data: Partial<Board> }>({
      query: ({ id, data }) => ({
        url: `boards/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Board', id }],
    }),
    deleteBoard: builder.mutation<void, number>({
      query: (id) => ({
        url: `boards/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetBoardQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
} = boardsApi;
