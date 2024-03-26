import React from 'react'
import './our_story.css'

import aboutPageJson from '../../../content/about_page.json';

export default function OurStory() {
  return (
    <div className="our-story">
      <h2>Our Story</h2>
      {
        aboutPageJson.ourStory.map((paragraph: string, index: number) => {
          return (
            <p>{paragraph}</p>
          )
        })
      }
    </div>
  )
}
