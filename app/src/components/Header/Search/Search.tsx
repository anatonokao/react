import React, { Component } from 'react';
import styles from './Search.module.css';

class Search extends Component {
  render() {
    return (
      <div className={styles.search}>
        <input
          autoFocus={true}
          type="text"
          className={styles.searchInput}
          placeholder="What are we looking for?"
        />
        <button className={styles.searchButton}>Search</button>
      </div>
    );
  }
}

export default Search;
