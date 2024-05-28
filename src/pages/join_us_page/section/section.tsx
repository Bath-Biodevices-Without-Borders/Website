import React from 'react'
import './section.css'
import { Link } from 'react-router-dom';

import { T_TeamStrings } from '../../../types/types'

import { faPiggyBank, faGear, faEarthAfrica, faVial, faUsers, faCode, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

export default function Section() {
  const teams: { team: T_TeamStrings, icon: IconDefinition, link: string }[] = [
    { team: 'finance', icon: faPiggyBank, link: '/about' },
    { team: 'hardware', icon: faGear, link: '/about' },
    { team: 'outreach', icon: faEarthAfrica, link: '/about'},
    { team: 'sensors', icon: faVial, link: '/about' },
    { team: 'social', icon: faUsers, link: '/about' },
    { team: 'software', icon: faCode, link: '/about' },
  ];

  return (
    <section>
      <div className='intro'>
        <h3>Do you want to join us?</h3>
        <p>Are you interested in word we do and are eager to get involved, then fill in the form and we will be in-touch with you soon!</p>
        <p>If you do not know what team to join, click on one below to learn about each team.</p>
      </div>
      <div className='teams'>
        {
          teams.map(({ team, icon, link } : { team: T_TeamStrings, icon: IconDefinition, link: string }) => (
            <motion.div
              className='team-container'
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.1 }}
            >
              <Link to={link} key={team} className='team'>
                <figure className='icon'>
                  <FontAwesomeIcon icon={icon} />
                </figure>
                <h4>{team}</h4>
              </Link>
            </motion.div>
          ))
        }
      </div>
    </section>
  )
}
