import React from 'react';
import { Link } from 'react-router-dom';
import './nav_bar.css';

export default function NavBar() {
  return (
    <nav>
      <ul>
        <li id='home-button'>
          <Link className='link' to='/'>Home</Link>
        </li>
        <li id='about-button'>
          <Link className='link' to='about'>About</Link>
        </li>
        <li id='donate-button'>
            <Link className='link' to='donate'>Donate</Link>
        </li>
        <li id='future-button'>
            <Link className='link' to='future'>Future Plans</Link>
        </li>
        <li id='issues-button'>
            <Link className='link' to='issue'>Issues</Link>
        </li>
        <li id='partners-button'>
            <Link className='link' to='partners'>Partners</Link>
        </li>
        <li id='progress-button'>
            <Link className='link' to='progress'>Progress</Link>
        </li>
      </ul>
    </nav>
  )
}