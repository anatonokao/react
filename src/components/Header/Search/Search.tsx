import React, { FC, useState } from 'react';
import styles from './Search.module.css';

interface SearchProps {
  searchHandler: (value: string) => void;
  searchValue: string;
}

const Search: FC<SearchProps> = (props) => {
  const [inputValue, setInputValue] = useState(
    localStorage.getItem('request') || ''
  );

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
          if (e.code === 'Enter')
            props.searchHandler(inputRef.current?.value || '');
        }}
      />
      <button
        className={styles.searchButton}
        onClick={() => {
          props.searchHandler(inputRef.current?.value || '');
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
