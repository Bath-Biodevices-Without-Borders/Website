import React from 'react'
import './products.css';
import { E_NavType } from '../../../../types/types';
import ProductsMenu from './products_menu';
import ProductsBar from './products_bar';

export default function Products(
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
      [E_NavType.Menu]: <ProductsMenu />,
      [E_NavType.Bar]: <ProductsBar handleClick={handleClick} />
    }[navType]
  );
}
