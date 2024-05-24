import React from 'react';
import './products_bar.css';

import { faDroplet, faMobileScreenButton, faEarthAfrica } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { I_navOptionsProps } from '../../../../types/types';

export default function ProductsBar(
  {
    handleClick,
    viewportRef
  } : I_navOptionsProps
) {
  return (
    <div className="nav-products-bar-container">
      <h3>Our Work</h3>
      <div>
        <NavLink to = "/work" onClick={handleClick}>
          <FontAwesomeIcon icon={faDroplet} />
          <p>Oasis</p>
        </NavLink>
        <NavLink to = "/work" onClick={handleClick}>
          <FontAwesomeIcon icon={faMobileScreenButton} />
          <p>App</p>
        </NavLink>
        <NavLink to = "/work" onClick={handleClick}>
          <FontAwesomeIcon icon={faEarthAfrica} />
          <p>Outreach</p>
        </NavLink>
      </div>
    </div>
  )
}
