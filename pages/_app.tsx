import { wrapper } from '../src/store/store';
import '../src/index.css';
import '../src/App.css';

export function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(App);
