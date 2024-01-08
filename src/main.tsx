import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import HomePage from './pages/Home/HomePage';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';
import CardList from './components/CardList/CardList';
import ReactHookForm from './components/ReactHookForm/ReactHookForm';
import UncontrolledForm from './components/UncontrolledForm/UncontrolledForm';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<HomePage />}>
      <Route path={'/'} element={<CardList />} />
      <Route path={'/react-hook-form'} element={<ReactHookForm />} />
      <Route path='/uncontrolled-form' element={<UncontrolledForm />} />
    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
);
