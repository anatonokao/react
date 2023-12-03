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
  cards: [
    // {
    //   name: 'penis',
    //   age: 32,
    //   email: 'povelitel.123@gmail.com',
    //   password: '123',
    //   gender: 'male',
    //   image: img,
    //   country: 'Russia',
    //   t_and_c: true,
    // },
  ],
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
