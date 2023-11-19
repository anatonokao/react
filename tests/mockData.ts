import { IBook } from '../src/models/IBook';
import { HttpResponse } from '../src/services/BookService';

export const book: IBook = {
  kind: 'books#volume',
  id: 'EaD1kIfiTfoC',
  etag: 'BXHkOdp49S0',
  selfLink: 'https://www.googleapis.com/books/v1/volumes/EaD1kIfiTfoC',
  volumeInfo: {
    title: 'Necronomicon',
    subtitle: 'The Best Weird Tales of H.P. Lovecraft',
    authors: ['H.P. Lovecraft'],
    publisher: 'Hachette UK',
    publishedDate: '2008-09-18',
    description:
      "WIKIPEDIA says: 'H.P. Lovecraft's reputation has grown tremendously over the decades, and he is now commonly regarded as one of the most important horror writers of the 20th century, exerting an influence that is widespread, though often indirect.' His tales of the tentacled Elder God Cthulhu and his pantheon of alien deities were initially written for the pulp magazines of the 1920s and '30s. These astonishing tales blend elements of horror, science fiction and cosmic terror that are as powerful today as they were when they were first published. THE NECRONOMICON collects together the very best of Lovecraft's tales of terror, including the complete Cthulhu Mythos cycle, just the way they were originally published. It will introduce a whole new generation of readers to Lovecraft's fiction, as well as being a must-buy for those fans who want all his work in a single, definitive volume.",
    pageCount: 896,
    imageLinks: {
      smallThumbnail:
        'http://books.google.com/books/content?id=EaD1kIfiTfoC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70uKpYK_BhLLT2la66ucQEjev7obEbQr39dKMrjWwRook3tMCYWcPBTMhccT_G3sZmyig243_HkwC-b7kww9gjZFED9YgLOeVtw0yE_4MOCrZbPjeojBJyeSoxuBGCA3fwYT2CY&source=gbs_api',
      thumbnail:
        'http://books.google.com/books/content?id=EaD1kIfiTfoC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73Ug1-aM11zmm8yfnoh7FYCW6Bw4qIb8nJmMM1uFMB-UiowNOAz6vsPNhg2Ykv_62yeShiJ9SsiWcdGswlD6Qavl7Tri_tbP2PfTKeuGtvWcvKpq0h2vS05-ickWtz8tYYs620y&source=gbs_api',
    },
    language: 'en',
  },
  saleInfo: {
    listPrice: {
      amount: 3.99,
      currencyCode: 'EUR',
    },
    buyLink:
      'https://play.google.com/store/books/details?id=EaD1kIfiTfoC&rdid=book-EaD1kIfiTfoC&rdot=1&source=gbs_api',
  },
};

