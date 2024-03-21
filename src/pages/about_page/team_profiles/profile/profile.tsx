import React from 'react'
import ImageErrorBoundary from './image_error_boundary'
import './profile.css'

import Blank from '../../../../images/team_profiles/blank.jpg'
import LinkIcons from './link_icons'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmark } from '@fortawesome/free-solid-svg-icons'

export default function Profile(props: any) {
  return (
    <div className='team-profile'>
      <input
        type='checkbox'
        name='team-profile'
        id={props.index}
        checked={props.isSelected}
        onChange={() => props.handleSelection(props.index)}
      />
      <label className='foreground' htmlFor={props.index}>
        <div className='team-profile-image'>
          <ImageErrorBoundary
            image={props.Image}
            fallbackImage={Blank}
          />
        </div>
        <div className='team-profile-details'>
          <span className='team-profile-text'>
            <p>{props.Name}</p>
            <p>{props.Roles[0].Role}</p>
            <p>{props.Course}</p>
          </span>
          <LinkIcons link={props.Link} />
        </div>
      </label>
      <div className='background'>
        <div className='profile-description'>
          <p>{props.Description}</p>
        </div>  
        <label htmlFor={props.index}>
            <FontAwesomeIcon icon={faXmark} />
          </label>
      </div>
    </div>
  )
}
