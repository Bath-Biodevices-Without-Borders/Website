import React from 'react'
import './social.css';

import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Social() {
  return (
    <div>
      <div className="nav-social-container">
        <h3>Contact Us</h3>
        <div>
          <div className="links">
            <a href="#">
              <p>Blog</p>
            </a>
            <a href="#">
              <p>Gallery</p>
            </a>
            <a href="#">
              <p>Join Us</p>
            </a>
          </div>
          <div className='socials'>
            <a href="#">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="#">
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            {/* <a href="#">
              <FontAwesomeIcon icon={faEnvelope} />
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
