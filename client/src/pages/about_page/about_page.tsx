import React from 'react';

import './about_page.css';
import about_json from './about_page.json';

import HighlightBox from '../../components/highlight_box/highlight_box';

/**
 * @abstract A page consisting of information about the organization.
 * 
 * @returns the about page
 */
export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>About Page</h1>
      <div className='hero'>
        <HighlightBox cards={about_json.heroCards}/>
      </div>
    </div>
  );
}