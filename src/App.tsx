import React from 'react';
import error from './error.svg';
import { ReactComponent as Linkedin } from './linkedin.svg';
import { ReactComponent as Github } from './github.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={error} className="App-logo" alt="logo" />
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
            href="https://www.linkedin.com/in/georgemadeleybathcompsyseng"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className='link-icon'/>
            <p>LinkedIn</p>
          </a>
          <a
            className="App-link"
            href="https://github.com/George-Madeley"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className='link-icon'/>
            <p>GitHub</p>
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
