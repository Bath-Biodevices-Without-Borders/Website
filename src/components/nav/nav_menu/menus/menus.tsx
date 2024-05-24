import React, { useRef } from 'react'
import './menus.css'
import { motion } from 'framer-motion'

import { I_navOptionsProps } from '../../../../types/types'

export default function Menus(
  {
    isVisible,
    setVisibility,
    tabsInfo
  } : { 
    isVisible: boolean
    setVisibility: (val: boolean) => void
    tabsInfo: { title: string; Component: React.FC<I_navOptionsProps> }[]
  }
) {

  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      className='nav-menus-container'
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
      <motion.div
        className='nav-menus'
        ref={ref}
      >
      {
        tabsInfo.map(({ title, Component } : { title: string, Component: React.FC<I_navOptionsProps>}, index: number) => (
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
            <Component
              handleClick={() => setVisibility(false)}
              navType={0}
              viewportRef={ref}
            />
          </motion.div>
        ))
      }
      </motion.div>
    </motion.div>
  )
}
