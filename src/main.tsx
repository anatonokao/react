import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import ErrorBoundary from './components/ErrorsHandle/ErrorBoundary';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Details from './components/Details/Details';
// import { AppContextProvider } from './contexts/AppContext/AppContextProvider';
import NotFoundPage from './components/pages/NotFoundPage/NotFoundPage';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const store = setupStore();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route
        path="/"
        element={
          <ErrorBoundary>
            <Provider store={store}>
              <App />
            </Provider>
          </ErrorBoundary>
        }
      >
        <Route path="details/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
