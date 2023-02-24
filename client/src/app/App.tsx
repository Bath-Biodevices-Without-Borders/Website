import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

import NavBar from '../components/nav_bar/nav_bar';

function App() {
  return (
    <div className="app">
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
