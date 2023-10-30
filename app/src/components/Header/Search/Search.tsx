import React, { Component } from 'react';
import styles from './Search.module.css';
import { createRef } from 'react';

interface SearchProps {
  searchHandler: (value: string) => void;
}

class Search extends Component<SearchProps> {
  inputRef = createRef<HTMLInputElement>();

  render() {
    return (
      <div className={styles.search}>
        <input
          autoFocus={true}
          type="text"
          className={styles.searchInput}
          placeholder="What are we looking for?"
          ref={this.inputRef}
        />
        <button
          className={styles.searchButton}
          onClick={() => {
            if (this.inputRef.current)
              this.props.searchHandler(this.inputRef.current.value);
          }}
        >
          Search
        </button>
      </div>
    );
  }
}

export default Search;
