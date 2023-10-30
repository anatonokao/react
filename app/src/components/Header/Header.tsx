import React from 'react';
import Search from './Search/Search';
import styles from './Header.module.css';

interface HeaderProps {
  searchHandler: (value: string) => void;
}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <header className={styles.header + ' ' + '_container'}>
        <Search searchHandler={this.props.searchHandler} />
      </header>
    );
  }
}

export default Header;
