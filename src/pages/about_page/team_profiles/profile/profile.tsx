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
        <p>{props.Name}</p>
        <p>{props.Roles[0].Role}</p>
        <p>{props.Course}</p>
        <a href={props.Link} target='_blank' rel='noreferrer'>
          Contact
        </a>
      </div>
    </div>
  )
}
