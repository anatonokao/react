const API_KEY: string = 'AIzaSyDYIbMfKgnY0ApGq1a3hM2Z3-g1GlqYa7o';

const SEARCH_BOOK_URL: string = 'https://www.googleapis.com/books/v1/volumes';

const GET_BOOK_URL = 'https://www.googleapis.com/books/v1/volumes';
// export async function http<T>(request: string): Promise<T> {
//   const response = await fetch(request).catch((error) => {
//     return error;
//   });
//   return await response.json();
// }

export async function searchBooks<T>(
  request: string = '',
  startIndex: number = 0,
  maxResults: number = 20
): Promise<T> {
  const finalRequest = `${SEARCH_BOOK_URL}?q=${
    request || 'book'
  }&startIndex=${startIndex}&maxResults=${maxResults}&key=${API_KEY}`;
  const response = await fetch(finalRequest).catch((error) => {
    return error;
  });
  return await response.json();
}

export async function getBook<T>(id: string): Promise<T> {
  const finalRequest = `${GET_BOOK_URL}/${id}?&key=${API_KEY}`;
  const response = await fetch(finalRequest).catch((error) => {
    return error;
  });
  return await response.json();
}
