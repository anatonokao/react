import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  request: string;
  isLoading: boolean;
  isDetailsLoading: boolean;
  page: number;
  startIndex: number;
  countPerPage: number;
}

const initState: AppState = {
  request: 'book',
  isLoading: false,
  isDetailsLoading: false,
  page: 1,
  startIndex: 0,
  countPerPage: 20,
};

export const appSlice = createSlice({
  name: 'app',
  initialState: initState,
  reducers: {
    setRequest: (state, action: PayloadAction<string>) => {
      state.request = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailsLoading = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload;
    },
    setCountPerPage: (state, action: PayloadAction<number>) => {
      state.countPerPage = action.payload;
    },
  },
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
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(bookAPI., (state) => {
  //       state.isLoading = true;
  //     })
  //     .addCase(fetchBooks.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.error = '';
  //       state.books = action.payload.items;
  //     })
  //     .addCase(fetchBooks.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error =
  //         typeof action.payload === 'string' ? action.payload : 'Error 404';
  //     });
  // },
});

export default appSlice.reducer;
