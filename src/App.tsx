import './App.css';
import React, { FC, useContext, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import SearchingResults from './components/SearchingResults/SearchingResults';
import { Item } from './types/Interfaces';
import Loading from './assets/Loading.gif';
import { searchBooks } from './API/API';
import { useSearchParams } from 'react-router-dom';
import { AppContext } from './contexts/AppContext/AppContextProvider';

interface AppState {
  error: boolean;
  isLoaded: boolean;
}

export interface HttpResponse {
  kind: string;
  totalItems: number;
  items: Item[];
}

const App: FC = () => {
  const { request } = useContext(AppContext);
  const { response, setResponse } = useContext(AppContext);

  const [state, setState] = useState<AppState>({
    error: false,
    isLoaded: true,
  });

  const pageFromParams = Number(useSearchParams()[0].get('page'));

  const [page, setPage] = useState(pageFromParams || 1);
  const [countPerPage, setCountPerPage] = useState(20);

  const [, setParams] = useSearchParams();

  useEffect(() => {
    setState((prevState) => ({ ...prevState, isLoaded: false }));
    searchBooks<HttpResponse>(
      request,
      (page - 1) * countPerPage,
      countPerPage || 20
    )
      .then((result) => {
        setState((prevState) => ({
          ...prevState,
          isLoaded: true,
        }));
        setResponse(result);
        setParams({
          page: page.toString(),
        });
        localStorage.setItem('request', request);
      })
      .catch((error) => {
        console.log(error);
        setState((prev) => ({ ...prev, error: true }));
      });
  }, [request, page, countPerPage]); // eslint-disable-line react-hooks/exhaustive-deps

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
    if (vector === 'next' && response.totalItems > page * countPerPage) {
      setPage((prevPage) => prevPage + 1);
    } else if (vector === 'prev' && page * countPerPage > countPerPage) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const updateCountPerPage = (count: number): void => {
    setPage(1);
    setCountPerPage(count);
  };

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
        <Header searchHandler={searchHandler} throwError={throwError} />
        {response.totalItems ? (
          <div className="content">
            <SearchingResults
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
