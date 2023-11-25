import React, { FC, useState } from 'react';
import SearchingResultsItem from './SearchingResultsItem/SearchingResultsItem';
import styles from './SearchingResults.module.css';
import Pagination from './Pagination/Pagination';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { IBook } from '../../models/IBook';
import { useAppSelector } from '../../hooks/redux';
import Link from 'next/link';
import Details from './Details/Details';
import { useRouter } from 'next/router';

export interface SearchingResultsProps {
  data: IBook[];
  detailsData: IBook;
}

const SearchingResults: FC<SearchingResultsProps> = (props) => {
  const router = useRouter();
  const { page } = useAppSelector((state) => state.appReducer);
  const [details, setDetails] = useState(false);
  // const navigate = useNavigate();
  return (
    <>
      <Pagination />
      <div className={styles.body}>
        <div
          className={styles.itemsContainer}
          onClick={() => {
            if (router.query.id) {
              // navigate(`/?page=${page}`);
              setDetails(false);
            }
          }}
        >
          {props.data &&
            props.data.map((item) => (
              <Link
                href={`/?id=${item.id}&page=${page}`}
                key={item.id}
                onClick={() => {
                  setDetails(true);
                }}
                data-testid="book-item"
              >
                <SearchingResultsItem key={item.id} item={item} />
              </Link>
            ))}
        </div>
        {router.query.id && <Details details={props.detailsData} />}
      </div>
    </>
  );
};

export default SearchingResults;
