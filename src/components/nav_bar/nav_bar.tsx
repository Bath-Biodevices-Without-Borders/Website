import './nav_bar.css';
import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';

import Logo from '../../images/Biodevices Without Borders-04.png';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav>
      <Link to = "/" className = "title">
      <img src={Logo} alt='Logo' />
      </Link>
      <div className = "menu"
      onClick ={() => {setMenuOpen(!menuOpen);}}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <ul className={menuOpen ? "open" : ""}>
        <li>
          <NavLink to = "/about">About Us</NavLink>
        </li>
        <li>
          <NavLink to = "/work">Our Work</NavLink>
        </li>
        <li>
          <NavLink to= "/contact">Get In Touch</NavLink>
        </li>
      </ul>
    </nav>
  );
}
