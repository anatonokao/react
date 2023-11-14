// @vitest-environment jsdom
// import userEvent from '@testing-library/user-event';
import { screen, render, fireEvent } from '@testing-library/react';
import React from 'react';
import SearchingResults from './SearchingResults';
import { AppContext } from '../../contexts/AppContext/AppContextProvider';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { vi } from 'vitest';
import Details from '../Details/Details';
import { userEvent } from '@testing-library/user-event';
import { book } from '../../../tests/mockData';

vi.mock('react-router-dom', async () => ({
  ...(await vi.importActual('react-router-dom')),
  useOutletContext: () => ({ currentPage: 1, setDetails: vi.fn() }),
}));

const setRequest = vi.fn();
const setResponse = vi.fn();
const value = {
  request: '',
  setRequest: setRequest,
  response: {
    kind: 'books#volumes',
    totalItems: 3096,
    items: [
      {
        kind: 'books#volume',
        id: 'BcX1HqbSAm4C',
        etag: 'TNc6zOpsCdc',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/BcX1HqbSAm4C',
        volumeInfo: {
          title: 'Easy Russian Phrase Book',
          subtitle: 'Over 690 Basic Phrases for Everyday Use',
          authors: ['Dover Publications, Inc'],
          publisher: 'Courier Corporation',
          publishedDate: '1995-01-01',
          description:
            'Handy volume of nearly 700 basic phrases fosters instant communication on everyday subjects as well as travel-related topics, including terms involving restaurants, reservations, and more. Includes phonetic pronunciation guide and index.',
          industryIdentifiers: [
            {
              type: 'ISBN_10',
              identifier: '048628669X',
            },
            {
              type: 'ISBN_13',
              identifier: '9780486286693',
            },
          ],
          readingModes: {
            text: false,
            image: true,
          },
          pageCount: 80,
          printType: 'BOOK',
          categories: ['Foreign Language Study'],
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: true,
          contentVersion: '1.3.3.0.preview.1',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=BcX1HqbSAm4C&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=BcX1HqbSAm4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'ru',
          previewLink:
            'http://books.google.ru/books?id=BcX1HqbSAm4C&pg=PP2&dq=book&hl=&cd=3&source=gbs_api',
          infoLink:
            'http://books.google.ru/books?id=BcX1HqbSAm4C&dq=book&hl=&source=gbs_api',
          canonicalVolumeLink:
            'https://books.google.com/books/about/Easy_Russian_Phrase_Book.html?hl=&id=BcX1HqbSAm4C',
        },
        saleInfo: {
          country: 'RU',
          saleability: 'NOT_FOR_SALE',
          isEbook: false,
        },
        accessInfo: {
          country: 'RU',
          viewability: 'PARTIAL',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
          },
          pdf: {
            isAvailable: true,
            acsTokenLink:
              'http://books.google.ru/books/download/Easy_Russian_Phrase_Book-sample-pdf.acsm?id=BcX1HqbSAm4C&format=pdf&output=acs4_fulfillment_token&dl_type=sample&source=gbs_api',
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=BcX1HqbSAm4C&hl=&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            '... <b>BOOK</b> , Stanley Appelbaum ( ed . ) ( 26711-3 ) $ 3.95 INTERNATIONAL AIRLINE PHRASE <b>BOOK</b> IN SIX LANGUAGES , Joseph W. Bator . ( 22017-6 ) $ 5.95 EGYPTIAN LANGUAGE : EASY LESSONS IN EGYPTIAN HIEROGLYPHICS , Sir E.A. Wallis Budge . ( Except&nbsp;...',
        },
      },
      {
        kind: 'books#volume',
        id: 'Db4DAAAAMBAJ',
        etag: '6vM/HICdJGQ',
        selfLink: 'https://www.googleapis.com/books/v1/volumes/Db4DAAAAMBAJ',
        volumeInfo: {
          title: 'Jet',
          publishedDate: '2003-08-11',
          description:
            'The weekly source of African American political and entertainment news.',
          readingModes: {
            text: false,
            image: true,
          },
          pageCount: 64,
          printType: 'MAGAZINE',
          averageRating: 4,
          ratingsCount: 1,
          maturityRating: 'NOT_MATURE',
          allowAnonLogging: false,
          contentVersion: '0.0.2.0.preview.1',
          panelizationSummary: {
            containsEpubBubbles: false,
            containsImageBubbles: false,
          },
          imageLinks: {
            smallThumbnail:
              'http://books.google.com/books/content?id=Db4DAAAAMBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api',
            thumbnail:
              'http://books.google.com/books/content?id=Db4DAAAAMBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          },
          language: 'en',
          previewLink:
            'http://books.google.ru/books?id=Db4DAAAAMBAJ&printsec=frontcover&dq=book&hl=&cd=4&source=gbs_api',
          infoLink:
            'http://books.google.ru/books?id=Db4DAAAAMBAJ&dq=book&hl=&source=gbs_api',
          canonicalVolumeLink:
            'https://books.google.com/books/about/Jet.html?hl=&id=Db4DAAAAMBAJ',
        },
        saleInfo: {
          country: 'RU',
          saleability: 'NOT_FOR_SALE',
          isEbook: false,
        },
        accessInfo: {
          country: 'RU',
          viewability: 'ALL_PAGES',
          embeddable: true,
          publicDomain: false,
          textToSpeechPermission: 'ALLOWED',
          epub: {
            isAvailable: false,
          },
          pdf: {
            isAvailable: false,
          },
          webReaderLink:
            'http://play.google.com/books/reader?id=Db4DAAAAMBAJ&hl=&source=gbs_api',
          accessViewStatus: 'SAMPLE',
          quoteSharingAllowed: false,
        },
        searchInfo: {
          textSnippet:
            'The weekly source of African American political and entertainment news.',
        },
      },
    ],
  },
  setResponse: setResponse,
};

describe('Searching results test', () => {
  it('SearchingResults component rendered', () => {
    render(
      <MemoryRouter>
        <SearchingResults />
      </MemoryRouter>
    );
  });

  it('Component renders the specified number of cards', async () => {
    await render(
      <MemoryRouter>
        <AppContext.Provider value={value}>
          <SearchingResults />
        </AppContext.Provider>
      </MemoryRouter>
    );
    expect((await screen.findAllByTestId('book-item')).length).toBe(2);
  });

  it('Click on a card opens a detailed card component', () => {
    render(
      <MemoryRouter>
        <AppContext.Provider value={value}>
          <SearchingResults currentPage={1} />
        </AppContext.Provider>
      </MemoryRouter>
    );
    const card = screen.getAllByTestId('book-item')[0];
    fireEvent.click(card);
    expect(card).toHaveAttribute('class', 'active');
  });
});

describe('Details click test', () => {
  it('Click on a card triggers an additional API call to fetch detailed information', async () => {
    const spy = vi.spyOn(global, 'fetch');
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<SearchingResults currentPage={1} />} />
            <Route path="/details/:id" element={<Details currentPage={1} />} />
          </Routes>
        </AppContext.Provider>
      </MemoryRouter>
    );
    await userEvent.click(screen.getAllByTestId('book-item')[0]);
    await expect(spy).toHaveBeenCalledTimes(1);
  });

  it('Click on the close button hides the details component', async () => {
    const mockFetch = Promise.resolve({ json: () => Promise.resolve(book) });
    global.fetch = vi.fn().mockImplementation(() => mockFetch);

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContext.Provider value={value}>
          <Routes>
            <Route path="/" element={<SearchingResults currentPage={1} />} />
            <Route path="/details/:id" element={<Details currentPage={1} />} />
          </Routes>
        </AppContext.Provider>
      </MemoryRouter>
    );
    await userEvent.click(screen.getAllByTestId('book-item')[0]);

    const closeBtn = await screen.findByTestId('close-details-btn');

    await userEvent.click(closeBtn);

    await expect(closeBtn).not.toBeInTheDocument();
  });
});
