import React, { FC, useContext, useState } from 'react';
import styles from './Search.module.css';
import { AppContext } from '../../../contexts/AppContext/AppContextProvider';

const Search: FC = () => {
  const { request, setRequest } = useContext(AppContext);

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
      />
      <button
        className={styles.searchButton}
        onClick={() => {
          setRequest(inputRef.current?.value || '');
        }}
      >
        Search
      </button>
    </div>
  );
};

export default Search;
