import React from 'react'
import './products.css';

import { faDroplet, faMobileScreenButton, faEarthAfrica } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Products() {
  return (
    <div className="nav-products-container">
      <h3>Our Work</h3>
      <div>
        <a href="#">
          <FontAwesomeIcon icon={faDroplet} />
          <p>Oasis</p>
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faMobileScreenButton} />
          <p>App</p>
        </a>
        <a href="#">
          <FontAwesomeIcon icon={faEarthAfrica} />
          <p>Outreach</p>
        </a>
      </div>
    </div>
  );
}