export const response: HttpResponse = {
  kind: 'books#volumes',
  totalItems: 456,
  items: [
    {
      kind: 'books#volume',
      id: 'EaD1kIfiTfoC',
      etag: 'BXHkOdp49S0',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/EaD1kIfiTfoC',
      volumeInfo: {
        title: 'Necronomicon',
        subtitle: 'The Best Weird Tales of H.P. Lovecraft',
        authors: ['H.P. Lovecraft'],
        publisher: 'Hachette UK',
        publishedDate: '2008-09-18',
        description:
          "WIKIPEDIA says: 'H.P. Lovecraft's reputation has grown tremendously over the decades, and he is now commonly regarded as one of the most important horror writers of the 20th century, exerting an influence that is widespread, though often indirect.' His tales of the tentacled Elder God Cthulhu and his pantheon of alien deities were initially written for the pulp magazines of the 1920s and '30s. These astonishing tales blend elements of horror, science fiction and cosmic terror that are as powerful today as they were when they were first published. THE NECRONOMICON collects together the very best of Lovecraft's tales of terror, including the complete Cthulhu Mythos cycle, just the way they were originally published. It will introduce a whole new generation of readers to Lovecraft's fiction, as well as being a must-buy for those fans who want all his work in a single, definitive volume.",
        pageCount: 896,
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=EaD1kIfiTfoC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70uKpYK_BhLLT2la66ucQEjev7obEbQr39dKMrjWwRook3tMCYWcPBTMhccT_G3sZmyig243_HkwC-b7kww9gjZFED9YgLOeVtw0yE_4MOCrZbPjeojBJyeSoxuBGCA3fwYT2CY&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=EaD1kIfiTfoC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73Ug1-aM11zmm8yfnoh7FYCW6Bw4qIb8nJmMM1uFMB-UiowNOAz6vsPNhg2Ykv_62yeShiJ9SsiWcdGswlD6Qavl7Tri_tbP2PfTKeuGtvWcvKpq0h2vS05-ickWtz8tYYs620y&source=gbs_api',
        },
        language: 'en',
      },
      saleInfo: {
        listPrice: {
          amount: 3.99,
          currencyCode: 'EUR',
        },
        buyLink:
          'https://play.google.com/store/books/details?id=EaD1kIfiTfoC&rdid=book-EaD1kIfiTfoC&rdot=1&source=gbs_api',
      },
    },
    {
      kind: 'books#volume',
      id: 'EaD1kIfiTfoCCChCGC',
      etag: 'BXHkOdFdFp49S0',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/BXHkOdFdFp49S0',
      volumeInfo: {
        title: 'Tolstoy Biography',
        subtitle: 'The Best Weird Tales of H.P. Lovecraft',
        authors: ['H.P. Lovecraft'],
        publisher: 'Hachette UK',
        publishedDate: '2008-09-18',
        description:
          "WIKIPEDIA says: 'H.P. Lovecraft's reputation has grown tremendously over the decades, and he is now commonly regarded as one of the most important horror writers of the 20th century, exerting an influence that is widespread, though often indirect.' His tales of the tentacled Elder God Cthulhu and his pantheon of alien deities were initially written for the pulp magazines of the 1920s and '30s. These astonishing tales blend elements of horror, science fiction and cosmic terror that are as powerful today as they were when they were first published. THE NECRONOMICON collects together the very best of Lovecraft's tales of terror, including the complete Cthulhu Mythos cycle, just the way they were originally published. It will introduce a whole new generation of readers to Lovecraft's fiction, as well as being a must-buy for those fans who want all his work in a single, definitive volume.",
        pageCount: 896,
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=EaD1kIfiTfoC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70uKpYK_BhLLT2la66ucQEjev7obEbQr39dKMrjWwRook3tMCYWcPBTMhccT_G3sZmyig243_HkwC-b7kww9gjZFED9YgLOeVtw0yE_4MOCrZbPjeojBJyeSoxuBGCA3fwYT2CY&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=EaD1kIfiTfoC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73Ug1-aM11zmm8yfnoh7FYCW6Bw4qIb8nJmMM1uFMB-UiowNOAz6vsPNhg2Ykv_62yeShiJ9SsiWcdGswlD6Qavl7Tri_tbP2PfTKeuGtvWcvKpq0h2vS05-ickWtz8tYYs620y&source=gbs_api',
        },
        language: 'en',
      },
      saleInfo: {
        listPrice: {
          amount: 3.99,
          currencyCode: 'EUR',
        },
        buyLink:
          'https://play.google.com/store/books/details?id=EaD1kIfiTfoC&rdid=book-EaD1kIfiTfoC&rdot=1&source=gbs_api',
      },
    },
    {
      kind: 'books#volume',
      id: 'EaD1kIfiTfCChCGS',
      etag: 'BXHkOdFdFp49S0',
      selfLink: 'https://www.googleapis.com/books/v1/volumes/BXHkOdFdFp49S0',
      volumeInfo: {
        title: 'Tolstoy Biography',
        subtitle: 'The Best Weird Tales of H.P. Lovecraft',
        authors: ['H.P. Lovecraft'],
        publisher: 'Hachette UK',
        publishedDate: '2008-09-18',
        description:
          "WIKIPEDIA says: 'H.P. Lovecraft's reputation has grown tremendously over the decades, and he is now commonly regarded as one of the most important horror writers of the 20th century, exerting an influence that is widespread, though often indirect.' His tales of the tentacled Elder God Cthulhu and his pantheon of alien deities were initially written for the pulp magazines of the 1920s and '30s. These astonishing tales blend elements of horror, science fiction and cosmic terror that are as powerful today as they were when they were first published. THE NECRONOMICON collects together the very best of Lovecraft's tales of terror, including the complete Cthulhu Mythos cycle, just the way they were originally published. It will introduce a whole new generation of readers to Lovecraft's fiction, as well as being a must-buy for those fans who want all his work in a single, definitive volume.",
        pageCount: 896,
        imageLinks: {
          smallThumbnail:
            'http://books.google.com/books/content?id=EaD1kIfiTfoC&printsec=frontcover&img=1&zoom=5&edge=curl&imgtk=AFLRE70uKpYK_BhLLT2la66ucQEjev7obEbQr39dKMrjWwRook3tMCYWcPBTMhccT_G3sZmyig243_HkwC-b7kww9gjZFED9YgLOeVtw0yE_4MOCrZbPjeojBJyeSoxuBGCA3fwYT2CY&source=gbs_api',
          thumbnail:
            'http://books.google.com/books/content?id=EaD1kIfiTfoC&printsec=frontcover&img=1&zoom=1&edge=curl&imgtk=AFLRE73Ug1-aM11zmm8yfnoh7FYCW6Bw4qIb8nJmMM1uFMB-UiowNOAz6vsPNhg2Ykv_62yeShiJ9SsiWcdGswlD6Qavl7Tri_tbP2PfTKeuGtvWcvKpq0h2vS05-ickWtz8tYYs620y&source=gbs_api',
        },
        language: 'en',
      },
      saleInfo: {
        listPrice: {
          amount: 3.99,
          currencyCode: 'EUR',
        },
        buyLink:
          'https://play.google.com/store/books/details?id=EaD1kIfiTfoC&rdid=book-EaD1kIfiTfoC&rdot=1&source=gbs_api',
      },
    },
  ],
};
