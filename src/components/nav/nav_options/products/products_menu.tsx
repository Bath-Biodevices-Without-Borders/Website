import React from 'react';
import './products_menu.css';

import { faDroplet, faMobileScreenButton, faEarthAfrica } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { I_navOptionsProps } from '../../../../types/types';
import { motion } from 'framer-motion';

export default function ProductsMenu(
  {
    handleClick,
    viewportRef
  } : I_navOptionsProps
) {
  return (
    <div className="nav-products-menu-container">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          root: viewportRef,
          amount: 'some'
        }}
      >
        Our Work
      </motion.h3>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{
          opacity: 1,
        }}
        viewport={{
          root: viewportRef,
          amount: 'some'
        }}
      >
        <NavLink to = "/work" onClick={handleClick}>
          <figure>
            <FontAwesomeIcon icon={faDroplet} />
          </figure>
          <p>Oasis</p>
        </NavLink>
        <NavLink to = "/work" onClick={handleClick}>
          <figure>
            <FontAwesomeIcon icon={faMobileScreenButton} />
          </figure>
          <p>App</p>
        </NavLink>
        <NavLink to = "/work" onClick={handleClick}>
          <figure>
            <FontAwesomeIcon icon={faEarthAfrica} />
          </figure>
          <p>Outreach</p>
        </NavLink>
      </motion.div>
    </div>
  )
}
