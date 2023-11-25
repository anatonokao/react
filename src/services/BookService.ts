import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook as Item, IBook } from '../models/IBook';
import { HYDRATE } from 'next-redux-wrapper';

const API_KEY: string = 'AIzaSyDYIbMfKgnY0ApGq1a3hM2Z3-g1GlqYa7o';

export interface HttpResponse {
  kind: string;
  totalItems: number;
  items: Item[];
}

type SearchParams = {
  query?: string;
  startIndex?: string;
  countPerPage?: string;
};

export const bookAPI = createApi({
  reducerPath: 'bookAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1',
  }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (build) => ({
    fetchBookSearch: build.query<HttpResponse, SearchParams>({
      query: ({ query, startIndex = 0, countPerPage = 20 }) => ({
        url: `/volumes?q=${
          query || 'book'
        }&startIndex=${startIndex}&maxResults=${countPerPage}&key=${API_KEY}`,
      }),
    }),
    fetchBookDetails: build.query<IBook, string>({
      query: (id: string) => ({
        url: `/volumes/${id}?key=${API_KEY}`,
      }),
    }),
  }),
});

export const {
  util: { getRunningQueriesThunk },
} = bookAPI;