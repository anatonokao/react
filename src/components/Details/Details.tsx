import React, { FC } from 'react';
import styles from './Details.module.css';
import Loading from '/src/assets/Loading.gif';
import { NavLink, useOutletContext, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import { bookAPI } from '../../services/BookService';

interface DetailsRouteContext {
  setDetails: (value: boolean) => void;
  currentPage: number;
}

// interface DetailsState {
//   isLoad: boolean;
//   book: Item;
// }

const Details: FC = () => {
  const context: DetailsRouteContext = useOutletContext();

  const { id } = useParams();
  // const [state, setState] = useState<DetailsState>({
  //   isLoad: false,
  //   book: {
  //     etag: '',
  //     id: '',
  //     kind: '',
  //     saleInfo: { buyLink: '', listPrice: { amount: 0, currencyCode: '' } },
  //     selfLink: '',
  //     volumeInfo: {
  //       title: '',
  //       subtitle: '',
  //       authors: [],
  //       publisher: '',
  //       publishedDate: '',
  //       description: '',
  //       pageCount: 0,
  //       imageLinks: {
  //         smallThumbnail: '',
  //         thumbnail: '',
  //       },
  //       language: '',
  //     },
  //   },
  // });

  const { data, isLoading } = bookAPI.useFetchBookDetailsQuery(id || '');

  // useEffect(() => {
  //   if (id) {
  //     setState((prevState) => ({
  //       ...prevState,
  //       isLoad: true,
  //     }));
  //     getBook<Item>(id).then((res) => {
  //       setState(() => ({
  //         book: res,
  //         isLoad: false,
  //       }));
  //     });
  //   }
  // }, [id]);

  return isLoading ? (
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
          <img src="/src/assets/close-btn.svg" alt="close" />
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
