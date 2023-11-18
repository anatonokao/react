import React, { FC } from 'react';
import styles from './Pagination.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { appSlice } from '../../../store/reducers/BookSlice';

const Pagination: FC = () => {
  const { page, countPerPage } = useAppSelector((state) => state.appReducer);

  const { setPage, setCountPerPage } = appSlice.actions;

  const dispatch = useAppDispatch();

  return (
    <div className={styles.pagination}>
      <button
        data-testid={'PaginationPrev'}
        type="button"
        onClick={() => dispatch(setPage('prev'))}
        className={styles.btn}
      >
        {'🡄'}
      </button>
      <span className={styles.page_number}>{page}</span>
      <button
        data-testid={'PaginationNext'}
        type="button"
        onClick={() => dispatch(setPage('next'))}
        className={styles.btn}
      >
        {'🡆'}
      </button>
      <select
        className={styles.countSelector}
        name="maxCount"
        id="maxCount"
        onChange={(e) => dispatch(setCountPerPage(Number(e.target.value)))}
        value={countPerPage}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>
    </div>
  );
};

export default Pagination;
