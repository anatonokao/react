import React, { FC, useState } from 'react';
import SearchingResultsItem from './SearchingResultsItem/SearchingResultsItem';
import styles from './SearchingResults.module.css';
import Pagination from './Pagination/Pagination';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { bookAPI } from '../../services/BookService';
import { IBook } from '../../models/IBook';
import { useAppSelector } from '../../hooks/redux';

export interface SearchingResultsProps {
  // updatePage: (vector: 'next' | 'prev') => void;
  // // currentPage: number;
  // // countPerPage: number;
  // updateCountPerPage: (count: number) => void;
  data: IBook[];
}

const SearchingResults: FC<SearchingResultsProps> = (props) => {
  // const { data } = bookAPI.useFetchBookSearchQuery({});
  const { page } = useAppSelector((state) => state.appReducer);
  const [details, setDetails] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Pagination />
      <div className={styles.body}>
        <div
          className={styles.itemsContainer}
          onClick={() => {
            if (details) {
              navigate(`/?page=${page}`);
              setDetails(false);
            }
          }}
        >
          {props.data &&
            props.data.map((item) => (
              <NavLink
                to={`details/${item.id}?page=${page}`}
                key={item.id}
                onClick={() => {
                  setDetails(true);
                }}
                data-testid="book-item"
              >
                <SearchingResultsItem key={item.id} item={item} />
              </NavLink>
            ))}
        </div>
        <Outlet context={{ setDetails, currentPage: page }} />
      </div>
    </>
  );
};

export default SearchingResults;
