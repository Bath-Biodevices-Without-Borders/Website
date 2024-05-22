import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './nav_bar.css';

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { motion } from 'framer-motion';

import Logo from '../../images/Biodevices Without Borders-04.png';
import Tabs from './tabs/tabs';

export default function NavBar() {

  const tabsInfo: { title: string; Component: React.FC }[] = [
    {
      title: "Products",
      Component: Products,
    },
    {
      title: "Pricing",
      Component: Products,
    },
    {
      title: "Blog",
      Component: Products,
    },
  ];

  return (
    <nav>
      <Tabs tabsInfo={tabsInfo} />
      {/* <header>
        <Link to = "/" className = "title">
          <img src={Logo} alt='Logo' />
        </Link>
      </header>
      <input
        type='checkbox'
        id='menu-toggle'
        onClick={() => setMenuOpen(!menuOpen)}
      />
      <label htmlFor='menu-toggle'>
        {
          menuOpen
          ? <motion.div
              className='icon-container'
              initial = {{ rotate: 0, opacity: 1 }}
              animate = {{ rotate: 0, opacity: 1 }}
              exit = {{ rotate: 360, opacity: 0}}
            >
              <FontAwesomeIcon icon = {faXmark} />
            </motion.div>
          : <motion.div
              className='icon-container'
              initial = {{ rotate: 0, opacity: 0}}
              animate = {{ rotate: 360, opacity: 1}}
              exit = {{ rotate: 0, opacity: 0}}
            >
              <FontAwesomeIcon icon = {faBars} />
            </motion.div>
        }
      </label>
      <ul className='links'>
        <li>
          <NavLink to = "/about">About Us</NavLink>
        </li>
        <li>
          <NavLink to = "/work">Our Work</NavLink>
        </li>
        <li>
          <NavLink to= "/contact">Get In Touch</NavLink>
        </li>
      </ul> */}
    </nav>
  );
}

const Products = () => {
  return (
    <div>
      <div className="flex gap-4">
        <div>
          <h3 className="mb-2 text-sm font-medium">Startup</h3>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            Bookkeeping
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            Invoicing
          </a>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Scaleup</h3>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            Live Coaching
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            Reviews
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            Tax/VAT
          </a>
        </div>
        <div>
          <h3 className="mb-2 text-sm font-medium">Enterprise</h3>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            White glove
          </a>
          <a href="#" className="mb-1 block text-sm text-neutral-400">
            SOX Compliance
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            Staffing
          </a>
          <a href="#" className="block text-sm text-neutral-400">
            More
          </a>
        </div>
      </div>
    </div>
  );
};

// import {
//   FiArrowRight,
//   FiBarChart2,
//   FiChevronDown,
//   FiHome,
//   FiPieChart,
// } from "react-icons/fi";



// const Pricing = () => {
//   return (
//     <div className="grid grid-cols-3 gap-4 divide-x divide-neutral-700">
//       <a
//         href="#"
//         className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
//       >
//         <FiHome className="mb-2 text-xl text-indigo-300" />
//         <span className="text-xs">Startup</span>
//       </a>
//       <a
//         href="#"
//         className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
//       >
//         <FiBarChart2 className="mb-2 text-xl text-indigo-300" />
//         <span className="text-xs">Scaleup</span>
//       </a>
//       <a
//         href="#"
//         className="flex w-full flex-col items-center justify-center py-2 text-neutral-400 transition-colors hover:text-neutral-50"
//       >
//         <FiPieChart className="mb-2 text-xl text-indigo-300" />
//         <span className="text-xs">Enterprise</span>
//       </a>
//     </div>
//   );
// };

// const Blog = () => {
//   return (
//     <div>
//       <div className="grid grid-cols-2 gap-2">
//         <a href="#">
//           <img
//             className="mb-2 h-14 w-full rounded object-cover"
//             src="/imgs/blog/4.png"
//             alt="Placeholder image"
//           />
//           <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
//           <p className="text-xs text-neutral-400">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
//             quidem eos.
//           </p>
//         </a>
//         <a href="#">
//           <img
//             className="mb-2 h-14 w-full rounded object-cover"
//             src="/imgs/blog/5.png"
//             alt="Placeholder image"
//           />
//           <h4 className="mb-0.5 text-sm font-medium">Lorem ipsum dolor</h4>
//           <p className="text-xs text-neutral-400">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet illo
//             quidem eos.
//           </p>
//         </a>
//       </div>
//       <button className="ml-auto mt-4 flex items-center gap-1 text-sm text-indigo-300">
//         <span>View more</span>
//         <FiArrowRight />
//       </button>
//     </div>
//   );
// };