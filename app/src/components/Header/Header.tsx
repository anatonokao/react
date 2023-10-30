import React from 'react';
import Search from './Search/Search';
import styles from './Header.module.css';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header + ' ' + '_container'}>
        <Search />
      </header>
    );
  }
}

export default Header;
