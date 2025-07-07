import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BoardType } from '../../types/board.type';

export const boardsApi = createApi({
  reducerPath: 'boardsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
  tagTypes: ['Board'],
  endpoints: (builder) => ({
    getBoards: builder.query<BoardType[], number | void>({
      query: (limit) => (limit ? `boards?limit=${limit}` : 'boards'),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ hashedId }) => ({
                type: 'Board' as const,
                id: hashedId,
              })),
              { type: 'Board', id: 'LIST' },
            ]
          : [{ type: 'Board', id: 'LIST' }],
    }),
    getBoard: builder.query<BoardType, string>({
      query: (hashedId) => `boards/${hashedId}`,
      providesTags: (result, error, hashedId) => [
        { type: 'Board', id: hashedId },
      ],
    }),
    createBoard: builder.mutation<BoardType, Partial<BoardType>>({
      query: (data) => ({
        url: 'boards',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'Board', id: 'LIST' }],
    }),
    updateBoard: builder.mutation<
      BoardType,
      { hashedId: string; data: Partial<BoardType> }
    >({
      query: ({ hashedId, data }) => ({
        url: `boards/${hashedId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { hashedId }) => [
        { type: 'Board', id: hashedId },
      ],
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (hashedId) => ({
        url: `boards/${hashedId}`,
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
