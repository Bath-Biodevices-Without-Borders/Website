import React from 'react'
import './about_menu.css';

import { NavLink } from 'react-router-dom';
import { I_navOptionsProps } from '../../../../types/types';
import { motion } from 'framer-motion';

export default function AboutMenu(
  {
    handleClick,
    viewportRef
  } : I_navOptionsProps
) {

  const links: {to: string, text: string}[] = [
    { to: '/about', text: 'Finance' },
    { to: '/about', text: 'Hardware' },
    { to: '/about', text: 'Management' },
    { to: '/about', text: 'Outreach' },
    { to: '/about', text: 'Sensors' },
    { to: '/about', text: 'Social' },
    { to: '/about', text: 'Software' }
  ]

  return (
    <div className="nav-about-menu-container">
      <h3>About Us</h3>
      <div>
        {
          links.map(({ to, text } : {to: string, text: string}, idx: number) => {
            return (
              <motion.div
                initial={{
                  opacity: 0,
                  scale: 1,
                }}
                whileInView={{
                  opacity: 1,
                }}
                viewport={{
                  root: viewportRef,
                  amount: 'some'
                }}
                whileHover={{ scale: 1.1 }}
              >
                <NavLink to={to} onClick={handleClick}>
                  {text}
                </NavLink>
              </motion.div>
            )
          })
        }
      </div>
    </div>
  )
}
