import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';

import App from './app/App';
import AboutPage from './pages/about_page/about_page';
import DonatePage from './pages/donate_page/donate_page';
import FuturePage from './pages/future_page/future_page';
import HomePage from './pages/home_page/home_page';
import IssuePage from './pages/issue_page/issue_page';
import PartnersPage from './pages/partners_page/partners_page';
import ProgressPage from './pages/progress_page/progress_page';

import ErrorPage from './pages/error_page/error_page';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "donate", element: <DonatePage /> },
      { path: "future", element: <FuturePage /> },
      { path: "issue", element: <IssuePage /> },
      { path: "partners", element: <PartnersPage /> },
      { path: "progress", element: <ProgressPage /> }
    ]

  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
