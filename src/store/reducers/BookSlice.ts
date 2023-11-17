import { IBook } from '../../models/IBook';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BookState {
  books: IBook[];
  isLoading: boolean;
  error: string;
}

const initState: BookState = {
  books: [],
  isLoading: false,
  error: '',
};

export const bookSlice = createSlice({
  name: 'book',
  initialState: initState,
  reducers: {},
});

export default bookSlice.reducer;
