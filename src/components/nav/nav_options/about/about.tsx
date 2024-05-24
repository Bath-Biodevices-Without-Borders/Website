import React from 'react'
import './about.css';

import { E_NavType, I_navOptionsProps } from '../../../../types/types';

import AboutMenu from './about_menu';
import AboutBar from './about_bar';

export default function About(
  { 
    handleClick,
    navType,
    viewportRef
  } : I_navOptionsProps
) {

  return (
    {
      [E_NavType.Menu]: <AboutMenu 
        handleClick={handleClick}
        viewportRef={viewportRef}
        navType={navType}
      />,
      [E_NavType.Bar]: <AboutBar
        handleClick={handleClick}
        viewportRef={viewportRef}
        navType={navType}
      />,
    }[navType]
  )
}
