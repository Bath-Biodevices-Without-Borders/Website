import React from 'react'
import './social.css';

import { E_NavType, I_navOptionsProps } from '../../../../types/types';

import SocialMenu from './social_menu';
import SocialBar from './social_bar';

export default function Social(
  { 
    handleClick,
    navType,
    viewportRef
  } : I_navOptionsProps
) {
  return (
    {
      [E_NavType.Menu]: <SocialMenu
        handleClick={handleClick}
        viewportRef={viewportRef}
        navType={navType}
      />,
      [E_NavType.Bar]: <SocialBar
        handleClick={handleClick}
        viewportRef={viewportRef}
        navType={navType}
      />,
    }[navType]
  );
}
