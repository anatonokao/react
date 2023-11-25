import React, { FC, useEffect } from 'react';
import styles from './Details.module.css';
import Loading from '/src/assets/Loading.gif';
import { NavLink, useOutletContext, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { bookAPI, getRunningQueriesThunk } from '../../../services/BookService';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { appSlice } from '../../../store/reducers/AppSlice';
import closeBtn from '../../../assets/close-btn.svg';
import Link from 'next/link';
import { IBook } from '../../../models/IBook';
import { wrapper } from '../../../store/store';
import { useRouter } from 'next/router';

interface DetailsRouteProps {
  setDetails?: (value: boolean) => void;
  currentPage?: number;
  details: IBook;
}

const Details: FC<DetailsRouteProps> = ({ details }) => {
  // const { id } = useParams();
  const data = details;
  // const dispatch = useAppDispatch();
  // const { setIsDetailsLoading } = appSlice.actions;
  // const { data, isFetching } = bookAPI.useFetchBookDetailsQuery(id || '');
  // const { isDetailsLoading } = useAppSelector((state) => state.appReducer);

  // useEffect(() => {
  //   dispatch(setIsDetailsLoading(isFetching));
  // });

  return (
    <div className={styles.details} data-testid={'details'}>
      {/*<Link href="/" data-testid="close-details-btn">*/}
      {/*  <button*/}
      {/*    type="button"*/}
      {/*    className={styles.closeBtn}*/}
      {/*    onClick={() => props.setDetails(false)}*/}
      {/*  >*/}
      {/*    <img src={closeBtn} alt="close" />*/}
      {/*  </button>*/}
      {/*</Link>*/}
      <div data-testid={'title'} className={styles.title}>
        {data && data.volumeInfo.title}
      </div>
      <img
        data-testid={'img'}
        src={
          data && data.volumeInfo.imageLinks
            ? data && data.volumeInfo.imageLinks.thumbnail
            : '/src/assets/no-image.png'
        }
        className={styles.thumbnail}
        alt="Thumbnail"
      />
      <div data-testid={'description'} className={styles.description}>
        {parse((data && data.volumeInfo.description) || 'No description')}
      </div>
      {data && data.saleInfo.listPrice ? (
        <div className={styles.price}>
          <span className={styles.currency}>
            {data && data.saleInfo.listPrice.currencyCode}
          </span>{' '}
          {data && data.saleInfo.listPrice.amount}
        </div>
      ) : null}
      {data && data.saleInfo.buyLink ? (
        <a
          data-testid={'buyLink'}
          href={data && data.saleInfo.buyLink}
          className={styles.buyLink}
          target="_blank"
          rel="noreferrer"
        >
          Buy
        </a>
      ) : (
        <a className={styles.buyLink} target="_blank" rel="noreferrer">
          Unavailable
        </a>
      )}
    </div>
  );
};

export default Details;