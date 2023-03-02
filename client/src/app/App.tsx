import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';
import app_json from './App.json';

import NavBar from '../components/nav_bar/nav_bar';

function App() {
  return (
    <div className="app">
      <header>
        <NavBar buttons={app_json.nav_buttons}/>
      </header>
      <main>
        <Outlet />
      </main>
      <footer>

      </footer>
    </div>
  );
}

export default App;
