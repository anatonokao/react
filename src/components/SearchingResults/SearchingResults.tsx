import React, { FC } from 'react';
import SearchingResultsItem from './SearchingResultsItem/SearchingResultsItem';
import { Item } from '../../types/Interfaces';
import styles from './SearchingResults.module.css';
import Pagination from './Pagination/Pagination';
import { NavLink, Outlet } from 'react-router-dom';

export interface SearchingResultsProps {
  items: Item[];
  updatePage: (vector: 'next' | 'prev') => void;
  currentPage: number;
  countPerPage: number;
  updateCountPerPage: (count: number) => void;
}

const SearchingResults: FC<SearchingResultsProps> = (props) => {
  const items: Item[] = props.items;
  return (
    <>
      <Pagination
        updatePage={props.updatePage}
        currentPage={props.currentPage}
        countPerPage={props.countPerPage}
        updateCountPerPage={props.updateCountPerPage}
      />
      <div className={styles.body}>
        <div className={styles.itemsContainer}>
          {items.map((item) => (
            <NavLink to={`/details/${item.id}`} key={item.id}>
              <SearchingResultsItem key={item.id} item={item} />
            </NavLink>
          ))}
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default SearchingResults;
