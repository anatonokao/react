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
import ReactHookFormPage from './pages/ReactHookForm/ReactHookFormPage';
import UncontrolledFormPage from './pages/UncontrolledForm/UncontrolledFormPage';
import { Provider } from 'react-redux';
import { setupStore } from './store/store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/'>
      <Route path='/' element={<HomePage />} />
      <Route path={'/react-hook-form'} element={<ReactHookFormPage />} />
      <Route path='/uncontrolled-form' element={<UncontrolledFormPage />} />
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
