import React, { FC, useEffect } from 'react';
import styles from './Details.module.css';
import Loading from '/src/assets/Loading.gif';
import { NavLink, useOutletContext, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { bookAPI } from '../../../services/BookService';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { appSlice } from '../../../store/reducers/AppSlice';
import closeBtn from '../../../assets/close-btn.svg';

interface DetailsRouteContext {
  setDetails: (value: boolean) => void;
  currentPage: number;
}

const Details: FC = () => {
  const context: DetailsRouteContext = useOutletContext();

  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { setIsDetailsLoading } = appSlice.actions;
  const { data, isFetching } = bookAPI.useFetchBookDetailsQuery(id || '');
  const { isDetailsLoading } = useAppSelector((state) => state.appReducer);

  useEffect(() => {
    dispatch(setIsDetailsLoading(isFetching));
  });

  return isDetailsLoading ? (
    <div className={styles.loading}>
      <img
        data-testid={'loading'}
        className={styles.loading}
        src={Loading}
        alt="loading"
      />
    </div>
  ) : (
    <div className={styles.details} data-testid={'details'}>
      <NavLink
        to={`/?page=${context.currentPage}`}
        data-testid="close-details-btn"
      >
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => context.setDetails(false)}
        >
          <img src={closeBtn} alt="close" />
        </button>
      </NavLink>
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
