import { setupStore, wrapper } from '../src/store/store';
import '../src/index.css';
import '../src/App.css';
import { Provider } from 'react-redux';

export default function App({ Component, pageProps }) {
  const { store } = wrapper.useWrappedStore(pageProps);
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

// export default wrapper.useWrappedStore(App);
