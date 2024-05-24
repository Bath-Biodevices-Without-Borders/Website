import React from 'react'
import './products.css';
import { E_NavType, I_navOptionsProps } from '../../../../types/types';
import ProductsMenu from './products_menu';
import ProductsBar from './products_bar';

export default function Products(
  { 
    handleClick,
    navType,
    viewportRef
  } : I_navOptionsProps
) {
  return (
    {
      [E_NavType.Menu]: <ProductsMenu
        handleClick={handleClick}
        viewportRef={viewportRef}
        navType={navType}
      />,
      [E_NavType.Bar]: <ProductsBar
        handleClick={handleClick}
        viewportRef={viewportRef}
        navType={navType}
      />,
    }[navType]
  );
}
