import React, { FC, useState } from 'react';
import styles from './Search.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { appSlice } from '../../../store/reducers/BookSlice';

const Search: FC = () => {
  const { request } = useAppSelector((state) => state.appReducer);
  const { setRequest } = appSlice.actions;
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(request);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

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
          if (e.code === 'Enter') setRequest(inputRef.current?.value || '');
        }}
        data-testid="search-input"
      />
      <button
        className={styles.searchButton}
        onClick={() => {
          dispatch(setRequest(inputRef.current?.value || ''));
        }}
        data-testid="search-button"
      >
        Search
      </button>
    </div>
  );
};

export default Search;
