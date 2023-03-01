import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import './nav_bar.css';
import nav_json from './nav_bar.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../custom_button/custom_button';

export default function NavBar() {
  const [isNavOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);
  const nav_buttons = nav_json.nav_buttons;

  const closeNav = (e: any) => {
    if (navRef.current && isNavOpen && !navRef.current.contains(e.target)) {
      setNavOpen(false);
    }
  };

  window.addEventListener('click', closeNav);

  const toggleNav = () => {
    setNavOpen(!isNavOpen);
  };

  return (
    <nav ref={navRef}>
      <div className='upper-nav'>
        <div className='logo'>
          <Link className='link' to='/'>Biodevices without Borders</Link>
        </div>
        <div className={`burger cross-${isNavOpen}`} onClick={toggleNav}>
          {
            isNavOpen ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faBars} />
          }
        </div>
      </div>
      <ul className={`nav-list nav-list-${isNavOpen}`}>
        {
          nav_buttons.map((button, index) => {
            return (
              <li key={index} id={`${button.id}-button`}>
                <CustomButton lnIntFraction={index/nav_buttons.length}>
                  <Link className='link' to={button.link}>{button.text}</Link>
                </CustomButton>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}