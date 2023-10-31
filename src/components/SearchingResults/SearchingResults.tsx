import React, { Component } from 'react';
import SearchingResultsItem from './SearchingResultsItem/SearchingResultsItem';
import { Item } from '../../types/Interfaces';
import styles from './SearchingResults.module.css';

export interface SearchingResultsProps {
  items: Item[];
}

class SearchingResults extends Component<SearchingResultsProps> {
  constructor(props: SearchingResultsProps) {
    super(props);
  }

  render() {
    const items: Item[] = this.props.items;
    return (
      <div className={styles.itemsContainer}>
        {items.map((item, index) => (
          <SearchingResultsItem key={index} item={item} />
        ))}
      </div>
    );
  }
}

export default SearchingResults;
