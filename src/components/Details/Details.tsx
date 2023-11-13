import React, { FC, useEffect, useState } from 'react';
import styles from './Details.module.css';
import Loading from '/src/assets/Loading.gif';
import { getBook } from '../../API/API';
import { NavLink, useOutletContext, useParams } from 'react-router-dom';
import { Item } from '../../types/Interfaces';
import parse from 'html-react-parser';

interface DetailsRouteContext {
  setDetails: (value: boolean) => void;
  currentPage: number;
}

interface DetailsState {
  isLoad: boolean;
  book: Item;
}

const Details: FC = () => {
  const context: DetailsRouteContext = useOutletContext();
  console.log(`/react/react-routing/?page=${context.currentPage}`);
  const { id } = useParams();
  const [state, setState] = useState<DetailsState>({
    isLoad: false,
    book: {
      etag: '',
      id: '',
      kind: '',
      saleInfo: { buyLink: '', listPrice: { amount: 0, currencyCode: '' } },
      selfLink: '',
      volumeInfo: {
        title: '',
        subtitle: '',
        authors: [],
        publisher: '',
        publishedDate: '',
        description: '',
        pageCount: 0,
        imageLinks: {
          smallThumbnail: '',
          thumbnail: '',
        },
        language: '',
      },
    },
  });

  useEffect(() => {
    if (id) {
      setState((prevState) => ({
        ...prevState,
        isLoad: true,
      }));
      getBook<Item>(id).then((res) => {
        setState(() => ({
          book: res,
          isLoad: true,
        }));
      });
    }
  }, [id]);

  return state.isLoad ? (
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
      <NavLink to={`/react/react-routing/?page=${context.currentPage}`}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => context.setDetails(false)}
        >
          <img src="/src/assets/close-btn.svg" alt="close" />
        </button>
      </NavLink>
      <div data-testid={'title'} className={styles.title}>
        {state.book.volumeInfo.title}
      </div>
      <img
        data-testid={'img'}
        src={
          state.book.volumeInfo.imageLinks
            ? state.book.volumeInfo.imageLinks.thumbnail
            : '/src/assets/no-image.png'
        }
        className={styles.thumbnail}
        alt="Thumbnail"
      />
      <div data-testid={'description'} className={styles.description}>
        {parse(state.book.volumeInfo.description || 'No description')}
      </div>
      {state.book.saleInfo.listPrice ? (
        <div className={styles.price}>
          <span className={styles.currency}>
            {state.book.saleInfo.listPrice.currencyCode}
          </span>{' '}
          {state.book.saleInfo.listPrice.amount}
        </div>
      ) : null}
      {state.book.saleInfo.buyLink ? (
        <a
          data-testid={'buyLink'}
          href={state.book.saleInfo.buyLink}
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
