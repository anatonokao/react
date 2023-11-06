import React, { FC } from 'react';
import Search from './Search/Search';
import styles from './Header.module.css';

interface HeaderProps {
  searchHandler: (value: string) => void;
  searchValue: string;
  // inputValue: string;
  // changeInputHandler: (value: string) => void;
  throwError: () => void;
}

const Header: FC<HeaderProps> = (props) => {
  return (
    <header className={styles.header + ' ' + '_container'}>
      <div className={styles.logoAndBtn}>
        <h1 className={styles.title}>
          StarWars <br /> Characters
        </h1>
        <button
          className={styles.throwErrorBtn}
          onClick={() => {
            props.throwError();
          }}
        >
          Throw Error
        </button>
      </div>
      <div className={styles.search}>
        <Search
          searchHandler={props.searchHandler}
          searchValue={props.searchValue}
          // inputValue={props.inputValue}
          // changeInputHandler={props.changeInputHandler}
        />
      </div>
    </header>
  );
};

export default Header;
