import './App.css';
import React, { FC, useEffect, useState } from 'react';
import Header from './components/Header/Header';
import SearchingResults from './components/SearchingResults/SearchingResults';
import Loading from './assets/Loading.gif';
import { useSearchParams } from 'react-router-dom';
import { bookAPI } from './services/BookService';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { appSlice } from './store/reducers/AppSlice';

const App: FC = () => {
  const dispatch = useAppDispatch();

  const { setTotalItems, setIsLoading, setPage } = appSlice.actions;
  const { request, isAppLoading, page, countPerPage } = useAppSelector(
    (state) => state.appReducer
  );

  const [params, setParams] = useSearchParams();
  const pageFromParams = Number(params.get('page'));

  const { data, isFetching, error } = bookAPI.useFetchBookSearchQuery({
    query: request,
    startIndex: (page - 1) * countPerPage,
    countPerPage,
  });

  useEffect(() => {
    data && dispatch(setTotalItems(data.totalItems));

    dispatch(setIsLoading(isFetching));

    if (pageFromParams) {
      dispatch(setPage(pageFromParams || 1));
    } else setParams(`page=${page}`);
  }, [isFetching, pageFromParams]);

  const [errorFromBtn, setErrorFromBtn] = useState(false);
  const throwError = () => {
    setErrorFromBtn(true);
  };

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
