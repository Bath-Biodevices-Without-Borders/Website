import React from 'react'
import ImageErrorBoundary from './image_error_boundary'
import './profile.css'

import Blank from '../../../../images/team_profiles/blank.jpg'

export default function Profile(props: any) {
  return (
    <div className='team-profile'>
      <div className='team-profile-image'>
        <ImageErrorBoundary
          image={props.Image}
          fallbackImage={Blank}
        />
      </div>
      <div className='team-profile-details'>
        <h2>{props.Name}</h2>
        <h3>{props.Course}</h3>
        <p>{props.Role}</p>
        <a href={props.Link} target='_blank' rel='noreferrer'>
          Contact
        </a>
      </div>
    </div>
  )
}
