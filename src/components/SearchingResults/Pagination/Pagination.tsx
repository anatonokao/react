import React, { FC } from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  updatePage: (vector: 'next' | 'prev') => void;
  currentPage: number;
  countPerPage: number;
  updateCountPerPage: (count: number) => void;
}

const Pagination: FC<PaginationProps> = (props) => {
  return (
    <div className={styles.pagination}>
      <button
        type="button"
        onClick={() => props.updatePage('prev')}
        className={styles.btn}
      >
        {'🡄'}
      </button>
      <span className={styles.page_number}>{props.currentPage}</span>
      <button
        type="button"
        onClick={() => props.updatePage('next')}
        className={styles.btn}
      >
        {'🡆'}
      </button>
      <select
        name="maxCount"
        id="maxCount"
        onChange={(e) => props.updateCountPerPage(Number(e.target.value))}
        value={props.countPerPage}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

export default Pagination;
