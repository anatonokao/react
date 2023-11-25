import React, { FC, useState } from 'react';
import styles from './Search.module.css';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { appSlice } from '../../../store/reducers/AppSlice';
import { useSearchParams } from 'react-router-dom';
import { useRouter } from 'next/router';

const Search: FC = () => {
  const [inputValue, setInputValue] = useState('');
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const handleSearch = () => {
    router.push({
      query: { ...router.query, q: inputValue },
    });
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
