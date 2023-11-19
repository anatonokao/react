import React, { FC, useState } from 'react';
import Search from './Search/Search';
import styles from './Header.module.css';

const Header: FC = () => {
  const [error, setError] = useState(false);
  if (error) throw new Error("I'm crashed!");
  return (
    <header className={styles.header + ' ' + '_container'}>
      <div className={styles.logoAndBtn}>
        <h1 className={styles.title}>Books Store</h1>
        <button
          data-testid="ErrorBtn"
          className={styles.throwErrorBtn}
          onClick={() => setError(true)}
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
