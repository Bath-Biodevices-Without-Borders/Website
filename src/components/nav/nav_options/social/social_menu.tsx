import React from 'react';
import './social_menu.css';

import { faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { I_navOptionsProps } from '../../../../types/types';
import { motion } from 'framer-motion';

export default function SocialMenu(
  {
    handleClick,
    viewportRef
  } : I_navOptionsProps
) {

  const links: {to: string, text: string}[] = [
    { to: '/contact', text: 'Blog' },
    { to: '/contact', text: 'Gallery' },
    { to: '/join-us', text: 'Join Us' }
  ]

  const socials: {href: string, icon: any}[] = [
    { href: 'https://www.instagram.com/teambathbiodevicesuk/', icon: faInstagram },
    { href: 'https://www.linkedin.com/company/team-bath-biodevices-without-borders/', icon: faLinkedin }
  ]

  return (
    <div className="nav-social-menu-container">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ root: viewportRef }} 
      >
        Contact Us
      </motion.h3>
      <div>
        <div className="links">
          {
            links.map(({ to, text } : {to: string, text: string}, idx: number) => {
              return (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 1
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
        <div className='socials'>
          {
            socials.map(({ href, icon } : {href: string, icon: any}, idx: number) => {
              return (
                <motion.a
                  href={href}
                  target='_blank'
                  rel='noopener noreferrer'
                  initial={{
                    opacity: 0,
                    scale: 1
                  }}
                  whileInView={{ opacity: 1 }}
                  viewport={{
                    root: viewportRef,
                    amount: 'some'
                  }}
                  whileHover={{
                    scale: 1.1
                  }}
                >
                  <FontAwesomeIcon icon={icon} />
                </motion.a>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}
