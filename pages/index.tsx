// import Layout from '../components/Layout';
// import HomePage from '../src/App';
import Loading from '../src/assets/Loading.gif';

import Header from '../src/components/Header/Header';
import SearchingResults from '../src/components/SearchingResults/SearchingResults';
import { bookAPI, getRunningQueriesThunk } from '../src/services/BookService';
import { wrapper } from '../src/store/store';
import { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function Home({ data, isError, details }) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on('routeChangeStart', start);
    Router.events.on('routeChangeComplete', end);
    Router.events.on('routeChangeError', end);
    return () => {
      Router.events.off('routeChangeStart', start);
      Router.events.off('routeChangeComplete', end);
      Router.events.off('routeChangeError', end);
    };
  }, []);

  if (isError) throw new Error("I'm crashed!");
  else if (loading) {
    return (
      <div className="wrapper">
        <div className="loading">
          <img src={Loading.src} alt="Loading" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="wrapper" data-testid={'app'}>
        <Header />
        {data && data.totalItems ? (
          <div className="content">
            <SearchingResults data={data.items} detailsData={details} />
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
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { q, countPerPage, page, id } = context.query;

    const { data, isError, isLoading } = await store.dispatch(
      bookAPI.endpoints.fetchBookSearch.initiate({
        query: q ? q.toString() : 'book',
        countPerPage: countPerPage ? countPerPage.toString() : '20',
        startIndex: page
          ? ((Number(countPerPage) || 20) * (Number(page) - 1)).toString()
          : '0',
      })
    );

    const detailsData = await store.dispatch(
      bookAPI.endpoints.fetchBookDetails.initiate(id ? id.toString() : '')
    );

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data: data || null,
        isError,
        isLoading,
        details: detailsData.data || null,
      },
    };
  }
);
