// @vitest-environment jsdom
// import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import React from 'react';
import Search from './Search';
import { AppContextProvider } from '../../../contexts/AppContext/AppContextProvider';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import App from '../../../App';
import { userEvent } from '@testing-library/user-event';

const value = {
  kind: 'books#volumes',
  totalItems: 456,
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
        listPrice: {
          amount: 33456,
          currencyCode: 'RUB',
        },
        buyLink: 'google.com',
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
      id: 'TNc6zOpsCdsFJGvv',
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
        listPrice: {
          amount: 33456,
          currencyCode: 'RUB',
        },
        buyLink: 'google.com',
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
  ],
};

describe('Search test', () => {
  it('Input and button rendered', () => {
    render(<Search />);
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('Click on the Search button saves the entered value to the local storage', async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(value),
    });
    global.fetch = vi.fn().mockImplementation(() => mockFetch);

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </AppContextProvider>
      </MemoryRouter>
    );

    const input = await screen.findByTestId('search-input');
    const button = await screen.findByTestId('search-button');

    await userEvent.type(input, 'test');
    await userEvent.click(button);
    expect(localStorage.getItem('request')).toBe('test');
  });

  it('Component retrieves the value from the local storage upon mounting', async () => {
    const mockFetch = Promise.resolve({
      json: () => Promise.resolve(value),
    });
    global.fetch = vi.fn().mockImplementation(() => mockFetch);

    const spy = vi.spyOn(Storage.prototype, 'getItem');

    render(
      <MemoryRouter initialEntries={['/']}>
        <AppContextProvider>
          <Routes>
            <Route path="/" element={<App />} />
          </Routes>
        </AppContextProvider>
      </MemoryRouter>
    );
    expect(spy).toBeCalled();
  });
});
