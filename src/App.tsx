import './App.css';
import React, { FC, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import SearchingResults from './components/SearchingResults/SearchingResults';
import { Item } from './types/Interfaces';
import Loading from './assets/Loading.gif';
import { searchBooks } from './API/API';
import { useSearchParams } from 'react-router-dom';

interface AppState {
  error: boolean;
  isLoaded: boolean;
  searchValue: string;
  results: HttpResponse;
}

interface HttpResponse {
  kind: string;
  totalItems: number;
  items: Item[];
}

const App: FC = () => {
  const [state, setState] = useState<AppState>({
    searchValue: localStorage.getItem('request') || '',
    error: false,
    isLoaded: true,
    results: {
      kind: '',
      totalItems: 0,
      items: [],
    },
  });
  const [page, setPage] = useState(1);
  const [countPerPage, setCountPerPage] = useState(20);

  const [, setParams] = useSearchParams();
  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoaded: false }));
    searchBooks<HttpResponse>(
      state.searchValue,
      (page - 1) * countPerPage,
      countPerPage || 20
    )
      .then((result) => {
        setState((prevState) => ({
          ...prevState,
          isLoaded: true,
          results: result,
        }));
        setParams({
          page: page.toString(),
        });
        localStorage.setItem('request', state.searchValue);
      })
      .catch((error) => {
        console.log(error);
        setState((prev) => ({ ...prev, error: true }));
      });
  }, [state.searchValue, page, countPerPage, setParams]);

  const throwError = () => {
    setState((prevState) => ({
      ...prevState,
      error: true,
    }));
  };

  const searchHandler = (value: string) => {
    setState((prevState) => ({
      ...prevState,
      searchValue: value.trim(),
    }));
  };

  const updatePage = (vector: 'next' | 'prev') => {
    if (vector === 'next' && state.results.totalItems > page * countPerPage) {
      setPage((prevPage) => prevPage + 1);
    } else if (vector === 'prev' && page * countPerPage > countPerPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const updateCountPerPage = (count: number): void => {
    setPage(1);
    setCountPerPage(count);
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
      <div className="wrapper">
        <Header
          searchHandler={searchHandler}
          searchValue={state.searchValue}
          throwError={throwError}
        />
        {state.results.totalItems ? (
          <div className="content">
            <SearchingResults
              items={resultsItems}
              updatePage={updatePage}
              currentPage={page}
              countPerPage={countPerPage}
              updateCountPerPage={updateCountPerPage}
            />
          </div>
        ) : (
          <p className="weCantFind">
            We cant find anything <br /> (Try: Lovecraft, Толстой, Necronomicon,
            Война и Мир and other )
          </p>
        )}
      </div>
    );
  }
};

export default App;
