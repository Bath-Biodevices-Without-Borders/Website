import React from 'react';
import logo from './option 1 - normal (cropped).png';
import { ReactComponent as Linkedin } from './linkedin.svg';
import { ReactComponent as Instagram } from './instagram.svg';
import './App.css';

function App() {
  return (
    <div className="App" id='App'>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Sorry, Biodevices Without Borders' website is still being developed. <br />
          Please check back later for updates.
        </p>
        <p>
          Please check out our LinkedIn and Instagram pages for more information.
        </p>
        <div className="App-links">
          <a  
            className="App-link"
            href="https://www.linkedin.com/company/team-bath-biodevices-without-borders"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className='link-icon'/>
            <p>LinkedIn</p>
          </a>
          <a
            className="App-link"
            href="https://www.instagram.com/teambathbiodevicesuk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Instagram className='link-icon'/>
            <p>Instagram</p>
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
