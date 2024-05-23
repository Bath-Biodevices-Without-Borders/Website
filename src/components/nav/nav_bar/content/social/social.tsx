import React from 'react'
import './social.css';

import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';


export default function Social() {
  return (
    <div className="nav-social-container">
      <h3>Contact Us</h3>
      <div>
        <div className="links">
          <NavLink to = "/contact">
            <p>Blog</p>
          </NavLink>
          <NavLink to = "/contact">
            <p>Gallery</p>
          </NavLink>
          <NavLink to = "/contact">
            <p>Join Us</p>
          </NavLink>
        </div>
        <div className='socials'>
          <a
            href="https://www.instagram.com/teambathbiodevicesuk/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/company/team-bath-biodevices-without-borders/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  );
}
