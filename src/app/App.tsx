import React from 'react';
import { Outlet } from 'react-router-dom';

import './App.css';
import app_json from './App.json';

import NavBar from '../components/nav_bar/nav_bar';

import {
  faHome,
  faPeopleGroup,
  faHourglassEnd,
  faGlobe,
  faHandshakeSimple
} from '@fortawesome/free-solid-svg-icons';

const navButtons = [
  {
    id: "home",
    link: "",
    text: "Home",
    icon: faHome
  },
  {
    id: "about",
    link: "about",
    text: "About Us",
    icon: faPeopleGroup
  },
  {
    id: "issues",
    link: "issue",
    text: "Our Issues WIP",
    icon: faGlobe
  },
  {
    id: "partners",
    link: "partners",
    text: "Our Partners",
    icon: faHandshakeSimple
  },
  {
    id: "progress",
    link: "progress",
    text: "Our Progress",
    icon: faHourglassEnd
  }
]

function App() {
  return (
    <div className="app">
      <header>
        <NavBar buttons={navButtons}/>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default App;
