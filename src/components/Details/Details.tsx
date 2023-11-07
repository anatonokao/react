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

const Details: FC = () => {
  const context: DetailsRouteContext = useOutletContext();
  const { id } = useParams();
  const [isLoad, setIsLoad] = useState(false);
  const [book, setBook] = useState<Item>({
    etag: '',
    id: '',
    kind: '',
    saleInfo: { buyLink: '', listPrice: { amount: 0, currencyCode: '' } },
    searchInfo: { textSnippet: '' },
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
  });

  useEffect(() => {
    if (id) {
      setIsLoad(true);
      getBook<Item>(id).then((res) => {
        setBook(res);
        setIsLoad(false);
      });
    }
  }, [id]);

  return isLoad ? (
    <div className={styles.loading}>
      <img className={styles.loading} src={Loading} alt="loading" />
    </div>
  ) : (
    <div className={styles.details}>
      <NavLink to={`/?page=${context.currentPage}`}>
        <button
          type="button"
          className={styles.closeBtn}
          onClick={() => context.setDetails(false)}
        >
          <img src="/src/assets/close-btn.svg" alt="close" />
        </button>
      </NavLink>
      <div className={styles.title}>{book.volumeInfo.title}</div>
      <img
        src={
          book.volumeInfo.imageLinks
            ? book.volumeInfo.imageLinks.thumbnail
            : '/src/assets/no-image.png'
        }
        className={styles.thumbnail}
        alt="Thumbnail"
      />
      <div className={styles.description}>
        {parse(book.volumeInfo.description || 'No description')}
      </div>
      {book.saleInfo.listPrice ? (
        <div className={styles.price}>
          <span className={styles.currency}>
            {book.saleInfo.listPrice.currencyCode}
          </span>{' '}
          {book.saleInfo.listPrice.amount}
        </div>
      ) : null}
      {book.saleInfo.buyLink ? (
        <a
          href={book.saleInfo.buyLink}
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
