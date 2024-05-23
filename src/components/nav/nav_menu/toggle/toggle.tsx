import React from 'react'
import './toggle.css'

import { motion } from 'framer-motion'

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function NavToggle(
  { active, handlePress} : { active: boolean, handlePress: () => void }
) {
  
  return (
    <div
      className='nav-toggle' 
      onClick={handlePress}
    >
      <motion.div
        className='icon-container'
        initial={{
          opacity: 1,
        }}
        animate={{
          opacity: active ? 0 : 1,
          rotate: active ? 720 : 0,
        }}
      >
        <FontAwesomeIcon
          icon={faBars}
        />
      </motion.div>
      <motion.div
        className='icon-container'
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: active ? 1 : 0,
          rotate: active ? 720 : 0,
        }}
      >
        <FontAwesomeIcon
          icon={faXmark}
        />
      </motion.div>
    </div>
  )
}
