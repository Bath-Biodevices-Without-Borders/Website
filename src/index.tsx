import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import App from './App';
import HomePage from './pages/home_page/home_page';
import AboutPage from './pages/about_page/about_page';
import OasisPage from './pages/oasis_page/oasis_page';
import ContactPage from './pages/contact_page/contact_page';

import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/oasis', element: <OasisPage /> },
      { path: '/contact', element: <ContactPage /> }
    ]
  }
])

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
