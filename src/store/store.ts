import { combineReducers, configureStore } from '@reduxjs/toolkit';
import cardsReducer from './reducers/AppSlice';
import { countries } from '../assets/countries';

const rootReducer = combineReducers({
  cardsReducer,
  countries: () => countries,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
