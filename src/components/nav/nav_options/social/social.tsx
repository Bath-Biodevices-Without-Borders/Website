import React from 'react'
import './social.css';

import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';


export default function Social(
  { handleClick } : { handleClick: () => void }
) {
  return (
    <div className="nav-social-container">
      <h3>Contact Us</h3>
      <div>
        <div className="links">
          <NavLink to = "/contact" onClick={handleClick}>
            <p>Blog</p>
          </NavLink>
          <NavLink to = "/contact" onClick={handleClick}>
            <p>Gallery</p>
          </NavLink>
          <NavLink to = "/contact" onClick={handleClick}>
            <p>Join Us</p>
          </NavLink>
        </div>
        <div className='socials'>
          <a
            href="https://www.instagram.com/teambathbiodevicesuk/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/company/team-bath-biodevices-without-borders/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
          >
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        </div>
      </div>
    </div>
  );
}
