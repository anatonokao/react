import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  request: string;
  isLoading: boolean;
  isDetailsLoading: boolean;
  totalItems: number;
  page: number;
  startIndex: number;
  countPerPage: number;
}

const initState: AppState = {
  request: localStorage.getItem('request') || '',
  isLoading: false,
  isDetailsLoading: false,
  totalItems: 0,
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
      localStorage.setItem('request', action.payload);
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setIsDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailsLoading = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setPage: (state, action: PayloadAction<'prev' | 'next'>) => {
      if (
        action.payload === 'next' &&
        state.totalItems > state.page * state.countPerPage
      )
        state.page += 1;
      if (
        action.payload === 'prev' &&
        state.page * state.countPerPage > state.countPerPage
      )
        state.page -= 1;
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
