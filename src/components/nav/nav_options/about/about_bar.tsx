import React from 'react'
import './about_bar.css';

import { faPiggyBank, faGear, faHandshake, faEarthAfrica, faVial, faUsers, faCode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { I_navOptionsProps } from '../../../../types/types';

export default function AboutBar(
  {
    handleClick,
    viewportRef
  } : I_navOptionsProps
) {
  return (
    <div className="nav-about-bar-container">
      <h3>About Us</h3>
      <div>
        <div className='business'>
          <h4>Business</h4>
          <NavLink to = "/about" onClick={handleClick}>
            <FontAwesomeIcon icon={faPiggyBank} />
            <p>Finance</p>
          </NavLink>
          <NavLink to = "/about" onClick={handleClick}>
            <FontAwesomeIcon icon={faHandshake} />
            <p>Management</p>
          </NavLink>
          <NavLink to = "/about" onClick={handleClick}>
            <FontAwesomeIcon icon={faEarthAfrica} />
            <p>Outreach</p>
          </NavLink>
          <NavLink to = "/about" onClick={handleClick}>
            <FontAwesomeIcon icon={faUsers} />
            <p>Social</p>
          </NavLink>
        </div>
        <div className='technical'>
          <h4>Technical</h4>
          <NavLink to = "/about" onClick={handleClick}>
            <FontAwesomeIcon icon={faGear} />
            <p>Hardware</p>
          </NavLink>
          <NavLink to = "/about" onClick={handleClick}>
            <FontAwesomeIcon icon={faVial} />
            <p>Sensors</p>
          </NavLink>
          <NavLink to = "/about" onClick={handleClick}>
            <FontAwesomeIcon icon={faCode} />
            <p>Software</p>
          </NavLink>
        </div>
      </div>
    </div>
  )
}
