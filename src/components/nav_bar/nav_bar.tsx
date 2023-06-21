import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

import './nav_bar.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

import CustomButton from '../custom_button/custom_button';

import { INavButton } from '../../types';

export default function NavBar(props: {buttons: INavButton[]}) {
  const [isNavOpen, setNavOpen] = useState(false);
  const navRef = useRef<HTMLUListElement>(null);

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
      <ul className={`nav-list nav-list-${isNavOpen}`} onClick={() => setNavOpen(false)}>
        {
          props.buttons.map((button: INavButton, index: number) => {
            return (
              <li key={index} id={`${button.id}-button`}>
                <CustomButton lnIntFraction={index/props.buttons.length}>
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