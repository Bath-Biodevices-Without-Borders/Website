import React from 'react'
import './about.css';

import { faPiggyBank, faGear, faHandshake, faEarthAfrica, faVial, faUsers, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function About() {
  const haveIcon = false;

  return (
    <div className="nav-about-container">
      <h3>About Us</h3>
      <div>
        <div className='business'>
          <h4>Business</h4>
          <a href="#">
            {haveIcon && <FontAwesomeIcon icon={faPiggyBank} />}
            <p>Finance</p>
          </a>
          <a href="#">
            {haveIcon && <FontAwesomeIcon icon={faHandshake} />}
            <p>Management</p>
          </a>
          <a href="#">
            {haveIcon && <FontAwesomeIcon icon={faEarthAfrica} />}
            <p>Outreach</p>
          </a>
          <a href="#">
            {haveIcon && <FontAwesomeIcon icon={faUsers} />}
            <p>Social</p>
          </a>
        </div>
        <div className='technical'>
          <h4>Technical</h4>
          <a href="#">
            {haveIcon && <FontAwesomeIcon icon={faGear} />}
            <p>Hardware</p>
          </a>
          <a href="#">
            {haveIcon && <FontAwesomeIcon icon={faVial} />}
            <p>Sensors</p>
          </a>
          <a href="#">
            {haveIcon && <FontAwesomeIcon icon={faCode} />}
            <p>Software</p>
          </a>
        </div>
      </div>
    </div>
  );
}
