import React from 'react';
import Search from './Search/Search';
import styles from './Header.module.css';

interface HeaderProps {
  searchHandler: (value: string) => void;
  searchValue: string;
  inputValue: string;
  changeInputHandler: (value: string) => void;
  throwError: () => void;
}

class Header extends React.Component<HeaderProps> {
  render() {
    return (
      <header className={styles.header + ' ' + '_container'}>
        <div className={styles.logoAndBtn}>
          <h1 className={styles.title}>
            StarWars <br /> Characters
          </h1>
          <button
            className={styles.throwErrorBtn}
            onClick={() => {
              this.props.throwError();
            }}
          >
            Throw Error
          </button>
        </div>
        <div className={styles.search}>
          <Search
            searchHandler={this.props.searchHandler}
            searchValue={this.props.searchValue}
            inputValue={this.props.inputValue}
            changeInputHandler={this.props.changeInputHandler}
          />
        </div>
      </header>
    );
  }
}

export default Header;
