import { wrapper } from '../src/store/store';
import '../src/index.css';
import '../src/App.css';
import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorsHandle/ErrorBoundary';

export default function App({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Provider>
  );
}
