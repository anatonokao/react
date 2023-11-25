import React, { FC } from 'react';
import styles from './Pagination.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { appSlice } from '../../../store/reducers/AppSlice';
import { useSearchParams } from 'react-router-dom';
import { useRouter } from 'next/router';

const Pagination: FC = () => {
  // const { page, countPerPage } = useAppSelector((state) => state.appReducer);
  //
  // const { setCountPerPage } = appSlice.actions;
  //
  // const dispatch = useAppDispatch();
  //
  // // const [params, setParams] = useSearchParams();
  //
  // // const handleNextPage = () => {
  // //   const pageFromParams = params.get('page');
  // //   setParams(`page=${pageFromParams ? Number(pageFromParams) + 1 : 1}`);
  // // };
  // //
  // // const handlePrevPage = () => {
  // //   const pageFromParams = params.get('page');
  // //   setParams(`page=${pageFromParams ? Number(pageFromParams) - 1 : 1}`);
  // // };

  const router = useRouter();

  const page = router.query.page || '1';
  const countPerPage = router.query.countPerPage || '20';

  return (
    <div className={styles.pagination}>
      <button
        data-testid={'PaginationPrev'}
        type="button"
        onClick={() => {
          if (router.query.page && Number(router.query.page) > 1)
            router.push({
              query: {
                ...router.query,
                page: Number(router.query.page) - 1,
              },
            });
        }}
        className={styles.btn}
      >
        {'🡄'}
      </button>
      <span className={styles.page_number}>{page}</span>
      <button
        data-testid={'PaginationNext'}
        type="button"
        onClick={() => {
          router.push({
            query: {
              ...router.query,
              page: router.query.page ? Number(router.query.page) + 1 : 1,
            },
          });
        }}
        className={styles.btn}
      >
        {'🡆'}
      </button>
      <select
        className={styles.countSelector}
        name="maxCount"
        id="maxCount"
        onChange={(e) => {
          router.push({
            query: { ...router.query, page: 1, countPerPage: e.target.value },
          });
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
