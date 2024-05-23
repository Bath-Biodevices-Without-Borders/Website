import React from 'react'
import './menus.css'
import { motion } from 'framer-motion'

export default function Menus(
  {
    isVisible,
    setVisibility,
    tabsInfo
  } : { 
    isVisible: boolean
    setVisibility: (val: boolean) => void
    tabsInfo: { title: string; Component: React.FC<{ handleClick: () => void }> }[]
  }
) {

  return (
    <motion.div
      className='nav-menus'
      variants={{
        hidden: {
          x: '100vw',
          transition: {
            duration: 0.3,
          } 
        },
        visible: {
          x: 0,
          transition: {
            duration: 0.3,
            delay: 0.3,
            staggerChildren: 0.2,
          }
        }
      }}
    >
      {
        tabsInfo.map(({ title, Component }, index) => (
          <motion.div
            key={index}
            className='nav-menu'
            variants={{
              hidden: {
                x: '100vw',
                transition: {
                  duration: 0.3,
                }
              },
              visible: {
                x: 0,
                transition: {
                  duration: 0.3,
                }
              }
            }}
          >
            <Component handleClick={() => setVisibility(false)} />
          </motion.div>
        ))
      }
    </motion.div>
  )
}
