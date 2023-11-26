import { FC } from 'react';
import styles from './Details.module.css';
import parse from 'html-react-parser';
import closeBtn from '../../../assets/close-btn.svg';
import { IBook } from '../../../src/models/IBook';
import { useRouter } from 'next/router';
import noImg from '../../../assets/no-image.png';

interface DetailsRouteProps {
  setDetails?: (value: boolean) => void;
  currentPage?: number;
  details: IBook;
}

const Details: FC<DetailsRouteProps> = ({ details }) => {
  const data = details;
  const router = useRouter();

  return (
    <div className={styles.details} data-testid={'details'}>
      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => router.push({ query: { ...router.query, id: '' } })}
      >
        <img src={closeBtn.src} alt="close" />
      </button>
      <div data-testid={'title'} className={styles.title}>
        {data && data.volumeInfo.title}
      </div>
      <img
        data-testid={'img'}
        src={
          data && data.volumeInfo.imageLinks
            ? data && data.volumeInfo.imageLinks.thumbnail
            : noImg.src
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