import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppState {
  request: string;
  isAppLoading: boolean;
  isDetailsLoading: boolean;
  totalItems: number;
  page: number;
  startIndex: number;
  countPerPage: number;
}

const initState: AppState = {
  request: localStorage.getItem('request') || '',
  isAppLoading: false,
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
      state.isAppLoading = action.payload;
    },
    setIsDetailsLoading: (state, action: PayloadAction<boolean>) => {
      state.isDetailsLoading = action.payload;
    },
    setTotalItems: (state, action: PayloadAction<number>) => {
      state.totalItems = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      if (
        action.payload * state.countPerPage >= state.countPerPage &&
        state.totalItems > action.payload * state.countPerPage
      )
        state.page = action.payload;
    },
    setStartIndex: (state, action: PayloadAction<number>) => {
      state.startIndex = action.payload;
    },
    setCountPerPage: (state, action: PayloadAction<number>) => {
      state.countPerPage = action.payload;
    },
  },
});

export default appSlice.reducer;
