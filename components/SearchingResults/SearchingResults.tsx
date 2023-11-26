import { FC } from 'react';
import SearchingResultsItem from './SearchingResultsItem/SearchingResultsItem';
import styles from './SearchingResults.module.css';
import Pagination from './Pagination/Pagination';
import { IBook } from '../../src/models/IBook';
import Details from './Details/Details';
import { useRouter } from 'next/router';

export interface SearchingResultsProps {
  data: IBook[];
  detailsData: IBook;
}

const SearchingResults: FC<SearchingResultsProps> = (props) => {
  const router = useRouter();
  return (
    <>
      <Pagination />
      <div className={styles.body}>
        <div
          className={styles.itemsContainer}
          onClick={() => {
            if (router.query.id) {
              router.push({ query: { ...router.query, id: '' } });
            }
          }}
        >
          {props.data &&
            props.data.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  if (!router.query.id) {
                    router.push({ query: { ...router.query, id: item.id } });
                  }
                }}
                data-testid="book-item"
              >
                <SearchingResultsItem key={item.id} item={item} />
              </button>
            ))}
        </div>
        {router.query.id && <Details details={props.detailsData} />}
      </div>
    </>
  );
};

export default SearchingResults;
