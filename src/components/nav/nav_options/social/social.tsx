import React from 'react'
import './social.css';

import { E_NavType } from '../../../../types/types';

import SocialMenu from './social_menu';
import SocialBar from './social_bar';

export default function Social(
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
      [E_NavType.Menu]: <SocialMenu />,
      [E_NavType.Bar]: <SocialBar handleClick={handleClick} />
    }[navType]
  );
}
