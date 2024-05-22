import React from 'react'
import './about.css';

import { faPiggyBank, faGear, faHandshake, faEarthAfrica, faVial, faUsers, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';

export default function About() {
  const haveIcon = false;

  return (
    <div className="nav-about-container">
      <h3>About Us</h3>
      <div>
        <div className='business'>
          <h4>Business</h4>
          <NavLink to = "/about">
            {haveIcon && <FontAwesomeIcon icon={faPiggyBank} />}
            <p>Finance</p>
          </NavLink>
          <NavLink to = "/about">
            {haveIcon && <FontAwesomeIcon icon={faHandshake} />}
            <p>Management</p>
          </NavLink>
          <NavLink to = "/about">
            {haveIcon && <FontAwesomeIcon icon={faEarthAfrica} />}
            <p>Outreach</p>
          </NavLink>
          <NavLink to = "/about">
            {haveIcon && <FontAwesomeIcon icon={faUsers} />}
            <p>Social</p>
          </NavLink>
        </div>
        <div className='technical'>
          <h4>Technical</h4>
          <NavLink to = "/about">
            {haveIcon && <FontAwesomeIcon icon={faGear} />}
            <p>Hardware</p>
          </NavLink>
          <NavLink to = "/about">
            {haveIcon && <FontAwesomeIcon icon={faVial} />}
            <p>Sensors</p>
          </NavLink>
          <NavLink to = "/about">
            {haveIcon && <FontAwesomeIcon icon={faCode} />}
            <p>Software</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
