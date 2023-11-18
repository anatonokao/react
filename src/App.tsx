import './App.css';
import React, { FC, useContext, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import SearchingResults from './components/SearchingResults/SearchingResults';
import { IBook as Item } from './models/IBook';
import Loading from './assets/Loading.gif';
import { searchBooks } from './API/API';
import { useSearchParams } from 'react-router-dom';
// import { AppContext } from './contexts/AppContext/AppContextProvider';
import { bookAPI } from './services/BookService';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { appSlice } from './store/reducers/BookSlice';

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
  const dispatch = useAppDispatch();

  const { setTotalItems, setIsLoading } = appSlice.actions;
  const { request, isAppLoading, page, countPerPage } = useAppSelector(
    (state) => state.appReducer
  );

  const { data, isFetching, error } = bookAPI.useFetchBookSearchQuery({
    query: request,
    startIndex: page * countPerPage,
    countPerPage,
  });

  data && dispatch(setTotalItems(data.totalItems));
  dispatch(setIsLoading(isFetching));

  const pageFromParams = Number(useSearchParams()[0].get('page'));

  // const [countPerPage, setCountPerPage] = useState(20);

  const [, setParams] = useSearchParams();

  const [errorFromBtn, setErrorFromBtn] = useState(false);
  const throwError = () => {
    setErrorFromBtn(true);
  };

  // const searchHandler = (value: string) => {
  //   setState((prevState) => ({
  //     ...prevState,
  //     searchValue: value.trim(),
  //   }));
  // };
  //
  // const updatePage = (vector: 'next' | 'prev') => {
  //   if (vector === 'next' && response.totalItems > page * countPerPage) {
  //     setPage((prevPage) => prevPage + 1);
  //   } else if (vector === 'prev' && page * countPerPage > countPerPage) {
  //     setPage((prevPage) => prevPage - 1);
  //   }
  // };
  //
  // const updateCountPerPage = (count: number): void => {
  //   setPage(1);
  //   setCountPerPage(count);
  // };

  if (errorFromBtn || error) throw new Error("I'm crashed!");
  else if (isAppLoading) {
    return (
      <div className="wrapper">
        <div className="loading">
          <img src={Loading} alt="Loading" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="wrapper" data-testid={'app'}>
        <Header throwError={throwError} />
        {data && data.totalItems ? (
          <div className="content">
            <SearchingResults data={data.items} />
          </div>
        ) : (
          <p className="weCantFind" data-testid="nothing-found">
            We cant find anything <br /> (Try: Lovecraft, Толстой, Necronomicon,
            Война и Мир and other )
          </p>
        )}
      </div>
    );
  }
};

export default App;
