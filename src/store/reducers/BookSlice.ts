import { IBook } from '../../models/IBook';
import { createSlice } from '@reduxjs/toolkit';
import { fetchBooks } from './ActionCreators';

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
  // extraReducers: {
  //   [fetchBooks.pending.type]: (state) => (state.isLoading = true),
  //   [fetchBooks.fulfilled.type]: (state, action: PayloadAction<IBook[]>) => {
  //     state.isLoading = false;
  //     state.error = '';
  //     state.books = action.payload;
  //   },
  //   [fetchBooks.rejected.type]: (state, action: PayloadAction<string>) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.books = action.payload.items;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        console.log(action);
        state.error =
          typeof action.payload === 'string' ? action.payload : 'Error 404';
      });
  },
});

export default bookSlice.reducer;
