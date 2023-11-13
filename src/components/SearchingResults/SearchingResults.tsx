import React, { FC, useContext, useState } from 'react';
import SearchingResultsItem from './SearchingResultsItem/SearchingResultsItem';
import { Item } from '../../types/Interfaces';
import styles from './SearchingResults.module.css';
import Pagination from './Pagination/Pagination';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../../contexts/AppContext/AppContextProvider';

export interface SearchingResultsProps {
  updatePage: (vector: 'next' | 'prev') => void;
  currentPage: number;
  countPerPage: number;
  updateCountPerPage: (count: number) => void;
}

const SearchingResults: FC<SearchingResultsProps> = (props) => {
  const { response } = useContext(AppContext);
  const items: Item[] = response.items;
  const [details, setDetails] = useState(false);
  const navigate = useNavigate();
  return (
    <>
      <Pagination
        updatePage={props.updatePage}
        currentPage={props.currentPage}
        countPerPage={props.countPerPage}
        updateCountPerPage={props.updateCountPerPage}
      />
      <div className={styles.body}>
        <div
          className={styles.itemsContainer}
          onClick={() => {
            if (details) {
              navigate(`/react/react-routing/?page=${props.currentPage}`);
              setDetails(false);
            }
          }}
        >
          {items.map((item) => (
            <NavLink
              to={`details/${item.id}?page=${props.currentPage}`}
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
        <Outlet context={{ setDetails, currentPage: props.currentPage }} />
      </div>
    </>
  );
};

export default SearchingResults;
