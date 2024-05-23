import React from 'react'
import './menus.css'
import { motion } from 'framer-motion'

export default function Menus(
  { isVisible } : { isVisible: boolean }
) {

  return (
    <div
      className='nav-menus'
    >
      <motion.div className='content'>
        NavMenu
      </motion.div>
    </div>
  )
}
