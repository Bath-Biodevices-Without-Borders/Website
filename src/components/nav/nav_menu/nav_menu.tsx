import React, { useContext, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './nav_menu.css'

import Menus from './menus/menus';
import Toggle from './toggle/toggle';
import { HeroContext } from '../../../context/hero_context';

export default function NavMenu(
  { tabsInfo } : { tabsInfo: { title: string; Component: React.FC<{ handleClick: () => void }> }[] }
) {
  const [active, setActive] = useState(false);

  const { heroRef } = useContext(HeroContext);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const navY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    let subscriber: NodeJS.Timeout;
    if (active) {
      subscriber = setTimeout(() => {
        document.body.style.overflow = 'hidden';
      }, 200);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => clearTimeout(subscriber);
  }, [active]);

  return (
    <motion.div
      id="nav-menu"
      initial='hidden'
      animate={active ? 'visible' : 'hidden'}
    >
      <motion.div
        className='bg'
        variants={{
          hidden: {
            height: '3rem',
            width: '3rem',
            marginTop: 0,
            marginRight: 0,
            borderRadius: '0.4rem',
            transition: {
              duration: 0.3,
              delay: 0.3,
            }
          },
          visible: {
            height: '200vh',
            width: '100vw',
            marginTop: '-0.5rem',
            marginRight: '-10vw',
            borderRadius: 0,
            transition: {
              duration: 0.3,
            }
          },
        }}
        style={{
          opacity: active ? 1 : navY,
        }}
      />
      <Menus
        isVisible={active}
        setVisibility={setActive}
        tabsInfo={tabsInfo}
      />
      <Toggle
        active={active}
        handlePress={() => setActive(!active)}
      />
    </motion.div>
  )
}
