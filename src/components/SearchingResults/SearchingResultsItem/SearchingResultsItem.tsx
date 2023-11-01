import React, { Component } from 'react';
import { Item } from '../../../types/Interfaces';
import styles from './SearchingResultsItem.module.css';

interface SearchingResultsItemProps {
  item: Item;
}

class SearchingResultsItem extends Component<SearchingResultsItemProps> {
  constructor(props: SearchingResultsItemProps) {
    super(props);
  }

  render() {
    return (
      <div className={styles.item}>
        <div className={styles.name}>{this.props.item.name}</div>
        <div className={styles.stat}>Gender: {this.props.item.gender}</div>
        <div className={styles.stat}>
          Birth Year: {this.props.item.birth_year}
        </div>
        <div className={styles.stat}>Height: {this.props.item.height}</div>
        <div className={styles.stat}>Mass: {this.props.item.mass}</div>
        <div className={styles.stat}>
          Skin Color: {this.props.item.skin_color}
        </div>
        <div className={styles.stat}>
          Hair Color: {this.props.item.hair_color}
        </div>
        <div className={styles.stat}>
          Eye Color: {this.props.item.eye_color}
        </div>
      </div>
    );
  }
}

export default SearchingResultsItem;
