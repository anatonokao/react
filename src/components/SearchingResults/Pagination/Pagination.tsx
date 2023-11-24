import React, { FC } from 'react';
import styles from './Pagination.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { appSlice } from '../../../store/reducers/AppSlice';
import { useSearchParams } from 'react-router-dom';

const Pagination: FC = () => {
  const { page, countPerPage } = useAppSelector((state) => state.appReducer);

  const { setCountPerPage } = appSlice.actions;

  const dispatch = useAppDispatch();

  // const [params, setParams] = useSearchParams();

  // const handleNextPage = () => {
  //   const pageFromParams = params.get('page');
  //   setParams(`page=${pageFromParams ? Number(pageFromParams) + 1 : 1}`);
  // };
  //
  // const handlePrevPage = () => {
  //   const pageFromParams = params.get('page');
  //   setParams(`page=${pageFromParams ? Number(pageFromParams) - 1 : 1}`);
  // };

  return (
    <div className={styles.pagination}>
      <button
        data-testid={'PaginationPrev'}
        type="button"
        onClick={() => {}}
        className={styles.btn}
      >
        {'🡄'}
      </button>
      <span className={styles.page_number}>{page}</span>
      <button
        data-testid={'PaginationNext'}
        type="button"
        onClick={() => {}}
        className={styles.btn}
      >
        {'🡆'}
      </button>
      <select
        className={styles.countSelector}
        name="maxCount"
        id="maxCount"
        onChange={(e) => {
          dispatch(setCountPerPage(Number(e.target.value)));
          // setParams('page=1');
        }}
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
