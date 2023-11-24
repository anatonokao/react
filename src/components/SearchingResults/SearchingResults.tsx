import React, { FC, useState } from 'react';
import SearchingResultsItem from './SearchingResultsItem/SearchingResultsItem';
import styles from './SearchingResults.module.css';
import Pagination from './Pagination/Pagination';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { IBook } from '../../models/IBook';
import { useAppSelector } from '../../hooks/redux';
import Link from 'next/link';

export interface SearchingResultsProps {
  data: IBook[];
}

const SearchingResults: FC<SearchingResultsProps> = (props) => {
  const { page } = useAppSelector((state) => state.appReducer);
  const [details, setDetails] = useState(false);
  // const navigate = useNavigate();
  return (
    <>
      <Pagination />
      <div className={styles.body}>
        <div
          className={styles.itemsContainer}
          onClick={() => {
            if (details) {
              // navigate(`/?page=${page}`);
              setDetails(false);
            }
          }}
        >
          {props.data &&
            props.data.map((item) => (
              <Link
                href={`details/${item.id}?page=${page}`}
                key={item.id}
                onClick={() => {
                  setDetails(true);
                }}
                data-testid="book-item"
              >
                <SearchingResultsItem key={item.id} item={item} />
              </Link>
            ))}
        </div>
        <Outlet context={{ setDetails, currentPage: page }} />
      </div>
    </>
  );
};

export default SearchingResults;
