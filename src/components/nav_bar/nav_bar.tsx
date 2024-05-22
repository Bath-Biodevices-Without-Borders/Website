import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './nav_bar.css';

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { motion } from 'framer-motion';

import Logo from '../../images/Biodevices Without Borders-04.png';
import Tabs from './tabs/tabs';

import Products from './tabs/content/products/products';
import About from './tabs/content/about/about';
import Social from './tabs/content/social/social';

export default function NavBar() {

  const tabsInfo: { title: string; Component: React.FC }[] = [
    {
      title: "Products",
      Component: Products,
    },
    {
      title: "About Us",
      Component: About,
    },
    {
      title: "Contact Us",
      Component: Social,
    },
  ];

  return (
    <nav>
      <Tabs tabsInfo={tabsInfo} />
      {/* <header>
        <Link to = "/" className = "title">
          <img src={Logo} alt='Logo' />
        </Link>
      </header>
      <input
        type='checkbox'
        id='menu-toggle'
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <label htmlFor='menu-toggle'>
        {
          menuOpen
          ? <motion.div
              className='icon-container'
              initial = {{ rotate: 0, opacity: 1 }}
              animate = {{ rotate: 0, opacity: 1 }}
              exit = {{ rotate: 360, opacity: 0}}
            >
              <FontAwesomeIcon icon = {faXmark} />
            </motion.div>
          : <motion.div
              className='icon-container'
              initial = {{ rotate: 0, opacity: 0}}
              animate = {{ rotate: 360, opacity: 1}}
              exit = {{ rotate: 0, opacity: 0}}
            >
              <FontAwesomeIcon icon = {faBars} />
            </motion.div>
        }
      </label>
      <ul className='links'>
        <li>
          <NavLink to = "/about">About Us</NavLink>
        </li>
        <li>
          <NavLink to = "/work">Our Work</NavLink>
        </li>
        <li>
          <NavLink to= "/contact">Get In Touch</NavLink>
        </li>
      </ul> */}
    </nav>
  );
}