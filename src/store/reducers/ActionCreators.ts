import { IBook } from '../../models/IBook';
import { createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY: string = 'AIzaSyDYIbMfKgnY0ApGq1a3hM2Z3-g1GlqYa7o';

const SEARCH_BOOK_URL: string = 'https://www.googleapis.com/books/v1/volumes';

interface HttpResponse {
  kind: string;
  totalItems: number;
  items: IBook[];
}

export const fetchBooks = createAsyncThunk(
  'book/fetchSearch',
  async (_, thunkAPI) => {
    try {
      const finalRequest = `${SEARCH_BOOK_URL}?q=${'book'}&startIndex=${0}&maxResults=${8}&key=${API_KEY}`;
      return await fetch(finalRequest)
        .then((res) => res.json())
        .then((res: HttpResponse) => res);
    } catch (e) {
      return thunkAPI.rejectWithValue('Something went wrong');
    }
  }
);