import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './nav_bar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../custom_button/custom_button';

export default function NavBar() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <nav>
      <div className='upper-nav'>
        <div className='logo'>
          <Link className='link' to='/'>Biodevices without Borders</Link>
        </div>
        <div className={`burger cross-${isNavOpen}`}>
          {
            isNavOpen ? <FontAwesomeIcon icon={faXmark} onClick={toggleNav} /> : <FontAwesomeIcon icon={faBars} onClick={toggleNav} />
          }
        </div>
      </div>
      <ul className={`nav-list nav-list-${isNavOpen}`}>
        <li id='about-button'>
          <CustomButton lnIntFraction={0/5}>
            <Link className='link' to='about'>About</Link>
          </CustomButton>
        </li>
        <li id='donate-button'>
          <CustomButton lnIntFraction={1/5}>
            <Link className='link' to='donate'>Donate</Link>
          </CustomButton>
        </li>
        <li id='future-button'>
          <CustomButton lnIntFraction={2/5}>
            <Link className='link' to='future'>Future Plans</Link>
          </CustomButton>
        </li>
        <li id='issues-button'>
          <CustomButton lnIntFraction={3/5}>
            <Link className='link' to='issue'>Issues</Link>
          </CustomButton>
        </li>
        <li id='partners-button'>
          <CustomButton lnIntFraction={4/5}>
            <Link className='link' to='partners'>Partners</Link>
          </CustomButton>
        </li>
        <li id='progress-button'>
          <CustomButton lnIntFraction={5/5}>
            <Link className='link' to='progress'>Progress</Link>
          </CustomButton>
        </li>
      </ul>
    </nav>
  )
}