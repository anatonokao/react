import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IBook as Item, IBook } from '../models/IBook';

const API_KEY: string = 'AIzaSyDYIbMfKgnY0ApGq1a3hM2Z3-g1GlqYa7o';

export interface HttpResponse {
  kind: string;
  totalItems: number;
  items: Item[];
}

type SearchParams = {
  query?: string;
  startIndex?: number;
  countPerPage?: number;
};

export const bookAPI = createApi({
  reducerPath: 'bookAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://www.googleapis.com/books/v1',
  }),
  endpoints: (build) => ({
    fetchBookSearch: build.query<HttpResponse, SearchParams>({
      query: ({ query = 'book', startIndex = 0, countPerPage = 20 }) => ({
        url: `/volumes?q=${query}&startIndex=${startIndex}&maxResults=${countPerPage}&key=${API_KEY}`,
      }),
    }),
    fetchBookDetails: build.query<IBook, string>({
      query: (id: string) => ({
        url: `/volumes/${id}?key=${API_KEY}`,
      }),
    }),
  }),
});
