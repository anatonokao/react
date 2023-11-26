import { wrapper } from '../src/store/store';
import '../src/index.css';
import '../src/App.css';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorsHandle/ErrorBoundary';
import Head from 'next/head';
import favicon from 'assets/favicon.ico';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <>
      <Head>
        <title>Books Store</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href={favicon.src} />
      </Head>
      <Provider store={store}>
        <ErrorBoundary>
          <Component {...pageProps} />
        </ErrorBoundary>
      </Provider>
    </>
  );
}
