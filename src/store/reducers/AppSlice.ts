import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ICard {
  name: string
  age: number
  email: string
  password: string
  gender: string
  image: string
  country: string
  t_and_c: boolean
}

const initState: { cards: ICard[] } = {
  cards: [],
};

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: initState,
  reducers: {
    addCard: (state, action: PayloadAction<ICard>) => {
      state.cards = [...state.cards, action.payload];
    },
  },
});

export default cardsSlice.reducer;
