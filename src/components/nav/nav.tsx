import React from 'react';
import './nav.css';


import Products from './nav_options/products/products';
import About from './nav_options/about/about';
import Social from './nav_options/social/social';

import NavMenu from './nav_menu/nav_menu';
import NavBar from './nav_bar/nav_bar';

export default function Nav() {

  const tabsInfo: { title: string; Component: React.FC<{ handleClick: () => void }> }[] = [
    {
      title: "Products",
      Component: Products,
    },
    {
      title: "About Us",
      Component: About,
    },
    {
      title: "Contact Us",
      Component: Social,
    },
  ];

  return (
    <nav>
      <NavBar tabsInfo={tabsInfo} />
      <NavMenu tabsInfo={tabsInfo} />
    </nav>
  );
}