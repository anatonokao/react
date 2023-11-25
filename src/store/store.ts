import { combineReducers, configureStore } from '@reduxjs/toolkit';
import appReducer from './reducers/AppSlice';
import { bookAPI } from '../services/BookService';
import { createWrapper } from 'next-redux-wrapper';

const rootReducer = combineReducers({
  appReducer,
  [bookAPI.reducerPath]: bookAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(bookAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore);