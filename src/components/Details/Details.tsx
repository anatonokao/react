import React, { useEffect, useState } from 'react';
import styles from './Details.module.css';
import { getBook } from '../../API/API';
import { useParams } from 'react-router-dom';
import { Item } from '../../types/Interfaces';

const Details = () => {
  const { id } = useParams();

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
    if (id)
      getBook<Item>(id).then((res) => {
        setBook(res);
      });
  }, [id]);

  return (
    <div className={styles.details}>
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
        {book.volumeInfo.description || 'No description'}
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
          Купить
        </a>
      ) : (
        <a className={styles.buyLink} target="_blank" rel="noreferrer">
          Недоступно
        </a>
      )}
    </div>
  );
};

export default Details;
