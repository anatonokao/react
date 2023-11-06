import React, { FC } from 'react';
import { Item } from '../../../types/Interfaces';
import styles from './SearchingResultsItem.module.css';

interface SearchingResultsItemProps {
  item: Item;
}

const SearchingResultsItem: FC<SearchingResultsItemProps> = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.name}>{props.item.volumeInfo.title}</div>
      <img
        src={
          props.item.volumeInfo.imageLinks &&
          props.item.volumeInfo.imageLinks.thumbnail
        }
        alt=""
      />
      <div className={styles.stat}>{props.item.volumeInfo.authors}</div>
      <div className={`${styles.stat} ${styles.description}`}>
        Page Count: {props.item.volumeInfo.pageCount}
      </div>
      <div className={`${styles.stat} ${styles.description}`}>
        Language: {props.item.volumeInfo.language}
      </div>

      {props.item.saleInfo.listPrice && (
        <div>
          Price:{' '}
          {props.item.saleInfo.listPrice.currencyCode +
            ' ' +
            props.item.saleInfo.listPrice.amount}
        </div>
      )}
    </div>
  );
};

export default SearchingResultsItem;
