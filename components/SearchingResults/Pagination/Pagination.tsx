import React, { FC } from 'react';
import styles from './Pagination.module.css';
import { useRouter } from 'next/router';

const Pagination: FC = () => {
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
              page: router.query.page ? Number(router.query.page) + 1 : 2,
            },
          });
        }}
        className={styles.btn}
      >
        {'🡆'}
      </button>
      <select
        data-testid={'pagination-select'}
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
        <option value="10" data-testid={'pagination-select-option-10'}>
          10
        </option>
        <option value="20">20</option>
        <option value="30" data-testid={'pagination-select-option-30'}>
          30
        </option>
      </select>
    </div>
  );
};

export default Pagination;
