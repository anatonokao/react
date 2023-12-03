import Card from '../Card/Card';
import React from 'react';
import { useAppSelector } from '../../store/hooks/redux';

const CardList = () => {
  const cards = useAppSelector((state) => state.cardsReducer.cards);

  return (
    <>
      {cards.map((card, index) => (
        <div key={index}>
          <Card card={card} />
        </div>
      ))}
    </>
  );
};

export default CardList;
