import React, { FC, useState } from 'react';
import styles from './Search.module.css';
import { useRouter } from 'next/router';

const Search: FC = () => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(router.query.q ?? '');
  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const handleSearch = () => {
    router.push({
      query: { ...router.query, q: inputValue, page: 1 },
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
