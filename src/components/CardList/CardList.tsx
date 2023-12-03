import Card from '../Card/Card';
import React from 'react';
import { useAppSelector } from '../../store/hooks/redux';

const CardList = () => {
  const cards = useAppSelector((state) => state.cardsReducer.cards);

  return (
    <>
      {cards.length ? (
        cards.map((card, index) => (
          <div key={index}>
            <Card card={card} />
          </div>
        ))
      ) : (
        <>
          <div
            style={{ fontSize: '30px', fontWeight: '600', color: '#e1e1e1', textAlign: 'center' }}
          >
            Empty :(
            <div
              style={{
                fontSize: '20px',
                fontWeight: '400',
                color: '#afafaf',
                marginTop: '10px',
              }}
            >
              Try add someone in forms
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CardList;
