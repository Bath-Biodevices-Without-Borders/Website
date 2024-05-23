import React from 'react'
import './about.css';

import { E_NavType } from '../../../../types/types';

import AboutMenu from './about_menu';
import AboutBar from './about_bar';

export default function About(
  { 
    handleClick,
    navType
  } : {
    handleClick: () => void,
    navType: E_NavType
  }
) {

  return (
    {
      [E_NavType.Menu]: <AboutMenu />,
      [E_NavType.Bar]: <AboutBar handleClick={handleClick} />
    }[navType]
  )
}
