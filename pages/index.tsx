import Header from '../components/Header/Header';
import SearchingResults from '../components/SearchingResults/SearchingResults';
import {
  bookAPI,
  getRunningQueriesThunk,
  HttpResponse,
} from '../src/services/BookService';
import { wrapper } from '../src/store/store';
import { IBook } from '../src/models/IBook';
import { FC } from 'react';

type HomeProps = {
  data: HttpResponse;
  isError: boolean;
  details: IBook;
};

const Home: FC<HomeProps> = ({ data, isError, details }) => {
  if (isError) throw new Error("I'm crashed!");
  else {
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
};

export default Home;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { q, countPerPage, page, id } = context.query;

    const { data } = await store.dispatch(
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
        details: detailsData.data || null,
      },
    };
  }
);
