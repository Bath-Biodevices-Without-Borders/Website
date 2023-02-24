import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<HomePage />} />
          <Route path='about' element={<AboutPage />} />
          <Route path='donate' element={<DonatePage />} />
          <Route path='future' element={<FuturePage />} />
          <Route path='issue' element={<IssuePage />} />
          <Route path='partners' element={<PartnersPage />} />
          <Route path='progress' element={<ProgressPage />} />
          <Route path='*' element={
            <div className='incorrect-page'>
              <h1>404</h1>
              <h2>Page not found</h2>
            </div>
          } />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
