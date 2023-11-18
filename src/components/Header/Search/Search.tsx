import React, { FC, useState } from 'react';
import styles from './Search.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { appSlice } from '../../../store/reducers/AppSlice';
import { useSearchParams } from 'react-router-dom';

const Search: FC = () => {
  const { request } = useAppSelector((state) => state.appReducer);
  const { setRequest } = appSlice.actions;
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(request);

  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [, setParams] = useSearchParams();

  const handleSearch = () => {
    dispatch(setRequest(inputValue));
    setParams('page=1');
  };

  return (
    <div className={styles.search}>
      <input
        autoFocus={true}
        type="text"
        className={styles.searchInput}
        placeholder="What are we looking for?"
        ref={inputRef}
        value={inputValue}
        onChange={() => {
          setInputValue(inputRef.current?.value || '');
        }}
        onKeyDown={(e) => {
          if (e.code === 'Enter') {
            handleSearch();
          }
        }}
        data-testid="search-input"
      />
      <button
        className={styles.searchButton}
        onClick={handleSearch}
        data-testid="search-button"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
