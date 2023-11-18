import React, { FC } from 'react';
import Search from './Search/Search';
import styles from './Header.module.css';

interface HeaderProps {
  throwError: () => void;
}

const Header: FC<HeaderProps> = (props) => {
  return (
    <header className={styles.header + ' ' + '_container'}>
      <div className={styles.logoAndBtn}>
        <h1 className={styles.title}>Books Store</h1>
        <button
          data-testid="ErrorBtn"
          className={styles.throwErrorBtn}
          onClick={() => {
            props.throwError();
          }}
        >
          Throw Error
        </button>
      </div>
      <div className={styles.search}>
        <Search />
      </div>
    </header>
  );
};

export default Header;
