import React from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';

import NavBar from '../components/nav_bar/nav_bar';

function App() {
  return (
    <div className="App">
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
