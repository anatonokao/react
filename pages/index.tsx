// import Layout from '../components/Layout';
// import HomePage from '../src/App';

import Header from '../src/components/Header/Header';
import SearchingResults from '../src/components/SearchingResults/SearchingResults';
import { bookAPI, getRunningQueriesThunk } from '../src/services/BookService';
import { wrapper } from '../src/store/store';
import { useRouter } from 'next/router';

export default function Home({ data, isLoading, error }) {
  const router = useRouter();
  // useEffect(() => {
  //   data && dispatch(setTotalItems(data.totalItems));
  //
  //   dispatch(setIsLoading(isFetching));
  //
  //   // if (pageFromParams) {
  //   //   dispatch(setPage(pageFromParams || 1));
  //   // } else setParams(`page=${page}`);
  // });
  // if (error) throw new Error("I'm crashed!");
  // else
  // if (!isLoading) {
  //   return (
  //     <div className="wrapper">
  //       <div className="loading">
  //         <img src={Loading.src} alt="Loading" />
  //       </div>
  //     </div>
  //   );
  // } else {
  return (
    <div className="wrapper" data-testid={'app'}>
      <Header />
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
  // }
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { data, error, isLoading } = await store.dispatch(
      bookAPI.endpoints.fetchBookSearch.initiate({
        query: context.query.q?.toString() || 'book',
        countPerPage: context.query.countPerPage?.toString() || '20',
      })
    );
    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {
        data,
        error: error || null,
        isLoading,
      },
    };
  }
);
