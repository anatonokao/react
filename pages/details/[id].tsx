import {useRouter} from 'next/router';
import Pagination from '../../src/components/SearchingResults/Pagination/Pagination';
import Link from 'next/link';
import SearchingResultsItem from '../../src/components/SearchingResults/SearchingResultsItem/SearchingResultsItem';
import {Outlet} from 'react-router-dom';
import React from 'react';
import {wrapper} from '../../src/store/store';
import styles from '../../src/components/SearchingResults/SearchingResults.module.css';
import {
    bookAPI,
    getRunningQueriesThunk,
} from '../../src/services/BookService';
import Header from '../../src/components/Header/Header';
import SearchingResults from '../../src/components/SearchingResults/SearchingResults';
import Details from '../../src/components/SearchingResults/Details/Details';

export default ({data, isLoading}) => {
    const {id, page} = useRouter().query;

    return (
        <div className="wrapper" data-testid={'app'}>
            <Header/>
            {data && data.totalItems ? (
                <div className="content">
                    <SearchingResults data={data.items}/>
                    <Details currentPage={Number(page)} setDetails={() => {
                    }}/>
                </div>
            ) : (
                <p className="weCantFind" data-testid="nothing-found">
                    We cant find anything <br/> (Try: Lovecraft, Толстой, Necronomicon,
                    Война и Мир and other )
                </p>
            )}
        </div>
    );
};

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async (context) => {
//     // console.log();
//
//     const { data, error, isLoading } = await store.dispatch(
//       bookAPI.endpoints.fetchBookSearch.initiate({
//         query: 'pussy',
//       })
//       // bookAPI.endpoints.fetchBookDetails.initiate(useRouter().query.id as string)
//     );
//
//     await Promise.all(store.dispatch(getRunningQueriesThunk()));
//
//     return {
//       props: {
//         data,
//         // error,
//         isLoading,
//       },
//     };
//   }
// );
