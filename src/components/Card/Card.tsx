import React, { FC } from 'react';
import { ICard } from '../../store/reducers/AppSlice';
import styles from './Card.module.css';

interface CardProps {
  card: ICard
}

const Card: FC<CardProps> = ({ card }) => {
  return (
    <div className={styles.container}>
      <div className={styles.name}>{card.name}</div>
      <div className={styles.image}>
        <img src={card.image} alt='photo' />
      </div>
      <div className={styles.infoField}>
        Age: <span>{card.age} y.o.</span>
      </div>
      <div className={styles.infoField}>
        Gender: <span>{card.gender}</span>
      </div>
      <div className={styles.infoField}>
        Country: <span>{card.country}</span>
      </div>
      <div className={styles.infoField}>
        Email: <span>{card.email}</span>
      </div>
      <div className={styles.infoField}>
        Password: <span>{card.password}</span>
      </div>
      <div className={styles.infoField}>
        Terms and conditions: <span>{card.t_and_c ? 'accepted' : 'not accepted'}</span>
      </div>
    </div>
  );
};

export default Card;
