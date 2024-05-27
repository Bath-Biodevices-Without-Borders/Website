import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

import App from './App';
import HomePage from './pages/home_page/home_page';
import AboutPage from './pages/about_page/about_page';
import WorkPage from './pages/work_page/work_page';
import ContactPage from './pages/contact_page/contact_page';
import JoinUsPage from './pages/join_us_page/join_us_page';

import { createHashRouter, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'work', element: <WorkPage /> },
      { path: 'contact', element: <ContactPage /> },
      { path: 'join-us', element: <JoinUsPage /> }
    ]
  }
])


ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);
