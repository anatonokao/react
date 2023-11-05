import './App.css';
import React, { FC, useState } from 'react';
import Header from './components/Header/Header';
import SearchingResults from './components/SearchingResults/SearchingResults';
import { Item } from './types/Interfaces';
import Loading from './assets/Loading.gif';

interface AppState {
  error: boolean;
  isLoaded: boolean;
  searchValue: string;
  results: HttpResponse;
  inputValue: string;
}

interface HttpResponse {
  kind: string;
  totalItems: number;
  items: Item[];
}

export async function http<T>(request: string): Promise<T> {
  const response = await fetch(request).catch((error) => {
    return error;
  });
  return await response.json();
}

const App: FC = () => {
  const [state, setState] = useState<AppState>({
    searchValue: localStorage.getItem('request') || '',
    inputValue: localStorage.getItem('request') || '',
    error: false,
    isLoaded: true,
    results: {
      kind: '',
      totalItems: 0,
      items: [],
    },
  });
  // constructor(props: AppState) {
  //   super(props);
  //   this.state = {
  //     searchValue: localStorage.getItem('request') || '',
  //     inputValue: localStorage.getItem('request') || '',
  //     error: false,
  //     isLoaded: true,
  //     results: {
  //       kind: '',
  //       totalItems: 0,
  //       items: []
  //     },
  //   };
  // }

  // async componentDidMount() {
  // this.setState((prevState) => ({ ...prevState, isLoaded: false }));
  // http<HttpResponse>(
  //   `https://www.googleapis.com/books/v1/volumes?q=${this.state.inputValue}&key=AIzaSyDYIbMfKgnY0ApGq1a3hM2Z3-g1GlqYa7o`
  // )
  //   .then((result) => {
  //     this.setState((prevState) => ({
  //       ...prevState,
  //       error: false,
  //       isLoaded: true,
  //       results: result,
  //     }));
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //     this.setState((prev) => ({ ...prev, error: true }));
  //   });
  // }

  const throwError = () => {
    setState((prevState) => ({
      ...prevState,
      error: true,
    }));
  };

  const changeInputHandler = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      inputValue: value,
    }));
  };

  const searchHandler = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      isLoaded: false,
      searchValue: value.trim(),
    }));
    http<HttpResponse>(
      `https://www.googleapis.com/books/v1/volumes?q=${value.trim()}&key=AIzaSyDYIbMfKgnY0ApGq1a3hM2Z3-g1GlqYa7o`
    ).then((result) => {
      setState((prevState) => ({
        ...prevState,
        error: false,
        isLoaded: true,
        results: result,
      }));
    });
    localStorage.setItem('request', value);
  };

  const resultsItems: Item[] = state.results.items;

  if (state.error) throw new Error("I'm crashed!");
  else if (!state.isLoaded) {
    return (
      <div className="wrapper">
        <div className="loading">
          <img src={Loading} alt="Loading" />
        </div>
      </div>
    );
  } else {
    return (
      // const { error, isLoaded, results } = this.state;
      <div className="wrapper">
        <Header
          searchHandler={searchHandler}
          searchValue={state.searchValue}
          inputValue={state.inputValue}
          changeInputHandler={changeInputHandler}
          throwError={throwError}
        />
        {state.results.items.length ? (
          <SearchingResults items={resultsItems} />
        ) : (
          <p className="weCantFind">
            We cant find anything <br /> (Try: R2D2, Darth Vader and other
            characters )
          </p>
        )}
      </div>
    );
  }
};

export default App;
